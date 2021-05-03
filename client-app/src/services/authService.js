import { API_URL } from "../shared/apiUrl";
import tokenHeader from "../helpers/tokenHeader";
import handleResponse from "../helpers/handleResponse";

const login = (login, password) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({ login, password }),
  };

  return fetch(`${API_URL}/auth/authenticate`, requestOptions).then(
    handleResponse
  );
};

const register = (userInfo) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(userInfo),
  };
  return fetch(`${API_URL}/auth/register`, requestOptions).then(handleResponse);
};

const logout = (token) => {
  if (!token) return;
  const requestOptions = {
    method: "POST",
    headers: tokenHeader(token),
  };
  return fetch(`${API_URL}/auth/revoke-token`, requestOptions).then(
    handleResponse
  );
};

const refreshToken = (token) => {
  const requestOptions = {
    method: "POST",
    headers: tokenHeader(token),
  };
  return fetch(`${API_URL}/auth/refresh-token`, requestOptions).then(
    handleResponse
  );
};

export const authService = {
  login,
  register,
  logout,
  refreshToken,
};
