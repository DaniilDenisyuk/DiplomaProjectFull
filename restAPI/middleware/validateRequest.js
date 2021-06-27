import { ValidationError } from "../common/errorTypes.js";

export const validateRequest = (schema, field = "body") => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  return (req, res, next) => {
    const { error, value } = schema.validate(req[field], options);
    if (error) {
      next(
        ValidationError(`${error.details.map((x) => x.message).join(", ")}`)
      );
    } else {
      req[field] = value;
      next();
    }
  };
};
