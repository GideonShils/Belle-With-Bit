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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _injectStyle = require('bit/utils/inject-style');

var _omit = require('bit/utils/omit');

var _omit2 = _interopRequireDefault(_omit);

var _has = require('bit/utils/has');

var _has2 = _interopRequireDefault(_has);

var _last = require('bit/utils/last');

var _last2 = _interopRequireDefault(_last);

var _first = require('bit/utils/first');

var _first2 = _interopRequireDefault(_first);

var _uniqueId = require('bit/utils/unique-id');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _isComponentOfType = require('bit/utils/is-component-of-type');

var _isComponentOfType2 = _interopRequireDefault(_isComponentOfType);

var _animationFrameManagement = require('bit/utils/animation-frame-management');

var _unionClassNames = require('bit/utils/union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

var _toggleStyle = require('bit/style/toggle-style');

var _toggleStyle2 = _interopRequireDefault(_toggleStyle);

var _toggleConfig = require('bit/config/toggle-config');

var _toggleConfig2 = _interopRequireDefault(_toggleConfig);

var _choice = require('bit/components/choice');

var _choice2 = _interopRequireDefault(_choice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # Toggle Component
 * 
 * ## Properties:
 * * `{Boolean} defaultValue` (optional) - Behaves like the defaultChecked property of a checkbox in React.
 * * `{Boolean} value` (optional) - Behaves like the checked property of a checkbox in React.
 * * `{Boolean Reference} valueLink` (optional) - Behaves like the valueLink poperty of a React rendered checkbox. vlaueLink allows to enable two-way data binding between a state property and the value in the user interface.
 * * `{Function} onUpdate` (optional) - Callback executed every the toggle switches from true to false or the other way around via user input. onUpdate has one argument which is an object containing the value e.g. { value: true }.
 * * `{Object} activeHandleStyle` (optional) - Works like React's built-in style property except that it extends the properties from the base handleStyle. Becomes active once the user clicks or touches the toggle (including the first & second choice area).
 * * `{Object} firstChoiceStyle` (optional) - Works like React's built-in style property.
 * * `{Object} secondChoiceStyle` (optional) - Works like React's built-in style property.
 * * `{Object} disabledStyle` (optional) - Works like React's built-in style property except that it extends the properties from the base style. Becomes active once the Toggle is disabled via the disabled property.
 * * `{Object} disabledHandleStyle` (optional) - Works like React's built-in style property except that it extends the properties from the base handleStyle. Becomes active once the Toggle is disabled via the disabled property.
 * * `{Object} focusStyle` (optional) - Works like React's built-in style property except that it extends the properties from the base style. Becomes active once the Toggle is focused on. Only applies to the handle node.
 * * `{Object} handleStyle` (optional) - Works like React's built-in style property. Only applies to the handle node.
 * * `{Object} hoverHandleStyle` (optional) - Works like React's built-in style property except that it extends the properties from the base handleStyle. Becomes active once a user moves the mouse above the Toggle component. Only applies to the handle node.
 * * `{Object} sliderStyle` (optional) - Works like React's built-in style property. Only applies to the slider node.
 * * `{Boolean} disabled` (default: false) - If true the Toggle will be disabled and can't be changed by the user.
 * * `{Object} firstChoiceProps` (optional) - This object allows to provide any kind of valid properties for a div tag.
 * * `{Object} secondChoiceProps` (optional) - This object allows to provide any kind of valid properties for a div tag.
 * * `{Object} handleProps` (optional) - This object allows to provide any kind of valid properties for a div tag.
 * * `{Object} sliderProps` (optional) - This object allows to provide any kind of valid properties for a div tag.
 * * `{Object} sliderWrapperProps` (optional) - This object allows to provide any kind of valid properties for a div tag.
 * * Any property valid for a HTML div like style, id, className, onMouseDown, onTouchStart, ...
 * 
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/choice?_k=1fw1fq) documentation.
 * 
 * ## Standard example
 * ```js
 * <!-- toggle with custom choices -->
 * <Toggle defaultValue>
 * <Choice value>On</Choice>
 * <Choice value={ false }>Off</Choice>
 * </Toggle>
 * ```
 * 
 * ## Internal HTML Structure
 * ```js
 * <div style={ wrapperStyle }
 *    tabIndex={ tabIndex } >
 * <div ref={(c) => this.sliderWrapper = c}
 *      style={ sliderWrapperStyle }>
 *   <div style={ sliderStyle }>
 *     <div ref={(c) => this.firstChoice = c}
 *          style={ firstChoiceStyle }>
 *       <Choice />
 *     </div>
 *     <div ref={(c) => this.secondChoice = c}
 *          style={ secondChoiceStyle }>
 *       <Choice />
 *     </div>
 *   </div>
 * </div>
 * <div ref={(c) => this.handle = c}
 *      style={ handleStyle } />
 * </div>
 * ```
 * 
 * ## Toggle with custom choices
 * ```js
 * <!-- toggle with custom choices -->
 * <Toggle defaultValue
 *       firstChoiceStyle={{ backgroundColor: 'rgba(43, 176, 206, 0.8)' }}>
 * <Choice value>On</Choice>
 * <Choice value={ false }>Off</Choice>
 * </Toggle>
 * ```
 * 
 * ## Toggle with adopted size styling - using CSS 'transform' property
 * When you need to change the size of a component don't forget the CSS transform property. With the -ms- prefix transform is supported back to IE 9.
 * ```js
 * <Toggle style={{ transform: 'scale(0.6)' }} />
 * ```
 * 
 * ## Toggle with adopted size styling - using style properties
 * Toggle can also be re-sized by proportionately changing the size of all the components in structure of Toggle.
 * ```js
 * <Toggle style={{
 *         borderRadius: 10,
 *         height: 20,
 *         width: 50
 *       }}
 *       sliderStyle={{
 *         // Calculated with 2 * the width of choice area
 *         width: 80
 *       }}
 *       sliderWrapperStyle={{
 *         borderRadius: 10
 *       }}
 *       handleStyle={{
 *         borderRadius: 10,
 *         // 1 px smaller than the width due the border effect
 *         height: 19,
 *         width: 20
 *       }}
 *       firstChoiceStyle={{
 *         height: 20,
 *         // Calculated with the width of the whole toggle - half of the width from the handle
 *         width: 40,
 *         lineHeight: 20 + 'px',
 *         textIndent: -5,
 *         fontSize: 12
 *       }}
 *       secondChoiceStyle={{
 *         height: 20,
 *         // Calculated with the width of the whole toggle - half of the width from the handle
 *         // style.width - (handleStyle.width / 2 )
 *         width: 40,
 *         lineHeight: 20 + 'px',
 *         textIndent: 5,
 *         fontSize: 10
 *       }}
 *       activeHandleStyle={{
 *         height: 20
 *       }} />
 * ```
 * @bit
 */

/*
 * Verifies that the children is an array containing only two choices with a
 * different value.
 */
function validateChoices(props, propName, componentName) {
  var propValue = props[propName];
  if (!propValue) {
    return undefined;
  }

  if (!Array.isArray(propValue) || propValue.length !== 2) {
    return new Error('Invalid ' + propName + ' supplied to `' + componentName + '`, expected exactly two Choice components.');
  }

  for (var i = 0; i < propValue.length; ++i) {
    var item = propValue[i];
    if (!item || !(0, _isComponentOfType2.default)(_choice2.default, item)) {
      return new Error('Invalid ' + propName + '[' + i + '] supplied to `' + componentName + '`, expected a Choice component from Belle.');
    }
  }

  if ((0, _first2.default)(propValue).props.value === (0, _last2.default)(propValue).props.value) {
    return new Error('Invalid ' + propName + ' supplied to `' + componentName + '`, expected different value properties for the provided Choice components.');
  }

  return undefined;
}

var togglePropTypes = {
  activeHandleStyle: _react.PropTypes.object,
  children: validateChoices,
  className: _react.PropTypes.string,
  defaultValue: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  disabledHandleStyle: _react.PropTypes.object,
  disabledStyle: _react.PropTypes.object,
  firstChoiceProps: _react.PropTypes.object,
  firstChoiceStyle: _react.PropTypes.shape({
    width: _react.PropTypes.number
  }),
  focusStyle: _react.PropTypes.object,
  handleProps: _react.PropTypes.shape({
    onMouseDown: _react.PropTypes.func,
    onMouseMove: _react.PropTypes.func,
    onMouseUp: _react.PropTypes.func,
    onMouseLeave: _react.PropTypes.func,
    onTouchStart: _react.PropTypes.func,
    onTouchMove: _react.PropTypes.func,
    onTouchEnd: _react.PropTypes.func,
    onTouchCancel: _react.PropTypes.func
  }),
  handleStyle: _react.PropTypes.shape({
    height: _react.PropTypes.number,
    width: _react.PropTypes.number
  }),
  hoverHandleStyle: _react.PropTypes.object,
  onBlur: _react.PropTypes.func,
  onUpdate: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func,
  onMouseDown: _react.PropTypes.func,
  onMouseEnter: _react.PropTypes.func,
  onMouseLeave: _react.PropTypes.func,
  onMouseUp: _react.PropTypes.func,
  onTouchStart: _react.PropTypes.func,
  secondChoiceProps: _react.PropTypes.object,
  secondChoiceStyle: _react.PropTypes.shape({
    width: _react.PropTypes.number
  }),
  sliderProps: _react.PropTypes.shape({
    onClick: _react.PropTypes.func,
    onTouchStart: _react.PropTypes.func,
    onTouchMove: _react.PropTypes.func,
    onTouchEnd: _react.PropTypes.func,
    onTouchCancel: _react.PropTypes.func
  }),
  sliderStyle: _react.PropTypes.object,
  sliderWrapperProps: _react.PropTypes.object,
  sliderWrapperStyle: _react.PropTypes.object,
  style: _react.PropTypes.shape({
    width: _react.PropTypes.number
  }),
  value: _react.PropTypes.bool,
  valueLink: _react.PropTypes.shape({
    value: _react.PropTypes.bool.isRequired,
    requestChange: _react.PropTypes.func.isRequired
  }),
  wrapperProps: _react.PropTypes.object
};

function sanitizeChildProps(properties) {
  return (0, _omit2.default)(properties, (0, _keys2.default)(togglePropTypes));
}

function sanitizeSliderProps(properties) {
  return (0, _omit2.default)(properties, ['style', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel']);
}

function sanitizeSliderWrapperProps(properties) {
  return (0, _omit2.default)(properties, ['ref', 'style']);
}

function sanitizeChoiceProps(properties) {
  return (0, _omit2.default)(properties, ['ref', 'style']);
}

function sanitizeHandleProps(properties) {
  return (0, _omit2.default)(properties, ['onMouseDown', 'onMouseMove', 'onMouseUp', 'onMouseLeave', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel', 'ref', 'style']);
}

/*
 * Update focus style for the speficied styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param properties {object} - the components properties optionally containing custom styles
 */
function updatePseudoClassStyle(styleId, properties, preventFocusStyleForTouchAndClick) {
  var focusStyle = void 0;
  if (preventFocusStyleForTouchAndClick) {
    focusStyle = { outline: 0 };
  } else {
    focusStyle = (0, _assign2.default)({}, _toggleStyle2.default.focusStyle, properties.focusStyle);
  }

  var styles = [{
    id: styleId,
    style: focusStyle,
    pseudoClass: 'focus'
  }];

  (0, _injectStyle.injectStyles)(styles);
}

/*
 * Toggle component
 */

var Toggle = function (_Component) {
  (0, _inherits3.default)(Toggle, _Component);

  function Toggle(properties) {
    (0, _classCallCheck3.default)(this, Toggle);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Toggle.__proto__ || (0, _getPrototypeOf2.default)(Toggle)).call(this, properties));

    _initialiseProps.call(_this);

    var value = void 0;
    if ((0, _has2.default)(properties, 'valueLink')) {
      value = properties.valueLink.value;
    } else if ((0, _has2.default)(properties, 'value')) {
      value = properties.value;
    } else if ((0, _has2.default)(properties, 'defaultValue')) {
      value = properties.defaultValue;
    } else {
      value = false;
    }

    _this.state = {
      firstChoiceProps: sanitizeChoiceProps(properties.firstChoiceProps),
      childProps: sanitizeChildProps(properties),
      secondChoiceProps: sanitizeChoiceProps(properties.secondChoiceProps),
      handleProps: sanitizeHandleProps(properties.handleProps),
      isActive: false,
      isDraggingWithMouse: false,
      isDraggingWithTouch: false,
      sliderProps: sanitizeSliderProps(properties.sliderProps),
      sliderWrapperProps: sanitizeSliderWrapperProps(properties.sliderWrapperProps),
      value: value,
      wasFocusedWithClickOrTouch: false
    };

    _this._touchStartedAtSlider = false;
    _this._touchEndedNotInSlider = false;

    _this._preventTouchSwitch = false;

    _this._mouseDragStart = undefined;
    _this._mouseDragEnd = undefined;
    _this._preventMouseSwitch = false;

    // The isFocused attribute is used to apply the one-time focus animation.
    // As it is reset after every render it can't be set inside state as this
    // would trigger an endless loop.
    _this.isFocused = false;

    _this.preventFocusStyleForTouchAndClick = (0, _has2.default)(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : _toggleConfig2.default.preventFocusStyleForTouchAndClick;
    return _this;
  }

  (0, _createClass3.default)(Toggle, [{
    key: 'componentWillMount',


    /*
     * Generates the style-id & inject the focus style.
     */
    value: function componentWillMount() {
      var id = (0, _uniqueId2.default)();
      this.styleId = 'style-id' + id;
      updatePseudoClassStyle(this.styleId, this.props, this.preventFocusStyleForTouchAndClick);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      var newState = {
        firstChoiceProps: sanitizeChoiceProps(properties.firstChoiceProps),
        childProps: sanitizeChildProps(properties),
        secondChoiceProps: sanitizeChoiceProps(properties.secondChoiceProps),
        handleProps: sanitizeHandleProps(properties.handleProps),
        sliderProps: sanitizeSliderProps(properties.sliderProps),
        sliderWrapperProps: sanitizeSliderWrapperProps(properties.sliderWrapperProps)
      };

      if ((0, _has2.default)(properties, 'valueLink')) {
        newState.value = properties.valueLink.value;
      } else if ((0, _has2.default)(properties, 'value')) {
        newState.value = properties.value;
      }

      this.setState(newState);

      this.preventFocusStyleForTouchAndClick = (0, _has2.default)(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : _toggleConfig2.default.preventFocusStyleForTouchAndClick;

      (0, _injectStyle.removeStyle)(this.styleId);
      updatePseudoClassStyle(this.styleId, properties, this.preventFocusStyleForTouchAndClick);
    }

    /*
     * Deactivate the focused attribute in order to make sure the focus animation
     * only runs once when the component is focused on & not after re-rendering
     * e.g when the user clicks on the toggle.
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.isFocused = false;
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

  }, {
    key: '_onArrowLeftKeyDown',


    /*
     * Flip value in case it is false.
     */
    value: function _onArrowLeftKeyDown() {
      if (this.state.value === true) {
        this._triggerChange(false);
      }
    }

    /*
     * Flip value in case it is true.
     */

  }, {
    key: '_onArrowRightKeyDown',
    value: function _onArrowRightKeyDown() {
      if (this.state.value === false) {
        this._triggerChange(true);
      }
    }

    /*
     * Flip value and trigger change.
     */

  }, {
    key: '_onEnterOrSpaceKeyDown',
    value: function _onEnterOrSpaceKeyDown() {
      this._triggerChange(!this.state.value);
    }
  }, {
    key: '_getHandleHeight',
    value: function _getHandleHeight() {
      return (0, _has2.default)(this.props.handleStyle, 'height') ? this.props.handleStyle.height : _toggleStyle2.default.handleStyle.height;
    }
  }, {
    key: '_getHandleWidth',
    value: function _getHandleWidth() {
      return (0, _has2.default)(this.props.handleStyle, 'width') ? this.props.handleStyle.width : _toggleStyle2.default.handleStyle.width;
    }
  }, {
    key: '_getSliderOffset',
    value: function _getSliderOffset() {
      var firstChoiceWidth = (0, _has2.default)(this.props.firstChoiceStyle, 'width') ? this.props.firstChoiceStyle.width : _toggleStyle2.default.firstChoiceStyle.width;

      return firstChoiceWidth - this._getHandleWidth() / 2;
    }
  }, {
    key: '_getToggleWidth',
    value: function _getToggleWidth() {
      return (0, _has2.default)(this.props.style, 'width') ? this.props.style.width : _toggleStyle2.default.style.width;
    }
  }, {
    key: '_triggerChange',
    value: function _triggerChange(value) {
      if ((0, _has2.default)(this.props, 'valueLink')) {
        this.props.valueLink.requestChange(value);
        this.setState({
          isDraggingWithMouse: false,
          isDraggingWithTouch: false,
          isActive: false
        });
      } else if ((0, _has2.default)(this.props, 'value')) {
        this.setState({
          isDraggingWithMouse: false,
          isDraggingWithTouch: false,
          isActive: false
        });
      } else {
        this.setState({
          value: value,
          isDraggingWithMouse: false,
          isDraggingWithTouch: false,
          isActive: false
        });
      }

      if (this.props.onUpdate) {
        this.props.onUpdate({ value: value });
      }
    }
  }, {
    key: '_triggerUpdateComponentOnMouseMove',
    value: function _triggerUpdateComponentOnMouseMove(pageX) {
      var difference = pageX - this._mouseDragStart;

      if (this.state.value && this._mouseDragEnd && difference > this._mouseDragEnd) {
        this._preventMouseSwitch = true;
      } else if (!this.state.value && this._mouseDragEnd && difference < this._mouseDragEnd) {
        this._preventMouseSwitch = true;
      }

      this._mouseDragEnd = difference;

      if (difference < 0 || difference > this._getToggleWidth() - this._getHandleWidth()) return;

      this.setState({
        sliderOffset: difference
      });
    }
  }, {
    key: '_triggerUpdateComponentOnTouchMoveAtSlider',
    value: function _triggerUpdateComponentOnTouchMoveAtSlider(touch) {
      var touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
      var firstChoiceNode = _reactDom2.default.findDOMNode(this.firstChoice);
      var secondChoiceNode = _reactDom2.default.findDOMNode(this.secondChoice);

      this._touchEndedNotInSlider = touchedElement !== firstChoiceNode && touchedElement !== secondChoiceNode;
      if (this.state.isActive && this._touchEndedNotInSlider) {
        this.setState({ isActive: false });
      } else if (!this.state.isActive && !this._touchEndedNotInSlider) {
        this.setState({ isActive: true });
      }
    }
  }, {
    key: '_triggerUpdateComponentOnTouchMoveAtHandle',
    value: function _triggerUpdateComponentOnTouchMoveAtHandle(touch) {
      var sliderWrapperNode = _reactDom2.default.findDOMNode(this.sliderWrapper);
      var rect = sliderWrapperNode.getBoundingClientRect();
      var difference = touch.pageX - this._touchDragStart;
      var horizontalTolerance = this._getHandleWidth() * 2;
      var verticalTolerance = this._getHandleHeight() * 2;

      // touch left the allowed handle drag area
      if (touch.clientX < rect.left - horizontalTolerance || touch.clientX > rect.right + horizontalTolerance || touch.clientY < rect.top - verticalTolerance || touch.clientY > rect.bottom + verticalTolerance) {
        if (this._preventTouchSwitch) {
          var value = difference > this._getHandleWidth() / 2;
          this._triggerChange(value);
        } else {
          this._triggerChange(!this.state.value);
        }
      } else if (this.state.isDraggingWithTouch) {
        // is still dragging
        if (this.state.value && this._touchDragEnd && difference > this._touchDragEnd) {
          this._preventTouchSwitch = true;
        } else if (!this.state.value && this._touchDragEnd && difference < this._touchDragEnd) {
          this._preventTouchSwitch = true;
        }

        if (difference < 0 || difference > this._getToggleWidth() - this._getHandleWidth()) return;

        this._touchDragEnd = difference;
        this.setState({
          sliderOffset: difference
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var wrapperStyle = (0, _assign2.default)({}, _toggleStyle2.default.style, this.props.style);

      if (this.isFocused && !this.state.wasFocusedWithClickOrTouch) {
        wrapperStyle = (0, _assign2.default)({}, wrapperStyle, _toggleStyle2.default.focusStyle, this.props.focusStyle);
      }

      var computedSliderStyle = void 0;
      var handleStyle = void 0;

      var sliderWrapperStyle = (0, _assign2.default)({}, _toggleStyle2.default.sliderWrapperStyle, this.props.sliderWrapperStyle);
      var defaultSliderOffset = this._getSliderOffset();

      if (this.state.isDraggingWithMouse || this.state.isDraggingWithTouch) {
        computedSliderStyle = (0, _assign2.default)({}, _toggleStyle2.default.sliderStyle, this.props.sliderStyle, {
          left: this.state.sliderOffset - defaultSliderOffset,
          transition: 'none'
        });

        // right now even when handle is clicked, it momentarily shows this grabbing styles
        // may be this.state.isDraggingWithMouse should be set to true only after mouse movement starts
        var activeStyle = (0, _assign2.default)({}, _toggleStyle2.default.activeHandleStyle, this.props.handleStyle);
        handleStyle = (0, _assign2.default)({}, _toggleStyle2.default.handleStyle, activeStyle, this.props.activeHandleStyle, {
          left: this.state.sliderOffset,
          transition: activeStyle.transition ? activeStyle.transition : 'none'
        });
      } else {
        handleStyle = (0, _assign2.default)({}, _toggleStyle2.default.handleStyle, this.props.handleStyle);
        computedSliderStyle = (0, _assign2.default)({}, _toggleStyle2.default.sliderStyle, {
          left: this.state.value ? 0 : -defaultSliderOffset
        });

        if (this.state.isActive) {
          handleStyle = (0, _assign2.default)({}, handleStyle, _toggleStyle2.default.activeHandleStyle, this.props.activeHandleStyle);
        } else if (this.state.isHovered) {
          handleStyle = (0, _assign2.default)({}, handleStyle, _toggleStyle2.default.hoverHandleStyle, this.props.hoverHandleStyle);
        }

        var position = {
          left: this.state.value ? defaultSliderOffset : 0
        };
        handleStyle = (0, _assign2.default)({}, handleStyle, position);
      }

      var computedTrueChoice = (0, _first2.default)(this.props.children) ? (0, _first2.default)(this.props.children) : '✓';
      var computedFalseChoice = (0, _last2.default)(this.props.children) ? (0, _last2.default)(this.props.children) : '✘';

      var computedTrueChoiceStyle = (0, _assign2.default)({}, _toggleStyle2.default.firstChoiceStyle, this.props.firstChoiceStyle);
      var computedFalseChoiceStyle = (0, _assign2.default)({}, _toggleStyle2.default.secondChoiceStyle, this.props.secondChoiceStyle);

      var hasCustomTabIndex = this.props.wrapperProps && this.props.wrapperProps.tabIndex;
      var tabIndex = hasCustomTabIndex ? this.props.wrapperProps.tabIndex : '0';
      if (this.props.disabled) {
        tabIndex = -1;
        wrapperStyle = (0, _assign2.default)({}, wrapperStyle, _toggleStyle2.default.disabledStyle, this.props.disabledStyle);
        handleStyle = (0, _assign2.default)({}, handleStyle, _toggleStyle2.default.disabledHandleStyle, this.props.disabledHandleStyle);
      }

      var role = (0, _has2.default)(this.state.childProps, 'role') ? this.state.childProps.role : 'checkbox';

      return _react2.default.createElement(
        'div',
        (0, _assign2.default)({
          style: wrapperStyle,
          tabIndex: tabIndex,
          className: (0, _unionClassNames2.default)(this.props.className, this.styleId),
          onKeyDown: this._onKeyDown,
          onMouseDown: this._onMouseDownOnWrapper,
          onMouseUp: this._onMouseUpOnWrapper,
          onTouchStart: this._onTouchStartOnWrapper,
          onFocus: this._onFocus,
          onBlur: this._onBlur,
          onMouseEnter: this._onMouseEnterAtSliderWrapper,
          onMouseLeave: this._onMouseLeaveAtSliderWrapper,
          role: role,
          'aria-checked': this.state.value
        }, this.state.childProps),
        _react2.default.createElement(
          'div',
          (0, _assign2.default)({
            style: sliderWrapperStyle,
            ref: function ref(c) {
              return _this2.sliderWrapper = c;
            }
          }, this.state.sliderWrapperProps),
          _react2.default.createElement(
            'div',
            (0, _assign2.default)({
              style: computedSliderStyle,
              onClick: this._onClickAtSlider,
              onTouchStart: this._onTouchStartAtSlider,
              onTouchMove: this._onTouchMoveAtSlider,
              onTouchEnd: this._onTouchEndAtSlider,
              onTouchCancel: this._onTouchCancelAtSlider
            }, this.state.sliderProps),
            _react2.default.createElement(
              'div',
              (0, _assign2.default)({
                ref: function ref(c) {
                  return _this2.firstChoice = c;
                },
                style: computedTrueChoiceStyle
              }, this.state.firstChoiceProps),
              computedTrueChoice
            ),
            _react2.default.createElement(
              'div',
              (0, _assign2.default)({
                ref: function ref(c) {
                  return _this2.secondChoice = c;
                },
                style: computedFalseChoiceStyle
              }, this.state.secondChoiceProps),
              computedFalseChoice
            )
          )
        ),
        _react2.default.createElement('div', (0, _assign2.default)({
          ref: function ref(c) {
            return _this2.handle = c;
          },
          style: handleStyle,
          onMouseDown: this._onMouseDownOnHandle,
          onMouseMove: this._onMouseMoveOnHandle,
          onMouseUp: this._onMouseUpOnHandle,
          onMouseLeave: this._onMouseLeaveOnHandle,
          onTouchStart: this._onTouchStartHandle,
          onTouchMove: this._onTouchMoveHandle,
          onTouchEnd: this._onTouchEndHandle,
          onTouchCancel: this._onTouchCancelHandle
        }, this.state.handleProps))
      );
    }
  }]);
  return Toggle;
}(_react.Component);

Toggle.displayName = 'Toggle';
Toggle.propTypes = togglePropTypes;
Toggle.defaultProps = {
  disabled: false
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this._onFocus = function (event) {
    if (!_this3.props.disabled) {
      _this3.isFocused = true;
      _this3.forceUpdate();
    }

    if (_this3.props.onFocus) {
      _this3.props.onFocus(event);
    }
  };

  this._onBlur = function (event) {
    _this3.isFocused = false;
    _this3.setState({ wasFocusedWithClickOrTouch: false });

    if (_this3.props.onBlur) {
      _this3.props.onBlur(event);
    }
  };

  this._onMouseDownOnWrapper = function (event) {
    if (!_this3.props.disabled) {
      _this3.setState({ wasFocusedWithClickOrTouch: true, isActive: true });
    }

    if (_this3.props.onMouseDown) {
      _this3.props.onMouseDown(event);
    }
  };

  this._onMouseUpOnWrapper = function (event) {
    if (!_this3.props.disabled) {
      _this3.setState({ isActive: false });
    }

    if (_this3.props.onMouseUp) {
      _this3.props.onMouseUp(event);
    }
  };

  this._onTouchStartOnWrapper = function (event) {
    if (!_this3.props.disabled) {
      _this3.setState({ wasFocusedWithClickOrTouch: true });
    }

    if (_this3.props.onTouchStart) {
      _this3.props.onTouchStart(event);
    }
  };

  this._onClickAtSlider = function (event) {
    if (!_this3.props.disabled) {
      _this3._triggerChange(!_this3.state.value);
    }

    if (_this3.props.sliderProps && _this3.props.sliderProps.onClick) {
      _this3.props.sliderProps.onClick(event);
    }
  };

  this._onMouseDownOnHandle = function (event) {
    // check for left mouse button pressed
    if (event.button === 0 && !_this3.props.disabled) {
      var defaultSliderOffset = _this3._getSliderOffset();
      _this3._mouseDragStart = event.pageX - (_this3.state.value ? defaultSliderOffset : 0);
      _this3._preventMouseSwitch = false;

      _this3.setState({
        isDraggingWithMouse: true,
        sliderOffset: _this3.state.value ? defaultSliderOffset : 0
      });
    }

    if (_this3.props.handleProps && _this3.props.handleProps.onMouseDown) {
      _this3.props.handleProps.onMouseDown(event);
    }
  };

  this._onMouseMoveOnHandle = function (event) {
    if (_this3.state.isDraggingWithMouse && !_this3.props.disabled) {
      // the requestAnimationFrame function must be executed in the context of window
      // see http://stackoverflow.com/a/9678166/837709
      var animationFrame = _animationFrameManagement.requestAnimationFrame.call(window, _this3._triggerUpdateComponentOnMouseMove.bind(_this3, event.pageX));

      if (_this3.previousMouseMoveFrame) {
        // the cancelAnimationFrame function must be executed in the context of window
        // see http://stackoverflow.com/a/9678166/837709
        _animationFrameManagement.cancelAnimationFrame.call(window, _this3.previousMouseMoveFrame);
      }

      _this3.previousMouseMoveFrame = animationFrame;
    }

    if (_this3.props.handleProps && _this3.props.handleProps.onMouseMove) {
      _this3.props.handleProps.onMouseMove(event);
    }
  };

  this._onMouseUpOnHandle = function (event) {
    if (!_this3.props.disabled) {
      if (_this3._mouseDragEnd) {
        if (!_this3._preventMouseSwitch) {
          _this3._triggerChange(!_this3.state.value);
        } else if (_this3._preventMouseSwitch) {
          var value = _this3._mouseDragEnd > _this3._getHandleWidth() / 2;
          _this3._triggerChange(value);
        }
      } else {
        _this3._triggerChange(!_this3.state.value);
      }
    }

    _this3._mouseDragStart = undefined;
    _this3._mouseDragEnd = undefined;
    _this3._preventMouseSwitch = false;

    if (_this3.props.handleProps && _this3.props.handleProps.onMouseUp) {
      _this3.props.handleProps.onMouseUp(event);
    }
  };

  this._onMouseLeaveOnHandle = function (event) {
    if (!_this3.props.disabled) {
      if (_this3._mouseDragStart && !_this3._preventMouseSwitch) {
        _this3._triggerChange(!_this3.state.value);
      } else if (_this3._mouseDragStart && _this3._preventMouseSwitch) {
        var value = _this3._mouseDragEnd > _this3._getHandleWidth() / 2;
        _this3._triggerChange(value);
      } else {
        _this3.setState({ isActive: false });
      }
    }

    _this3._mouseDragStart = undefined;
    _this3._mouseDragEnd = undefined;
    _this3._preventMouseSwitch = false;

    if (_this3.props.handleProps && _this3.props.handleProps.onMouseLeave) {
      _this3.props.handleProps.onMouseLeave(event);
    }
  };

  this._onTouchStartAtSlider = function (event) {
    if (event.touches.length === 1 && !_this3.props.disabled) {
      _this3._touchStartedAtSlider = true;
      _this3.setState({
        isActive: true
      });
    }

    if (_this3.props.sliderProps && _this3.props.sliderProps.onTouchStart) {
      _this3.props.sliderProps.onTouchStart(event);
    }
  };

  this._onTouchMoveAtSlider = function (event) {
    if (event.touches.length === 1 && _this3._touchStartedAtSlider && !_this3.props.disabled) {
      // the requestAnimationFrame function must be executed in the context of window
      // see http://stackoverflow.com/a/9678166/837709
      var animationFrame = _animationFrameManagement.requestAnimationFrame.call(window, _this3._triggerUpdateComponentOnTouchMoveAtSlider.bind(_this3, event.touches[0]));

      if (_this3.previousTouchMoveAtSliderFrame) {
        // the cancelAnimationFrame function must be executed in the context of window
        // see http://stackoverflow.com/a/9678166/837709
        _animationFrameManagement.cancelAnimationFrame.call(window, _this3.previousTouchMoveAtSliderFrame);
      }

      _this3.previousTouchMoveAtSliderFrame = animationFrame;
    }

    if (_this3.props.sliderProps && _this3.props.sliderProps.onTouchMove) {
      _this3.props.sliderProps.onTouchMove(event);
    }
  };

  this._onTouchEndAtSlider = function (event) {
    // prevent the onClick to happen
    event.preventDefault();

    if (_this3._touchStartedAtSlider && !_this3._touchEndedNotInSlider && !_this3.props.disabled) {
      _this3.setState({
        isActive: false
      });
      _this3._triggerChange(!_this3.state.value);
    } else {
      _this3.setState({ isActive: false });
    }

    _this3._touchStartedAtSlider = false;
    _this3._touchEndedNotInSlider = false;

    if (_this3.props.sliderProps && _this3.props.sliderProps.onTouchEnd) {
      _this3.props.sliderProps.onTouchEnd(event);
    }
  };

  this._onTouchCancelAtSlider = function (event) {
    _this3.setState({ isActive: false });
    _this3._touchStartedAtSlider = false;
    _this3._touchEndedNotInSlider = false;

    if (_this3.props.sliderProps && _this3.props.sliderProps.onTouchCancel) {
      _this3.props.sliderProps.onTouchCancel(event);
    }
  };

  this._onTouchStartHandle = function (event) {
    event.preventDefault();

    // check for one touch as multiple could be browser gestures and only one
    // is relevant for us
    if (event.touches.length === 1 && !_this3.props.disabled) {
      _this3._preventTouchSwitch = false;

      var defaultSliderOffset = _this3._getSliderOffset();
      _this3.setState({
        isDraggingWithTouch: true,
        sliderOffset: _this3.state.value ? defaultSliderOffset : 0
      });

      _this3._touchDragStart = event.touches[0].pageX - (_this3.state.value ? defaultSliderOffset : 0);
    }

    if (_this3.props.handleProps && _this3.props.handleProps.onTouchStart) {
      _this3.props.handleProps.onTouchStart(event);
    }
  };

  this._onTouchMoveHandle = function (event) {
    if (event.touches.length === 1 && _this3.state.isDraggingWithTouch && !_this3.props.disabled) {
      // the requestAnimationFrame function must be executed in the context of window
      // see http://stackoverflow.com/a/9678166/837709
      var animationFrame = _animationFrameManagement.requestAnimationFrame.call(window, _this3._triggerUpdateComponentOnTouchMoveAtHandle.bind(_this3, event.touches[0]));

      if (_this3.previousTouchMoveAtHandleFrame) {
        // the cancelAnimationFrame function must be executed in the context of window
        // see http://stackoverflow.com/a/9678166/837709
        _animationFrameManagement.cancelAnimationFrame.call(window, _this3.previousTouchMoveAtHandleFrame);
      }

      _this3.previousTouchMoveAtHandleFrame = animationFrame;
    }

    if (_this3.props.handleProps && _this3.props.handleProps.onTouchMove) {
      _this3.props.handleProps.onTouchMove(event);
    }
  };

  this._onTouchEndHandle = function (event) {
    // prevent the onClick to happen
    event.preventDefault();

    if (_this3.state.isDraggingWithTouch && !_this3.props.disabled) {
      // no click & move was involved
      if (_this3._touchDragEnd) {
        if (_this3._preventTouchSwitch) {
          var value = _this3._touchDragEnd > _this3._getHandleWidth() / 2;
          _this3._triggerChange(value);
        } else {
          _this3._triggerChange(!_this3.state.value);
        }
      } else {
        // click like
        _this3._triggerChange(!_this3.state.value);
      }
    } else {
      _this3.setState({
        isActive: false,
        isDraggingWithTouch: false
      });
    }

    _this3._touchDragStart = undefined;
    _this3._touchDragEnd = undefined;
    _this3._preventTouchSwitch = false;

    if (_this3.props.handleProps && _this3.props.handleProps.onTouchEnd) {
      _this3.props.handleProps.onTouchEnd(event);
    }
  };

  this._onTouchCancelHandle = function (event) {
    _this3.setState({
      isDraggingWithTouch: false
    });
    _this3._touchDragStart = undefined;
    _this3._touchDragEnd = undefined;
    _this3._preventTouchSwitch = false;

    if (_this3.props.handleProps && _this3.props.handleProps.onTouchCancel) {
      _this3.props.handleProps.onTouchCancel(event);
    }
  };

  this._onKeyDown = function (event) {
    if (!_this3.props.disabled) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        _this3._onArrowLeftKeyDown();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        _this3._onArrowRightKeyDown();
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        _this3._onEnterOrSpaceKeyDown();
      }
    }

    if (_this3.props.onKeyDown) {
      _this3.props.onKeyDown(event);
    }
  };

  this._onMouseEnterAtSliderWrapper = function () {
    _this3.setState({
      isHovered: true
    });
    if (_this3.props.onMouseEnter) {
      _this3.props.onMouseEnter(event);
    }
  };

  this._onMouseLeaveAtSliderWrapper = function () {
    _this3.setState({
      isHovered: false,
      isActive: false
    });
    if (_this3.props.onMouseLeave) {
      _this3.props.onMouseLeave(event);
    }
  };
};

exports.default = Toggle;

//# sourceMappingURL=impl.js.map