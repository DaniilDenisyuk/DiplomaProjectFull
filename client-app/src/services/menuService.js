import handleResponse from "./helpers/handleResponse";
import axios from "./helpers/axiosWIthJwtInterceptor";
import directions from "../common/cursorDirections";

const getAvailableMenu = async () => {
  return axios.get("/api/menu").then(handleResponse);
};

const getItems = async (
  cursor = { amount: 250, direction: directions.fwd, startId: 1 },
  filters
) => {
  return axios
    .get("/api/menu", { params: { ...cursor, ...filters } })
    .then(handleResponse);
};

const getItemsByCategory = async (category, cursor) => {
  return getItems(cursor, { category });
};

const addItem = async (itemFields) => {
  return axios.post("/api/menu", itemFields).then(handleResponse);
};

const updateItem = async (itemId, itemFields) => {
  return axios.post(`/api/menu/${itemId}`, itemFields).then(handleResponse);
};

const deleteItem = async (itemId) => {
  return axios.delete(`/api/menu/${itemId}`).then(handleResponse);
};

export const menuService = {
  getAvailableMenu,
  getItems,
  getItemsByCategory,
  addItem,
  updateItem,
  deleteItem,
};
