
/**
 * @bit
 * @name shift
 * @description Shifts given array by given number of positions.
 * @param {array} iterable - the array to be shifted.
 * @param {array} positions - number of positions shifting is needed.
 */

export default function shift(iterable, positions) {
  if (iterable) {
    if (positions && positions > 0) {
      const result = [];
      const arrayLength = iterable.length;
      for (let index = 0; index < iterable.length; index++) {
        result.push(iterable[(index + positions) % arrayLength]);
      }

      return result;
    }

    return iterable;
  }

  return undefined;
}