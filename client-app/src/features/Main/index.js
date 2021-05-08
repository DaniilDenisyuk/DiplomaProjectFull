import { connect, useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useHistory,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";
import Home from "../Home";
import Menu from "../Menu";
import Payment from "../Payment";

import { useEffect } from "react";
import roles from "../../common/shared/roles";

import PrivateRoute from "../../components/PrivateRoute";
import { authActions, menuActions } from "../slices";

const Main = () => {
  const location = useLocation();
  const history = useHistory();
  const background = location.state && location.state.background;
  const back = (e) => {
    e.stopPropagation();
    history.push(background);
  };
  const handleRegistr = (data) => {
    console.log("register", data);
    register(data).then(() => back());
  };
  const handleAuth = (data) => {
    console.log("auth", data);
    login(data).then(() => back());
  };

  return (
    <div className="main">
      <Header />
      <div className="content">
        <Switch location={background || location}>
          <Route exact path="/" children={<Home />} />
          <Route path="/menu" children={<Menu />} />
          <Route path="/delivery" children={<Delivery />} />
          <PrivateRoute
            path="/account"
            roles={[roles.USER, roles.ADMIN]}
            component={Account}
          />
          <PrivateRoute path="/admin" roles={[roles.ADMIN]} component={Admin} />
          <Redirect
            from="/login"
            to={{
              pathname: "/login",
              state: { background: { pathname: "/home" } },
            }}
          />
          <Redirect
            from="/register"
            to={{
              pathname: "/register",
              state: { background: { pathname: "/home" } },
            }}
          />
          <Redirect to="/home" />
        </Switch>
        {background && (
          <>
            <Route
              path="/login"
              children={
                <AuthFormModal
                  submitComponent={Loading}
                  handleSubmit={handleAuth}
                  handleClose={back}
                />
              }
            />
            <Route
              path="/registr"
              children={
                <RegistrFormModal
                  submitComponent={Loading}
                  handleSubmit={handleRegistr}
                  handleClose={back}
                />
              }
            />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

const mapState = (state) => {
  const { sorting, order, list, isLoading, message } = state.films;
  const films = sorting ? sorting(list, order) : list;
  return { films, order, sorting, isLoading, message };
};

const mapDispatch = {
  fetchDashboardInfo: dashboardActions.fetchDashboardInfo,
  refreshToken: usersActions.refreshToken,
};

export default connect(mapState, mapDispatch)(Main);
