"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flatten;

/**
 * @bit
 * @name flatten
 * @description Flattens a nested array (the nesting can be to any depth).
 * @param {...array} arrays - at least one array must be provided
 */

function flatten() {
  for (var _len = arguments.length, arrays = Array(_len), _key = 0; _key < _len; _key++) {
    arrays[_key] = arguments[_key];
  }

  if (arrays) {
    var result = [];
    flattenInternal(result, arrays);
    return result;
  }

  return undefined;
}

// Recursive internal function for flattening an iterable.
function flattenInternal(output, element) {
  if (element) {
    element.forEach(function (obj) {
      if (Array.isArray(obj)) {
        flattenInternal(output, obj);
      } else {
        output.push(obj);
      }
    });
  }
}

//# sourceMappingURL=impl.js.map