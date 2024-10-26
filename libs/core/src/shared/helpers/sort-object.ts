export function sortObjectKeys(obj) {
  const keys = Object.keys(obj);
  keys.sort();
  const sortedObj = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    sortedObj[key] = obj[key];
  }
  return sortedObj;
}
