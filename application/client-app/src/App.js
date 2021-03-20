import React, { Component } from "react";
import {
  HomePage,
  ItemPage,
  MenuPage,
  PaymentPage,
  AccountSection,
} from "./pages";
import {
  CartModal,
  AuthModal,
  RegistrModal,
  ResetPwdModal,
} from "./components/modals";
import { Header, Footer, Sidenav, PrivateRoute } from "./components";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigureStore } from "./Redux/configureStore";

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <Sidenav />
        <BrowserRouter>
          <Switch>
            <PrivateRoute path="/account" render={() => <AccountSection />} />
            <Route path="/" render={() => <HomePage />} />
            <Route path="/payment" render={() => <PaymentPage />} />
            <Route path="/menu" render={() => <MenuPage />} />
            <Route path="/menu/:id" render={ItemPage} />
            <Redirect from="*" to="/" />
          </Switch>
        </BrowserRouter>
        <Footer />
      </Provider>
    );
  }
}

export default App;
