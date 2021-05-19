import { userService } from "../../services/userService";
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

export const infoConstants = {
  getRequest: "user/info/getRequest",
  getSucceeded: "user/info/getSucceeded",
  getFailed: "user/info/getFailed",
  updateRequest: "user/info/updateRequest",
  updateSucceeded: "user/info/updateSucceeded",
  updateFailed: "user/info/updateFailed",
};

const infoReducer = (state = infoState, action) => {
  switch (action.type) {
    case infoConstants.getRequest: {
      return { isLoading: true };
    }
    case infoConstants.getSucceeded: {
      const { info } = action;
      return { ...info };
    }
    case infoConstants.getFailed: {
      return {};
    }
    case infoConstants.updateRequest: {
      return { isLoading: true };
    }
    case infoConstants.updateSucceeded: {
      const { updatedInfo } = action;
      return { ...updatedInfo };
    }
    case infoConstants.updateFailed: {
      return state;
    }
    default:
      return state;
  }
};

const orderHistoryState = {
  isLoading: "",
  orders: [],
};

export const orderHistoryConstants = {
  getRequest: "user/history/getRequest",
  getSucceeded: "user/history/getSucceeded",
  getFailed: "user/history/getFailed",
  clearRequest: "user/history/clearRequest",
  clearSucceeded: "user/history/clearSucceeded",
  clearFailed: "user/history/clearFailed",
  addOrderRequest: "user/history/addOrderRequest",
  addOrderSucceeded: "user/history/addOrderSucceeded",
  addOrderFailed: "user/history/addOrderFailed",
};

const orderHistoryReducer = (state = orderHistoryState, action) => {
  switch (action.type) {
    case orderHistoryConstants.getRequest: {
      return { isLoading: true };
    }
    case orderHistoryConstants.getSucceeded: {
      const { orders } = action;
      return { orders };
    }
    case orderHistoryConstants.getFailed: {
      return {};
    }
    case orderHistoryConstants.addOrderRequest: {
      return { isLoading: true };
    }
    case orderHistoryConstants.addOrderSucceeded: {
      const { order } = action;
      return { orders: state.orders.push(order) };
    }
    case orderHistoryConstants.addOrderFailed: {
      return state;
    }
    case orderHistoryConstants.clearRequest: {
      return { isLoading: true };
    }
    case orderHistoryConstants.clearSucceeded: {
      return {};
    }
    case orderHistoryConstants.clearFailed: {
      return state;
    }
    default:
      return state;
  }
};

const favoriteDishesState = {
  isLoading: "",
  dishes: [],
};

export const favoritesConstants = {
  getRequest: "user/favorites/getRequest",
  getSucceeded: "user/favorites/getSucceeded",
  getFailed: "user/favorites/getFailed",
  addRequest: "user/favorites/addRequest",
  addSucceeded: "user/favorites/addSucceeded",
  addFailed: "user/favorites/addFailed",
  deleteRequest: "user/favorites/deleteRequest",
  deleteSucceeded: "user/favorites/deleteSucceeded",
  deleteFailed: "user/favorites/deleteFailed",
};

const favoriteDishesReducer = (state = favoriteDishesState, action) => {
  switch (action.type) {
    case infoConstants.getRequest: {
      return { isLoading: true };
    }
    case infoConstants.getSucceeded: {
    }
    case infoConstants.getFailed: {
    }
    case infoConstants.updateRequest: {
    }
    case infoConstants.updateSucceeded: {
    }
    case infoConstants.updateFailed: {
    }
    default:
      return state;
  }
};

const getUserInfo = (token, userId) => {
  const request = () => ({
    type: infoConstants.getRequest,
  });
  const success = (user) => ({
    type: infoConstants.getSucceeded,
    user,
  });
  const failure = () => ({
    type: infoConstants.getFailed,
  });
  return (dispatch) => {
    dispatch(request());
    return userService
      .getUser(token, userId)
      .then((userInfo) => dispatch(success(userInfo)))
      .catch(() => dispatch(failure));
  };
};

const getOrderHistory = (token, userId) => {
  const request = () => ({
    type: infoConstants.getRequest,
  });
  const success = (user) => ({
    type: infoConstants.getSucceeded,
    user,
  });
  const failure = () => ({
    type: infoConstants.getFailed,
  });
  return (dispatch) => {
    dispatch(request());
    return userService
      .getUser(token, userId)
      .then((userInfo) => dispatch(success(userInfo)))
      .catch(() => dispatch(failure));
  };
};

const getFavoriteDishes = (token, userId) => {
  const request = () => ({
    type: infoConstants.getRequest,
  });
  const success = (user) => ({
    type: infoConstants.getSucceeded,
    user,
  });
  const failure = () => ({
    type: infoConstants.getFailed,
  });
  return (dispatch) => {
    dispatch(request());
    return userService
      .getUser(token, userId)
      .then((userInfo) => dispatch(success(userInfo)))
      .catch(() => dispatch(failure));
  };
};

const addToFavorites = (token, userId) => {
  const request = () => ({
    type: infoConstants.getRequest,
  });
  const success = (user) => ({
    type: infoConstants.getSucceeded,
    user,
  });
  const failure = () => ({
    type: infoConstants.getFailed,
  });
  return (dispatch) => {
    dispatch(request());
    return userService
      .getUser(token, userId)
      .then((userInfo) => dispatch(success(userInfo)))
      .catch(() => dispatch(failure));
  };
};

const deleteFromFavorites = (token, userId) => {
  const request = () => ({
    type: infoConstants.getRequest,
  });
  const success = (user) => ({
    type: infoConstants.getSucceeded,
    user,
  });
  const failure = () => ({
    type: infoConstants.getFailed,
  });
  return (dispatch) => {
    dispatch(request());
    return userService
      .getUser(token, userId)
      .then((userInfo) => dispatch(success(userInfo)))
      .catch(() => dispatch(failure));
  };
};

const addOrderToHistory = (token, userId) => {
  const request = () => ({
    type: infoConstants.getRequest,
  });
  const success = (user) => ({
    type: infoConstants.getSucceeded,
    user,
  });
  const failure = () => ({
    type: infoConstants.getFailed,
  });
  return (dispatch) => {
    dispatch(request());
    return userService
      .getUser(token, userId)
      .then((userInfo) => dispatch(success(userInfo)))
      .catch(() => dispatch(failure));
  };
};

const clearHistory = (token, userId) => {
  const request = () => ({
    type: infoConstants.getRequest,
  });
  const success = (user) => ({
    type: infoConstants.getSucceeded,
    user,
  });
  const failure = () => ({
    type: infoConstants.getFailed,
  });
  return (dispatch) => {
    dispatch(request());
    return userService
      .getUser(token, userId)
      .then((userInfo) => dispatch(success(userInfo)))
      .catch(() => dispatch(failure));
  };
};

export const userActions = {
  getUserInfo,
  getOrderHistory,
  getFavoriteDishes,
  addToFavorites,
  deleteFromFavorites,
  addOrderToHistory,
  clearHistory,
};

export const userReducer = combineReducers({
  info: infoReducer,
  orderHistory: orderHistoryReducer,
  favoriteDishes: favoriteDishesReducer,
});
