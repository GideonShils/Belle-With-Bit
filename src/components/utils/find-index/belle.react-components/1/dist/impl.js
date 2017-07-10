"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findIndex;

/**
 * @bit
 * @name findIndex
 * @description Returns the index of the first value that passes a truth test (predicate), or undefined if
 * no value passes the test. Only works for iterable objects e.g. arrays.
 * @param {array} iterable - the iterable object to be searched
 * @param {function} predicate - function returning true in case of a positive match
 * @param {object} [context] - context for the predicate function call
 */

function findIndex(iterable, predicate, context) {
  if (iterable) {
    var result = void 0;
    for (var index = 0; index < iterable.length; index++) {
      if (predicate && predicate.call(context, iterable[index])) {
        result = index;
        break;
      }
    }

    return result;
  }

  return undefined;
}

//# sourceMappingURL=impl.js.map