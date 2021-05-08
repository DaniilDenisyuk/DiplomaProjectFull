import "./style.scss";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";
//import Main from "../features/Main";
import Header from "../features/Header";

const App = () => (
  <Provider store={store}>
    <Router>
      {/* <Main /> */}
      <Header />
    </Router>
  </Provider>
);

export default App;
