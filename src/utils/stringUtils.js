export const removeUnderscores = string => {
  return string.replace(/_/g, ' ');
};

export const toCommaString = array => {
  return array.join(', ');
};
