import React, { Component } from "react";
//import Main from "./components/MainComponent";
import SelectLocation from "./components/styled/selects/selectLocation";
import SelectLanguage from "./components/styled/selects/selectLanguage";
import AuthForm from "./components/styled/popups/AuthorizationComponent";
import "./App.scss";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigureStore } from "./Redux/configureStore";

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AuthForm></AuthForm>
        <SelectLocation></SelectLocation>
        <SelectLanguage></SelectLanguage>
        <BrowserRouter>
          <Switch>
            <PrivateRoute path="/account" component={HomePage} />
            <Route path="/" render />
            <Route path="/payment" render />
            <Route path="/menu" render />
            <Route path="/register" render />
            <Redirect from="*" to="/" />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
