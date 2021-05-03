import Joi from "joi";

const authSchema = Joi.object({
  login: Joi.string().alphanum().email().required(),
  password: Joi.string().required(),
});

export default authSchema;
