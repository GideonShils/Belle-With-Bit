"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = some;

/**
 * @bit
 * @name some
 * @description Returns true if any of the values in the list pass the predicate truth test.
 * @param {array} iterable - iterable object to be searched
 * @param {function} predicate - function returning true in case of a positive match
 * @param {object} [context] - context for the predicate function call
 */

function some(iterable, predicate, context) {
  if (iterable) {
    var result = void 0;
    for (var index = 0; index < iterable.length; index++) {
      if (predicate && predicate.call(context, iterable[index])) {
        result = true;
        break;
      }
    }

    return result;
  }

  return undefined;
}

//# sourceMappingURL=impl.js.map