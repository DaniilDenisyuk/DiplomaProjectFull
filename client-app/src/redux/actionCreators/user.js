import usersAT from "../actionTypes/user";
import { userService, authService } from "../../services";
import { messagesActions } from "./message";
const { addError, addInfo, addSuccess } = messagesActions;

const login = (email, password) => (dispatch) => {
  const request = (user) => {
    return { type: usersAT.LOGIN_REQUEST, user };
  };
  const success = (user) => {
    return { type: usersAT.LOGIN_SUCCESS, user };
  };
  const failure = () => {
    return { type: usersAT.LOGIN_FAILURE };
  };

  dispatch(request(email));

  return authService.login(email, password).then(
    (user) => {
      dispatch(success(user));
    },
    (error) => {
      dispatch(failure());
      dispatch(addError(error));
    }
  );
};

const register = (userInfo) => (dispatch) => {
  const request = () => {
    return { type: usersAT.REGISTER_REQUEST };
  };
  const success = () => {
    return { type: usersAT.REGISTER_SUCCESS };
  };
  const failure = () => {
    return { type: usersAT.REGISTER_FAILURE };
  };

  dispatch(request());

  return authService.register(userInfo).then(
    () => {
      dispatch(success());
      dispatch(addSuccess("Succesfully registered"));
    },
    (error) => {
      dispatch(failure());
      dispatch(addError(error));
    }
  );
};

const logout = (token) => (dispatch) => {
  return authService.logout(token).then(
    () => {
      dispatch({ type: usersAT.LOGOUT });
      dispatch(addInfo("Logged out"));
    },
    (error) => {
      dispatch(addError(error));
    }
  );
};

const refreshToken = (user) => (dispatch) => {
  const request = (user) => {
    return { type: usersAT.LOGIN_REQUEST, user };
  };
  const success = (user) => {
    return { type: usersAT.LOGIN_SUCCESS, user };
  };
  const failure = () => {
    return { type: usersAT.LOGIN_FAILURE };
  };
  dispatch(request(user));
  return usersProfilesService.refreshToken().then(
    (freshUser) => {
      dispatch(success(freshUser));
      dispatch(addInfo("Token refreshed"));
    },
    (error) => {
      dispatch(failure());
      dispatch(addError(error));
    }
  );
};

const fetchProfiles = (userId, token) => {
  const request = () => {
    return { type: usersAT.GET_ALL_PROFILES_REQUEST };
  };
  const success = (profiles) => {
    return { type: usersAT.GET_ALL_PROFILES_SUCCESS, profiles, userId };
  };
  const failure = () => {
    return { type: usersAT.GET_ALL_PROFILES_FAILURE };
  };
  return (dispatch) => {
    dispatch(request());
    usersProfilesService.getAllProfiles(userId, token).then(
      (profiles) => {
        dispatch(success(profiles));
      },
      (error) => {
        dispatch(failure());
        dispatch(addError(error));
      }
    );
  };
};

const createProfile = (userId, token) => {
  const request = () => {
    return { type: usersAT.GET_ALL_PROFILES_REQUEST };
  };
  const success = (profiles) => {
    return { type: usersAT.GET_ALL_PROFILES_SUCCESS, profiles, userId };
  };
  const failure = () => {
    return { type: usersAT.GET_ALL_PROFILES_FAILURE };
  };
  return (dispatch) => {
    dispatch(request());
    usersProfilesService.getAllProfiles(userId, token).then(
      (profiles) => {
        dispatch(success(profiles));
      },
      (error) => {
        dispatch(failure());
        dispatch(addError(error));
      }
    );
  };
};

const updateProfile = (userId, token) => {
  const request = () => {
    return { type: usersAT.GET_ALL_PROFILES_REQUEST };
  };
  const success = (profiles) => {
    return { type: usersAT.GET_ALL_PROFILES_SUCCESS, profiles, userId };
  };
  const failure = () => {
    return { type: usersAT.GET_ALL_PROFILES_FAILURE };
  };
  return (dispatch) => {
    dispatch(request());
    usersProfilesService.getAllProfiles(userId, token).then(
      (profiles) => {
        dispatch(success(profiles));
      },
      (error) => {
        dispatch(failure());
        dispatch(addError(error));
      }
    );
  };
};

const deleteProfile = (userId, token) => {
  const request = () => {
    return { type: usersAT.GET_ALL_PROFILES_REQUEST };
  };
  const success = (profiles) => {
    return { type: usersAT.GET_ALL_PROFILES_SUCCESS, profiles, userId };
  };
  const failure = () => {
    return { type: usersAT.GET_ALL_PROFILES_FAILURE };
  };
  return (dispatch) => {
    dispatch(request());
    usersProfilesService.getAllProfiles(userId, token).then(
      (profiles) => {
        dispatch(success(profiles));
      },
      (error) => {
        dispatch(failure());
        dispatch(addError(error));
      }
    );
  };
};

export const userActions = {
  fetchProfiles,
  createProfile,
  deleteProfile,
  updateProfile,
  login,
  logout,
  refreshToken,
  register,
};
