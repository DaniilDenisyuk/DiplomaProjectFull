import {
  NavLink,
  Switch,
  Route,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import cn from "classnames";
import { AddressForm, UserForm, ChangePwdForm } from "../forms";
import OrderHistory from "../OrderHistory";
import "./style.scss";

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
    <NavLink
      exact
      to={`${baseUrl}/address`}
      className="nav-bar__link"
      activeClassName="nav-bar__link--active"
    >
      Адреса доставки
    </NavLink>
    <NavLink
      exact
      to={`${baseUrl}/history`}
      className="nav-bar__link"
      activeClassName="nav-bar__link--active"
    >
      Історія замовлень
    </NavLink>
    <NavLink
      exact
      to={`${baseUrl}/chosen`}
      className="nav-bar__link"
      activeClassName="nav-bar__link--active"
    >
      Обране
    </NavLink>
  </nav>
);

const Account = () => {
  const { path, url } = useRouteMatch();
  return (
    <div className="account">
      <div className="account__wrapper">
        <NavBar className="account__nav-bar" baseUrl={url} />
        <div className="account__content">
          <Switch>
            <Route exact path={path}>
              <Redirect to={`${url}/info`} />
            </Route>
            <Route path={`${path}/info`}>
              <UserForm className="account__form" />
              <ChangePwdForm className="account__form" />
            </Route>
            <Route path={`${path}/address`}>
              <AddressForm className="account__form" />
            </Route>
            <Route path={`${path}/history`}>
              <div className="account__history">
                <p className="account__heading">Ваші замовлення</p>
                <OrderHistory className="account__history-list" />
              </div>
            </Route>
            <Route path={`${path}/chosen`}></Route>
            <Redirect to={`${url}/info`} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Account;
