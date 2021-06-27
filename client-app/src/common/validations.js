export const notEmpty = (value) => !!value.toString().trim();

export const number = (value) => value && !isNaN(Number(value));

export const minLength = (min) => (value) =>
  value && value.toString().length >= min;

export const maxLength = (max) => (value) =>
  value && value.toString().length <= max;

export const minValue = (min) => (value) => value && value >= min;

export const maxValue = (max) => (value) => value && value <= max;

export const date = (value) =>
  /^(0?[1-9]|1\d|2\d|3[01])\.(0?[1-9]|1[0-2])\.(19|20)\d{2}$/.test(value);

export const email = (value) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value
  );

export const password = (value) =>
  /^(?=.*[A-Za-z])(?=.*\d)([A-Za-z\d].*){8,}$/.test(value);

export const uniqueNames = (divider) => (names) => {
  for (const name of names.split(divider)) {
    if (names.match(new RegExp(name.trim(), "gi")).length > 1) return false;
  }
  return true;
};

export const limitSpecialChars = (value) =>
  !/[@#!$%^&*()_+|~=`{}\\[\]:";'<>?./]|-{2,}|[\s]-|-[\s]|(,\s*)\1|,$/.test(
    value
  );

export const phone = (value) => {
  return /^(\+)?(38)?[0-9]{10}$/.test(value);
};

export const wordWithHyphen = (value) =>
  /^(?:[a-zA-ZА-ЯҐЄІЇа-яґєії])+-{0,1}(?:[a-zA-ZА-ЯҐЄІЇа-яґєії])+$/.test(value);

export const word = (value) => /^(?:[a-zA-ZА-ЯҐЄІЇа-яґєії])+$/.test(value);

export const noNumbers = (value) => !/[0-9]/.test(value);

export const alphaNumericWithHyphen = (value) =>
  /^(?:[\wА-ЯҐЄІЇа-яґєії])+-{0,1}(?:[\wА-ЯҐЄІЇа-яґєії])+$/.test(value);
