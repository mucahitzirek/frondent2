import React from "react";
import LanguageSelector from "../componenets/LanguageSelector";
import UserSignupPage from "../pages/UserSignupPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import { Authentication } from "../shared/AuthenticationContext";
import {
  HashRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import TopBar from "../componenets/TopBar";

class App extends React.Component {
  static contextType = Authentication;

  render() {
    const isLoggedIn = this.context.state.isLoggedIn;

    return (
      <div>
        <Router>
          <TopBar />
          <Switch>
            {/* exact sadece bu pathte componentte belirtileni gostermesini saglar`1 */}
            <Route exact path="/" component={HomePage}></Route>
            {!isLoggedIn && ( // !isLoggedIn && neden ekledik ?
              // mesela giris yaptik, ancak linkten logine gitmek istedigmizde goturyordu ve
              //login yapan user bilgisi kaliyordu bunu engellemek icin yaptik Default Redirect linki olmus oldu
              <Route path="/login" component={LoginPage} />
            )}
            <Route path="/signup" component={UserSignupPage}></Route>
            <Route path="/user/:username" component={UserPage}></Route>
            {/* yukaridaki pathlerden hicbiriyle match etmesse Redirect calisacak */}
            <Redirect to="/" />
          </Switch>
        </Router>
        <LanguageSelector />
      </div>
    );
  }
}

export default App;
