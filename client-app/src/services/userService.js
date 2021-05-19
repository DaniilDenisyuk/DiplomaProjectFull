import { API_URL } from "../shared/apiUrl";
import tokenHeader from "./helpers/tokenHeader";
import handleResponse from "./helpers/handleResponse";

const register = (user) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(user),
  };
  return fetch(`${API_URL}/users`, requestOptions).then(handleResponse);
};

const getUserData = async (token, userId) => {
  if (!token) return;
  const requestOptions = {
    method: "GET",
    headers: tokenHeader(token),
  };
  return fetch(`${API_URL}/users/${userId}`, requestOptions).then(
    handleResponse
  );
};

const updateUserData = async (token, userId, user) => {
  if (!token) return;
  const requestOptions = {
    method: "PUT",
    headers: tokenHeader(token),
    body: JSON.stringify(user),
  };
  return fetch(`${API_URL}/users/${userId}`, requestOptions).then(
    handleResponse
  );
};

const deleteUser = (token, userId) => {
  if (!token) return;
  const requestOptions = {
    method: "DELETE",
    headers: tokenHeader(token),
  };
  return fetch(`${API_URL}/users/${userId}`, requestOptions).then(
    handleResponse
  );
};
export const userService = { register, getUserData, updateUserData, deleteUser };
