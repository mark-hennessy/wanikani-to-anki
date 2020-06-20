export const formatCommaString = (commaString, format) => {
  return commaString
    .split(',')
    .map(s => s.trim())
    .map(format)
    .join(', ');
};
