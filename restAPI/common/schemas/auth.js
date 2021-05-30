import Joi from "joi";

export const authSchema = Joi.object({
  login: Joi.string().alphanum(),
  password: Joi.string(),
});

export default authSchema;
