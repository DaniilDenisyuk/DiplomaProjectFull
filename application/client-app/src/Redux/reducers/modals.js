import { modalsAT } from "../actionTypes";

export const modals = (state = {}, action) => {
  switch (action.type) {
    case modalsAT.OPEN_MODAL:
      return {
        ...state,
        [action.payload]: true,
      };
    case modalsAT.CLOSE_MODAL:
      return {
        ...state,
        [action.payload]: false,
      };
    default:
      return state;
  }
};
