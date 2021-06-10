import { userDataService } from "../../../services/userDataService";

const historyState = {
  isLoading: false,
  isSucceeded: false,
  isFailed: false,
  history: [],
};

export const historyConstants = {
  getRequest: "user/history/getRequest",
  getSucceeded: "user/history/getSucceeded",
  getFailed: "user/history/getFailed",
};

export const historyReducer = (state = historyState, action) => {
  switch (action.type) {
    case historyConstants.getRequest: {
      return { ...state, isLoading: true };
    }
    case historyConstants.getSucceeded: {
      const { orders } = action.payload;
      return {
        ...state,
        isLoading: false,
        isFailed: false,
        isSucceeded: true,
        history: orders,
      };
    }
    case historyConstants.getFailed: {
      return {
        ...state,
        isFailed: true,
      };
    }
    default:
      return state;
  }
};

const getOrderHistory = (token) => {
  const request = () => ({
    type: historyConstants.getRequest,
  });
  const success = (orders) => ({
    type: historyConstants.getSucceeded,
    payload: { orders },
  });
  const failure = () => ({
    type: historyConstants.getFailed,
  });
  return (dispatch) => {
    dispatch(request());
    return userDataService
      .getUserOrders(token)
      .then((orders) => {
        dispatch(success(orders));
      })
      .catch(() => {
        dispatch(failure);
      });
  };
};

export const historyActions = { getOrderHistory };
