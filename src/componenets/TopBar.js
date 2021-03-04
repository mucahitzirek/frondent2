import React, { Component } from "react";
import logo from "../assets/hoaxify.png";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { Authentication } from "../shared/AuthenticationContext";

class TopBar extends Component {
  static contextType = Authentication;
  render() {
    //TopBar icin t => withTranslate, isLoggedIn -> App.js'ten gelen loggin isleminin dogrulugunu kontrol ediyor true false doner
    //username => giris yapan kullanici ismini App.js'ten alarak TopBara yazmak icin,
    //onLogoutSuccess => Cikisi gerceklesen kullanicinin sonucunu true false doner.
    // const { t, isLoggedIn, username, onLogoutSuccess } = this.props;
    const { t } = this.props;
    const { state, onLogoutSuccess } = this.context;
    const { isLoggedIn, username } = state;
    let links = (
      <ul className="navbar-nav ml-auto">
        <li>
          <Link className="nav-link" to="/login">
            {t("Login")}
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/signup">
            {t("Sign Up")}
          </Link>
        </li>
      </ul>
    );
    if (isLoggedIn) {
      links = (
        <ul className="navbar-nav ml-auto">
          <li>
            {/* Login olmus kullanici icin bir link ekledik /user/user1*/}
            <Link className="nav-link" to={`/user/${username}`}>
              {username}
            </Link>
          </li>
          <li
            className="nav-link"
            style={{ cursor: "pointer" }}
            onClick={onLogoutSuccess} // Logouta tikladigmizda App.js'teki state'i guncellemis olduk
          >
            {t("Logout")}
          </li>
        </ul>
      );
    }
    return (
      <div className="shadow-sm bg-light mb-2">
        <nav className="navbar navbar-light  container navbar-expand">
          <Link className="navbar-brand" to="/">
            <img src={logo} width="55" alt="Hoaxify Logo"></img>
            Hoaxify
          </Link>
          {links}
        </nav>
      </div>
    );
  }
}
export default withTranslation()(TopBar);
