import { Router } from "express";
import { authorize, validateRequest } from "../middleware/index.js";
import ROLES from "../common/roles.js";
import orderSchema from "../common/schemas/order.js";
import ordersService from "../services/ordersService.js";

const ordersController = Router();

const getPendingOrders = (req, res, next) => {
  ordersService
    .getPendingOrders()
    .then((orders) => res.json(orders))
    .catch(next);
};

const getAllOrders = (req, res, next) => {
  ordersService
    .getOrders()
    .then((orders) => res.json(orders))
    .catch(next);
};

const getUserOrders = (req, res, next) => {
  const { id: userId } = req.user;
  ordersService
    .getUserOrders(userId)
    .then((orders) => res.json(orders))
    .catch(next);
};

const createOrder = (req, res, next) => {
  const { items_id, ...fields } = req.body;
  ordersService
    .createOrder(fields, items_id)
    .then(() => res.status(200).end())
    .catch(next);
};

const updateOrderStatus = (req, res, next) => {
  const orderId = req.params.id;
  const { status } = req.body;
  ordersService
    .updateOrderStatus(orderId, status)
    .then(() => res.status(200).end())
    .catch(next);
};

ordersController.get("/", authorize(ROLES.admin), getAllOrders);
ordersController.get("/pending", authorize(ROLES.admin), getPendingOrders);
ordersController.get("/user", authorize(ROLES.user), getUserOrders);
ordersController.post(
  "/",
  validateRequest(
    orderSchema
      .or("items_id")
      .with("items_id", ["order_price", "customer_name", "customer_phone"])
  ),
  createOrder
);
ordersController.put(
  "/orders/:id",
  validateRequest(orderSchema.or("status")),
  authorize(ROLES.admin),
  updateOrderStatus
);

export { ordersController };
