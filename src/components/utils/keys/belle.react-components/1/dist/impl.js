'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keys;

var _has = require('bit/utils/has');

var _has2 = _interopRequireDefault(_has);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @bit
 * @name keys
 * @description Returns all the names of the object's own properties. This will not include properties inherited through prototypes.
 * @param {object} obj - object to be used
 */

function keys(obj) {
  var objKeys = [];
  for (var key in obj) {
    if ((0, _has2.default)(obj, key)) objKeys.push(key);
  }return objKeys;
}

//# sourceMappingURL=impl.js.map