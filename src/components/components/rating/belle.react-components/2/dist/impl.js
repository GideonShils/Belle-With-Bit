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

var _exenv = require('exenv');

var _omit = require('bit/utils/omit');

var _omit2 = _interopRequireDefault(_omit);

var _has = require('bit/utils/has');

var _has2 = _interopRequireDefault(_has);

var _uniqueId = require('bit/utils/unique-id');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _ratingStyle = require('bit/style/rating-style');

var _ratingStyle2 = _interopRequireDefault(_ratingStyle);

var _injectStyle = require('bit/utils/inject-style');

var _unionClassNames = require('bit/utils/union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

var _ratingConfig = require('bit/config/rating-config');

var _ratingConfig2 = _interopRequireDefault(_ratingConfig);

var _animationFrameManagement = require('bit/utils/animation-frame-management');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # Rating Component
 * The component leverages 5 characters (by default stars) to allow the user to rate.
 * 
 * ## Properties:
 * * `{Value Reference} valueLink` (optional) - Behaves like the valueLink poperty of a native input-tag. ValueLink allows to enable two-way data binding between a state property and the value in the user interface.
 * * `{Integer (1-5)} defaultValue` (optional) - Behaves like the defaultValue poperty of a native input-tag. The rating can be manipulated through the user interface.
 * * `{Integer (1-5)} value` (optional) - Behaves like the value poperty of a native input-tag. The rating can not be manipulated through the user interface.
 * * `{Function} onUpdate` (optional) - Callback executed when a user changes the rating via the user interface. onUpdate has one argument which is an object containing the value e.g. { value: 3 }.
 * * `{Boolean} disabled` (optional) - Can be used to disable rating component.
 * * `{Boolean} preventFocusStyleForTouchAndClick` (optional. default: true) - Prevents the focus style being applied in case the buttons becomes focused by a click or touch.
 * * `{Character} character` (optional. default: '★') - Rating character used in the component.
 * * `{Object} characterStyle` (optional) - The property can be used to specify styling of set rating values and will be applied to the spans wrapping the characters. Behaves like React's built-in style property.
 * * `{Object} hoverCharacterStyle` (optional) - The property can be used to specify styling of set rating values when a user hover them. These styles will be applied to the spans wrapping the characters. Works like React's built-in style property except that it extends the properties from the base characterStyle.
 * * `{Object} activeCharacterStyle` (optional) - The property can be used to specify styling of set rating values when a user touches or presses the rating. These styles will be applied to the spans wrapping the characters. Works like React's built-in style property except that it extends the properties from the base characterStyle.
 * * `{Object} focusStyle` (optional) - The property is used to apply a focus style directly to the wrapper. Works like React's built-in style property except that it extends the properties from the base style.
 * * `{Object} disabledStyle` (optional) - The property is used to apply a style directly to the wrapper applied when the component is disabled. Works like React's built-in style property except that it extends the properties from the base style.
 * * `{Object} hoverStyle` (optional) - The property is used to apply a style directly to the wrapper applied when the component is hovered. Works like React's built-in style property except that it extends the properties from the base style.
 * * `{Object} disabledHoverStyle` (optional) - The property is used to apply a style directly to the wrapper applied when the component is disabled and is hovered. Works like React's built-in style property except that it extends the properties from the base style.
 * * `{Object} wrapperProps` (optional) - This object allows to provide any kind of valid properties for a div tag. It allows to extend the div wrapping the whole rating component.
 * * `{Object} characterProp` (optional) - The property can be used to specify any other properties specific to rating character apart from styling. They will be applied to the span wrapping the character.
 * * Other supported properties include: tabIndex, style, className, focusStyle, onMouseDown, onMouseUp, onMouseEnter, onMouseMove, onMouseLeave, onTouchStart, onTouchMove, onTouchEnd, onTouchCancel, onFocus, onBlur, onClick, onKeyDown
 * 
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/rating?_k=865mcf) documentation.
 * 
 * ## Standard example
 * ```js
 * <Rating defaultValue={3}></Rating>
 * ```
 * 
 * ## Disabled Rating
 * ```js
 * <Rating defaultValue={4} disabled></Rating>
 * ```
 * 
 * ## Rating with a custom character
 * ```js
 * <Rating defaultValue={4} character={'✪'}></Rating>
 * ```
 * 
 * ## Controlled Rating Component with a Reset Link
 * Reset rating functionality can be implemented using controlled rating component like this:
 * ```js
 * <Rating valueLink={ this.linkState('customRatingValue') } />
 *
 * <a onClick={ this._resetRating }
 *  style={{
 *    marginLeft: 20,
 *    position: 'relative',
 *    top: -5,
 *    textDecoration: 'underline',
 *    cursor: 'pointer'
 *   }}>Reset</a>
 *
 * _resetRating() {
 * this.setState({
 *   customRatingValue: undefined
 * });
 * }
 * ```
 * @bit
 */

