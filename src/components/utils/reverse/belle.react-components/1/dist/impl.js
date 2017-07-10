"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reverse;

/**
 * @bit
 * @name reverse
 * @description Reverse the array passed to it.
 * @param {array} iterable - the array to be reversed.
 */

function reverse(iterable) {
  if (iterable) {
    var result = [];
    for (var index = iterable.length - 1; index >= 0; index--) {
      result.push(iterable[index]);
    }

    return result;
  }

  return undefined;
}

//# sourceMappingURL=impl.js.map