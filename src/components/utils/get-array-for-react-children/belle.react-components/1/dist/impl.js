'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getArrayForReactChildren;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @bit
 * @name getArrayForReactChildren
 * @description Looks through a collection of React children elements, filtering them according to the predicate passed.
 * @param {Array/Object} children - collection of >=1 react elements
 */

function getArrayForReactChildren(children) {
  if (children) {
    var result = [];
    _react2.default.Children.forEach(children, function (entry) {
      result.push(entry);
    });
    return result;
  }

  return undefined;
}

//# sourceMappingURL=impl.js.map