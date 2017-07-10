'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mapObject;

var _keys = require('bit/utils/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @bit
 * @name mapObject
 * @description Returns a new object by mapping each property in an object through a transformation function (predicate).
 * @param {object} obj - object to be based upon
 * @param {function} predicate - function to transform the property
 */

function mapObject(obj, predicate) {
  if (obj) {
    var result = [];
    var objKeys = (0, _keys2.default)(obj);
    objKeys.forEach(function (key, index) {
      if (predicate) {
        result[index] = predicate(obj[key], key);
      }
    });
    return result;
  }

  return undefined;
}

//# sourceMappingURL=impl.js.map