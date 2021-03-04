import authReducer from "./authReducer";
import { createStore } from "redux";

const defaultState = {
  isLoggedIn: true,
  username: "user1",
  displayName: "display1",
  image: null,
  password: "P4ssword",
};

const configureStore = () => {
  return createStore(authReducer, loggedInState);
};

export default configureStore;
