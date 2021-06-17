import { menuService } from "../../services/menuService";

const initialState = {
  isSucceeded: false,
  isLoading: false,
  isFailed: false,
  items: [],
  itemsIdAndCategory: [],
};

export const menuConstants = {
  getRequest: "auth/getMenuRequest",
  getSucceeded: "auth/getMenuSucceeded",
  getFailed: "auth/getMenuFailed",
};

const getMenu = () => {
  const request = () => ({
    type: menuConstants.getRequest,
  });
  const success = (items) => ({
    type: menuConstants.getSucceeded,
    payload: { items },
  });
  const failure = () => ({
    type: menuConstants.getFailed,
  });

  return (dispatch) => {
    dispatch(request());
    return menuService
      .getAvailableMenu()
      .then((items) => {
        dispatch(success(items));
      })
      .catch((e) => dispatch(failure()));
  };
};

export const menuActions = {
  getMenu,
};

export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case menuConstants.getSucceeded: {
      const { items } = action.payload;
      const itemsIdAndCategory = items.map((item) => ({
        id: item.id,
        category: item.category,
      }));
      return {
        ...state,
        isSucceeded: true,
        items,
        itemsIdAndCategory,
      };
    }
    case menuConstants.getRequest: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case menuConstants.getFailed: {
      return {
        ...state,
        isFailed: true,
      };
    }
    default:
      return state;
  }
};
