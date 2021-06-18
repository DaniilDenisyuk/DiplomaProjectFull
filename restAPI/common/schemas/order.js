import Joi from "joi";

export const orderSchema = Joi.object({
  id: Joi.number(),
  user_id: Joi.number(),
  customer_name: Joi.string(),
  customer_phone: Joi.number(),
  order_price: Joi.number(),
  payment_way: Joi.string().allow("bank card", "cash"),
  delivery_way: Joi.string().allow("self", "delivery"),
  delivery_address: Joi.string().allow("").optional(),
  status: Joi.string().allow("pending", "declined", "confirmed"),
  items: Joi.array().items(
    Joi.object({
      id: Joi.number(),
      count: Joi.number(),
    })
  ),
});

export default orderSchema;
