export const parseStringToSnakeCase = (string) => {
  return string.toLowerCase().replace(/ /g, '_');
};
