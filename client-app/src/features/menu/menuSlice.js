import { menuService } from "../../services/menuService";
import { DRINKS } from "../../common/fakeDB/drinks";
import { SETS } from "../../common/fakeDB/sets";
import { SUSHI } from "../../common/fakeDB/sushi";
import { ROLLS } from "../../common/fakeDB/rolls";

const initialState = {
  isLoading: false,
  isFailed: false,
  items: [...DRINKS, ...SETS, ...SUSHI, ...ROLLS],
  itemsIdAndCategory: [
    ...[...DRINKS, ...SETS, ...SUSHI, ...ROLLS].map((item) => ({
      id: item.id,
      category: item.category,
    })),
  ],
};

export const menuConstants = {
  getRequest: "auth/getMenuRequest",
  getSucceed: "auth/getMenuSucceed",
  getFailed: "auth/getMenuFailed",
};

const getMenu = () => {
  const request = () => ({
    type: menuConstants.getRequest,
  });
  const success = (items) => ({
    type: menuConstants.getSucceed,
    payload: { items },
  });
  const failure = () => ({
    type: menuConstants.getFailed,
  });

  return (dispatch) => {
    dispatch(request());
    return menuService
      .getMenu()
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
    case menuConstants.getSucceed: {
      const { items } = action.payload;
      return {
        items,
      };
    }
    case menuConstants.getRequest: {
      return {
        isLoading: true,
      };
    }
    case menuConstants.getFailed: {
      return {
        isFailed: true,
      };
    }
    default:
      return state;
  }
};
