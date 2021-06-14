import axios from "axios";
import authService from "authService";

const instance = axios.create();

instance.interceptors.request.use((config) => {
  const jwt = authService.getJwt();
  if (jwt) {
    config.headers["Authorization"] = `Bearer ${jwt}`;
    config.withCredentials = true;
  }
  return config;
});

export default instance;
