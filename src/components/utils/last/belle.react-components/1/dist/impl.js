"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = last;

/**
 * @bit
 * @name last
 * @description Returns the last element of an iterable object.
 * @param {array} iterable - must be an iterable object
 */

function last(iterable) {
  if (iterable && iterable.length > 0) {
    return iterable[iterable.length - 1];
  }

  return undefined;
}

//# sourceMappingURL=impl.js.map