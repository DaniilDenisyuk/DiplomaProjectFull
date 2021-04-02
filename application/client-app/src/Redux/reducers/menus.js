import * as ActionTypes from "./ActionTypes";

export const menus = (
  state = {
    errMess: null,
    comments: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_ITEMS:
      var comment = action.payload;
      return { ...state, comments: state.comments.concat(comment) };
    case ActionTypes.ADD_COMMENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        comments: action.payload,
      };
    case ActionTypes.COMMENTS_FAILED:
      return { ...state, isLoading: true, errMess: null, comments: [] };
    default:
      return state;
  }
};
