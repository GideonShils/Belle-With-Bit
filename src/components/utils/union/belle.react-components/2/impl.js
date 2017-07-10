
/**
 * @bit
 * @name union
 * @description Returns the union of the passed-in arrays: the list of unique items, in order, that are present in one or more of the arrays.
 * @param {...array} arrs - at least two iterable objects must be provide

 */

export default function union(...arrs) {
  if (arrs) {
    const result = [];
    arrs.forEach((arr) => {
      if (arr) {
        arr.forEach((obj) => {
          if (result.indexOf(obj) < 0) {
            result.push(obj);
          }
        });
      }
    });
    return result;
  }

  return undefined;
}