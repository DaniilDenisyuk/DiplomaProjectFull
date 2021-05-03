import Joi from "joi";

const profileSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(31),

  gender: Joi.string().value("male", "female"),

  birthdate: Joi.date().max("now"),

  city: Joi.string().max(63),
});

export default profileSchema;
