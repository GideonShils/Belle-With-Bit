'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filterReactChildren;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @bit
 * @name filterReactChildren
 * @description Looks through a collection of React children elements, filtering them according to the predicate passed.
 * @param {Array/Object} children - colleciton of >=1 react elements
 * @param {function} predicate - function returning true when provided with an entry as argument
 */

function filterReactChildren(children, predicate) {
  var _this = this;

  if (children) {
    var result = [];
    _react2.default.Children.forEach(children, function (entry) {
      if (predicate && predicate.call(_this, entry)) {
        result.push(entry);
      }
    });
    return result;
  }

  return undefined;
}

//# sourceMappingURL=impl.js.map