var ratingPropTypes = {
  defaultValue: _react.PropTypes.oneOf([1, 2, 3, 4, 5]),
  value: _react.PropTypes.oneOf([1, 2, 3, 4, 5]),
  valueLink: _react.PropTypes.shape({
    value: _react.PropTypes.oneOf([1, 2, 3, 4, 5]),
    requestChange: _react.PropTypes.func.isRequired
  }),
  disabled: _react.PropTypes.bool,
  tabIndex: _react.PropTypes.number,
  character: _react.PropTypes.string,
  characterProps: _react.PropTypes.object,
  preventFocusStyleForTouchAndClick: _react.PropTypes.bool,
  'aria-label': _react.PropTypes.string,
  style: _react.PropTypes.object,
  className: _react.PropTypes.string,
  focusStyle: _react.PropTypes.object,
  disabledStyle: _react.PropTypes.object,
  hoverStyle: _react.PropTypes.object,
  disabledHoverStyle: _react.PropTypes.object,
  characterStyle: _react.PropTypes.object,
  activeCharacterStyle: _react.PropTypes.object,
  hoverCharacterStyle: _react.PropTypes.object,
  onUpdate: _react.PropTypes.func,
  onMouseDown: _react.PropTypes.func,
  onMouseUp: _react.PropTypes.func,
  onMouseEnter: _react.PropTypes.func,
  onMouseMove: _react.PropTypes.func,
  onMouseLeave: _react.PropTypes.func,
  onTouchStart: _react.PropTypes.func,
  onTouchMove: _react.PropTypes.func,
  onTouchEnd: _react.PropTypes.func,
  onTouchCancel: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func
};

/*
 * sanitize properties for the wrapping div.
 */
function sanitizeWrapperProps(properties) {
  return (0, _omit2.default)(properties, (0, _keys2.default)(ratingPropTypes));
}

/*
 * sanitize properties for the character span.
 */
function sanitizeCharacterProps(properties) {
  return (0, _omit2.default)(properties, ['data-belle-value', 'style']);
}

/*
 * Injects pseudo classes for styles into the DOM.
 */
function updatePseudoClassStyle(ratingWrapperStyleId, properties, preventFocusStyleForTouchAndClick) {
  var ratingFocusStyle = void 0;
  if (preventFocusStyleForTouchAndClick) {
    ratingFocusStyle = { outline: 0 };
  } else {
    ratingFocusStyle = (0, _assign2.default)({}, _ratingStyle2.default.focusStyle, properties.focusStyle);
  }

  var styles = [{
    id: ratingWrapperStyleId,
    style: ratingFocusStyle,
    pseudoClass: 'focus'
  }];
  (0, _injectStyle.injectStyles)(styles);
}

/*
 * Rating component
 */

