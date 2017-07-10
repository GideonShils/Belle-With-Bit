
/**
 * @bit
 * @name some
 * @description Returns true if any of the values in the list pass the predicate truth test.
 * @param {array} iterable - iterable object to be searched
 * @param {function} predicate - function returning true in case of a positive match
 * @param {object} [context] - context for the predicate function call
 */

export default function some(iterable, predicate, context) {
  if (iterable) {
    let result;
    for (let index = 0; index < iterable.length; index++) {
      if (predicate && predicate.call(context, iterable[index])) {
        result = true;
        break;
      }
    }

    return result;
  }

  return undefined;
}