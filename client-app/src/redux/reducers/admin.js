import { combineReducers } from "redux";
import users from "./users";
import watchedUser from "./watchedUser";
import dashboard from "./dashboard";

const adminReducer = combineReducers({ users, watchedUser, dashboard });

export default adminReducer;
