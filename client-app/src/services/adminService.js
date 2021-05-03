import { API_URL } from "../shared/apiUrl";
import tokenHeader from "../helpers/tokenHeader";
import handleResponse from "../helpers/handleResponse";

const createMovie = (token, movie) => {
  if (!token) return;
  const requestOptions = {
    method: "POST",
    headers: tokenHeader(token),
    body: JSON.stringify(movie),
  };
  return fetch(`${API_URL}/admin/movies`, requestOptions).then(handleResponse);
};

const uploadMovies = (token, file) => {
  if (!token) return;
  const formData = new FormData();
  formData.append("file", file);
  const requestOptions = {
    method: "POST",
    headers: tokenHeader(token),
    body: formData,
  };
  return fetch(`${API_URL}/admin/movies/upload`, requestOptions).then(
    handleResponse
  );
};

const updateMovie = (token, movie) => {
  if (!token) return;
  const requestOptions = {
    method: "PUT",
    headers: tokenHeader(token),
    body: JSON.stringify(movie),
  };
  return fetch(`${API_URL}/admin/movies`, requestOptions).then(handleResponse);
};

const deleteMovie = (token, id) => {
  if (!token) return;
  const requestOptions = {
    method: "DELETE",
    headers: tokenHeader(token),
  };
  return fetch(`${API_URL}/admin/movies/${id}`, requestOptions).then(
    handleResponse
  );
};

const getDashboard = (token) => {
  if (!token) return;
  const requestOptions = {
    method: "GET",
    headers: tokenHeader(token),
  };
  return fetch(`${API_URL}/admin/dashboard`, requestOptions).then(
    handleResponse
  );
};

const getAllUsers = (token) => {
  if (!token) return;
  const requestOptions = {
    method: "GET",
    headers: tokenHeader(token),
  };
  return fetch(`${API_URL}/admin/users`, requestOptions).then(handleResponse);
};

const getUserProfiles = (token, userId) => {
  if (!token) return;
  const requestOptions = {
    method: "GET",
    headers: tokenHeader(token),
  };
  return fetch(
    `${API_URL}/admin/users/${userId}/profiles`,
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
  return fetch(`${API_URL}/admin/users/${userId}`, requestOptions).then(
    handleResponse
  );
};

const updateUserProfile = (token, userId, profileId, profile) => {
  if (!token) return;
  const requestOptions = {
    method: "PUT",
    headers: tokenHeader(token),
    body: JSON.stringify(profile),
  };
  return fetch(
    `${API_URL}/admin/users/${userId}/profiles/${profileId}`,
    requestOptions
  ).then(handleResponse);
};

const createUserProfile = (token, userId, profile) => {
  if (!token) return;
  const requestOptions = {
    method: "POST",
    headers: tokenHeader(token),
    body: JSON.stringify(profile),
  };
  return fetch(
    `${API_URL}/admin/users/${userId}/profiles`,
    requestOptions
  ).then(handleResponse);
};

const deleteUserProfile = (token, userId, profileId) => {
  if (!token) return;
  const requestOptions = {
    method: "DELETE",
    headers: tokenHeader(token),
  };
  return fetch(
    `${API_URL}/admin/users/${userId}/profiles/${profileId}`,
    requestOptions
  ).then(handleResponse);
};

const deleteUser = (token, userId) => {
  if (!token) return;
  const requestOptions = {
    method: "DELETE",
    headers: tokenHeader(token),
  };
  return fetch(`${API_URL}/admin/users/${userId}`, requestOptions).then(
    handleResponse
  );
};

export const adminService = {
  getAllUsers,
  getDashboard,
  getUserProfiles,
  createMovie,
  createMoviesFromFile: uploadMovies,
  createUserProfile,
  updateMovie,
  updateUser,
  updateUserProfile,
  deleteMovie,
  deleteUser,
  deleteUserProfile,
};
