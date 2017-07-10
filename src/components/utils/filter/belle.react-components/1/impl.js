
/**
 * @bit
 * @name filter
 * @description Looks through each value in the list, returning an array of all the values
 * that pass a truth test (predicate).
 * @param {array} iterable - the iterable object to be filtered
 * @param {function} predicate - function returning true when provided with an entry as argument
 * @param {object} [context] - context for the predicate function call
 */

export default function filter(iterable, predicate, context) {
  if (iterable) {
    const result = [];
    iterable.forEach((obj) => {
      if (predicate && predicate.call(context, obj)) {
        result.push(obj);
      }
    });
    return result;
  }

  return undefined;
}