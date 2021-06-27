import Joi from "joi";
import roles from "../roles.js";

export const userInfoSchema = Joi.object({
  id: Joi.string().min(3).max(31),
  username: Joi.string().min(2).max(31),
  phone: Joi.string().min(10).max(16),
  first_name: Joi.string().min(2).max(15),
  last_name: Joi.string().min(2).max(15).allow(""),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).allow(""),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true },
    })
    .allow(""),
  city: Joi.string().min(2).allow(""),
  street: Joi.string().min(2).allow(""),
  house: Joi.number().min(1).allow(""),
  door: Joi.number().min(1).allow(""),
  role: Joi.string().valid(...Object.values(roles)),
});

export default userInfoSchema;
