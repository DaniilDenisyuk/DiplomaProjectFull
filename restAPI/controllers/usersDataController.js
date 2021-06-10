import { Router } from "express";
import { authorize, validateRequest } from "../middleware/index.js";
import ROLES from "../common/roles.js";
import { userInfoSchema } from "../common/schemas/index.js";
import { menuService, ordersService, usersService } from "../services/index.js";

const usersDataController = Router();

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
  const itemId = req.body.itemId;
  menuService
    .addItemToUserFavorites(userId, itemId)
    .then(() => res.status(200).end())
    .catch(next);
};

const removeItemFromFavorites = (req, res, next) => {
  const { id: userId } = req.user;
  const { id: itemId } = req.body;
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

usersDataController.use(authorize(ROLES.user, ROLES.admin));

usersDataController.get("/", getUserInfo);
usersDataController.get("/orders", authorize(ROLES.user), getUserOrders);
usersDataController.get("/favorites", authorize(ROLES.user), getUserFavorites);
usersDataController.put("/", validateRequest(userInfoSchema), updateUserInfo);
usersDataController.post(
  "/favorites",
  authorize(ROLES.user),
  addItemToFavorites
);
usersDataController.delete(
  "/favorites",
  authorize(ROLES.user),
  removeItemFromFavorites
);

export { usersDataController };
