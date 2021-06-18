import { authService } from "../../services/authService";

const initialState = {
  isFailed: false,
  isLoggingIn: false,
  isLoggedIn: false,
  id: "",
  username: "",
  exp: "",
  role: "",
};

export const authConstants = {
  loginRequest: "auth/loginRequest",
  loginSucceeded: "auth/loginSucceeded",
  loginFailed: "auth/loginFailed",
  refreshTokenRequest: "auth/refreshTokenRequest",
  refreshTokenSucceeded: "auth/refreshTokenSucceeded",
  refreshTokenFailed: "auth/refreshTokenFailed",
  logout: "auth/logout",
};

const login = (login, password) => {
  const request = () => ({
    type: authConstants.loginRequest,
  });
  const success = (auth) => ({
    type: authConstants.loginSucceeded,
    payload: { auth },
  });
  const failure = () => ({
    type: authConstants.loginFailed,
  });
  return (dispatch) => {
    dispatch(request());
    return authService
      .login(login, password)
      .then((auth) => {
        dispatch(success(auth));
      })
      .catch((e) => {
        dispatch(failure());
      });
  };
};

const refreshToken = () => {
  const request = () => ({
    type: authConstants.refreshTokenRequest,
  });
  const success = (auth) => ({
    type: authConstants.refreshTokenSucceeded,
    payload: { auth },
  });
  const failure = () => ({
    type: authConstants.refreshTokenFailed,
  });

  return (dispatch) => {
    dispatch(request());
    return authService
      .refreshToken()
      .then((auth) => {
        dispatch(success(auth));
      })
      .catch((e) => dispatch(failure()));
  };
};

const logout = () => {
  const success = () => ({
    type: authConstants.logout,
  });
  return (dispatch) => {
    dispatch(success());
    return authService
      .logout()
      .then(() => {})
      .catch((e) => {});
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
    case authConstants.loginSucceeded: {
      const { auth } = action.payload;
      return {
        isLoggedIn: true,
        id: auth.id,
        username: auth.username,
        exp: auth.exp,
        role: auth.role,
      };
    }
    case authConstants.loginFailed:
      return {
        isFailed: true,
      };
    case authConstants.logout:
      return {
        isLoggedIn: false,
      };
    case authConstants.refreshTokenRequest:
      return {
        isLoggingIn: true,
      };
    case authConstants.refreshTokenSucceeded: {
      const { auth } = action.payload;
      return {
        isLoggedIn: true,
        id: auth.id,
        username: auth.username,
        exp: auth.exp,
        role: auth.role,
      };
    }
    case authConstants.refreshTokenFailed:
      return {};
    default:
      return state;
  }
};
