'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # Choice Component
 * ## Properties:
 * * `{Boolean} value` (required) - The value to be set in case this Choice is set.
 * * Any property valid for a HTML div like style, id, className, ...
 *
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/choice?_k=jaxgej) documentation.
 * 
 * ## Standard example
 * ```js
 * <!-- toggle with custom choices -->
 * <Toggle defaultValue>
 * <Choice value>On</Choice>
 * <Choice value={ false }>Off</Choice>
 * </Toggle>
 * ```
 * @bit
 */

var Choice = function (_Component) {
  (0, _inherits3.default)(Choice, _Component);

  function Choice() {
    (0, _classCallCheck3.default)(this, Choice);
    return (0, _possibleConstructorReturn3.default)(this, (Choice.__proto__ || (0, _getPrototypeOf2.default)(Choice)).apply(this, arguments));
  }

  (0, _createClass3.default)(Choice, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.props.children
      );
    }
  }]);
  return Choice;
}(_react.Component);

Choice.displayName = 'Choice';
Choice.propTypes = {
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  value: _react.PropTypes.bool.isRequired
};
exports.default = Choice;

//# sourceMappingURL=impl.js.map