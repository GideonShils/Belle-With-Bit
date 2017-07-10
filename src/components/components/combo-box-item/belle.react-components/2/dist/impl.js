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
 * ## ComboBoxItem Component
 * Belle internal component to wrap an Option in a ComboBox. This component exists to avoid binding functions in JSX.
 * @bit
 */

var ComboBoxItem = function (_Component) {
  (0, _inherits3.default)(ComboBoxItem, _Component);

  function ComboBoxItem() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ComboBoxItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ComboBoxItem.__proto__ || (0, _getPrototypeOf2.default)(ComboBoxItem)).call.apply(_ref, [this].concat(args))), _this), _this._onClick = function () {
      _this.props.onItemClick(_this.props.index);
    }, _this._onTouchStart = function (event) {
      _this.props.onItemTouchStart(event, _this.props.index);
    }, _this._onTouchEnd = function (event) {
      _this.props.onItemTouchEnd(event, _this.props.index);
    }, _this._onTouchCancel = function () {
      _this.props.onItemTouchCancel();
    }, _this._onMouseEnter = function () {
      _this.props.onItemMouseEnter(_this.props.index);
    }, _this._onMouseLeave = function () {
      _this.props.onItemMouseLeave();
    }, _this._onMouseDown = function (event) {
      event.preventDefault();
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ComboBoxItem, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'li',
        {
          onClick: this._onClick,
          onMouseEnter: this._onMouseEnter,
          onMouseLeave: this._onMouseLeave,
          onMouseDown: this._onMouseDown,
          onTouchStart: this._onTouchStart,
          onTouchEnd: this._onTouchEnd,
          onTouchCancel: this._onTouchCancel,
          role: 'option'
        },
        this.props.children
      );
    }
  }]);
  return ComboBoxItem;
}(_react.Component);

ComboBoxItem.displayName = 'ComboBoxItem';
ComboBoxItem.propTypes = {
  children: _react.PropTypes.node.isRequired,
  index: _react.PropTypes.number.isRequired,
  onItemClick: _react.PropTypes.func.isRequired,
  onItemTouchStart: _react.PropTypes.func.isRequired,
  onItemTouchEnd: _react.PropTypes.func.isRequired,
  onItemTouchCancel: _react.PropTypes.func.isRequired,
  onItemMouseEnter: _react.PropTypes.func.isRequired,
  onItemMouseLeave: _react.PropTypes.func.isRequired
};
exports.default = ComboBoxItem;

//# sourceMappingURL=impl.js.map