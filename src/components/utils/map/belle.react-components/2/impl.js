
/**
 * @bit
 * @name map
 * @description Returns a new array of values by mapping each value in list through a transformation function (predicate).
 * @param {array} iterable - source iterable
 * @param {function} predicate - function returning the transformed array entry
 * @returns {array} - the new array
 */

export default function map(iterable, predicate) {
  if (iterable) {
    const result = [];
    iterable.forEach((elm, index) => {
      if (predicate) {
        result[index] = predicate(elm, index);
      }
    });
    return result;
  }

  return undefined;
}