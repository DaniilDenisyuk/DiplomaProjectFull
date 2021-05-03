import adminAT from "../actionTypes/admin";

const initialState = {
  profiles: [],
  userId: null,
  isLoading: false,
};

const watchedUser = (state = initialState, action) => {
  switch (action.type) {
    case adminAT.GET_USER_PROFILES_REQUEST: {
      return {
        isLoading: true,
      };
    }
    case adminAT.GET_USER_PROFILES_SUCCESS: {
      return {
        profiles: action.profiles,
        userId: action.userId,
      };
    }
    case adminAT.GET_USER_PROFILES_FAILURE: {
      return {
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default watchedUser;
