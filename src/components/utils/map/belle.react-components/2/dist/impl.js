"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = map;

/**
 * @bit
 * @name map
 * @description Returns a new array of values by mapping each value in list through a transformation function (predicate).
 * @param {array} iterable - source iterable
 * @param {function} predicate - function returning the transformed array entry
 * @returns {array} - the new array
 */

function map(iterable, predicate) {
  if (iterable) {
    var result = [];
    iterable.forEach(function (elm, index) {
      if (predicate) {
        result[index] = predicate(elm, index);
      }
    });
    return result;
  }

  return undefined;
}

//# sourceMappingURL=impl.js.map