export const required = (value) => !!value.toString();

export const number = (value) => (value && isNaN(Number(value)) ? false : true);

export const minValue = (min) => (value) =>
  value && value < min ? false : true;

export const maxValue = (max) => (value) =>
  value && value > max ? false : true;

export const minMaxValue = (min, max) => {
  const isNotLower = minValue(min);
  const isNotHigher = maxValue(max);
  return (value) => isNotLower(value) && isNotHigher(value);
};

export const uniqueNames = (divider) => (names) => {
  for (const name of names.split(divider)) {
    if (names.match(new RegExp(name.trim(), "gi")).length > 1) return false;
  }
  return true;
};

export const oneOf = (valueSet) => (value) => {
  for (const etalon of valueSet) {
    if (etalon.toString() === value.toString()) return true;
  }
  return false;
};

export const limitSpecialChars = (value) =>
  !/[@#!$%^&*()_+|~=`{}\\[\]:";'<>?./]|-{2,}|[\s]-|-[\s]|(,\s*)\1|,$/.test(
    value
  );

export const limitNumbers = (value) => !/[0-9]/.test(value);
