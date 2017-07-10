'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flattenReactChildren;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getArrayForReactChildren = require('bit/utils/get-array-for-react-children');

var _getArrayForReactChildren2 = _interopRequireDefault(_getArrayForReactChildren);

var _isEmpty = require('bit/utils/is-empty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _flatten = require('bit/utils/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @bit
 * @name flattenReactChildren
 * @description Helper method for Belle components.
 */

function flattenReactChildren(children) {
  if (!(0, _isEmpty2.default)(children)) {
    if (Array.isArray(children)) {
      return (0, _flatten2.default)(children);
    }

    return (0, _getArrayForReactChildren2.default)(children);
  }

  return undefined;
}

//# sourceMappingURL=impl.js.map