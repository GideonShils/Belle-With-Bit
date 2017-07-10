"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uniqueId;

/**
 * @bit
 * @name uniqueId
 * @description Helper method for Belle components.
 */

function uniqueId() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

//# sourceMappingURL=impl.js.map