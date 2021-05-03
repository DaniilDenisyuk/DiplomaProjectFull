import { API_URL } from "../shared/apiUrl";
import tokenHeader from "../helpers/tokenHeader";
import handleResponse from "../helpers/handleResponse";

const getAllMovies = (token) => {
  if (!token) return;
  const requestOptions = {
    method: "GET",
    headers: tokenHeader(token),
  };
  return fetch(`${API_URL}/movies`, requestOptions).then(handleResponse);
};

const getAllProfiles = (token, userId) => {
  if (!token) return;
  const requestOptions = {
    method: "GET",
    headers: tokenHeader(token),
  };
  return fetch(`${API_URL}/users/${userId}/profiles`, requestOptions).then(
    handleResponse
  );
};

const updateProfile = (token, userId, profileId, profile) => {
  if (!token) return;
  const requestOptions = {
    method: "PUT",
    headers: tokenHeader(token),
    body: JSON.stringify(profile),
  };
  return fetch(
    `${API_URL}/users/${userId}/profiles/${profileId}`,
    requestOptions
  ).then(handleResponse);
};

const createProfile = (token, userId, profile) => {
  if (!token) return;
  const requestOptions = {
    method: "POST",
    headers: tokenHeader(token),
    body: JSON.stringify(profile),
  };
  return fetch(`${API_URL}/users/${userId}/profiles`, requestOptions).then(
    handleResponse
  );
};

const deleteProfile = (token, userId, profileId) => {
  if (!token) return;
  const requestOptions = {
    method: "DELETE",
    headers: tokenHeader(token),
  };
  return fetch(
    `${API_URL}/users/${userId}/profiles/${profileId}`,
    requestOptions
  ).then(handleResponse);
};

const updateUser = (token, userId, user) => {
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

export const userService = {
  getAllMovies,
  getAllProfiles,
  createProfile,
  updateUser,
  updateProfile,
  deleteUser,
  deleteProfile,
};
