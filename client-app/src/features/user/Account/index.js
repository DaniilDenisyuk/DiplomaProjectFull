import {
  NavLink,
  Switch,
  Route,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import cn from "classnames";
import { AddressForm, UserForm, ChangePwdForm } from "../forms";

const NavBar = ({ className, baseUrl }) => (
  <nav className={cn(className, "nav-bar")}>
    <NavLink
      exact
      to={`${baseUrl}/info`}
      className="nav-bar__link"
      activeClassName="nav-bar__link--active"
    >
      Інформація
    </NavLink>
    ;
    <NavLink
      exact
      to={`${baseUrl}/address`}
      className="nav-bar__link"
      activeClassName="nav-bar__link--active"
    >
      Адреса доставки
    </NavLink>
    ;
    <NavLink
      exact
      to={`${baseUrl}/history`}
      className="nav-bar__link"
      activeClassName="nav-bar__link--active"
    >
      Історія замовлень
    </NavLink>
    ;
    <NavLink
      exact
      to={`${baseUrl}/chosen`}
      className="nav-bar__link"
      activeClassName="nav-bar__link--active"
    >
      Обране
    </NavLink>
    ;
  </nav>
);

const Account = () => {
  const { path, url } = useRouteMatch();
  return (
    <div className="account">
      <NavBar className="account__nav-bar" baseUrl={url} />
      <div className="account__content">
        <Switch>
          <Route exact path={path}>
            <Redirect to={`${url}/info`} />
          </Route>
          <Route path={`${path}/info`}>
            <UserForm className="account__info-form" />
            <ChangePwdForm className="account__pwd-form" />
          </Route>
          <Route path={`${path}/address`}>
            <UserForm className="account__info-form" />
          </Route>
          <Route path={`${path}/history`}></Route>
          <Route path={`${path}/chosen`}></Route>
          <Redirect to={`${url}/info`} />
        </Switch>
      </div>
    </div>
  );
};

export default Account;
