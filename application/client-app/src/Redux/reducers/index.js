import { combineReducers } from "redux";

import { menus } from "./menus";
import { modals } from "./modals";
import { order } from "./order";
import { user } from "./user";

const rootReducer = combineReducers({ menus, modals, order, user });
export default rootReducer;
