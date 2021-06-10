import { API_URL } from "./helpers/apiUrl";
import tokenHeader from "./helpers/tokenHeader";
import handleResponse from "./helpers/handleResponse";

const createOrder = async (orderFields) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(orderFields),
    credentials: "include",
  };
  return fetch(`${API_URL}/orders`, requestOptions).then(handleResponse);
};

const getAllOrders = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: tokenHeader(token),
    credentials: "include",
  };
  return fetch(`${API_URL}/orders`, requestOptions).then(handleResponse);
};

const getPendingOrders = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: tokenHeader(token),
    credentials: "include",
  };
  return fetch(`${API_URL}/orders/pending`, requestOptions).then(
    handleResponse
  );
};

const updateOrderStatus = async (token, orderId, status) => {
  const requestOptions = {
    method: "PUT",
    headers: tokenHeader(token),
    body: JSON.stringify({ status }),
    credentials: "include",
  };
  return fetch(`${API_URL}/orders/${orderId}`, requestOptions).then(
    handleResponse
  );
};

export const ordersService = {
  createOrder,
  getAllOrders,
  getPendingOrders,
  updateOrderStatus,
};
