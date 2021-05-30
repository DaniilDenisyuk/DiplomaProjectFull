import Joi from "joi";

export const addressSchema = Joi.object({
  city: Joi.string(),
  street: Joi.string(),
  house: Joi.number().min(1),
  door: Joi.number().min(1),
});

export default addressSchema;
