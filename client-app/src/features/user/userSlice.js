import { userDataService } from "../../services/userDataService";
import { favoritesReducer } from "./Favorites/favoritesSlice";
import { historyReducer } from "./OrderHistory/historySlice";
import { combineReducers } from "redux";

const infoState = {
  isLoading: false,
  isSucceeded: true,
  isFailed: false,
  id: "",
  email: "",
  first_name: "",
  last_name: "",
  address: "",
  phone: "",
  town: "",
  street: "",
  house: "",
  door: "",
};

export const infoConstants = {
  getRequest: "user/info/getRequest",
  getSucceeded: "user/info/getSucceeded",
  getFailed: "user/info/getFailed",
  updateRequest: "user/info/updateRequest",
  updateSucceeded: "user/info/updateSucceeded",
  updateFailed: "user/info/updateFailed",
};

export const userConstants = {
  getAllRequest: "user/getAllRequest",
  getAllSucceeded: "user/getAllSucceeded",
  getAllFailed: "user/getAllFailed",
};

const infoReducer = (state = infoState, action) => {
  switch (action.type) {
    case infoConstants.getRequest: {
      return { isLoading: true };
    }
    case userConstants.getAllSucceeded:
    case infoConstants.getSucceeded: {
      const { info } = action.payload;
      return { isSuccededed: true, ...info };
    }
    case infoConstants.getFailed: {
      return { isFailed: true };
    }
    case infoConstants.updateRequest: {
      return state;
    }
    case infoConstants.updateSucceeded: {
      const { fields } = action.payload;
      return { ...state, ...fields };
    }
    case infoConstants.updateFailed: {
      return state;
    }
    default:
      return state;
  }
};

const getAllUserData = () => {
  const request = () => ({
    type: userConstants.getAllRequest,
  });
  const success = (userData) => ({
    type: userConstants.getAllSucceeded,
    payload: userData,
  });
  const failure = () => ({
    type: userConstants.getAllFailed,
  });
  return (dispatch) => {
    dispatch(request());
    return userDataService
      .getAllUserData()
      .then((userData) => dispatch(success(userData)))
      .catch(() => dispatch(failure));
  };
};

// const getUserInfo = () => {
//   const request = () => ({
//     type: infoConstants.getRequest,
//   });
//   const success = (user) => ({
//     type: infoConstants.getSucceeded,
//     user,
//   });
//   const failure = () => ({
//     type: infoConstants.getFailed,
//   });
//   return (dispatch) => {
//     dispatch(request());
//     return userDataService
//       .getUser()
//       .then((userInfo) => dispatch(success(userInfo)))
//       .catch(() => dispatch(failure));
//   };
// };

const updateUserInfo = (fields) => {
  const request = () => ({
    type: infoConstants.updateRequest,
  });
  const success = (fields) => ({
    type: infoConstants.updateSucceeded,
    payload: { fields },
  });
  const failure = () => ({
    type: infoConstants.updateFailed,
  });
  return (dispatch) => {
    dispatch(request());
    return userDataService
      .updateUserInfo(fields)
      .then(() => dispatch(success(fields)))
      .catch(() => dispatch(failure));
  };
};

export const userActions = {
  getAllUserData,
};

export const infoActions = {
  //getUserInfo,
  updateUserInfo,
};

export const userReducer = combineReducers({
  info: infoReducer,
  orderHistory: historyReducer,
  favorites: favoritesReducer,
});
