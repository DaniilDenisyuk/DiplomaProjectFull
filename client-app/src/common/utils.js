import { notEmpty } from "./validations";

export const removeEmptyFields = (object) => {
  for (const [key, value] of Object.entries(object)) {
    if (!notEmpty(value)) delete object[key];
  }
};

export const trimFields = (object) => {
  for (const [key, value] of Object.entries(object)) {
    object[key] = value.toString().trim();
  }
};
