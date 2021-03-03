import { signup } from "../api/apiCalls";
import React from "react";
import Input from "../componenets/Input";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from "../componenets/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";

class UserSignupPage extends React.Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    errors: {},
  };

  onChange = (event) => {
    const { t } = this.props;
    const { name, value } = event.target;
    const errors = { ...this.state.errors };
    errors[name] = undefined;

    if (name === "password" || name === "passwordRepeat") {
      if (name === "password" && value !== this.state.passwordRepeat) {
        errors.passwordRepeat = t("Password mismatch");
      } else if (name === "passwordRepeat" && value !== this.state.password) {
        errors.passwordRepeat = t("Password mismatch");
      } else {
        errors.passwordRepeat = undefined;
      }
    }
    this.setState({
      [name]: value,
      errors,
    });
  };

  onClickSignup = async (event) => {
    event.preventDefault();
    const { username, displayName, password } = this.state;
    const body = {
      username, //key ve value isimleri ayni ise birisini yazmamiz yeterli
      displayName,
      password,
    };
    try {
      const response = await signup(body);
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({ errors: error.response.data.validationErrors });
      }
    }
  };

  render() {
    const { t, pendingApiCall } = this.props;
    const { errors } = this.state;
    const { username, displayName, password, passwordRepeat } = errors;
    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t("Sign Up")}</h1>
          <Input
            name="username"
            label={t("Username")}
            error={username}
            onChange={this.onChange}
          ></Input>
          <Input
            name="displayName"
            label={t("Display Name")}
            error={displayName}
            onChange={this.onChange}
          ></Input>
          <Input
            name="password"
            label={t("Password")}
            error={password}
            onChange={this.onChange}
            type="password"
          ></Input>
          <Input
            name="passwordRepeat"
            label={t("Password Repeat")}
            error={passwordRepeat}
            onChange={this.onChange}
            type="password"
          ></Input>
          <div className="text-center">
            <ButtonWithProgress
              disabled={pendingApiCall || passwordRepeat !== undefined}
              onClick={this.onClickSignup}
              pendingApiCall={pendingApiCall}
              text={t("Sign Up")}
            ></ButtonWithProgress>
          </div>
          <div></div>
        </form>
      </div>
    );
  }
}
const UserSignupPageWithApiProgress = withApiProgress(
  UserSignupPage,
  "/api/1.0/users"
);
const UserSignupPageWithTranslation = withTranslation()(
  UserSignupPageWithApiProgress
);
//ApiProgress ve Translation ozelliklerine sahip UserSignupPage olmus oldu
export default UserSignupPageWithTranslation;
