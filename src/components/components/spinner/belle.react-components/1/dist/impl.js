'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _spinnerStyle = require('bit/style/spinner-style');

var _spinnerStyle2 = _interopRequireDefault(_spinnerStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # Spinner Component
 * To be used as loading indicator
 * 
 * ## Properties:
 * * `{Object} characterStyle` (optional) - The property can be used to specify styling for the spans wrapping the dots. Behaves like Reacts built-in style property.
 * * Any property valid for a HTML div like style, id, className, ...
 * 
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/spinner?_k=6nbmd7) documentation.
 * 
 * ## Standard example
 * ```js
 * <!-- basic spinner example -->
 * <Spinner />
 * ```
 * 
 * ## Button while loading
 * ```js
 * <!-- loading button example -->
 * <Button primary disabled>
 * Saving <Spinner characterStyle={{ fontSize: 18, color: '#fff' }} />
 * </Button>
 *
 * <Button disabled style={{ marginLeft: 10 }}>
 * Saving <Spinner characterStyle={{ fontSize: 18, color: '#C5C4C4' }} />
 * </Button>
 * ```
 * 
 * ## Card with a loading indicator
 * ```js
 * <!-- loading example -->
 * <Card style={{ fontSize: 20,
 *              color: '#666',
 *              textAlign: 'center',
 *              borderTop: '1px solid #f2f2f2',
 *           }}>
 * Loading <Spinner characterStyle={{ fontSize: 20 }} />
 * </Card>
 * ```
 * @bit
 */

var animationDelay = function animationDelay(delay) {
  return {
    MozAnimationDelay: delay,
    WebkitAnimationDelay: delay,
    OAnimationDelay: delay,
    animationDelay: delay
  };
};

/*
 * Spinner component.
 */

var Spinner = function (_Component) {
  (0, _inherits3.default)(Spinner, _Component);

  function Spinner() {
    (0, _classCallCheck3.default)(this, Spinner);
    return (0, _possibleConstructorReturn3.default)(this, (Spinner.__proto__ || (0, _getPrototypeOf2.default)(Spinner)).apply(this, arguments));
  }

  (0, _createClass3.default)(Spinner, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          characterProps = _props.characterProps,
          characterStyle = _props.characterStyle,
          childProps = (0, _objectWithoutProperties3.default)(_props, ['style', 'characterProps', 'characterStyle']);

      var computedCharStyle = (0, _assign2.default)({}, _spinnerStyle2.default.characterStyle, characterStyle);
      return _react2.default.createElement(
        'span',
        (0, _assign2.default)({}, childProps, { style: (0, _assign2.default)({}, _spinnerStyle2.default.style, style) }),
        _react2.default.createElement(
          'span',
          (0, _assign2.default)({}, characterProps, { style: computedCharStyle }),
          '.'
        ),
        _react2.default.createElement(
          'span',
          (0, _assign2.default)({}, characterProps, { style: (0, _assign2.default)({}, computedCharStyle, animationDelay('400ms')) }),
          '.'
        ),
        _react2.default.createElement(
          'span',
          (0, _assign2.default)({}, characterProps, { style: (0, _assign2.default)({}, computedCharStyle, animationDelay('800ms')) }),
          '.'
        )
      );
    }
  }]);
  return Spinner;
}(_react.Component);

Spinner.displayName = 'Spinner';
Spinner.propTypes = {
  characterProps: _react.PropTypes.object,
  characterStyle: _react.PropTypes.object,
  style: _react.PropTypes.object
};
exports.default = Spinner;

//# sourceMappingURL=impl.js.map