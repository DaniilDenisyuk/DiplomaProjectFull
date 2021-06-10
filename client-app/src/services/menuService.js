import { API_URL } from "./helpers/apiUrl";
import tokenHeader from "./helpers/tokenHeader";
import handleResponse from "./helpers/handleResponse";

const getMenu = async () => {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`${API_URL}/menu`, requestOptions).then(handleResponse);
};

const addItem = async (token) => {
  const requestOptions = {
    method: "POST",
    headers: tokenHeader(token),
    credentials: "include",
  };
  return fetch(`${API_URL}/menu`, requestOptions).then(handleResponse);
};

const updateItem = async (token, itemId, itemFields) => {
  const requestOptions = {
    method: "PUT",
    headers: tokenHeader(token),
    credentials: "include",
    body: JSON.stringify(itemFields),
  };
  return fetch(`${API_URL}/menu/${itemId}`, requestOptions).then(
    handleResponse
  );
};

const deleteItem = async (token, itemId) => {
  const requestOptions = {
    method: "DELETE",
    headers: tokenHeader(token),
    credentials: "include",
  };
  return fetch(`${API_URL}/menu/${itemId}`, requestOptions).then(
    handleResponse
  );
};

export const menuService = {
  getMenu,
  addItem,
  updateItem,
  deleteItem,
};
