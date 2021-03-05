import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "./bootstrap-override.scss";
import "./i18n";
import App from "./container/App";
// import AuthenticationContext from "./shared/AuthenticationContext";
import { Provider } from "react-redux";
import { createStore } from "redux";
import configureStore from "./redux/configureStore";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />,
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
