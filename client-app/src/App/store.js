import { createStore, applyMiddleware, combineReducers } from "redux";
import { authReducer } from "../features/auth/authSlice";
import { locationReducer } from "../features/location/locationSlice";
import { langReducer } from "../features/lang/langSlice";
import { orderReducer } from "../features/order/orderSlice";
// import { authReducer } from "../features/auth/authSlice";
import thunk from "redux-thunk";

export default createStore(
  combineReducers({
    auth: authReducer,
    location: locationReducer,
    lang: langReducer,
    order: orderReducer,
    // user: userReducer,
    // menu: menuReducer,
    // admin: adminReducer,
  }),
  applyMiddleware(thunk)
);
