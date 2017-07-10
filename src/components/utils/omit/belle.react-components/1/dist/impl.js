"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = omit;

/**
 * @bit
 * @name omit
 * @description Return a copy of the object, filtered to omit the blacklisted keys (or array of keys).
 * @param {object} obj - object the returned object is based on
 * @param {string|string[]} fields - the key or list of keys of the property to omit
 */

function omit(obj, fields) {
  if (obj) {
    var result = {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && (!fields || fields.indexOf(key) < 0)) {
        result[key] = obj[key];
      }
    }

    return result;
  }

  return undefined;
}

//# sourceMappingURL=impl.js.map