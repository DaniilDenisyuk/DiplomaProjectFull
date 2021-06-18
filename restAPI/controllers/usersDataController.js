import { Router } from "express";
import { authorize, validateRequest } from "../middleware/index.js";
import ROLES from "../common/roles.js";
import { ValidationError } from "../common/errorTypes.js";
import { userInfoSchema, updatePwdSchema } from "../common/schemas/index.js";
import {
  authService,
  menuService,
  ordersService,
  usersService,
} from "../services/index.js";

const usersDataController = Router();

const getAllUserData = (req, res, next) => {
  const { id: userId } = req.user;
  usersService
    .getAllUserData(userId)
    .then((data) => res.json(data))
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  const { id: userId } = req.user;
  usersService
    .getUserInfoById(userId)
    .then((info) => res.json(info))
    .catch(next);
};

const getUserOrders = (req, res, next) => {
  const { id: userId } = req.user;
  ordersService
    .getUserOrders(userId)
    .then((orders) => res.json(orders))
    .catch(next);
};

const getUserFavorites = (req, res, next) => {
  const { id: userId } = req.user;
  menuService
    .getUserFavorites(userId)
    .then((favorites) => res.json(favorites))
    .catch(next);
};

const addItemToFavorites = (req, res, next) => {
  const { id: userId } = req.user;
  const { id: itemId } = req.params;
  menuService
    .addItemToUserFavorites(userId, itemId)
    .then(() => res.status(200).end())
    .catch(next);
};

const removeItemFromFavorites = (req, res, next) => {
  const { id: userId } = req.user;
  const { id: itemId } = req.params;
  menuService
    .removeItemFromUserFavorites(userId, itemId)
    .then(() => res.status(200).end())
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { id: userId } = req.user;
  const fields = req.body;
  usersService
    .updateUserInfo(userId, fields)
    .then(() => res.status(200).end())
    .catch(next);
};

const updateUserPassword = async (req, res, next) => {
  const { id: userId } = req.user;
  const { oldPwd, newPwd } = req.body;
  const { password } = await usersService.getUserInfoById(userId);
  const isEqualPwd = await authService.comparePasswords(oldPwd, password);
  if (!isEqualPwd) next(ValidationError("passwords are not equal"));
  const hash = authService.hashPassword(newPwd);
  usersService
    .updateUserInfo(userId, { password: hash })
    .then(() => res.status(200).end())
    .catch(next);
};

usersDataController.use(authorize(ROLES.user));

usersDataController.get("/", getAllUserData);
usersDataController.get("/orders", getUserOrders);
usersDataController.get("/favorites", getUserFavorites);
usersDataController.put(
  "/password",
  validateRequest(updatePwdSchema),
  updateUserPassword
);
usersDataController.put(
  "/info",
  validateRequest(userInfoSchema),
  updateUserInfo
);
usersDataController.post("/favorites/:id", addItemToFavorites);
usersDataController.delete("/favorites/:id", removeItemFromFavorites);

export { usersDataController };
