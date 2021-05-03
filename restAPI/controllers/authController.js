import { Router } from "express";
import { authorize, validateRequest } from "../middleware/index.js";
import { ValidationError } from "../common/errorTypes.js";
import authSchema from "../common/schemas/auth.js";
import { authService } from "../services/authService.js";

const authController = Router();

const authenticate = (req, res, next) => {
  const { login, password } = req.body;
  const ipAddress = req.ip;
  authService
    .authenticate({ login, password, ipAddress })
    .then(({ refreshToken, ...user }) => {
      setTokenCookie(res, refreshToken);
      res.json(user);
    })
    .catch(next);
};

const refreshToken = (req, res, next) => {
  const token = req.body.refreshToken || req.cookies.refreshToken;
  const ipAddress = req.ip;
  authService
    .refreshToken({ token, ipAddress })
    .then(({ refreshToken, ...user }) => {
      setTokenCookie(res, refreshToken);
      res.json(user);
    })
    .catch(next);
};

const revokeToken = (req, res, next) => {
  const token = req.body.refreshToken || req.cookies.refreshToken;
  if (!token) return next(ValidationError("Token required"));
  authService
    .revokeToken({ token })
    .then(() => res.json({ message: "Token revoked" }))
    .catch(next);
};

const setTokenCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  };
  res.cookie("refreshToken", token, cookieOptions);
};

authController.post("/authenticate", validateRequest(authSchema), authenticate);
authController.post("/refresh-token", refreshToken);
authController.post("/revoke-token", authorize(), revokeToken);

export { authController };
