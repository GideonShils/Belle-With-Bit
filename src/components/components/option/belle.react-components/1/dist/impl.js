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

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _omit = require('bit/utils/omit');

var _omit2 = _interopRequireDefault(_omit);

var _optionStyle = require('bit/style/option-style');

var _optionStyle2 = _interopRequireDefault(_optionStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # Option Component
 * 
 * This component should be used together with Belle's Select.
 * 
 * ## Properties:
 * * `{String, Boolean, Number} value` (required) - The value to be set in case this Option is selected. The value must be unique for all Options within one Select. It can be of type Boolean, String or Number.
 * * `{Object} hoverStyle` (optional) - Works like React's built-in style property. Becomes active once the user hovers over the Option with the cursor or focus on it by leveragin the key board inputs like Arrow-down or Arrow-up.
 * * Any property valid for a HTML div like style, id, className, ...
 * 
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/option?_k=oxoh5s) documentation.
 *
 * ## Standard example
 * ```js
 * <!-- basic select example with multiple options -->
 * <Select>
 * <Option value="berlin">Berlin</Option>
 * <Option value="tokyo">Tokyo</Option>
 * <Option value="vienna">Vienna</Option>
 * </Select>
 * ```
 * @bit
 */

var optionPropTypes = {
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  style: _react.PropTypes.object,
  hoverStyle: _react.PropTypes.object,
  selectStyle: _react.PropTypes.object,
  disabledSelectStyle: _react.PropTypes.object,
  _isDisplayedAsSelected: _react.PropTypes.bool,
  value: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.number]).isRequired,
  identifier: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.number])
};

/*
 * Returns an object with properties that are relevant for the wrapping div.
 */
function sanitizeChildProps(properties) {
  return (0, _omit2.default)(properties, (0, _keys2.default)(optionPropTypes));
}

/*
 * Option component.
 */

var Option = function (_Component) {
  (0, _inherits3.default)(Option, _Component);

  function Option(properties) {
    (0, _classCallCheck3.default)(this, Option);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Option.__proto__ || (0, _getPrototypeOf2.default)(Option)).call(this, properties));

    _this.state = {
      childProps: sanitizeChildProps(properties)
    };
    return _this;
  }

  (0, _createClass3.default)(Option, [{
    key: 'componentWillReceiveProps',


    /*
     * Update the childProps based on the updated properties passed to the
     * Option.
     */
    value: function componentWillReceiveProps(properties) {
      this.setState({ childProps: sanitizeChildProps(properties) });
    }
  }, {
    key: 'render',
    value: function render() {
      var optionStyle = void 0;

      if (this.props._isDisplayedAsSelected) {
        optionStyle = (0, _assign2.default)({}, _optionStyle2.default.selectStyle, this.props.selectStyle);
        if (this.context.isDisabled) {
          optionStyle = (0, _assign2.default)({}, optionStyle, _optionStyle2.default.disabledSelectStyle, this.props.disabledSelectStyle);
        }
      } else {
        optionStyle = (0, _assign2.default)({}, _optionStyle2.default.style, this.props.style);
        if (this.context.isHoveredValue === this.props.value) {
          optionStyle = (0, _assign2.default)({}, optionStyle, _optionStyle2.default.hoverStyle, this.props.hoverStyle);
        }
      }

      return _react2.default.createElement(
        'div',
        (0, _assign2.default)({
          style: optionStyle
        }, this.state.childProps),
        this.props.children
      );
    }
  }]);
  return Option;
}(_react.Component);

Option.displayName = 'Option';
Option.propTypes = optionPropTypes;
Option.contextTypes = {
  isDisabled: _react.PropTypes.bool.isRequired,
  isHoveredValue: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.number])
};
Option.defaultProps = {
  _isDisplayedAsSelected: false
};
exports.default = Option;

//# sourceMappingURL=impl.js.map