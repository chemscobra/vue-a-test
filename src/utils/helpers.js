export const stringSentenceToSnakeCase = (string) => {
  // 'This is a string' => 'this_is_a_string'
  return string.trim().toLowerCase().replace(/ /g, '_');
};

export const snakeCaseToCamelCase = (string) => {
  // 'this_is_a_string' => 'thisIsAString'
  return string.trim().replace(/_([a-z])/g, (g) => g[1].toUpperCase());
};

export const objectKeysFromSnakeToCamelCase = (obj) => {
  // { 'this_is_a_string': 'value' } => { thisIsAString: 'value' }
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[snakeCaseToCamelCase(key)] = obj[key];
  });
  return newObj;
};
