import React, { Component } from "react";
import Input from "../componenets/Input";
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCalls";
import ButtonWithProgress from "../componenets/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";

class LoginPage extends Component {
  state = {
    username: null,
    password: null,
    error: null,
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: null,
    });
  };

  onClickLogin = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const { onLoginSuccess } = this.props;
    const creds = {
      username,
      password,
    };
    const { push } = this.props.history;
    this.setState({
      error: null,
    });
    try {
      await login(creds);
      push("/"); // login gerceklesirse homepage'e /  yonlendiriyor
      onLoginSuccess(username);
    } catch (apiError) {
      this.setState({
        error: apiError.response.data.message,
      });
    }
  };

  render() {
    const { t, pendingApiCall } = this.props;
    const { username, password, error } = this.state;
    const buttonEnabled = username && password;

    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t("Login")}</h1>
          <Input
            name="username"
            label={t("Username")}
            onChange={this.onChange}
          ></Input>
          <Input
            name="password"
            label={t("Password")}
            type="password"
            onChange={this.onChange}
          ></Input>
          {error && <div className="alert  alert-danger">{error}</div>}
          <div className="text-center">
            <ButtonWithProgress
              onClick={this.onClickLogin}
              disabled={!buttonEnabled || pendingApiCall}
              pendingApiCall={pendingApiCall}
              text={t("Login")}
            ></ButtonWithProgress>
          </div>
        </form>
      </div>
    );
  }
}
const LoginPageWithTranslation = withTranslation()(LoginPage);
export default withApiProgress(LoginPageWithTranslation, "/api/1.0/auth");
