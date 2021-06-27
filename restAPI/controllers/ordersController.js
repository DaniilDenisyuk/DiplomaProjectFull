import { Router } from "express";
import { authorize, validateRequest } from "../middleware/index.js";
import ROLES from "../common/roles.js";
import orderSchema from "../common/schemas/order.js";
import ordersService from "../services/ordersService.js";
import { authService } from "../services/authService.js";

const ordersController = Router();

const getPendingOrders = (req, res, next) => {
  ordersService
    .getPendingOrders()
    .then((orders) => res.json(orders))
    .catch(next);
};

const getAllOrders = (req, res, next) => {
  ordersService
    .getAllOrders()
    .then((orders) => res.json(orders))
    .catch(next);
};

const getOrderById = (req, res, next) => {
  const orderId = req.params.id;
  ordersService
    .getOrderById(orderId)
    .then((order) => res.json(order))
    .catch(next);
};

const createOrder = async (req, res, next) => {
  const { items, ...fields } = req.body;
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const id = await authService.verifyToken(token).then(({ id }) => id);
      fields.user_id = id;
    }
    ordersService.createOrder(fields, items).then((id) => res.json(id));
  } catch (e) {
    next(e);
  }
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
ordersController.get("/:id", getOrderById);
ordersController.get("/pending", authorize(ROLES.admin), getPendingOrders);
ordersController.post(
  "/",
  validateRequest(
    orderSchema
      .or("items")
      .with("items", ["order_price", "customer_name", "customer_phone"])
  ),
  createOrder
);
ordersController.put(
  "/:id",
  validateRequest(orderSchema.or("status")),
  authorize(ROLES.admin),
  updateOrderStatus
);

export { ordersController };
