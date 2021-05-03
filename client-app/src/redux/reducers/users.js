import usersAT from "../actionTypes/user";
const initialState = {
  list: [],
  isLoading: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case usersAT.GET_ALL_USERS_REQUEST: {
      return {
        isLoading: true,
      };
    }
    case usersAT.GET_ALL_USERS_SUCCESS:
      return {
        list: action.users,
      };

    case usersAT.GET_ALL_USERS_FAILURE: {
      return {
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default users;
