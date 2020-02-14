export const arrayRemove = (arr, value) => {
  return arr.filter(ele => {
    return ele !== value;
  });
};
