import { API_URL } from "./helpers/apiUrl";
import handleResponse from "./helpers/handleResponse";

const getMenu = async () => {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`${API_URL}/menu`, requestOptions).then(handleResponse);
};

export const menuService = {
  getMenu,
};
