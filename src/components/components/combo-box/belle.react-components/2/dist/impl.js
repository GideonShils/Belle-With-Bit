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

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _injectStyle = require('bit/utils/inject-style');

var _unionClassNames = require('bit/utils/union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

var _omit = require('bit/utils/omit');

var _omit2 = _interopRequireDefault(_omit);

var _filterReactChildren = require('bit/utils/filter-react-children');

var _filterReactChildren2 = _interopRequireDefault(_filterReactChildren);

var _has = require('bit/utils/has');

var _has2 = _interopRequireDefault(_has);

var _isEmpty = require('bit/utils/is-empty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _find = require('bit/utils/find');

var _find2 = _interopRequireDefault(_find);

var _getArrayForReactChildren = require('bit/utils/get-array-for-react-children');

var _getArrayForReactChildren2 = _interopRequireDefault(_getArrayForReactChildren);

var _uniqueId = require('bit/utils/unique-id');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _comboBoxStyle = require('bit/style/combo-box-style');

var _comboBoxStyle2 = _interopRequireDefault(_comboBoxStyle);

var _comboBoxItem = require('bit/components/combo-box-item');

var _comboBoxItem2 = _interopRequireDefault(_comboBoxItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # ComboBox Component
 * 
 * ## Properties:
 * * `{Value Reference} valueLink` (optional) - Behaves like the valueLink property of a native input-tag. ValueLink allows to enable two-way data binding between a state property and the value in the user interface.
 * * `{String, Boolean, Number} defaultValue` (optional) - Behaves like the defaultValue property of a native input-tag. This value will be the initial value of the combo-box and can be manipulated through the user interface.
 * * `{String, Boolean, Number} value` (optional) - Behaves like the value property of a native input-tag. This value will be the initial value of the combo-box and can not be manipulated through the user interface.
 * * `{Function} onUpdate` (optional) - This callback is executed every time the combo-box value changes. This could happen when:
 * &nbsp; 1. user selects an option.
 * &nbsp; 2. user types value (function will be called on each keypress).
 * &nbsp; 3. user paste some value.
 * &nbsp; 4. if hints are enabled and user hits right-arrow key on keyboard.
 * **See more info below.**
 * * `{Object} displayCaret` (default: false) - Can be used to show/hide the caret that appears inside combo-box.
 * * `{Object} enableHint` (default: false) - Can be used to enable/disable showing hints to users in combo-box.
 * * `{Object} filterFunc` (optional) - By default the options to be shown to the user are filtered using simple case-insensitive comparison, to find occurrence of input string in option value. But using this property developer can provide a custom function for filtering using. The function should expect to receive 2 parameters:
 * &nbsp; 1. String input in the combo-box 
 * &nbsp 2. Value of the selected option
 * * `{Boolean} disabled` (default: false) - If true the combo-box will be disabled and can't be changed by the user.
 * * `{Object} disabledStyle` (optional) - Works like React's built-in style property except that it extends the properties from the base style. Becomes active once the combo-box is disabled.
 * * `{Object} disabledCaretToOpenStyle` (optional) - Works like React's built-in style property except that it extends the properties from the base disabledCaretToOpenStyle. Is applied to the Caret once the combo-box is disabled.
 * * `{Object} hoverStyle` (optional) - Works like React's built-in style property except that it extends the properties from the base style. Becomes active once the user hovers over the combo-box with the cursor.
 * * `{Object} disabledHoverStyle` (optional) - Works like React's built-in style property except that it extends the properties from the base disabledStyle. Becomes active once the combo-box is disabled and a user hovers over it.
 * * `{Object} focusStyle` (optional) - Works like React's built-in style property except that it extends the properties from the base style. Becomes active once the combo-box is the element focused in the DOM.
 * * `{Object} wrapperStyle` (optional) Works like React's built-in style property. Manipulates the styling for the div-tag wrapped around the component.
 * * `{Object} menuStyle` (optional) - Works like React's built-in style property. Manipulates the styling for the ul-tag wrapped around the options.
 * * `{Object} hintStyle` (optional) - Works like React's built-in style property. Manipulates the styling for underlying input which is suggesting the first option. This input is only visible if the property `enableHint` is enabled.
 * * `{Object} caretToOpenStyle` (optional) - Works like React's built-in style property. Manipulates the styling for the caret when the options to combo-box are not visible.
 * * `{Object} caretToCloseStyle` (optional) - Works like React's built-in style property. Manipulates the styling for the caret when the options to combo-box are visible.
 * * `{Object} wrapperProps` (optional) - This object allows to provide any kind of valid properties for a div tag. It allows to extend the div wrapping the whole combo-box component. 
 * * `{Object} menuProps` (optional) - This object allows to provide any kind of valid properties for a ul tag. It allows to extend the ul wrapping the available options.
 * * `{Object} caretProps` (optional) - This object allows to provide any kind of valid properties for a span tag.
 * * Any other property valid for an input element like placeholder, onFocus, onBlur...
 * 
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/combo-box?_k=qn85nx) documentation.
 * 
 * ## onUpdate has one argument which is an object containing 4 fields:
 * 1. value, the value of the combo-box.
 * 2. identifier, identifier of the matching option (optional). This is passed only if the options have identifiers and the value of the combo-box exactly matches one of the options.
 * 3. isOptionSelection, true when combo-box is updated by user selecting an option (point:1 above).
 * 4. isMatchingOption, true when value of combo-box exactly matches one of the options, irrespective of how the user entered it.
 * ```js
 * {
 * value: value string,
 * identifier: identifier of the type you passed,
 * isMatchingOption: true/false,
 * isOptionSelection: true/false
 * }
 * ```
 * 
 * ## Standard example
 * ```js
 * <ComboBox placeholder="Choose a State">
 * <Option value="Alabama">Alabama</Option>
 * <Option value="Alaska">Alaska</Option>
 * <Option value="Arizona">Arizona</Option>
 * <Option value="Arkansas">Arkansas</Option>
 * </ComboBox>
 * ```
 * ## Internal HTML Structure
 * This should help developer to understand how the ComboBox is structured in order to use the API
 * ```js
 * <div style={ wrapperStyle }>
 * <input style={ hintStyle } />
 * <input style={ style } />
 * <span style={ caretToCloseStyle or caretToOpenStyle } />
 * </span>
 *   <ul style={ menuStyle }>
 *   <li>
 *     <Option />
 *   </li>
 *   <li>
 *     <Option />
 *   </li>
 *   … more entries …
 * </ul>
 * </div>
 * ```
 * 
 * ## ComboBox with a caret and each option having an image & description
 * ```js`
 * <!-- defining the data -->
 * const animals = [
 * {name: 'Abyssinian', description: 'The oldest breed of cat in the world!', image: 'images/abyssinian.jpg'},
 * {name: 'Albatross', description: 'The largest wingspan of any bird!', image: 'images/albatross.jpg'},
 * {name: 'Angelfish', description: 'There are 100 different species!', image: 'images/angelfish.jpg'},
 * {name: 'Ant', description: 'First evolved 100 million years ago!', image: 'images/ant.jpg'},
 * {name: 'Antelope', description: 'Renew their horns every year!', image: 'images/antelope.jpg'},
 * {name: 'Asian Elephant', description: 'Domesticated for hundreds of years!', image: 'images/asian_elephant.jpg'},
 * ]
 * ```
 * ```js
 * <ComboBox placeholder = { 'Choose an Animal' }
 *             defaultValue = "Ant"
 *             displayCaret = { true }>
 * {
 *   animals.map(function(animal, index) {
 *     return (
 *       <Option value={ animal.name }
 *               style={{
 *                 padding: '5px 0 5px 60px',
 *                 marginBottom: '5px',
 *                 height: 50,
 *                 background:  'url(' + animal.image + ') no-repeat',
 *                 backgroundSize: '50px 50px',
 *               }}
 *               hoverStyle={{
 *                 padding: '5px 0 5px 60px',
 *                 marginBottom: '5px',
 *                 height: 50,
 *                 background:  'url(' + animal.image + ') no-repeat',
 *                 backgroundSize: '50px 50px',
 *                 backgroundColor: '#FFE95D',
 *              }}
 *               key={ index }>
 *         <span>
 *           <div style={{fontWeight: 'bold', fontSize: '14px'}}>
 *             { animal.name }
 *           </div>
 *           <div style={{fontSize: '12px'}}>
 *             { animal.description }
 *           </div>
 *         </span>
 *       </Option>
 *     );
 *   })
 * }
 * </ComboBox>
 * ```
 * 
 * ## ComboBox only logging in case of an exact match of the passed Options
 * ```js
 * const destinations = [
 * {code: '1', name: 'Marrakech, Morocco'},
 * {code: '2', name: 'Siem Reap, Cambodia'},
 * {code: '3', name: 'Istanbul, Turkey'},
 * {code: '4', name: 'Hanoi, Vietnam'},
 * {code: '5', name: 'Prague, Czech Republic'},
 * ...
 * ];
 * ```
 * ```js
 * <ComboBox placeholder = { 'Choose a Destination' }
 *         menuStyle = {{maxHeight: 250, overflow: 'scroll'}}
 *         onUpdate={ (event) => {
 *           if (event.isMatchingOption) {
 *             console.log(event.identifier);
 *           }
 *         }}>
 * {
 *   destinations.map((destination, index) => {
 *     return (
 *       <Option value={ destination.name }
 *               identifier={ destination.code }
 *               key={ index }>
 *           { destination.name }
 *       </Option>
 *     );
 *   })
 * }
 * </ComboBox>
 * ```
 * 
 * ## ComboBox with options with identifier, onUpdate callback & maxOptions set to 5
 * ```
 * const currencies = [
 * {code: 'AUD', name: 'Australia Dollar'},
 * {code: 'BRL', name: 'Brazil Real'},
 * {code: 'CAD', name: 'Canada Dollar'},
 * {code: 'CNY', name: 'China Yuan Renminbi'},
 * {code: 'CRC', name: 'Costa Rica Colon'},
 * ...
 * ];
 * ```
 * ```js
 * <ComboBox placeholder = { 'Choose a Currency' }
 *             onUpdate={ (event) => {
 *               console.log(event.value);
 *               console.log(event.identifier);
 *               console.log(event.isMatchingOption);
 *               console.log(event.isOptionSelection); }}
 *             maxOptions = { 5 }>
 * {
 *   currencies.map((currency, index) => {
 *     return (
 *       <Option value={ currency.name }
 *               identifier={ currency.code }
 *               key={ index }>
 *         { currency.name }
 *       </Option>
 *     );
 *   })
 * }
 * </ComboBox>
 * ```
 * 
 * ## ComboBox with custom filtering, and hints enabled
 * ```js
 * const babyNames = ['Palma', 'Paloma', 'Pamella', 'Paris', 'Patti', 'Paulina', 'Pearl', 'Pearlie'];
 * ```
 * ```js
 * <ComboBox enableHint
 *         filterFunc = { customFilterFunc }
 *         placeholder = { 'Select Baby Name' }>
 * {
 *   babyNames.map(function(name, index) {
 *     return (
 *       <Option value={ name }
 *               key={ index }>
 *         { name }
 *       </Option>
 *     );
 *   })
 * }
 * </ComboBox>
 * ```
 * @bit
 */

var comboBoxPropTypes = {
  children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]),
  defaultValue: _react.PropTypes.string,
  value: _react.PropTypes.string,
  valueLink: _react.PropTypes.shape({
    value: _react.PropTypes.string,
    requestChange: _react.PropTypes.func.isRequired
  }),
  placeholder: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  wrapperProps: _react.PropTypes.object,
  menuProps: _react.PropTypes.object,
  caretProps: _react.PropTypes.object,
  onUpdate: _react.PropTypes.func,
  onInputMatch: _react.PropTypes.func,
  tabIndex: _react.PropTypes.number,
  onKeyDown: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func,
  className: _react.PropTypes.string,
  caretClassName: _react.PropTypes.string,
  style: _react.PropTypes.object,
  wrapperStyle: _react.PropTypes.object,
  hintStyle: _react.PropTypes.object,
  menuStyle: _react.PropTypes.object,
  focusStyle: _react.PropTypes.object,
  disabledStyle: _react.PropTypes.object,
  disabledHoverStyle: _react.PropTypes.object,
  hoverStyle: _react.PropTypes.object,
  caretToOpenStyle: _react.PropTypes.object,
  caretToCloseStyle: _react.PropTypes.object,
  disabledCaretToOpenStyle: _react.PropTypes.object,
  maxOptions: _react.PropTypes.number,
  displayCaret: _react.PropTypes.bool,
  enableHint: _react.PropTypes.bool,
  filterFunc: _react.PropTypes.func,
  'aria-label': _react.PropTypes.string
};

/*
 * Update hover style for the specified styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param caretStyleId {string} - unique is assigned as class to caret span
 * @param properties {object} - the components properties optionally containing hoverStyle
 */
function updatePseudoClassStyle(styleId, caretStyleId, properties) {
  var hoverStyle = (0, _assign2.default)({}, _comboBoxStyle2.default.hoverStyle, properties.hoverStyle);
  var focusStyle = (0, _assign2.default)({}, _comboBoxStyle2.default.focusStyle, properties.focusStyle);
  var disabledHoverStyle = (0, _assign2.default)({}, _comboBoxStyle2.default.disabledHoverStyle, properties.disabledHoverStyle);
  var caretFocusStyle = (0, _assign2.default)({}, _comboBoxStyle2.default.caretFocusStyle);

  var styles = [{
    id: styleId,
    style: hoverStyle,
    pseudoClass: 'hover'
  }, {
    id: styleId,
    style: disabledHoverStyle,
    pseudoClass: 'hover',
    disabled: true
  }, {
    id: styleId,
    style: focusStyle,
    pseudoClass: 'focus'
  }, {
    id: caretStyleId,
    style: caretFocusStyle,
    pseudoClass: 'focus'
  }];
  (0, _injectStyle.injectStyles)(styles);
}

/*
 * Returns an object with properties that are relevant for the wrapper div.
 */
function sanitizeWrapperProps(properties) {
  return (0, _omit2.default)(properties, ['style', 'aria-label', 'aria-disabled']);
}

/*
 * Returns an object with properties that are relevant for the input box.
 */
function sanitizeInputProps(properties) {
  return (0, _omit2.default)(properties, (0, _keys2.default)(comboBoxPropTypes));
}

/*
 * Returns an object with properties that are relevant for the wrapping div of
 * the selected option.
 */
function sanitizeCaretProps(properties) {
  return (0, _omit2.default)(properties, ['style', 'className', 'onClick', 'tabIndex']);
}

/*
 * Returns an object with properties that are relevant for the combo-box menu.
 */
function sanitizeMenuProps(properties) {
  return (0, _omit2.default)(properties, ['style', 'ref', 'role']);
}

/*
 * Default function used for filtering options.
 */
function filterFunc(inputValue, optionValue) {
  if (inputValue && optionValue) {
    return optionValue.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  }

  return false;
}

/*
 * ComboBox React Component.
 */

var ComboBox = function (_Component) {
  (0, _inherits3.default)(ComboBox, _Component);

  function ComboBox(properties) {
    (0, _classCallCheck3.default)(this, ComboBox);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ComboBox.__proto__ || (0, _getPrototypeOf2.default)(ComboBox)).call(this, properties));

    _this._onTouchStartAtOption = function (event, index) {
      if (!_this.props.disabled && event.touches.length === 1) {
        _this._touchStartedAt = index;
        _this.setState({ focusedOptionIndex: index });
      }
    };

    _this._onTouchEndAtOption = function (event, index) {
      if (!_this.props.disabled && _this._touchStartedAt) {
        if (_this._touchStartedAt === index) {
          event.preventDefault();
          _this._triggerChange(_this._getValueForIndex(index));
        }

        _this._touchStartedAt = undefined;
      }
    };

    _this._onTouchCancelAtOption = function () {
      if (!_this.props.disabled) {
        _this._touchStartedAt = undefined;
        _this.setState({ focusedOptionIndex: undefined });
      }
    };

    _this._onBlur = function (event) {
      if (!_this.props.disabled) {
        _this.setState({
          isOpen: false,
          focusedOptionIndex: undefined
        });
      }

      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
    };

    _this._onFocus = function (event) {
      if (!_this.props.disabled) {
        _this.setState({
          isOpen: true
        });
      }

      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    };

    _this._onCaretClick = function () {
      if (!_this.props.disabled) {
        var isOpen = !_this.state.isOpen;
        _this.setState({
          isOpen: isOpen
        });
      }
    };

    _this._onMouseEnterAtOption = function (index) {
      if (!_this.props.disabled) {
        _this.setState({
          focusedOptionIndex: index
        });
      }
    };

    _this._onMouseLeaveAtOption = function () {
      if (!_this.props.disabled) {
        _this.setState({
          focusedOptionIndex: undefined
        });
      }
    };

    _this._onClickAtOption = function (index) {
      if (!_this.props.disabled) {
        _this._triggerChange(_this._getValueForIndex(index));
      }
    };

    _this._onKeyDown = function (event) {
      if (!_this.props.disabled) {
        if (!_this.state.isOpen) {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            _this.setState({
              isOpen: true
            });
          }
        } else {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            _this._onArrowDownKeyDown();
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            _this._onArrowUpKeyDown();
          } else if (event.key === 'ArrowRight') {
            if (_this.props.enableHint) {
              event.preventDefault();
              var hint = _this._getHint();
              if (hint) {
                _this._userUpdateValue(hint);
              }
            }
          } else if (event.key === 'Enter') {
            event.preventDefault();
            _this._onEnterOrTabKeyDown();
          } else if (event.key === 'Tab') {
            // event.preventDefault(); should not be called here else tab
            // will not be able to take user to next component on the page
            _this._onEnterOrTabKeyDown();
          } else if (event.key === 'Escape') {
            event.preventDefault();
            _this.setState({
              isOpen: false,
              focusedOptionIndex: undefined
            });
          }
        }
      }

      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(event);
      }
    };

    _this._onArrowDownKeyDown = function () {
      var index = 0;
      if (_this.state.focusedOptionIndex !== undefined && _this.state.focusedOptionIndex + 1 < _this.filteredOptions.length) {
        index = _this.state.focusedOptionIndex + 1;
      }

      _this.setState({
        focusedOptionIndex: index
      });
    };

    _this._onChange = function (event) {
      var value = event.target.value;
      _this._userUpdateValue(value);
    };

    var inputValue = void 0;

    if ((0, _has2.default)(properties, 'valueLink')) {
      inputValue = properties.valueLink.value;
    } else if ((0, _has2.default)(properties, 'value')) {
      inputValue = properties.value;
    } else if ((0, _has2.default)(properties, 'defaultValue')) {
      inputValue = properties.defaultValue;
    }

    _this.state = {
      isOpen: false,
      focusedOptionIndex: undefined,
      inputValue: inputValue || '',
      wrapperProps: sanitizeWrapperProps(properties.wrapperProps),
      inputProps: sanitizeInputProps(properties),
      caretProps: sanitizeCaretProps(properties.caretProps),
      menuProps: sanitizeMenuProps(properties.menuProps)
    };

    _this.filteredOptions = ComboBox.filterOptions(inputValue, properties);
    return _this;
  }

  (0, _createClass3.default)(ComboBox, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var value = void 0;
      if (typeof this.state.focusedOptionIndex !== 'undefined') {
        value = this.filteredOptions[this.state.focusedOptionIndex].props.value;
      }

      return {
        isDisabled: this.props.disabled,
        isHoveredValue: value
      };
    }

    /*
     * This method will calculate the hint that should be present in comboBox at some point in time. Rules:
     * 1. If menu is not open hint is undefined
     * 2. If menu is open but there are no filteredOptions hint is undefined
     * 3. If if some option is highlighted hint is equal to its value
     * 4. If no option is highlighted but some value is present in input box hint is equal to value of first filteredOptions
     * If user has typed some text in input box and there is a hint(according to above calculations), the starting of hint
     * is replaced by the text input by user ( this is to make sure that case of letters in hint is same as that in input box
     * value and overlap is perfect.)
     * todo: simplify logic in method below
     */

  }, {
    key: '_getHint',
    value: function _getHint() {
      if (this.state.isOpen) {
        var filteredOptions = this.filteredOptions;
        if (filteredOptions && filteredOptions.length > 0) {
          var hint = void 0;
          var focusedOptionIndex = this.state.focusedOptionIndex;
          var inputValue = this.state.inputValue;
          if (focusedOptionIndex >= 0) {
            hint = filteredOptions[focusedOptionIndex].props.value;
          } else if (inputValue && inputValue.length > 0) {
            hint = filteredOptions[0].props.value;
          }

          if (hint) {
            if (inputValue && inputValue.length > 0) {
              var position = hint.toLowerCase().indexOf(inputValue.toLowerCase());
              if (position === 0) {
                return inputValue + hint.substr(inputValue.length, hint.length - inputValue.length);
              } else if (position === -1) {
                return hint;
              }
            } else {
              return hint;
            }
          }
        }
      }

      return undefined;
    }

    /*
     * Generates the style-id & inject the focus & hover style.
     */

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var id = (0, _uniqueId2.default)();
      this._styleId = 'style-id' + id;
      this._caretStyleId = 'caretStyle-id' + id;
      updatePseudoClassStyle(this._styleId, this._caretStyleId, this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      var newState = {
        wrapperProps: sanitizeWrapperProps(properties.wrapperProps),
        inputProps: sanitizeInputProps(properties),
        caretProps: sanitizeCaretProps(properties.caretProps),
        menuProps: sanitizeMenuProps(properties.menuProps)
      };

      if ((0, _has2.default)(properties, 'valueLink')) {
        newState.inputValue = properties.valueLink.value || '';
      } else if ((0, _has2.default)(properties, 'value')) {
        newState.inputValue = properties.value || '';
      }

      if (newState.inputValue) {
        newState.filteredOptions = ComboBox.filterOptions(newState.inputValue, properties);
      }

      this.setState(newState);

      (0, _injectStyle.removeAllStyles)([this._styleId, this._caretStyleId]);
      updatePseudoClassStyle(this._styleId, this._caretStyleId, properties);
    }

    /*
     * Remove a component's associated styles whenever it gets removed from the DOM.
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _injectStyle.removeAllStyles)([this._styleId, this._caretStyleId]);
    }

    /*
     * Update focusedOptionIndex when an option is touched.
     */


    /*
     * Triggers a change event after the user touched on an Option.
     */


    /*
     * Update focusedOptionIndex to undefined on touch cancel.
     */


    /*
     * Closed opened combo-box options and removed focusStyles on blur.
     */


    /*
     * Set focused state when element is focused.
     */


    /*
     * Open/ Close menu when create is clicked.
     */


    /*
     * Update focusedOptionIndex for component when mouse enters an option.
     */


    /*
     * Set focusedOptionIndex to undefined.
     */


    /*
     * Update component value when an option is clicked.
     */


    /*
     * Handle keyDown in input (when input is focused):
     * 1. ComboBox is closed and ArrowDown/ ArrowUp is pressed -> open the ComboBox
     * 2. ComboBox is opened and ArrowDown is pressed -> highlight next option
     * 3. ComboBox is opened and ArrowUp is pressed -> highlight previous option
     * 4. ComboBox is opened and ArrowRight is pressed -> value of hint is copied over to inputBox
     * 5. ComboBox is opened and Enter/ Tab is pressed -> update input value to value of option
     * 6. ComboBox is opened and Esc is pressed -> close ComboBox
     */


    /*
     * Highlight next option when arrowDown key is pressed.
     * Highlight first option if currently last option is focused.
     */

  }, {
    key: '_onArrowUpKeyDown',


    /*
     * Highlight previous option when arrowUp key is pressed.
     * Highlight last option if currently first option is focused.
     */
    value: function _onArrowUpKeyDown() {
      if (this.filteredOptions.length > 0) {
        var index = this.filteredOptions.length - 1;
        if (this.state.focusedOptionIndex) {
          index = this.state.focusedOptionIndex - 1;
        }

        this.setState({
          focusedOptionIndex: index
        });
      }
    }

    /*
     * Update value of Input box to the value of highlighted option.
     */

  }, {
    key: '_onEnterOrTabKeyDown',
    value: function _onEnterOrTabKeyDown() {
      if (this.state.focusedOptionIndex >= 0) {
        this._triggerChange(this.filteredOptions[this.state.focusedOptionIndex].props.value);
      }
    }

    /*
     * The function will return options (if any) who's value is same as value of the combo-box input.
     */

  }, {
    key: '_findMatch',
    value: function _findMatch(value) {
      return (0, _find2.default)(this.filteredOptions, function (entry) {
        return entry.props.value === value;
      });
    }

    /*
     * The function is called when user selects an option. Function will do following:
     * 1. Close the options
     * 2. Change value of input depending on whether its has value, defaultValue or valueLink property
     * 3. Call onUpdate props function
     */

  }, {
    key: '_triggerChange',
    value: function _triggerChange(value) {
      if ((0, _has2.default)(this.props, 'valueLink')) {
        this.props.valueLink.requestChange(value);
        this.setState({
          isOpen: false,
          focusedOptionIndex: undefined
        });
      } else if ((0, _has2.default)(this.props, 'value')) {
        this.setState({
          isOpen: false,
          focusedOptionIndex: undefined
        });
      } else {
        this.setState({
          inputValue: value,
          isOpen: false,
          focusedOptionIndex: undefined
        });
        this.filteredOptions = ComboBox.filterOptions(value, this.props);
      }

      var obj = { value: value, isOptionSelection: true, isMatchingOption: true };
      var matchedOption = this._findMatch(value);
      obj.identifier = matchedOption ? matchedOption.props.identifier : undefined;

      if (this.props.onUpdate) {
        this.props.onUpdate(obj);
      }
    }

    /*
     * The function is called when user type/ paste value in the input box.
     */

  }, {
    key: '_getValueForIndex',


    /*
     * Returns the value of the child with a certain index.
     */
    value: function _getValueForIndex(index) {
      return this.filteredOptions[index].props.value;
    }

    /*
     * The function is called when user inputs a value in the input box. This can be done by:
     * 1. typing/ pasting value into input box
     * 2. pressing arrowRight key when there is some hint in the input box
     *
     * Function will do following:
     * 1. Open the options
     * 2. Change value of input depending on whether its has value, defaultValue or valueLink property
     * 3. Call onUpdate props function
     */

  }, {
    key: '_userUpdateValue',
    value: function _userUpdateValue(value) {
      if ((0, _has2.default)(this.props, 'valueLink')) {
        this.props.valueLink.requestChange(value);
        this.setState({
          isOpen: true,
          focusedOptionIndex: undefined
        });
      } else if ((0, _has2.default)(this.props, 'value')) {
        this.setState({
          isOpen: true,
          focusedOptionIndex: undefined
        });
      } else {
        this.setState({
          inputValue: value,
          isOpen: true,
          focusedOptionIndex: undefined
        });
        this.filteredOptions = ComboBox.filterOptions(value, this.props);
      }

      var obj = { value: value, isOptionSelection: false, isMatchingOption: false };

      var matchedOption = this._findMatch(value);
      if (matchedOption) {
        obj.identifier = matchedOption.props.identifier;
        obj.isMatchingOption = true;
      }

      if (this.props.onUpdate) {
        this.props.onUpdate(obj);
      }
    }

    /*
     * Function to filter options using input value.
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var inputStyle = (0, _assign2.default)({}, _comboBoxStyle2.default.style, this.props.style);
      var hintStyle = (0, _assign2.default)({}, _comboBoxStyle2.default.hintStyle, this.props.hintStyle);
      var wrapperStyle = (0, _assign2.default)({}, _comboBoxStyle2.default.wrapperStyle, this.props.wrapperStyle);
      var menuStyle = (0, _assign2.default)({}, _comboBoxStyle2.default.menuStyle, this.props.menuStyle);

      var hint = this.props.enableHint ? this._getHint() : undefined;
      var placeHolder = !hint ? this.props.placeholder : undefined;
      var inputClassName = (0, _unionClassNames2.default)(this.props.className, this._styleId);
      var tabIndex = this.props.tabIndex ? this.props.tabIndex : '0';

      if (this.props.disabled) {
        inputStyle = (0, _assign2.default)({}, inputStyle, _comboBoxStyle2.default.disabledStyle, this.props.disabledStyle);
      }

      // todo: Currently there are no different hover styles for caret, like select they are probably not really needed.
      var caretStyle = void 0;
      if (this.props.displayCaret) {
        if (this.props.disabled) {
          caretStyle = (0, _assign2.default)({}, _comboBoxStyle2.default.caretToOpenStyle, this.props.caretToOpenStyle, _comboBoxStyle2.default.disabledCaretToOpenStyle, this.props.disabledCaretToOpenStyle);
        } else if (this.state.isOpen) {
          caretStyle = (0, _assign2.default)({}, _comboBoxStyle2.default.caretToCloseStyle, this.props.caretToCloseStyle);
        } else {
          caretStyle = (0, _assign2.default)({}, _comboBoxStyle2.default.caretToOpenStyle, this.props.caretToOpenStyle);
        }
      }

      var computedMenuStyle = this.state.isOpen && !this.props.disabled && this.filteredOptions && this.filteredOptions.length > 0 ? menuStyle : { display: 'none' };

      // using value for input makes it a controlled component and it will be changed in controlled manner if (1) user enters value, (2) user selects some option
      // value will be updated depending on whether user has passed value / valueLink / defaultValue as property
      return _react2.default.createElement(
        'div',
        (0, _assign2.default)({
          style: wrapperStyle,
          'aria-label': this.props['aria-label'],
          'aria-disabled': this.props.disabled
        }, this.state.wrapperProps),
        _react2.default.createElement('input', {
          style: hintStyle,
          value: hint,
          tabIndex: -1,
          key: 'style-hint',
          readOnly: true
        }),
        _react2.default.createElement('input', (0, _assign2.default)({
          disabled: this.props.disabled,
          'aria-disabled': this.props.disabled,
          value: this.state.inputValue,
          placeholder: placeHolder,
          style: inputStyle,
          className: inputClassName,
          onChange: this._onChange,
          tabIndex: tabIndex,
          onBlur: this._onBlur,
          onFocus: this._onFocus,
          onKeyDown: this._onKeyDown,
          'aria-autocomplete': 'list',
          key: 'combo-input'
        }, this.state.inputProps)),
        _react2.default.createElement('span', (0, _assign2.default)({
          style: caretStyle,
          className: this._caretStyleId,
          onClick: this._onCaretClick,
          tabIndex: -1
        }, this.state.caretProps)),
        _react2.default.createElement(
          'ul',
          (0, _assign2.default)({
            style: computedMenuStyle,
            role: 'listbox',
            'aria-expanded': this.state.isOpen
          }, this.state.menuProps),
          _react2.default.Children.map(this.filteredOptions, function (entry, index) {
            return _react2.default.createElement(
              _comboBoxItem2.default,
              {
                key: index,
                index: index,
                onItemTouchStart: _this2._onTouchStartAtOption,
                onItemTouchEnd: _this2._onTouchEndAtOption,
                onItemTouchCancel: _this2._onTouchCancelAtOption,
                onItemClick: _this2._onClickAtOption,
                onItemMouseEnter: _this2._onMouseEnterAtOption,
                onItemMouseLeave: _this2._onMouseLeaveAtOption
              },
              entry
            );
          })
        )
      );
    }
  }], [{
    key: 'filterOptions',
    value: function filterOptions(inputValue, properties) {
      /* eslint react/sort-comp:0*/
      var filteredOptions = [];
      if (!(0, _isEmpty2.default)(properties.children)) {
        if (inputValue) {
          filteredOptions = (0, _filterReactChildren2.default)(properties.children, function (entry) {
            return properties.filterFunc(inputValue, entry.props.value);
          });
        } else {
          filteredOptions = (0, _getArrayForReactChildren2.default)(properties.children, function (entry) {
            return entry;
          });
        }

        if (properties.maxOptions) {
          filteredOptions = filteredOptions.splice(0, properties.maxOptions);
        }
      }

      return filteredOptions;
    }
  }]);
  return ComboBox;
}(_react.Component);

ComboBox.displayName = 'ComboBox';
ComboBox.propTypes = comboBoxPropTypes;
ComboBox.childContextTypes = {
  isDisabled: _react.PropTypes.bool.isRequired,
  isHoveredValue: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.number])
};
ComboBox.defaultProps = {
  disabled: false,
  displayCaret: false,
  enableHint: false,
  'aria-label': 'ComboBox',
  filterFunc: filterFunc, // TODO rename to filterFunction in 4.0.0
  tabIndex: 0,
  children: []
};
exports.default = ComboBox;

//# sourceMappingURL=impl.js.map