import { Route, Redirect } from "react-router-dom";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/selectors";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { user, isLoggedIn, isLoggingIn } = useSelector(getUser);
  if (isLoggingIn) {
    return <Loading message="Вход" />;
  }
  if (isLoggedIn) {
    if (roles && roles.indexOf(user.role) === -1) {
      return <Redirect to={{ pathname: "/home" }} />;
    }
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  return <Redirect to="/login" />;
};

export default PrivateRoute;
