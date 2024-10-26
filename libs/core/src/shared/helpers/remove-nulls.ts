export function removeNullsFromObject(data) {
  return JSON.parse(
    JSON.stringify(data, (key, value) => {
      if (value === null || value === undefined) {
        return undefined;
      }
      return value;
    }),
  );
}
