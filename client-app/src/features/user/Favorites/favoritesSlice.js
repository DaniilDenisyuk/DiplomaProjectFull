import { userDataService } from "../../../services/userDataService";
import { userConstants } from "../userSlice";

const favoritesState = {
  isLoading: false,
  isFailed: false,
  isSucceded: false,
  itemsId: [],
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

export const favoritesReducer = (state = favoritesState, action) => {
  switch (action.type) {
    case favoritesConstants.getRequest: {
      return { ...state, isLoading: true };
    }
    case userConstants.getAllSucceeded:
    case favoritesConstants.getSucceeded: {
      const { favorites } = action.payload;
      return {
        isSucceded: true,
        itemsId: favorites.map(({ item_id }) => item_id),
      };
    }
    case favoritesConstants.getFailed: {
      return { ...state, isFailed: true };
    }
    case favoritesConstants.addRequest: {
      return state;
    }
    case favoritesConstants.addSucceeded: {
      const { itemId } = action.payload;
      const { itemsId } = state;
      return { isSucceded: true, itemsId: itemsId.concat(itemId) };
    }
    case favoritesConstants.addFailed: {
      return state;
    }
    case favoritesConstants.deleteRequest: {
      return state;
    }
    case favoritesConstants.deleteSucceeded: {
      const { itemId } = action.payload;
      const { itemsId } = state;
      const index = itemsId.findIndex((id) => itemId === id);
      if (index >= 0) {
        itemsId.splice(index, 1);
      }
      return { isLoading: true, itemsId: [...itemsId] };
    }
    case favoritesConstants.deleteFailed: {
      return state;
    }
    default:
      return state;
  }
};

const getFavorites = (token) => {
  const request = () => ({
    type: favoritesConstants.getRequest,
  });
  const success = (favorites) => ({
    type: favoritesConstants.getSucceeded,
    payload: { favorites },
  });
  const failure = () => ({
    type: favoritesConstants.getFailed,
  });
  return (dispatch) => {
    dispatch(request());
    return userDataService
      .getUserFavorites(token)
      .then((favorites) => dispatch(success(favorites)))
      .catch(() => dispatch(failure()));
  };
};

const addToFavorites = (itemId) => {
  const request = () => ({
    type: favoritesConstants.getRequest,
  });
  const success = (itemId) => ({
    type: favoritesConstants.addSucceeded,
    payload: { itemId },
  });
  const failure = () => ({
    type: favoritesConstants.getFailed,
  });
  return (dispatch) => {
    dispatch(request());
    return userDataService
      .addItemToFavorites(itemId)
      .then(() => dispatch(success(itemId)))
      .catch(() => dispatch(failure()));
  };
};

const deleteFromFavorites = (itemId) => {
  const request = () => ({
    type: favoritesConstants.getRequest,
  });
  const success = (itemId) => ({
    type: favoritesConstants.deleteSucceeded,
    payload: { itemId },
  });
  const failure = () => ({
    type: favoritesConstants.getFailed,
  });
  return (dispatch) => {
    dispatch(request());
    return userDataService
      .removeItemToFavorites(itemId)
      .then(() => dispatch(success(itemId)))
      .catch(() => dispatch(failure));
  };
};

export const favoritesActions = {
  addToFavorites,
  getFavorites,
  deleteFromFavorites,
};
