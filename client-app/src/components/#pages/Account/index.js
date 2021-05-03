import React from "react";
import { Favorites } from "./Favorites";
import { Address } from "./account.address";
import { History } from "./OrderHistory";
import { Info } from "./Info";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("user") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

const AccountSection = () => {};

export default AccountSection;
