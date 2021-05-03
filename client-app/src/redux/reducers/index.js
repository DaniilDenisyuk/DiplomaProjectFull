import { combineReducers } from "redux";
import films from "./films";
import messages from "./messages";
import auth from "./auth";
import profiles from "./profiles";
import admin from "./admin";

export default combineReducers({
  films,
  messages,
  auth,
  profiles,
  admin,
});
