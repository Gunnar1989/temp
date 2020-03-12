export const arrayRemove = (arr, value) => {
  return arr.filter(ele => {
    return ele !== value;
  });
};
export const bytesToMegabyte = value => {
  return value / 1000000;
};
