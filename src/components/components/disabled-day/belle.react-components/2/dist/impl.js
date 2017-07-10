'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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
 * ## DisabledDay Component
 * Belle internal component to wrap a DisabledDay in a DatePicker. This component exists to avoid binding functions in JSX.
 * @bit
 */

var DisabledDay = function (_Component) {
  (0, _inherits3.default)(DisabledDay, _Component);

  function DisabledDay() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DisabledDay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DisabledDay.__proto__ || (0, _getPrototypeOf2.default)(DisabledDay)).call.apply(_ref, [this].concat(args))), _this), _this._onMouseEnter = function (event) {
      _this.props.onDayMouseEnter(_this.props.dateKey, event);
    }, _this._onMouseLeave = function (event) {
      _this.props.onDayMouseLeave(_this.props.dateKey, event);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DisabledDay, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        (0, _assign2.default)({
          style: this.props.style,
          onMouseEnter: this._onDayMouseEnter,
          onMouseLeave: this._onDayMouseLeave
        }, this.props.disabledDayProps),
        this.props.children
      );
    }
  }]);
  return DisabledDay;
}(_react.Component);

DisabledDay.displayName = 'DisabledDay';
DisabledDay.propTypes = {
  children: _react.PropTypes.node.isRequired,
  dateKey: _react.PropTypes.string.isRequired,
  onDayMouseEnter: _react.PropTypes.func.isRequired,
  onDayMouseLeave: _react.PropTypes.func.isRequired,
  style: _react.PropTypes.object.isRequired,
  disabledDayProps: _react.PropTypes.any
};
exports.default = DisabledDay;

//# sourceMappingURL=impl.js.map