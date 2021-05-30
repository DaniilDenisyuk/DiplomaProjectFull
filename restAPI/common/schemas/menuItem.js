import Joi from "joi";

export const menuItemSchema = Joi.object({
  id: Joi.string().alphanum(),
  name: Joi.string().alphanum(),
  category: Joi.string()
    .alphanum()
    .valid("sushi", "drinks", "sets", "rolls", "soups"),
  volume: Joi.string().alphanum(),
  energy: Joi.string().alphanum(),
  weight: Joi.string().alphanum(),
  description: Joi.string(),
  price: Joi.string().alphanum(),
  available: Joi.bool(),
});

export default menuItemSchema;
