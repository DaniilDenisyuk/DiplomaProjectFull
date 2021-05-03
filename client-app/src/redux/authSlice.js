import { authService } from "../services/authService";

const initialState = {
  isLoggingIn: false,
  isLoggedIn: false,
  id: "",
  username: "",
  jwt: "",
  role: "",
};

export const authConstants = {
  loginRequest: "auth/loginRequest",
  loginSucceed: "auth/loginSucceed",
  loginFailed: "auth/loginFailed",
  refreshTokenRequest: "auth/refreshTokenRequest",
  refreshTokenSucceed: "auth/refreshTokenSucceed",
  refreshTokenFailed: "auth/refreshTokenFailed",
  logout: "auth/logout",
};

const login = (login, password) => {
  const request = () => ({
    type: authConstants.loginRequest,
  });
  const success = (user) => ({
    type: authConstants.loginSucceed,
    user,
  });
  const failure = () => ({
    type: authConstants.loginFailed,
  });

  return (dispatch) => {
    dispatch(request());
    return authService
      .login(login, password)
      .then((user) => {
        dispatch(success(user));
      })
      .catch((e) => dispatch(failure()));
  };
};

const refreshToken = () => {
  const request = () => ({
    type: authConstants.refreshTokenRequest,
  });
  const success = (user) => ({
    type: authConstants.refreshTokenSucceed,
    user,
  });
  const failure = () => ({
    type: authConstants.refreshTokenFailed,
  });

  return (dispatch) => {
    dispatch(request());
    return authService
      .refreshToken()
      .then((user) => {
        dispatch(success(user));
      })
      .catch((e) => dispatch(failure()));
  };
};

const logout = (token) => {
  const request = () => ({
    type: authConstants.logout,
  });

  return (dispatch) => {
    dispatch(request());
    return authService.logout().catch((e) => {});
  };
};

export const authActions = {
  login,
  refreshToken,
  logout,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.loginRequest:
      return {
        isLoggingIn: true,
      };
    case authConstants.loginSucceed: {
      const { user } = action;
      return {
        isLoggedIn: true,
        id: user.id,
        username: user.username,
        jwt: user.jwt,
        role: user.role,
      };
    }
    case authConstants.loginFailed:
      return {};
    case authConstants.logout:
      return {};
    case authConstants.refreshTokenRequest:
      return {
        isLoggingIn: true,
      };
    case authConstants.refreshTokenSucceed: {
      const { user } = action;
      return {
        isLoggedIn: true,
        id: user.id,
        username: user.username,
        jwt: user.jwt,
        role: user.role,
      };
    }
    case authConstants.refreshTokenFailed:
      return {};
    default:
      return state;
  }
};
