"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmpty;

/**
 * @bit
 * @name isEmpty
 * @description Returns true if object contains no values (no enumerable own-properties).
 * @param {Object} obj - an object
 */

function isEmpty(obj) {
  return !obj || Array.isArray(obj) && obj.length === 0 || Object.keys(obj).length === 0;
}

//# sourceMappingURL=impl.js.map