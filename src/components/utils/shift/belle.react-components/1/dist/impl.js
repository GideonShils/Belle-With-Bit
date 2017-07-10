"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shift;

/**
 * @bit
 * @name shift
 * @description Shifts given array by given number of positions.
 * @param {array} iterable - the array to be shifted.
 * @param {array} positions - number of positions shifting is needed.
 */

function shift(iterable, positions) {
  if (iterable) {
    if (positions && positions > 0) {
      var result = [];
      var arrayLength = iterable.length;
      for (var index = 0; index < iterable.length; index++) {
        result.push(iterable[(index + positions) % arrayLength]);
      }

      return result;
    }

    return iterable;
  }

  return undefined;
}

//# sourceMappingURL=impl.js.map