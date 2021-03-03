import React from "react";
import LanguageSelector from "../componenets/LanguageSelector";
import UserSignupPage from "../pages/UserSignupPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import {
  HashRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import TopBar from "../componenets/TopBar";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    username: undefined,
  };
  onLoginSuccess = (username) => {
    this.setState({
      username,
      isLoggedIn: true,
    });
  };

  onLogoutSuccess = () => {
    this.setState({
      isLoggedIn: false,
      username: undefined,
    });
  };

  render() {
    const { isLoggedIn, username } = this.state;

    return (
      <div>
        <Router>
          <TopBar
            username={username}
            isLoggedIn={isLoggedIn}
            onLogoutSuccess={this.onLogoutSuccess}
          />
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            {!isLoggedIn && (
              <Route
                path="/login"
                component={(props) => {
                  return (
                    <LoginPage
                      {...props}
                      onLoginSuccess={this.onLoginSuccess}
                    />
                  );
                }}
              />
            )}
            <Route path="/signup" component={UserSignupPage}></Route>
            <Route path="/user/:username" component={UserPage}></Route>
            {/* yukaridakilerden hicbiriyle match etmesse Redirect calisacak */}
            <Redirect to="/" />
          </Switch>
        </Router>
        <LanguageSelector />
      </div>
    );
  }
}

export default App;
