import React, { Component } from "react";
//import Main from "./components/MainComponent";
import SelectLocation from "./components/styled/selects/selectLocation";
import SelectLanguage from "./components/styled/selects/selectLanguage";
import "./App.scss";
//import { BrowserRouter } from "react-router-dom";
//import { Provider } from "react-redux";
//import { ConfigureStore } from "./Redux/configureStore";

//const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <div>
        <SelectLocation></SelectLocation>
        <SelectLanguage></SelectLanguage>
      </div>
      // <Provider store={store}>
      //   <BrowserRouter>
      //     <Main />
      //   </BrowserRouter>
      // </Provider>
    );
  }
}

export default App;
