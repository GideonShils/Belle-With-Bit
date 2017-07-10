
/**
 * @bit
 * @name reverse
 * @description Reverse the array passed to it.
 * @param {array} iterable - the array to be reversed.
 */

export default function reverse(iterable) {
  if (iterable) {
    const result = [];
    for (let index = iterable.length - 1; index >= 0; index--) {
      result.push(iterable[index]);
    }

    return result;
  }

  return undefined;
}