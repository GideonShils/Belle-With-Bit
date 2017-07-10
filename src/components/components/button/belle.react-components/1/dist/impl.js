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

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _has = require('bit/utils/has');

var _has2 = _interopRequireDefault(_has);

var _omit = require('bit/utils/omit');

var _omit2 = _interopRequireDefault(_omit);

var _uniqueId = require('bit/utils/unique-id');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _buttonStyle = require('bit/style/button-style');

var _buttonStyle2 = _interopRequireDefault(_buttonStyle);

var _unionClassNames = require('bit/utils/union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

var _injectStyle = require('bit/utils/inject-style');

var _buttonConfig = require('bit/config/button-config');

var _buttonConfig2 = _interopRequireDefault(_buttonConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # Button Component
 * 
 * Note: Belle's Button is rendered as normal HTML button and behaves exactly like it except for these behaviours:
 * * By default every button is of type="button" instead of "submit"
 *
 * ## Properties:
 * * `{Boolean} primary` (default: false) - If true the Button will be appear with the primary button styles.
 * * `{String of 'button', 'submit', 'reset'} type` (default: 'button') - This button by is set to type 'button' by default. This different to the default behavior in HTML where a button would submit in case the 'type' attribute is not defined.
 * * `{Boolean} disabled` (default: false) - If true the Button will be disabled and can't be pressed by a user.
 * * `{Object} hoverStyle` (optional) - Works like React's built-in style property. Becomes active once the user hovers over the button with the cursor.
 * * `{Object} focusStyle` (optional) - Works like React's built-in style property except that it extends the properties from the base style. Becomes active once the button is the element focused in the DOM.
 * * `{Object} activeStyle` (optional) - Works like React's built-in style property except that it extends the properties from the base style. Becomes active once the button is pressed by a user, but yet not release.
 * * `{Object} disabledStyle` (optional) - Works like React's built-in style property except that it extends the properties from the base style. Becomes active once the button is disabled.
 * * `{Object} disabledHoverStyle` (optional) - Works like React's built-in style property except that it extends the properties from the base disabledStyle. Becomes active once the button is disabled and a user hovers over it.
 * * `{Boolean} preventFocusStyleForTouchAndClick` (optional. default: true) - Prevents the focus style being applied in case the buttons becomes focused by a click or touch.
 * 
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/button?_k=3h2bg1) documentation.
 * 
 * ## Standard example
 * ```js
 * <!-- primary button -->
 * <Button primary>Follow</Button>
 * 
 * <!-- default button -->
 * <Button>Follow</Button>
 * ```
 * 
 * ## Disabled buttons
 * ```js
 * <Button primary style={{marginRight: 10}}>Follow</Button>
 *
 * <Button primary disabled style={{marginRight: 10}}>Follow</Button>
 * 
 * <Button style={{marginRight: 10}}>Follow</Button>
 * 
 * <Button disabled>Follow</Button>
 * ```
 * 
 * ## Primary button with custom styles
 * ```js
 * <Button primary
 *    style={{
 *      marginRight: 10,
 *      color: '#222',
 *      border: '1px solid #222',
 *      borderBottom: '1px solid #222',
 *      borderRadius: 2,
 *      background: '#fff',
 *    }}
 *    hoverStyle={{
 *      border: '1px solid red',
 *      borderBottom: '1px solid red',
 *      color: '#red',
 *      background: '#fff',
 *    }}
 *    focusStyle={{
 *      border: '1px solid red',
 *      borderBottom: '1px solid red',
 *      color: '#red',
 *      background: '#fff',
 *      boxShadow: 'red 0px 0px 5px',
 *    }}
 *    activeStyle={{
 *      border: '1px solid red',
 *      borderTop: '1px solid red',
 *      color: '#000',
 *      background: '#fff',
 *    }}>
 *  Follow
 * </Button>
 * ```
 * @bit
 */

var buttonTypes = ['button', 'submit', 'reset']; // eslint-disable-line no-unused-vars

// eslint-disable-line no-unused-vars
var buttonPropTypes = {
  activeStyle: _react.PropTypes.object,
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  type: _react.PropTypes.oneOf(buttonTypes),
  style: _react.PropTypes.object,
  focusStyle: _react.PropTypes.object,
  hoverStyle: _react.PropTypes.object,
  disabledStyle: _react.PropTypes.object,
  disabledHoverStyle: _react.PropTypes.object,
  onTouchStart: _react.PropTypes.func,
  onTouchEnd: _react.PropTypes.func,
  onTouchCancel: _react.PropTypes.func,
  onMouseDown: _react.PropTypes.func,
  onMouseEnter: _react.PropTypes.func,
  onMouseLeave: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func,
  preventFocusStyleForTouchAndClick: _react.PropTypes.bool,
  primary: _react.PropTypes.bool
};

/*
 * Returns an object with properties that are relevant for the button element.
 *
 * In case a wrong or no type is defined the type of the child button will be
 * set to `button`.
 */
function sanitizeChildProps(properties) {
  return (0, _omit2.default)(properties, (0, _keys2.default)(buttonPropTypes));
}

/*
 * Update hover, focus & active style for the speficied styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param properties {object} - the components properties optionally containing custom styles
 */
function updatePseudoClassStyle(styleId, properties, preventFocusStyleForTouchAndClick) {
  var baseStyle = properties.primary ? _buttonStyle2.default.primaryStyle : _buttonStyle2.default.style;
  var baseDisabledStyle = properties.primary ? _buttonStyle2.default.primaryDisabledStyle : _buttonStyle2.default.disabledStyle;
  var disabledStyle = (0, _assign2.default)({}, baseStyle, properties.style, baseDisabledStyle, properties.disabledStyle);
  var baseActiveStyle = properties.primary ? _buttonStyle2.default.primaryActiveStyle : _buttonStyle2.default.activeStyle;
  var activeStyle = (0, _assign2.default)({}, baseActiveStyle, properties.activeStyle);

  var focusStyle = void 0;
  if (preventFocusStyleForTouchAndClick) {
    focusStyle = { outline: 0 };
  } else {
    var baseFocusStyle = properties.primary ? _buttonStyle2.default.primaryFocusStyle : _buttonStyle2.default.focusStyle;
    focusStyle = (0, _assign2.default)({}, baseFocusStyle, properties.focusStyle);
  }

  var styles = [{
    id: styleId,
    style: activeStyle,
    pseudoClass: 'active'
  }, {
    id: styleId,
    style: disabledStyle,
    pseudoClass: 'active',
    disabled: true
  }, {
    id: styleId,
    style: focusStyle,
    pseudoClass: 'focus'
  }];

  (0, _injectStyle.injectStyles)(styles);
}

/*
 * Button component
 *
 * The button behaves exactly like a normal html button except:
 * - Once a user clicks on the button it will loose focus
 * - By default every button is of type="button" instead of "submit"
 */

var Button = function (_Component) {
  (0, _inherits3.default)(Button, _Component);

  function Button(properties) {
    (0, _classCallCheck3.default)(this, Button);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Button.__proto__ || (0, _getPrototypeOf2.default)(Button)).call(this, properties));

    _this._onFocus = function (event) {
      _this.focused = true;
      _this.forceUpdate();

      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    };

    _this._onBlur = function (event) {
      _this.focused = false;
      _this.setState({ isActive: false });

      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
    };

    _this._onMouseDown = function (event) {
      if (event.button === 0 && !_this.props.disabled) {
        _this.mouseDownOnButton = true;
      }

      if (_this.props.onMouseDown) {
        _this.props.onMouseDown(event);
      }
    };

    _this._onTouchStart = function (event) {
      if (!_this.props.disabled && event.touches.length === 1) {
        _this.setState({
          isActive: true,
          isIgnoringHover: true
        });
      }

      if (_this.props.onTouchStart) {
        _this.props.onTouchStart(event);
      }
    };

    _this._onTouchEnd = function (event) {
      _this.setState({
        isActive: false,
        isIgnoringHover: true
      });

      if (_this.props.onTouchEnd) {
        _this.props.onTouchEnd(event);
      }
    };

    _this._onTouchCancel = function (event) {
      _this.setState({
        isActive: false,
        isIgnoringHover: true
      });

      if (_this.props.onTouchEnd) {
        _this.props.onTouchEnd(event);
      }
    };

    _this._onMouseEnter = function (event) {
      if (!_this.state.isIgnoringHover) {
        _this.setState({
          isHovered: true,
          isIgnoringHover: false
        });
      }

      if (_this.props.onMouseEnter) {
        _this.props.onMouseEnter(event);
      }
    };

    _this._onMouseLeave = function (event) {
      _this.setState({
        isHovered: false
      });

      if (_this.props.onMouseLeave) {
        _this.props.onMouseLeave(event);
      }
    };

    _this.preventFocusStyleForTouchAndClick = (0, _has2.default)(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : _buttonConfig2.default.preventFocusStyleForTouchAndClick;

    _this.state = {
      childProps: sanitizeChildProps(properties),

      // used for touch devices like iOS Chrome/Safari where the active
      // pseudoClass is not supported on touch
      isActive: false,
      isHovered: false,

      // Note: On touch devices mouseEnter is fired while mouseLeave is not.
      // This would result in a hover effect that keeps active until another
      // element is focused on. This would result in the same behaviour as using
      // the :hover pseudo class. To prevent it from happening activating the
      // hover state is prevented when a touch event has been triggered before.
      // source: http://stackoverflow.com/a/22444532/837709
      isIgnoringHover: false
    };

    // The focused attribute is used to apply the one-time focus animation.
    // As it is reset after every render it can't be set inside state as this
    // would trigger an endless loop.
    _this.focused = false;

    // This used to determine if the one-time focus animation should be prevented.
    _this.mouseDownOnButton = false;
    return _this;
  }

  (0, _createClass3.default)(Button, [{
    key: 'componentWillMount',


    /*
     * Generates the style-id & inject the focus & active style.
     */
    value: function componentWillMount() {
      this.styleId = 'style-id' + (0, _uniqueId2.default)();
      updatePseudoClassStyle(this.styleId, this.props, this.preventFocusStyleForTouchAndClick);
    }

    /*
     * Update the childProps based on the updated properties of the button.
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      this.preventFocusStyleForTouchAndClick = (0, _has2.default)(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : _buttonConfig2.default.preventFocusStyleForTouchAndClick;

      this.setState({
        childProps: sanitizeChildProps(properties)
      });
      (0, _injectStyle.removeStyle)(this.styleId);
      updatePseudoClassStyle(this.styleId, properties, this.preventFocusStyleForTouchAndClick);
    }

    /*
     * Deactivate the focused attribute in order to make sure the focus animation
     * only runs once when the component is focused on & not after re-rendering
     * e.g when the user clicks the button.
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.focused = false;
      this.mouseDownOnButton = false;
    }

    /*
     * Remove a component's associated styles whenever it gets removed from the DOM.
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _injectStyle.removeStyle)(this.styleId);
    }

    /*
     * Activate the focused attribute used to determine when to show the
     * one-time focus animation and trigger a render.
     */


    /*
     * Deactivate the focused attribute used to determine when to show the
     * one-time focus animation and trigger a render.
     */


    /*
     * Updates the button to be pressed.
     */


    /*
     * Updates the button to be release.
     */


    /*
     * Updates the button to be release.
     */


    /*
     * As soon as the mouse enters the component the isHovered state is activated.
     */


    /*
     * Deactivate the isHovered state.
     */

  }, {
    key: 'render',
    value: function render() {
      var baseStyle = this.props.primary ? _buttonStyle2.default.primaryStyle : _buttonStyle2.default.style;
      var combinedStyle = (0, _assign2.default)({}, baseStyle, this.props.style);

      if (this.state.isHovered) {
        var baseHoverStyle = this.props.primary ? _buttonStyle2.default.primaryHoverStyle : _buttonStyle2.default.hoverStyle;
        combinedStyle = (0, _assign2.default)({}, combinedStyle, baseHoverStyle, this.props.hoverStyle);
      }

      if (this.props.disabled) {
        var baseDisabledStyle = this.props.primary ? _buttonStyle2.default.primaryDisabledStyle : _buttonStyle2.default.disabledStyle;
        combinedStyle = (0, _assign2.default)({}, combinedStyle, baseDisabledStyle, this.props.disabledStyle);
        if (this.state.isHovered) {
          var baseDisabledHoverStyle = this.props.primary ? _buttonStyle2.default.primaryDisabledHoverStyle : _buttonStyle2.default.disabledHoverStyle;
          combinedStyle = (0, _assign2.default)({}, combinedStyle, baseDisabledHoverStyle, this.props.disabledHoverStyle);
        }
      } else {
        if (this.state.isActive) {
          var baseActiveStyle = this.props.primary ? _buttonStyle2.default.primaryActiveStyle : _buttonStyle2.default.activeStyle;
          combinedStyle = (0, _assign2.default)({}, combinedStyle, baseActiveStyle, this.props.activeStyle);
        } else if (this.focused && !this.state.isActive && !this.mouseDownOnButton && this.preventFocusStyleForTouchAndClick) {
          var baseFocusStyle = this.props.primary ? _buttonStyle2.default.primaryFocusStyle : _buttonStyle2.default.focusStyle;
          combinedStyle = (0, _assign2.default)({}, combinedStyle, baseFocusStyle, this.props.focusStyle);
        }
      }

      return _react2.default.createElement(
        'button',
        (0, _assign2.default)({
          style: combinedStyle,
          className: (0, _unionClassNames2.default)(this.props.className, this.styleId),
          onTouchStart: this._onTouchStart,
          onTouchEnd: this._onTouchEnd,
          onTouchCancel: this._onTouchCancel,
          onFocus: this._onFocus,
          onBlur: this._onBlur,
          onMouseDown: this._onMouseDown,
          onMouseEnter: this._onMouseEnter,
          onMouseLeave: this._onMouseLeave,
          disabled: this.props.disabled,
          type: this.props.type
        }, this.state.childProps),
        this.props.children
      );
    }
  }]);
  return Button;
}(_react.Component);

Button.displayName = 'Button';
Button.propTypes = buttonPropTypes;
Button.defaultProps = {
  primary: false,
  disabled: false,
  type: 'button'
};
exports.default = Button;

//# sourceMappingURL=impl.js.map