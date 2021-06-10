import { Router } from "express";
import { authorize, validateRequest } from "../middleware/index.js";
import { ValidationError } from "../common/errorTypes.js";
import { userInfoSchema, authSchema } from "../common/schemas/index.js";
import { authService } from "../services/authService.js";

const authController = Router();

const authenticate = (req, res, next) => {
  const { login, password } = req.body;
  const ipAddress = req.ip;
  authService
    .authenticate({ login, password, ipAddress })
    .then(({ refreshToken, ...other }) => {
      setTokenCookie(res, refreshToken);
      res.json(other);
    })
    .catch(next);
};

const register = (req, res, next) => {
  const { login, password } = req.body;
  const ipAddress = req.ip;
  authService
    .register({ login, password, ipAddress })
    .then(() => {
      res.json({ message: "successfully registered" });
    })
    .catch(next);
};

const refreshToken = (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) return next(ValidationError("Token required"));
  const ipAddress = req.ip;
  authService
    .refreshToken({ token, ipAddress })
    .then(({ refreshToken, jwt }) => {
      setTokenCookie(res, refreshToken);
      res.json({ jwt });
    })
    .catch(next);
};

const revokeToken = (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) return next(ValidationError("Token required"));
  authService
    .revokeToken({ token })
    .then(() => res.json({ message: "Token revoked" }))
    .catch(next);
};

const setTokenCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    path: "/api/auth",
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  };
  res.cookie("refreshToken", token, cookieOptions);
};

authController.post(
  "/register",
  validateRequest(
    userInfoSchema
      .not("role", "id")
      .or("phone")
      .with("phone", ["first_name", "password"])
  ),
  register
);
authController.post("/authenticate", validateRequest(authSchema), authenticate);
authController.post("/refresh-token", refreshToken);
authController.post("/revoke-token", revokeToken);

export { authController };
