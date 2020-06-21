export const removeUnderscores = string => {
  return string.replace(/_/g, ' ');
};

export const toCommaString = string => {
  return string.join(', ');
};
