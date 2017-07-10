
/**
 * @bit
 * @name last
 * @description Returns the last element of an iterable object.
 * @param {array} iterable - must be an iterable object
 */

export default function last(iterable) {
  if (iterable && iterable.length > 0) {
    return iterable[iterable.length - 1];
  }

  return undefined;
}