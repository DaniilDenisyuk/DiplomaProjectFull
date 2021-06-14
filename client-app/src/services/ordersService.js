import axios from "./helpers/axiosWIthJwtInterceptor";
import handleResponse from "./helpers/handleResponse";
import directions from "../common/cursorDirections";

const createOrder = async (orderFields) => {
  return axios.post(`/orders`, orderFields).then(handleResponse);
};

const getOrders = async (
  cursor = { amount: 250, direction: directions.fwd, startId: 1 },
  filters
) => {
  return axios
    .get("/orders", {
      params: {
        ...cursor,
        ...filters,
      },
    })
    .then(handleResponse);
};

const getPendingOrders = async (cursor) => {
  return getOrders(cursor, { pending: true });
};

const updateOrderStatus = async (orderId, status) => {
  return axios
    .put(`/orders/${orderId}`, null, { params: { status } })
    .then(handleResponse);
};

export const ordersService = {
  createOrder,
  getOrders,
  getPendingOrders,
  updateOrderStatus,
};
