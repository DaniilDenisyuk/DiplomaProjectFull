import { userService } from "../services/userService";
import { combineReducers } from "redux";

const infoState = {
  isLoading: "",
  id: "",
  email: "",
  first_name: "",
  second_name: "",
  address: "",
  phone: "",
};

const orderHistoryState = {
  isLoading: "",
  orders: [],
};

const favoriteDishesState = {
  isLoading: "",
  dishes: [],
};

export const infoConstants = {
  getRequest: "user/info/getRequest",
  getSucceed: "user/info/getSucceed",
  getFailed: "user/info/getFailed",
  updateRequest: "user/info/updateRequest",
  updateSucceed: "user/info/updateSucceed",
  updateFailed: "user/info/updateFailed",
};

export const orderHistoryConstants = {
  getRequest: "user/history/getRequest",
  getSucceed: "user/history/getSucceed",
  getFailed: "user/history/getFailed",
  clearRequest: "user/history/clearRequest",
  clearSucceed: "user/history/clearSucceed",
  clearFailed: "user/history/clearFailed",
  addOrderRequest: "user/history/addOrderRequest",
  addOrderSucceed: "user/history/addOrderSucceed",
  addOrderFailed: "user/history/addOrderFailed",
};

export const favoritesConstants = {
  getRequest: "user/favorites/getRequest",
  getSucceed: "user/favorites/getSucceed",
  getFailed: "user/favorites/getFailed",
  addRequest: "user/favorites/addRequest",
  addSucceed: "user/favorites/addSucceed",
  addFailed: "user/favorites/addFailed",
  deleteRequest: "user/favorites/deleteRequest",
  deleteSucceed: "user/favorites/deleteSucceed",
  deleteFailed: "user/favorites/deleteFailed",
};

const getUserInfo = () => (dispatch) => {};

const getOrderHistory = () => (dispatch) => {};

const getFavoriteDishes = () => (dispatch) => {};

const addToFavorites = () => (dispatch) => {};

const deleteFromFavorites = () => (dispatch) => {};

const addOrderToHistory = () => (dispatch) => {};

const clearHistory = () => (dispatch) => {};

export const userActions = {
  getUserInfo,
  getOrderHistory,
  getFavoriteDishes,
  addToFavorites,
  deleteFromFavorites,
  addOrderToHistory,
  clearHistory,
};

const infoReducer = (state = infoState) => {};
const orderHistoryReducer = (state = orderHistoryState) => {};
const favoriteDishesReducer = (state = favoriteDishesState) => {};

export const userReducer = combineReducers({
  info: infoReducer,
  orderHistory: orderHistoryReducer,
  favoriteDishes: favoriteDishesReducer,
});
