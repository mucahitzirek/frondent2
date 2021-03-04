import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "./bootstrap-override.scss";
import "./i18n";
import App from "./container/App";
import AuthenticationContext from "./shared/AuthenticationContext";
ReactDOM.render(
  <AuthenticationContext>
    <App />
  </AuthenticationContext>,

  document.getElementById("root")
);

reportWebVitals();
