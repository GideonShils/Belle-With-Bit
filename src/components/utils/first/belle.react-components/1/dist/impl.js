"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = first;

/**
 * @bit
 * @name first
 * @description Returns the first element of an iterable object.
 * @param {array} iterable - must be an iterable object
 */

function first(iterable) {
  if (iterable && iterable.length > 0) {
    return iterable[0];
  }

  return undefined;
}

//# sourceMappingURL=impl.js.map