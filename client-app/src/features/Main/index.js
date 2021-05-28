import "./style.scss";
import { useEffect } from "react";
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
import Menu from "../menu/Menu";
import Delivery from "../Delivery";
import Sidenav from "../Sidenav";
import Account from "../user/Account";
import Admin from "../admin/Admin";
import { AuthModal } from "../auth";
import roles from "../../common/roles";
import PrivateRoute from "../../components/PrivateRoute";
import Checkout from "../order/Checkout";

const Main = () => {
  const location = useLocation();
  const history = useHistory();
  const background = location.state && location.state.background;
  const back = (e) => {
    e.stopPropagation();
    history.push(background);
  };
  return (
    <>
      <div className="main">
        <Header />
        <Sidenav />
        <div className="content __container">
          <Switch location={background || location}>
            <Route exact path="/" children={<Home />} />
            <Route path="/menu" children={<Menu />} />
            <Route path="/delivery" children={<Delivery />} />
            <Route path="/checkout" children={<Checkout />} />
            <PrivateRoute
              path="/account"
              roles={[roles.user, roles.admin]}
              component={Account}
            />
            <PrivateRoute
              path="/admin"
              roles={[roles.ADMIN]}
              component={Admin}
            />
            <Redirect
              from="/login"
              to={{
                pathname: "/login",
                state: { background: { pathname: "/" } },
              }}
            />
            <Redirect
              from="/register"
              to={{
                pathname: "/register",
                state: { background: { pathname: "/" } },
              }}
            />
            <Redirect to="/" />
          </Switch>
          {background && (
            <>
              <Route path="/login" children={<AuthModal onClose={back} />} />
              {/* <Route
            path="/register"
            children={
              <RegisterModal
                submitComponent={Loading}
                handleSubmit={handleRegistr}
                handleClose={back}
              />
            }
          /> */}
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Main;
