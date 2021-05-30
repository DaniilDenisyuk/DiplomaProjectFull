import { Router } from "express";
import { authorize, validateRequest } from "../middleware/index.js";
import ROLES from "../common/roles.js";
import menuItemSchema from "../common/schemas/menuItem.js";
import menuService from "../services/menuService.js";

const menuController = Router();

const getMenuAvailable = (req, res, next) => {
  menuService
    .getMenuAvailable()
    .then((menu) => res.json(menu))
    .catch(next);
};

const updateItem = (req, res, next) => {
  const itemId = req.params.id;
  const fields = req.body;
  menuService
    .updateItem(itemId, fields)
    .then(() => res.status(200).end())
    .catch(next);
};

const addItem = (req, res, next) => {
  const fields = req.body;
  menuService
    .addItem(fields)
    .then(() => res.status(200).end())
    .catch(next);
};

const removeItem = (req, res, next) => {
  const itemId = req.params.id;
  menuService
    .removeItem(itemId)
    .then(() => res.status(200).end())
    .catch(next);
};

menuController.get("/", getMenuAvailable);
menuController.post(
  "/",
  authorize(ROLES.admin),
  validateRequest(
    menuItemSchema.or("name").with("name", ["category", "price"])
  ),
  addItem
);
menuController.put(
  "/:id",
  authorize(ROLES.admin),
  validateRequest(menuItemSchema.not("id").min(1)),
  updateItem
);
menuController.delete("/:id", authorize(ROLES.admin), removeItem);

export { menuController };
