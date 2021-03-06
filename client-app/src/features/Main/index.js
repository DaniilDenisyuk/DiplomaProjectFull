import "./style.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { AuthModal, RegisterModal } from "../auth";
import { userActions } from "../user/userSlice";
import roles from "../../common/roles";
import PrivateRoute from "../../components/PrivateRoute";
import Checkout from "../order/Checkout";
import { menuActions } from "../menu/menuSlice";
import { authActions } from "../auth/authSlice";
import { getIsLoggedIn, getTokenExp } from "../../common/selectors";

const Main = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const exp = useSelector(getTokenExp);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const background = location.state && location.state.background;
  const back = () => {
    history.push(background || "/");
  };
  useEffect(() => {
    let timeout;
    let refreshTimeout;
    if (exp) {
      const expires = new Date(exp * 1000);
      timeout = expires.getTime() - Date.now() - 60 * 1000;
    } else {
      timeout = 0;
    }
    refreshTimeout = setTimeout(
      () => dispatch(authActions.refreshToken()),
      timeout
    );
    return () => clearTimeout(refreshTimeout);
  }, [exp, dispatch]);
  useEffect(() => {
    dispatch(menuActions.getMenu());
  }, [dispatch]);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(userActions.getAllUserData());
    }
  }, [dispatch, isLoggedIn]);
  return (
    <div className="main">
      <Header />
      <Sidenav />
      <div className="content ">
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
          <PrivateRoute path="/admin" roles={[roles.ADMIN]} component={Admin} />
          {!isLoggedIn && !background && (
            <Redirect
              from="/login"
              to={{
                pathname: "/login",
                state: { background: { pathname: "/" } },
              }}
            />
          )}
          {!isLoggedIn && !background && (
            <Redirect
              from="/register"
              to={{
                pathname: "/register",
                state: { background: { pathname: "/" } },
              }}
            />
          )}
          <Redirect to="/" />
        </Switch>
        {!isLoggedIn && background && (
          <>
            <Route
              path="/login"
              children={<AuthModal onSuccess={back} onClose={back} />}
            />
            <Route
              path="/register"
              children={<RegisterModal onSuccess={back} onClose={back} />}
            />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Main;
