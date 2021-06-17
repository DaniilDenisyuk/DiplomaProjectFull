import { ValidationError } from "../common/errorTypes.js";

export const validateRequest = (schema) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      next(
        ValidationError(`${error.details.map((x) => x.message).join(", ")}`)
      );
    } else {
      req.body = value;
      next();
    }
  };
};
