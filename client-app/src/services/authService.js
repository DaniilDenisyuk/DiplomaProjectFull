import jwt_decode from "jwt-decode";
import { API_URL } from "./helpers/apiUrl";
import handleResponse from "./helpers/handleResponse";

const register = (user) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(user),
  };
  return fetch(`${API_URL}/auth/register`, requestOptions).then(handleResponse);
};

const login = async (login, password) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ login, password }),
    credentials: "include",
  };

  return fetch(`${API_URL}/auth/authenticate`, requestOptions)
    .then(handleResponse)
    .then(({ user, jwt }) => {
      const { id, username, exp, role } = jwt_decode(jwt);
      return { user, auth: { id, username, exp, role }, jwt };
    });
};

const logout = async () => {
  const requestOptions = {
    method: "POST",
    credentials: "include",
  };
  return fetch(`${API_URL}/auth/revoke-token`, requestOptions).then(
    handleResponse
  );
};

const refreshToken = async () => {
  const requestOptions = {
    method: "POST",
    credentials: "include",
  };
  return fetch(`${API_URL}/auth/refresh-token`, requestOptions)
    .then(handleResponse)
    .then(({ jwt }) => {
      const { id, username, exp, role } = jwt_decode(jwt);
      return { auth: { id, username, exp, role }, jwt };
    });
};

export const authService = {
  register,
  login,
  logout,
  refreshToken,
};
