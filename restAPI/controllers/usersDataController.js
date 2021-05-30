import { Router } from "express";
import { authorize, validateRequest } from "../middleware/index.js";
import ROLES from "../common/roles.js";
import { addressSchema, userInfoSchema } from "../common/schemas/index.js";
import { ordersService, usersService } from "../services/index.js";

const usersDataController = Router();

const getPersonalInfo = (req, res, next) => {
  const { id: userId } = req.user;
  usersService
    .getUserInfo(userId)
    .then((info) => res.json(info))
    .catch(next);
};

const getOrders = (req, res, next) => {
  const { id: userId } = req.user;
  ordersService
    .getUserOrders(userId)
    .then((orders) => res.json(orders))
    .catch(next);
};

const getUserOrders = (req, res, next) => {
  const userId = req.params.userId;
  ordersService
    .getUserOrders(userId)
    .then((orders) => res.json(orders))
    .catch(next);
};

const getFavorites = (req, res, next) => {
  const { id: userId } = req.user;
  usersService
    .getUserFavorites(userId)
    .then((favorites) => res.json(favorites))
    .catch(next);
};

const getUserFavorites = (req, res, next) => {
  const userId = req.params.userId;
  usersService
    .getUserFavorites(userId)
    .then((favorites) => res.json(favorites))
    .catch(next);
};

const addItemToFavorites = (req, res, next) => {
  const { id: userId } = req.user;
  const itemId = req.body;
  usersService
    .addItemToUserFavorites(userId, itemId)
    .then(() => res.status(200).end())
    .catch(next);
};

const removeItemFromFavorites = (req, res, next) => {
  const { id: userId } = req.user;
  const { id: itemId } = req.body;
  usersService
    .removeItemFromUserFavorites(userId, itemId)
    .then(() => res.status(200).end())
    .catch(next);
};

const updateAddress = (req, res, next) => {
  const { id: userId } = req.user;
  const fields = req.body;
  usersService
    .updateUserAddress(userId, fields)
    .then(() => res.status(200).end())
    .catch(next);
};

const updatePersonalInfo = (req, res, next) => {
  const { id: userId } = req.user;
  const fields = req.body;
  usersService
    .updateUserInfo(userId, fields)
    .then(() => res.status(200).end())
    .catch(next);
};

usersDataController.use(authorize(ROLES.user, ROLES.admin));

usersDataController.get("/", getPersonalInfo);
usersDataController.get("/orders", authorize(ROLES.user), getOrders);
usersDataController.get(
  "/:userId/orders",
  authorize(ROLES.admin),
  getUserOrders
);

usersDataController.get("/favorites", authorize(ROLES.user), getFavorites);
usersDataController.get(
  "/:userId/favorites",
  authorize(ROLES.admin),
  getUserFavorites
);
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

usersDataController.put(
  "/address",
  validateRequest(addressSchema),
  updateAddress
);

usersDataController.put(
  "/personal-info",
  validateRequest(userInfoSchema),
  updatePersonalInfo
);

export { usersDataController };
