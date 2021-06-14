import jwt_decode from "jwt-decode";
import axios from "axios";
import handleResponse from "./helpers/handleResponse";

export const authService = (function () {
  let jwt = null;

  const getJwt = () => jwt;

  const register = (user) => {
    return axios.post("/auth/register", user).then(handleResponse);
  };

  const login = async (login, password) => {
    return axios
      .post("/auth/authenticate", { login, password })
      .then(handleResponse)
      .then(({ user, jwt: newJwt }) => {
        jwt = newJwt;
        const { id, username, exp, role } = jwt_decode(newJwt);
        for (const key of user) {
          localStorage.setItem(key, user);
        }
        return { user, auth: { id, username, exp, role }, isLoggedIn: true };
      });
  };

  const logout = async () => {
    jwt = null;
    localStorage.clear();
    return axios.post("/auth/revoke-token").then(handleResponse);
  };

  const refreshToken = async () => {
    return axios({
      method: "post",
      url: "/auth/refresh-token",
    })
      .then(handleResponse)
      .then(({ jwt: newJwt }) => {
        jwt = newJwt;
        const { id, username, exp, role } = jwt_decode(jwt);
        return { auth: { id, username, exp, role } };
      });
  };
  return {
    getJwt,
    register,
    login,
    logout,
    refreshToken,
  };
})();

export default authService;
