import usersAT from "../actionTypes/user";

const initialState = {
  list: [],
  isLoading: false,
};

const profiles = (state = initialState, action) => {
  switch (action.type) {
    case usersAT.GET_ALL_PROFILES_REQUEST: {
      return {
        isLoading: true,
      };
    }
    case usersAT.GET_ALL_PROFILES_SUCCESS: {
      return {
        list: action.profiles,
      };
    }
    case usersAT.GET_ALL_PROFILES_FAILURE: {
      return {
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default profiles;
