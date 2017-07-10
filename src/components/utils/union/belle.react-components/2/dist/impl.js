"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = union;

/**
 * @bit
 * @name union
 * @description Returns the union of the passed-in arrays: the list of unique items, in order, that are present in one or more of the arrays.
 * @param {...array} arrs - at least two iterable objects must be provide

 */

function union() {
  for (var _len = arguments.length, arrs = Array(_len), _key = 0; _key < _len; _key++) {
    arrs[_key] = arguments[_key];
  }

  if (arrs) {
    var result = [];
    arrs.forEach(function (arr) {
      if (arr) {
        arr.forEach(function (obj) {
          if (result.indexOf(obj) < 0) {
            result.push(obj);
          }
        });
      }
    });
    return result;
  }

  return undefined;
}

//# sourceMappingURL=impl.js.map