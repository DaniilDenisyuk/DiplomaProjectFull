import Joi from "joi";

export const orderSchema = Joi.object({
  id: Joi.string().alphanum(),
  user_id: Joi.string().alphanum(),
  customer_name: Joi.string(),
  customer_phone: Joi.number(),
  order_price: Joi.number(),
  status: Joi.string().allow("pending", "declined", "confirmed"),
  items_id: Joi.array().items(Joi.number()),
});

export default orderSchema;
