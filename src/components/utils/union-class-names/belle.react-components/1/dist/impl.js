'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unionClassNames;

var _union = require('bit/utils/union');

var _union2 = _interopRequireDefault(_union);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @bit
 * @name unionClassNames
 * @description Returns a string containing all classes without duplicates. Originally inspired by https://github.com/rackt/react-autocomplete/blob/master/lib/union-class-names.js
 * @param existingClassNames {String} - one or multiple classes
 * @param additionalClassNames {String} - one or multiple classes
 * @example
 * ```js
 * // returns 'style-id-23 button buy-button'
 * unionClassNames('style-id-23 button', 'button buy-button')
 */

function unionClassNames(existingClassNames, additionalClassNames) {
  if (!existingClassNames && !additionalClassNames) return '';
  if (!existingClassNames) return additionalClassNames;
  if (!additionalClassNames) return existingClassNames;
  return (0, _union2.default)(existingClassNames.split(' '), additionalClassNames.split(' ')).join(' ');
}

//# sourceMappingURL=impl.js.map