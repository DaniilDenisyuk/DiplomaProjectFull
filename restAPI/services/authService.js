import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { promisify } from "util";
import redis from "redis";
import usersService from "./usersService.js";
import { UnathorizedError, ValidationError } from "../common/errorTypes.js";

const jwt = { sign: jsonwebtoken.sign, verify: promisify(jsonwebtoken.verify) };

const redisClient = redis.createClient();

const Redis = {
  get: promisify(redisClient.get.bind(redisClient)),
  set: promisify(redisClient.set.bind(redisClient)),
  exists: promisify(redisClient.exists.bind(redisClient)),
};

const register = async ({ name, phone, password }) => {
  await usersService.createUser({
    name,
    phone,
    password: bcrypt.hashSync(password, 10),
  });
  return true;
};

const authenticate = async ({ login, password, ipAddress }) => {
  const user = await usersService.getUserInfoByLogin(login);
  if (
    !user ||
    !bcrypt.compare(password, user.password) ||
    password != user.password
  ) {
    throw ValidationError("Username or password is incorrect");
  }

  const jwt = generateJwtToken(
    user.id,
    user.username || user.email,
    user.role,
    Math.floor(Date.now() / 1000) + 60 * 10, //10mins
    ipAddress
  );
  const refreshToken = generateRefreshToken(
    user.id,
    user.username || user.email,
    user.role,
    ipAddress
  );
  delete user.password;

  return {
    user,
    jwt,
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
    Math.floor(Date.now() / 1000) + 60 * 10,
    ipAddress
  );

  return {
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

const generateJwtToken = (userId, userName, userRole, expiresIn, ipAddress) =>
  jwt.sign(
    {
      sub: userId,
      id: userId,
      username: userName,
      exp: expiresIn,
      role: userRole,
      ipAddress,
    },
    process.env.TOKEN_SECRET
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
  register,
  verifyToken,
  verifyRefreshToken,
  authenticate,
  refreshToken,
  revokeToken,
};