var Rating = function (_Component) {
  (0, _inherits3.default)(Rating, _Component);

  function Rating(properties) {
    (0, _classCallCheck3.default)(this, Rating);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Rating.__proto__ || (0, _getPrototypeOf2.default)(Rating)).call(this, properties));

    _initialiseProps.call(_this);

    var value = void 0;

    if ((0, _has2.default)(properties, 'valueLink')) {
      value = properties.valueLink.value;
    } else if ((0, _has2.default)(properties, 'value')) {
      value = properties.value;
    } else if ((0, _has2.default)(properties, 'defaultValue')) {
      value = properties.defaultValue;
    }

    _this.state = {
      value: value,
      focusedValue: undefined,
      generalProps: sanitizeWrapperProps(properties),
      characterProps: sanitizeCharacterProps(properties.characterProps),
      isFocus: false,
      isActive: false
    };

    _this.preventFocusStyleForTouchAndClick = (0, _has2.default)(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : _ratingConfig2.default.preventFocusStyleForTouchAndClick;
    return _this;
  }

  /*
   * Setting default prop values.
   */


  (0, _createClass3.default)(Rating, [{
    key: 'componentWillMount',


    /*
     * Apply pseudo class styling to the wrapper div.
     */
    value: function componentWillMount() {
      var id = (0, _uniqueId2.default)();
      this.ratingWrapperStyleId = 'rating-wrapper-style-id' + id;
      updatePseudoClassStyle(this.ratingWrapperStyleId, this.props, this.preventFocusStyleForTouchAndClick);

      if (_exenv.canUseDOM) {
        this.mouseUpOnDocumentCallback = this._onMouseUpOnDocument;
        document.addEventListener('mouseup', this.mouseUpOnDocumentCallback);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      var newState = {
        wrapperProps: sanitizeWrapperProps(properties),
        characterProps: sanitizeCharacterProps(properties.characterProps)
      };

      if (properties.valueLink) {
        newState.value = properties.valueLink.value;
      } else if (properties.value) {
        newState.value = properties.value;
      }

      this.setState(newState);

      this.preventFocusStyleForTouchAndClick = (0, _has2.default)(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : _ratingConfig2.default.preventFocusStyleForTouchAndClick;

      (0, _injectStyle.removeStyle)(this.ratingWrapperStyleId);
      updatePseudoClassStyle(this.ratingWrapperStyleId, properties, this.preventFocusStyleForTouchAndClick);
    }

    /*
     * Removes pseudo classes from the DOM once component gets removed.
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _injectStyle.removeStyle)(this.ratingWrapperStyleId);
      if (_exenv.canUseDOM) {
        document.removeEventListener('mouseup', this.mouseUpOnDocumentCallback);
      }
    }

    /*
     * As soon as the mouse enters the component the focusedValue is updated based
     * on the value of the targeted span.
     */


    /*
     * As the mouse moved over the component and enters a new star the focusedValue
     * is updated based on the value of the targeted span.
     */


    /*
     * Resets the component as the mouse leaves the hover area.
     */


    /*
     * Sets isActive state to true.
     */


    /*
     * Sets isActive state to false.
     */


    /*
     * Change focusValue and sets isActive state to true.
     */


    /*
     * set the focusedValue depending on mouse position
     */


    /*
     * update the component when touch ends
     */


    /*
     * reset the component in case of touch cancel
     */


    /*
     * reset the component on blur
     */


    /*
     * enable focus styling of component when tab is used to focus component
     */


    /*
     * Manages the keyboard events.
     *
     * In case the Rating Component is in focus Space, ArrowUp will result in increasing the value and arrow down will result in decreasing the value.
     * Enter/ space will result in updating the value of the component.
     *
     * Pressing Escape will reset the value to last value.
     *
     */


    /*
     * decrease the value by 1 when arrow down key is pressed
     */


    /*
     * increase value by 1 when arrow up key is pressed
     */


    /*
     * set component value to current focus value
     */


    /*
     * reset component when escape key is pressed
     * esc key should just reset the component displayed rating without removing hover or focus styles
     */

  }, {
    key: '_getCurrentValue',


    /*
     * Returns current value of rating to be displayed on the component
     */
    value: function _getCurrentValue() {
      var value = void 0;
      if (this.state.focusedValue !== undefined) {
        value = this.state.focusedValue;
      } else {
        value = this.state.value ? this.state.value : 0;
      }

      return value;
    }

    /*
     * The function will be passed to requestAnimationFrame for touchMove
     */

  }, {
    key: '_triggerComponentUpdateOnTouchMove',
    value: function _triggerComponentUpdateOnTouchMove(touches) {
      var touchedElement = document.elementFromPoint(touches.clientX, touches.clientY);
      var value = Number(touchedElement.getAttribute('data-belle-value'));
      if (value && this.state.focusedValue !== value) {
        this.setState({
          focusedValue: value
        });
      }
    }

    /*
     * update component when component is clicked, touch ends, enter or space key are hit
     * different update logic will apply depending on whether component has property defaultValue, value or valueLink specified
     */

  }, {
    key: '_triggerComponentUpdate',
    value: function _triggerComponentUpdate(value) {
      if ((0, _has2.default)(this.props, 'valueLink')) {
        this.props.valueLink.requestChange(value);
        this.setState({
          focusedValue: undefined,
          isActive: false
        });
      } else if ((0, _has2.default)(this.props, 'value')) {
        this.setState({
          focusedValue: undefined,
          isActive: false
        });
      } else {
        this.setState({
          focusedValue: undefined,
          isActive: false,
          value: value
        });
      }

      if (this.props.onUpdate) {
        this.props.onUpdate({ value: value });
      }
    }

    /*
     * Returns the HTML function to be rendered by this component.
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var currentValue = this._getCurrentValue();
      var tabIndex = !this.props.disabled ? this.props.tabIndex : -1;

      var characterStyle = (0, _assign2.default)({}, _ratingStyle2.default.characterStyle, this.props.characterStyle);

      if (this.state.isActive) {
        characterStyle = (0, _assign2.default)({}, characterStyle, _ratingStyle2.default.activeCharacterStyle, this.props.activeCharacterStyle);
      } else if (this.state.isHover) {
        characterStyle = (0, _assign2.default)({}, characterStyle, _ratingStyle2.default.hoverCharacterStyle, this.props.hoverCharacterStyle);
      }

      var wrapperStyle = (0, _assign2.default)({}, _ratingStyle2.default.style, this.props.style);
      if (this.props.disabled) {
        wrapperStyle = (0, _assign2.default)({}, wrapperStyle, _ratingStyle2.default.disabledStyle, this.props.disabledStyle);
        if (this.state.isHover) {
          wrapperStyle = (0, _assign2.default)({}, wrapperStyle, _ratingStyle2.default.disabledHoverStyle, this.props.disabledHoverStyle);
        }
      } else {
        if (this.state.isFocus && this.preventFocusStyleForTouchAndClick) {
          wrapperStyle = (0, _assign2.default)({}, wrapperStyle, _ratingStyle2.default.focusStyle, this.props.focusStyle);
        }

        if (this.state.isHover) {
          wrapperStyle = (0, _assign2.default)({}, wrapperStyle, _ratingStyle2.default.hoverStyle, this.props.hoverStyle);
        }
      }

      return _react2.default.createElement(
        'div',
        (0, _assign2.default)({
          ref: function ref(c) {
            return _this2.wrapper = c;
          },
          style: wrapperStyle,
          className: (0, _unionClassNames2.default)(this.props.className, this.ratingWrapperStyleId),
          onKeyDown: this._onKeyDown,
          onMouseEnter: this._onMouseEnter,
          onMouseMove: this._onMouseMove,
          onMouseLeave: this._onMouseLeave,
          onMouseUp: this._onMouseUp,
          onMouseDown: this._onMouseDown,
          onTouchStart: this._onTouchStart,
          onTouchMove: this._onTouchMove,
          onTouchEnd: this._onTouchEnd,
          onTouchCancel: this._onTouchCancel,
          onContextMenu: this._onContextMenu,
          onBlur: this._onBlur,
          onFocus: this._onFocus,
          tabIndex: tabIndex,
          'aria-label': this.props['aria-label'],
          'aria-valuemax': 5,
          'aria-valuemin': 1,
          'aria-valuenow': this.state.value,
          'aria-disabled': this.props.disabled
        }, this.state.wrapperProps),
        _react2.default.Children.map([1, 2, 3, 4, 5], function (value) {
          var ratingStyle = currentValue >= value ? characterStyle : {};
          return _react2.default.createElement(
            'span',
            (0, _assign2.default)({
              'data-belle-value': value,
              style: ratingStyle
            }, _this2.state.characterProps),
            _this2.props.character
          );
        })
      );
    }
  }]);
  return Rating;
}(_react.Component);

Rating.displayName = 'Rating';
Rating.propTypes = ratingPropTypes;
Rating.defaultProps = {
  disabled: false,
  tabIndex: 0,
  character: '★',
  'aria-label': 'rating'
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this._onMouseEnter = function (event) {
    // In case the user pressed the mouse and then hovers over the rating and
    // releases the mousUp should no be trigger. Only when the mouseDown starts
    // inside.
    // Activating inside, going out & coming back should still be possible.
    if (!_this3.state.isActive) {
      _this3.preventNextMouseUpTriggerUpdate = true;
    }

    if (!_this3.props.disabled) {
      var value = Number(event.target.getAttribute('data-belle-value'));
      _this3.setState({
        focusedValue: value,
        isHover: true
      });
    } else {
      _this3.setState({
        isHover: true
      });
    }

    if (_this3.props.onMouseEnter) {
      _this3.props.onMouseEnter(event);
    }
  };

  this._onMouseMove = function (event) {
    if (!_this3.props.disabled) {
      var value = Number(event.target.getAttribute('data-belle-value'));
      if (_this3.state.focusedValue !== value) {
        _this3.setState({
          focusedValue: value
        });
      }
    }

    if (_this3.props.onMouseMove) {
      _this3.props.onMouseMove(event);
    }
  };

  this._onMouseLeave = function (event) {
    if (!_this3.props.disabled) {
      _this3.setState({
        focusedValue: undefined,
        isHover: false
      });
    } else {
      _this3.setState({
        isHover: false
      });
    }

    if (_this3.props.onMouseLeave) {
      _this3.props.onMouseLeave(event);
    }
  };

  this._onMouseDown = function (event) {
    if (!_this3.props.disabled && event.button === 0) {
      _this3.setState({ isActive: true });
      _this3.preventNextMouseUpTriggerUpdate = false;
    }

    if (_this3.props.onMouseDown) {
      _this3.props.onMouseDown(event);
    }
  };

  this._onMouseUp = function (event) {
    if (!_this3.props.disabled && !_this3.preventNextMouseUpTriggerUpdate) {
      var value = Number(event.target.getAttribute('data-belle-value'));
      _this3._triggerComponentUpdate(value);
    }

    if (_this3.props.onMouseUp) {
      _this3.props.onMouseUp(event);
    }
  };

  this._onMouseUpOnDocument = function () {
    _this3.setState({ isActive: false });
  };

  this._onContextMenu = function () {
    _this3.setState({ isActive: false });
  };

  this._onTouchStart = function (event) {
    event.preventDefault();

    if (!_this3.props.disabled && event.touches.length === 1) {
      var value = Number(event.target.getAttribute('data-belle-value'));
      _this3.setState({
        focusedValue: value,
        isActive: true
      });
    }

    if (_this3.props.onTouchStart) {
      _this3.props.onTouchStart(event);
    }
  };

  this._onTouchMove = function (event) {
    if (!_this3.props.disabled && event.touches.length === 1) {
      var touches = event.touches[0];

      // the requestAnimationFrame function must be executed in the context of window
      // see http://stackoverflow.com/a/9678166/837709
      var animationFrame = _animationFrameManagement.requestAnimationFrame.call(window, _this3._triggerComponentUpdateOnTouchMove.bind(_this3, touches));

      if (_this3.previousTouchMoveFrame) {
        // the cancelAnimationFrame function must be executed in the context of window
        // see http://stackoverflow.com/a/9678166/837709
        _animationFrameManagement.cancelAnimationFrame.call(window, _this3.previousTouchMoveFrame);
      }

      _this3.previousTouchMoveFrame = animationFrame;
    }

    if (_this3.props.onTouchMove) {
      _this3.props.onTouchMove(event);
    }
  };

  this._onTouchEnd = function (event) {
    if (!_this3.props.disabled) {
      event.preventDefault();
      _this3.setState({ isActive: false });
      var value = _this3.state.focusedValue;
      _this3._triggerComponentUpdate(value);
    }

    if (_this3.props.onTouchEnd) {
      _this3.props.onTouchEnd(event);
    }
  };

  this._onTouchCancel = function (event) {
    if (!_this3.props.disabled) {
      _this3.setState({
        isActive: false,
        focusedValue: undefined
      });
    }

    if (_this3.props.onTouchCancel) {
      _this3.props.onTouchCancel(event);
    }
  };

  this._onBlur = function (event) {
    if (!_this3.props.disabled) {
      _this3.setState({
        focusedValue: undefined,
        isFocus: false,
        isActive: false
      });
    }

    if (_this3.props.onBlur) {
      _this3.props.onBlur(event);
    }
  };

  this._onFocus = function () {
    if (!_this3.state.isActive && !_this3.props.disabled) {
      _this3.setState({ isFocus: true });
    }

    if (_this3.props.onFocus) {
      _this3.props.onFocus(event); // eslint-disable-line no-restricted-globals
    }
  };

  this._onKeyDown = function (event) {
    if (!_this3.props.disabled) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
        event.preventDefault();
        _this3._onArrowDownKeyDown();
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
        event.preventDefault();
        _this3._onArrowUpKeyDown();
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        _this3._onEnterSpaceKeyDown();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        _this3._onEscapeKeyDown();
      }
    }

    if (_this3.props.onKeyDown) {
      _this3.props.onKeyDown(event);
    }
  };

  this._onArrowDownKeyDown = function () {
    var newValue = _this3.state.focusedValue !== undefined ? _this3.state.focusedValue : _this3.state.value;
    newValue = newValue > 0 ? newValue - 1 : 0;
    _this3.setState({
      focusedValue: newValue
    });
  };

  this._onArrowUpKeyDown = function () {
    var newValue = _this3.state.focusedValue !== undefined ? _this3.state.focusedValue : _this3.state.value;
    if (!newValue) {
      newValue = 1;
    } else if (newValue < 5) {
      newValue = newValue + 1;
    } else {
      newValue = 5;
    }

    _this3.setState({
      focusedValue: newValue
    });
  };

  this._onEnterSpaceKeyDown = function () {
    var newValue = void 0;
    if (_this3.state.focusedValue !== undefined) {
      if (_this3.state.focusedValue === 0) {
        newValue = undefined;
      } else {
        newValue = _this3.state.focusedValue;
      }

      _this3._triggerComponentUpdate(newValue);
    }
  };

  this._onEscapeKeyDown = function () {
    _this3.setState({
      focusedValue: undefined
    });
  };
};

exports.default = Rating;

//# sourceMappingURL=impl.js.map