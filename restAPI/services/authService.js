import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { promisify } from "util";
import redis from "redis";
import dotenv from "dotenv";
import { usersService } from "./usersService.js";
import { UnathorizedError, ValidationError } from "../common/errorTypes.js";

dotenv.config();

const jwt = { sign: jsonwebtoken.sign, verify: promisify(jsonwebtoken.verify) };

const redisClient = redis.createClient();

const Redis = {
  get: promisify(redisClient.get.bind(redisClient)),
  set: promisify(redisClient.set.bind(redisClient)),
  exists: promisify(redisClient.exists.bind(redisClient)),
};

const authenticate = async ({ login, password, ipAddress }) => {
  const user = await usersService.getUserByLogin(login);
  if (!user || !bcrypt.compare(password, user.password)) {
    throw ValidationError("Username or password is incorrect");
  }

  const jwToken = generateJwtToken(
    user.id,
    user.username || user.email,
    user.role,
    ipAddress
  );
  const refreshToken = generateRefreshToken(
    user.id,
    user.username || user.email,
    user.role,
    ipAddress
  );

  return {
    ...basicFields(user),
    jwt: jwToken,
    refreshToken,
  };
};

const refreshToken = async ({ token, ipAddress }) => {
  const basicInfo = await verifyRefreshToken(token);
  const newRefreshToken = generateRefreshToken(
    basicInfo.id,
    basicInfo.username,
    basicInfo.role,
    ipAddress
  );

  const jwToken = generateJwtToken(
    basicInfo.id,
    basicInfo.username,
    basicInfo.role,
    ipAddress
  );

  return {
    ...basicFields(basicInfo),
    jwt: jwToken,
    refreshToken: newRefreshToken,
  };
};

const revokeToken = async ({ token }) => {
  const refreshToken = await verifyRefreshToken(token);
  const expiry = refreshToken.exp - Math.floor(Date.now() / 1000);
  await Redis.set(refreshToken.jti, true, "EX", expiry);
};

const verifyToken = async (token) =>
  await jwt.verify(token, process.env.TOKEN_SECRET);

const verifyRefreshToken = async (token) => {
  const refreshToken = await jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET
  );
  if (await Redis.exists(refreshToken.jti)) {
    throw UnathorizedError("Token revoked");
  }
  return refreshToken;
};

const generateJwtToken = (userId, userName, userRole, ipAddress) =>
  jwt.sign(
    { sub: userId, id: userId, username: userName, role: userRole, ipAddress },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "10m",
    }
  );

const generateRefreshToken = (userId, userName, userRole, ipAddress) =>
  jwt.sign(
    { sub: userId, id: userId, username: userName, role: userRole, ipAddress },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "30d",
      jwtid: randomString(),
    }
  );

const randomString = () => {
  return crypto.randomBytes(64).toString("hex");
};

const basicFields = (user) => ({
  id: user.id,
  username: user.username || user.email,
  role: user.role,
});

export const authService = {
  verifyToken,
  verifyRefreshToken,
  authenticate,
  refreshToken,
  revokeToken,
};
