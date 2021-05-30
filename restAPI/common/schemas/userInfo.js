import Joi from "joi";
import roles from "../roles.js";

export const userInfoSchema = Joi.object({
  id: Joi.string().min(3).max(31),
  username: Joi.string().min(2).max(31),
  phone: Joi.string().min(10).max(16),
  first_name: Joi.string().min(2).max(15),
  last_name: Joi.string().min(2).max(15),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: true },
  }),
  role: Joi.string().valid(...Object.values(roles)),
});

export default userInfoSchema;
