import { API_URL } from "./helpers/apiUrl";
import tokenHeader from "./helpers/tokenHeader";
import handleResponse from "./helpers/handleResponse";

const login = async (login, password) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({ login, password }),
  };

  return fetch(`${API_URL}/auth/authenticate`, requestOptions).then(
    handleResponse
  );
};

const logout = async (token) => {
  if (!token) return;
  const requestOptions = {
    method: "POST",
    headers: tokenHeader(token),
  };
  return fetch(`${API_URL}/auth/revoke-token`, requestOptions).then(
    handleResponse
  );
};

const refreshToken = async (token = "") => {
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
  logout,
  refreshToken,
};
