const required = (value, errMess) =>
  value || typeof value === "number" ? undefined : errMess;

const maxLength = (max, errMess) => (value) =>
  value && value.length > max ? errMess : undefined;

const minLength = (min, errMess) => (value) =>
  value && value.length < min ? errMess : undefined;

const number = (value, errMess) =>
  value && isNaN(Number(value)) ? errMess : undefined;

const minValue = (min, errMess) => (value) =>
  value && value < min ? errMess : undefined;

const alphaNumeric = (value, errMess) =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? errMess : undefined;

const email = (value, errMess = "Not valid values") =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? errMess
    : undefined;
const phoneNumber = (value, errMess = "Not valid values") =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value) ? errMess : undefined;

const password = (value, errMess = "must containe") =>
  value && !/^.{8}$/i.test(value) ? errMess : undefined;

const phoneOrEmail = (value, errMess) => {
  if (!phoneNumber(value) || !email(value)) {
    return errMess;
  }
  return undefined;
};

export const validations = {
  password,
  required,
  maxLength,
  minLength,
  number,
  minValue,
  email,
  alphaNumeric,
  phoneNumber,
  phoneOrEmail,
};
