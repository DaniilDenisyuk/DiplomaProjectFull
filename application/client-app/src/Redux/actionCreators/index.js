import { combineReducers } from "redux";

import { user } from "./user.actions";
import { order } from "./order.actions";
import { menu } from "./menu.actions";

const rootReducer = combineReducers({
  user,
  order,
  menu,
});

export default rootReducer;
