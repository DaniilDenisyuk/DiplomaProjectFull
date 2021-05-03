import adminAT from "../actionTypes/admin";
import { messageActions } from "./message";
import { adminService } from "../../services";
const { addError } = messageActions;

const getAllUsers = (token) => {
  const request = () => {
    return { type: adminAT.GET_ALL_USERS_REQUEST };
  };
  const success = (users) => {
    return { type: adminAT.GET_ALL_USERS_SUCCESS, users };
  };
  const failure = () => {
    return { type: adminAT.GET_ALL_USERS_FAILURE };
  };

  return (dispatch) => {
    dispatch(request());
    adminService.getAllUsers(token).then(
      (users) => dispatch(success(users)),
      (error) => {
        dispatch(failure());
        dispatch(addError(error));
      }
    );
  };
};

const getUserProfiles = (token, userId) => (dispatch) => {
  const request = () => {
    return { type: adminAT.GET_USER_PROFILES_REQUEST };
  };
  const success = (profiles, userId) => {
    return { type: adminAT.GET_USER_PROFILES_SUCCESS, profiles, userId };
  };
  const failure = () => {
    return { type: adminAT.GET_USER_PROFILES_FAILURE };
  };

  return (dispatch) => {
    dispatch(request());
    adminService.getUserProfiles(token, userId).then(
      (profiles) => dispatch(success(profiles, userId)),
      (error) => {
        dispatch(failure());
        dispatch(addError(error));
      }
    );
  };
};

const getDashboard = (token) => (dispatch) => {
  const request = () => {
    return { type: adminAT.GET_DASHBOARD_REQUEST };
  };
  const success = (dashboard) => {
    return { type: adminAT.GET_DASHBOARD_SUCCESS, dashboard };
  };
  const failure = () => {
    return { type: adminAT.GET_DASHBOARD_FAILURE };
  };
  dispatch(request());
  return adminService.getDashboard(token).then(
    (dashboard) => dispatch(success(dashboard)),
    (error) => {
      dispatch(failure());
      dispatch(addError(error));
    }
  );
};

const createUserProfile = (token, userId, profile) => {
  const success = (userId, profile) => {
    return { type: adminAT.CREATE_USER_PROFILE, profile, userId };
  };
  return (dispatch) => {
    adminService.createUserProfile(token, userId, profile).then(
      (newProfile) => {
        dispatch(success(userId, newProfile));
      },
      (error) => {
        dispatch(addError(error));
      }
    );
  };
};

const updateUserProfile = (token, userId, profileId, profile) => {
  const success = (profile) => {
    return { type: adminAT.UPDATE_USER_PROFILE, userId, profileId, profile };
  };
  return (dispatch) => {
    adminService.updateUserProfile(token, userId, profileId, profile).then(
      (updatedProfile) => {
        dispatch(success(updatedProfile));
      },
      (error) => {
        dispatch(addError(error));
      }
    );
  };
};

const deleteUserProfile = (token, userId, profileId) => {
  const success = () => {
    return { type: adminAT.DELETE_USER_PROFILE, userId, profileId };
  };
  return (dispatch) => {
    adminService.deleteUserProfile(token, userId, profileId).then(
      () => {
        dispatch(success());
      },
      (error) => {
        dispatch(addError(error));
      }
    );
  };
};

const deleteUser = (token, userId) => {
  const success = () => {
    return { type: adminAT.DELETE_USER, userId };
  };
  return (dispatch) => {
    adminService.deleteUser(token, userId).then(
      () => {
        dispatch(success());
      },
      (error) => {
        dispatch(addError(error));
      }
    );
  };
};

const updateUser = (token, userId, user) => {
  const success = (user) => {
    return { type: adminAT.UPDATE_USER, userId, user };
  };
  return (dispatch) => {
    adminService.updateUser(token, userId, user).then(
      () => {
        dispatch(success());
      },
      (error) => {
        dispatch(addError(error));
      }
    );
  };
};

export const adminActions = {
  getDashboard,
  getUserProfiles,
  getAllUsers,
  createUserProfile,
  updateUserProfile,
  updateUser,
  deleteUserProfile,
  deleteUser,
};
