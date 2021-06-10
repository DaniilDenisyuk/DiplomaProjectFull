import Joi from "joi";

export const authSchema = Joi.object({
  login: Joi.string().alphanum().required(),
  password: Joi.string().required(),
});

export default authSchema;
