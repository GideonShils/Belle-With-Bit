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
 * ## SelectItem Component
 * Belle internal component to wrap an Option in a Select. This component exists to avoid binding functions in JSX.
 * @bit
 */
var SelectItem = function (_Component) {
  (0, _inherits3.default)(SelectItem, _Component);

  function SelectItem() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SelectItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SelectItem.__proto__ || (0, _getPrototypeOf2.default)(SelectItem)).call.apply(_ref, [this].concat(args))), _this), _this._onClick = function () {
      _this.props.onItemClick(_this.props.index);
    }, _this._onTouchStart = function (event) {
      _this.props.onItemTouchStart(event, _this.props.index);
    }, _this._onTouchMove = function () {
      _this.props.onItemTouchMove();
    }, _this._onTouchEnd = function (event) {
      _this.props.onItemTouchEnd(event, _this.props.index);
    }, _this._onTouchCancel = function () {
      _this.props.onItemTouchCancel();
    }, _this._onMouseEnter = function () {
      _this.props.onItemMouseEnter(_this.props.index);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SelectItem, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'li',
        {
          onMouseDown: this._onClick,
          onTouchStart: this._onTouchStart,
          onTouchMove: this._onTouchMove,
          onTouchEnd: this._onTouchEnd,
          onTouchCancel: this._onTouchCancel,
          onMouseEnter: this._onMouseEnter,
          role: 'option',
          'aria-selected': this.props.isHovered
        },
        this.props.children
      );
    }
  }]);
  return SelectItem;
}(_react.Component);

SelectItem.displayName = 'SelectItem';
SelectItem.propTypes = {
  children: _react.PropTypes.node.isRequired,
  isHovered: _react.PropTypes.bool.isRequired,
  index: _react.PropTypes.number.isRequired,
  onItemClick: _react.PropTypes.func.isRequired,
  onItemTouchStart: _react.PropTypes.func.isRequired,
  onItemTouchMove: _react.PropTypes.func.isRequired,
  onItemTouchEnd: _react.PropTypes.func.isRequired,
  onItemTouchCancel: _react.PropTypes.func.isRequired,
  onItemMouseEnter: _react.PropTypes.func.isRequired
};
exports.default = SelectItem;

//# sourceMappingURL=impl.js.map