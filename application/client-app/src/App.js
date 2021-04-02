import React, { Component } from "react";
// import {
//   HomePage,
//   ItemPage,
//   MenuPage,
//   PaymentPage,
//   AccountSection,
// } from "./pages";
import {
  // CartModal,
  AuthModal,
  // RegistrModal,
  // ResetPwdModal,
} from "./components/modals";
import "./App.scss";
import { Header, Footer, Sidenav /*PrivateRoute*/ } from "./components";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
//import { Provider } from "react-redux";
//import { store } from "./Redux/store";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Header />
          <Sidenav />
          <Footer />
        </BrowserRouter>
      </React.Fragment>
      // <Provider store={store}>

      //   {/* <BrowserRouter>
      //     <Switch>
      //       <PrivateRoute path="/account" render={() => <AccountSection />} />
      //       <Route path="/" render={() => <HomePage />} />
      //       <Route path="/payment" render={() => <PaymentPage />} />
      //       <Route path="/menu" render={() => <MenuPage />} />
      //       <Route path="/menu/:id" render={ItemPage} />
      //       <Redirect from="*" to="/" />
      //     </Switch>
      //   </BrowserRouter> */}

      // </Provider>
    );
  }
}

export default App;
