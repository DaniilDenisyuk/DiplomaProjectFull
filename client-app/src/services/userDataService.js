import axios from "./helpers/axiosWIthJwtInterceptor";
import handleResponse from "./helpers/handleResponse";

const getUserOrders = async () => {
  return axios.get("/user-data/orders").then(handleResponse);
};

const getAllUserData = async () => {
  return axios.get("/user-data").then(handleResponse);
};

const addItemToFavorites = async (itemId) => {
  return axios.post(`/user-data/favorites/${itemId}`).then(handleResponse);
};

const removeItemToFavorites = async (itemId) => {
  return axios.delete(`/user-data/favorites/${itemId}`).then(handleResponse);
};

const getUserFavorites = async () => {
  return axios.delete("/user-data/favorites").then(handleResponse);
};

const updateUserInfo = async (updatedFields) => {
  return axios.put("/user-data/info", updatedFields).then(handleResponse);
};

export const userDataService = {
  getUserFavorites,
  addItemToFavorites,
  removeItemToFavorites,
  getUserOrders,
  getAllUserData,
  updateUserInfo,
};
