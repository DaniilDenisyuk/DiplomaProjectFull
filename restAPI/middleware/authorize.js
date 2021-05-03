import jwt from "express-jwt";
import { UnathorizedError, ForbiddenError } from "../common/errorTypes.js";

export const authorize = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }
  return [
    jwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] }),
    (req, res, next) => {
      if (!req.user) {
        return next(UnathorizedError("Unauthorized"));
      }
      if (roles.length && !roles.includes(req.user.role)) {
        return next(ForbiddenError("Forbidden"));
      }
      next();
    },
  ];
};
