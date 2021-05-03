import Joi from "joi";

const profileSchema = Joi.object({
  title: Joi.string().alphanum().min(2).max(31),

  format: Joi.string().value("male", "female"),

  releaseYear: Joi.date().min("1800").max("now"),

  actors: Joi.string(),
});

export default profileSchema;
