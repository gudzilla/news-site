export function toObject(dataPairs) {
  let newObj = {};
  for (const [key, value] of dataPairs) {
    newObj[key] = value;
  }
  return newObj;
}
