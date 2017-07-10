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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _exenv = require('exenv');

var _omit = require('bit/utils/omit');

var _omit2 = _interopRequireDefault(_omit);

var _filter = require('bit/utils/filter');

var _filter2 = _interopRequireDefault(_filter);

var _filterReactChildren = require('bit/utils/filter-react-children');

var _filterReactChildren2 = _interopRequireDefault(_filterReactChildren);

var _find = require('bit/utils/find');

var _find2 = _interopRequireDefault(_find);

var _first = require('bit/utils/first');

var _first2 = _interopRequireDefault(_first);

var _flattenReactChildren = require('bit/utils/flatten-react-children');

var _flattenReactChildren2 = _interopRequireDefault(_flattenReactChildren);

var _isEmpty = require('bit/utils/is-empty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _findIndex = require('bit/utils/find-index');

var _findIndex2 = _interopRequireDefault(_findIndex);

var _has = require('bit/utils/has');

var _has2 = _interopRequireDefault(_has);

var _some = require('bit/utils/some');

var _some2 = _interopRequireDefault(_some);

var _last = require('bit/utils/last');

var _last2 = _interopRequireDefault(_last);

var _uniqueId = require('bit/utils/unique-id');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _unionClassNames = require('bit/utils/union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

var _injectStyle = require('bit/utils/inject-style');

var _isComponentOfType = require('bit/utils/is-component-of-type');

var _isComponentOfType2 = _interopRequireDefault(_isComponentOfType);

var _selectStyle = require('bit/style/select-style');

var _selectStyle2 = _interopRequireDefault(_selectStyle);

var _selectConfig = require('bit/config/select-config');

var _selectConfig2 = _interopRequireDefault(_selectConfig);

var _option = require('bit/components/option');

var _option2 = _interopRequireDefault(_option);

var _placeholder = require('bit/components/placeholder');

var _placeholder2 = _interopRequireDefault(_placeholder);

var _separator = require('bit/components/separator');

var _separator2 = _interopRequireDefault(_separator);

var _selectItem = require('bit/components/select-item');

var _selectItem2 = _interopRequireDefault(_selectItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # Select Component
 * In its simplest form the select component behaves almost identical to the
 * native HTML select which the exception that it comes with beautiful styles.
 * Note: The select is designed to behave exactly like the native select tag with the benefit that you have full control over its appearance. You might want to try navigating the options with your keyboard.
 * 
 * ## Properties:
 * * {Value Reference} valueLink (optional) - Behaves like the valueLink property of a native select-tag. ValueLink allows to enable two-way data binding between a state property and the value in the user interface.
 * * {String, Boolean, Number} defaultValue (optional) - Behaves like the defaultValue property of a native select-tag. The Option with the same value is initially used as selected and can be manipulated through the user interface.
 * * {String, Boolean, Number} value (optional) - Behaves like the value property of a native select-tag. The Option with the same value is initially used as selected and can not be manipulated through the user interface.
 * * {Function} onUpdate (optional) - Callback executed every time an Option is selected. onUpdate has one argument which is an object containing the value e.g. { value: 'Rome' }.
 * * {Object} hoverStyle (optional) - Works like React's built-in style property except that it extends the properties from the base style. Becomes active once the user hovers over the select with the cursor.
 * * {Object} focusStyle (optional) - Works like React's built-in style property except that it extends the properties from the base style. Becomes active once the select is the element focused in the DOM.
 * * {Object} wrapperStyle (optional) - Works like React's built-in style property. Manipulates the styling for the div-tag wrapped around the component.
 * * {Object} caretToOpenStyle (optional) - Works like React's built-in style property. Manipulates the styling for the caret when the options to select from are not visible.
 * * {Object} caretToCloseStyle (optional) - Works like React's built-in style property. Manipulates the styling for the caret when the options to select from are visible.
 * * {Boolean} shouldPositionOptions (optional. default: true) -  If set to true the menu is repositioned after opening it to position the focused Option right on top of the already selected one. 
 * * {Function(this)} positionOptions (optional) - A function called after the user opens the menu. The function's purpose is to reposition the menu to improve the user experience.
 * * {Object} wrapperProps (optional) - This object allows to provide any kind of valid properties for a div tag. It allows to extend the div wrapping the whole select component.
 * * {Object} menuProps (optional) - This object allows to provide any kind of valid properties for a ul tag. It allows to extend the ul wrapping the available options.
 * * {Object} caretProps (optional) - This object allows to provide any kind of valid properties for a span tag.
 * * {Boolean} disabled (optional. default: false) - If true the Select will be disabled and can't be changed by the user.
 * * {Object} disabledStyle (optional) - Works like React's built-in style property. Becomes active once the Select is disabled.
 * * {Object} disabledHoverStyle (optional) - Works like React's built-in style property except that it extends the properties from the base disabledStyle. Becomes active once the Select is disabled and a user hovers over it.
 * * {Object} disabledCaretToOpenStyle (optional) - Works like React's built-in style property except that it extends the properties from the base disabledCaretToOpenStyle. Is applied to the Caret once the Select is disabled.
 * * Any other property valid for a Div element like style, onClick, ... 
 * * The properties will directly applied to the wrapper for the selected option.
 * 
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/select?_k=3qbax1) documentation.
 *
 * ## Standard example
 * ```js
 * <Select defaultValue="rome">
 *   <Option value="vienna">Vienna</Option>
 *   <Option value="rome">Rome</Option>
 * </Select>
 * 
 * ## Internal HTML Structure
 * This should help developer to understand how the Select is structured in order to use the API
 * ```js
 * <div tabIndex="0"
 *    style={ wrapperStyle }>
 * <div style={ style }>
 *   <Option /> or <Placeholder />
 *   <span style={ caretToCloseStyle or caretToOpenStyle } />
 * </div>
 * <ul style={ menuStyle }>
 *   <li>
 *     <Option /> or <Separator />
 *   </li>
 *   <li>
 *     <Option /> or <Separator />
 *   </li>
 *   … more entries …
 * </ul>
 * </div>
 * ```
 * 
 * ## Select from a dynamic data set including a defaultValue & onUpdate callback
 * ```js
 * <!-- defining the data -->
 * var fruits = [
 * { value: "pineapple", content: (<span>🍍 Pineapple</span>) },
 * { value: "banana", content: (<span>🍌 Banana</span>) },
 * { value: "peach", content: (<span>🍑 Peach</span>) },
 * { value: "pear", content: (<span>🍐 Pear</span>) },
 * { value: "cherries", content: (<span>🍒 Cherries</span>) }
 * ];
 * ```
 * ```js
 * <!-- filling a select with Option  -->
 * <Select defaultValue={ fruits[3].value }
 *       onUpdate={ function(event) { console.log(event.value); }}>
 * {
 *   fruits.map(function(fruit, index) {
 *     return (
 *       <Option value={ fruit.value }
 *               key={ index }>
 *         { fruit.content }
 *       </Option>
 *     );
 *   })
 * }
 * </Select>
 * ```
 * 
 * ## Select as part of a form with a scrollable menu
 * ```js
 * <!-- form consiting of an input & a select  -->
 * <div style={{ display: 'table' }}>
 * <TextInput style={{ width: 138,
 *                      float: 'left'}}
 *            placeholder="Fill in your address …" />
 *          <div style={{ width: 110,
 *                         float: 'left',
 *                         marginLeft: 16 }}>
 *   <Select defaultValue="tokyo"
 *           menuStyle={{ height: 160,
 *                                overflow: 'scroll' }}>
 *     <Option value="berlin">Berlin</Option>
 *     <Option value="hong-kong">Hong Kong</Option>
 *     <Option value="istanbul">Istanbul</Option>
 *     <Option value="rome">Rome</Option>
 *     <Option value="san-francisco">San Francisco</Option>
 *     <Option value="tokyo">Tokyo</Option>
 *     <Option value="vienna">Vienna</Option>
 *   </Select>
 * </div>
 * </div>
 * ```
 * 
 * ## Select with Separators
 * ```js
 * <!-- basic select example with separators -->
 * <Select>
 * <Separator>Asia</Separator>
 * <Option value="hong-kong">Hong Kong</Option>
 * <Option value="tokyo">Tokyo</Option>
 * <Separator>Europe</Separator>
 * <Option value="berlin">Berlin</Option>
 * <Option value="istanbul">Istanbul</Option>
 * </Select>
 * ```
 * 
 * ## Select with various Option styles
 * ```js
 * <!-- select example with more advanced styling -->
 * <Select menuStyle={{ padding: 6 }}>
 * <Placeholder>Choose your next Vacation</Placeholder>
 * <Option value="santorini"
 *         style={{
 *           padding: '15px 0 0 60px',
 *           height: 50,
 *           background: 'url(images/santorini_100.jpg) no-repeat',
 *           backgroundSize: '50px 50px',
 *           backgroundColor: '#FFEE82'
 *         }}
 *         hoverStyle={{
 *           padding: '15px 0 0 60px',
 *           height: 50,
 *           background: 'url(images/santorini_100.jpg) no-repeat',
 *           backgroundSize: '50px 50px',
 *           backgroundColor: '#FFE95D'
 *         }} >
 *   Santorini (Special Deal)
 * </Option>
 * <Separator style={{ height: 4, padding: 0 }}></Separator>
 * <Option value="yosemite"
 *         style={{
 *           padding: '15px 0 0 60px',
 *           height: 50,
 *           background: 'url(images/yosemite_100.jpg) no-repeat',
 *           backgroundSize: '50px 50px'
 *         }}
 *         hoverStyle={{
 *           padding: '15px 0 0 60px',
 *           height: 50,
 *           backgroundColor: '#F5F5F5',
 *           background: 'url(images/yosemite_100.jpg) no-repeat',
 *           backgroundSize: '50px 50px'
 *         }} >
 *   Yosemite
 * </Option>
 * <Separator style={{ height: 4, padding: 0 }}></Separator>
 * <Option value="croatia"
 *         style={{
 *           padding: '15px 0 0 60px',
 *           height: 50,
 *           background: 'url(images/croatia_100.jpg) no-repeat',
 *           backgroundSize: '50px 50px'
 *         }}
 *         hoverStyle={{
 *           padding: '15px 0 0 60px',
 *           height: 50,
 *           backgroundColor: '#F5F5F5',
 *           background: 'url(images/croatia_100.jpg) no-repeat',
 *           backgroundSize: '50px 50px'
 *         }} >
 *   Croatia
 * </Option>
 * </Select>
 * ```
 * 
 * ## Select with a custom positionOptions function
 * ```js
 * <!-- custom positionOptions function in your JS code -->
 * function positionOptions (selectComponent) {
 * const menuNode = ReactDOM.findDOMNode(selectComponent.refs.menu);
 * menuNode.style.top = '35px';
 * }
 * ```
 * ```js
 * <!-- select with a custom positionOptions function -->
 * <Select positionOptions={ positionOptions }>
 * <Placeholder>Choose a City</Placeholder>
 * <Option value="berlin">Berlin</Option>
 * <Option value="tokyo">Tokyo</Option>
 * <Option value="vienna">Vienna</Option>
 * </Select>
 * ```
 * @bit
 */

/*
 * Returns true if the provided property is a Placeholder component from Belle.
 */
function isPlaceholder(reactElement) {
  return (0, _isComponentOfType2.default)(_placeholder2.default, reactElement);
}

/*
 * Returns true if the provided property is a Option component from Belle.
 */
function isOption(reactElement) {
  return (0, _isComponentOfType2.default)(_option2.default, reactElement);
}

/*
 * Returns true if the provided property is a Separator component from Belle.
 */
function isSeparator(reactElement) {
  return (0, _isComponentOfType2.default)(_separator2.default, reactElement);
}

/*
 * Verifies that the children is an array containing only Options & at maximum
 * one Placeholder.
 */
function validateChildrenAreOptionsAndMaximumOnePlaceholder(props, propName, componentName) {
  var validChildren = (0, _filterReactChildren2.default)(props[propName], function (node) {
    return isOption(node) || isSeparator(node) || isPlaceholder(node);
  });
  if (_react2.default.Children.count(props[propName]) !== _react2.default.Children.count(validChildren)) {
    return new Error('Invalid children supplied to `' + componentName + '`, expected an Option, Separator or Placeholder component from Belle.');
  }

  var placeholders = (0, _filterReactChildren2.default)(props[propName], function (node) {
    return isPlaceholder(node);
  });
  if (_react2.default.Children.count(placeholders) > 1) {
    return new Error('Invalid children supplied to `' + componentName + '`, expected only one Placeholder component.');
  }

  return undefined;
}

var selectPropTypes = {
  children: validateChildrenAreOptionsAndMaximumOnePlaceholder,
  value: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.instanceOf(Date)]),
  defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.number]),
  onUpdate: _react.PropTypes.func,
  valueLink: _react.PropTypes.shape({
    value: _react.PropTypes.string.isRequired,
    requestChange: _react.PropTypes.func.isRequired
  }),
  className: _react.PropTypes.string,
  shouldPositionOptions: _react.PropTypes.bool,
  positionOptions: _react.PropTypes.func,
  style: _react.PropTypes.object,
  focusStyle: _react.PropTypes.object,
  hoverStyle: _react.PropTypes.object,
  activeStyle: _react.PropTypes.object,
  wrapperStyle: _react.PropTypes.object,
  menuStyle: _react.PropTypes.object,
  caretToOpenStyle: _react.PropTypes.object,
  caretToCloseStyle: _react.PropTypes.object,
  wrapperProps: _react.PropTypes.object,
  menuProps: _react.PropTypes.object,
  caretProps: _react.PropTypes.object,
  disabled: _react.PropTypes.bool,
  disabledStyle: _react.PropTypes.object,
  disabledHoverStyle: _react.PropTypes.object,
  disabledCaretToOpenStyle: _react.PropTypes.object,
  id: _react.PropTypes.string,
  onClick: _react.PropTypes.func,
  onTouchCancel: _react.PropTypes.func,
  onMouseDown: _react.PropTypes.func,
  onMouseUp: _react.PropTypes.func,
  onTouchEnd: _react.PropTypes.func,
  onTouchStart: _react.PropTypes.func
};

/*
 * Update hover style for the speficied styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param properties {object} - the components properties optionally containing hoverStyle
 */
function updatePseudoClassStyle(styleId, properties) {
  var hoverStyle = (0, _assign2.default)({}, _selectStyle2.default.hoverStyle, properties.hoverStyle);
  var disabledHoverStyle = (0, _assign2.default)({}, _selectStyle2.default.disabledHoverStyle, properties.disabledHoverStyle);

  var styles = [{
    id: styleId,
    style: hoverStyle,
    pseudoClass: 'hover'
  }, {
    id: styleId,
    style: disabledHoverStyle,
    pseudoClass: 'hover',
    disabled: true
  }];
  (0, _injectStyle.injectStyles)(styles);
}

/*
 * Returns true in case there one more element in the list.
 */
var hasNext = function hasNext(list, currentIndex) {
  return currentIndex + 2 <= list.length;
};

/*
 * Returns true in case there is one previous element in the list.
 */
var hasPrevious = function hasPrevious(list, currentIndex) {
  return currentIndex - 1 >= 0;
};

/*
 * Returns an object with properties that are relevant for the wrapping div of
 * the selected option.
 */
function sanitizeSelectedOptionWrapperProps(properties) {
  return (0, _omit2.default)(properties, (0, _keys2.default)(selectPropTypes));
}

/*
 * Returns an object with properties that are relevant for the wrapping div of
 * the selected option.
 */
function sanitizeWrapperProps(properties) {
  return (0, _omit2.default)(properties, ['style', 'ref', 'tabIndex', 'onKeyDown', 'onBlur', 'onFocus']);
}

/*
 * Returns an object with properties that are relevant for the wrapping div of
 * the selected option.
 */
function sanitizeMenuProps(properties) {
  return (0, _omit2.default)(properties, ['style', 'ref', 'aria-labelledby', 'role']);
}

/*
 * Returns an object with properties that are relevant for the wrapping div of
 * the selected option.
 */
function sanitizeCaretProps(properties) {
  return (0, _omit2.default)(properties, ['style', 'ref']);
}

/*
 * Select component.
 *
 * In its simplest form the select component behaves almost identical to the
 * native HTML select which the exception that it comes with beautiful styles.
 *
 * Example:
 *
 *     <Select defaultValue="rome">
 *       <Option value="vienna">Vienna</Option>
 *       <Option value="rome">Rome</Option>
 *     </Select>
 *
 * For more advanced examples please see:
 * nikgraf.github.io/belle/#/component/select
 *
 * This component was inpired by:
 * - Jet Watson: https://github.com/JedWatson/react-select
 * - Instructure React Team: https://github.com/instructure-react/react-select-box
 */

var Select = function (_Component) {
  (0, _inherits3.default)(Select, _Component);

  /*
   * Initialize the component based on the provided properties.
   *
   * By default the Select is closed & the focused option in case the user opens
   * it will be the selected option.
   */
  function Select(properties) {
    (0, _classCallCheck3.default)(this, Select);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Select.__proto__ || (0, _getPrototypeOf2.default)(Select)).call(this, properties));

    _this._onTouchStartAtOption = function (event, index) {
      if (event.touches.length === 1) {
        _this._touchStartedAt = _this._getValueForIndex(index);

        // save the scroll position
        var menuNode = _reactDom2.default.findDOMNode(_this.menu);
        if (menuNode.scrollHeight > menuNode.offsetHeight) {
          _this._scrollTopPosition = menuNode.scrollTop;

          // Note: don't use setState in here as it would prevent the scrolling
        } else {
          _this._scrollTopPosition = 0;
          _this.setState({ focusedOptionValue: _this._touchStartedAt });
        }

        // reset interaction
        _this._scrollActive = false;
      }
    };

    _this._onTouchMoveAtOption = function () {
      var menuNode = _reactDom2.default.findDOMNode(_this.menu);
      if (menuNode.scrollTop !== _this._scrollTopPosition) {
        _this._scrollActive = true;
      }
    };

    _this._onTouchEndAtOption = function (event, index) {
      if (_this._touchStartedAt && !_this._scrollActive) {
        var value = _this._getValueForIndex(index);
        if (_this._touchStartedAt === value) {
          event.preventDefault();
          _this._triggerChange(value);
        }
      }

      _this._touchStartedAt = undefined;
    };

    _this._onTouchCancelAtOption = function () {
      _this._touchStartedAt = undefined;
    };

    _this._onClickAtOption = function (index) {
      _this._triggerChange(_this._getValueForIndex(index));
    };

    _this._onBlur = function (event) {
      _this.setState({
        isOpen: false,
        isFocused: false
      });

      if (_this.props.wrapperProps && _this.props.wrapperProps.onBlur) {
        _this.props.wrapperProps.onBlur(event);
      }
    };

    _this._onFocus = function (event) {
      _this.setState({
        isFocused: true
      });

      if (_this.props.wrapperProps && _this.props.wrapperProps.onFocus) {
        _this.props.wrapperProps.onFocus(event);
      }
    };

    _this._onMouseEnterAtOption = function (index) {
      _this.setState({
        focusedOptionValue: _this._getValueForIndex(index)
      });
    };

    _this._onTouchStartToggleMenu = function (event) {
      if (event.touches.length === 1) {
        _this.setState({ isTouchedToToggle: true, isActive: true });
      } else {
        _this.setState({ isTouchedToToggle: false });
      }

      if (_this.props.onTouchStart) {
        _this.props.onTouchStart(event);
      }
    };

    _this._onTouchEndToggleMenu = function (event) {
      // In case touch events are used preventDefault is applied to avoid
      // triggering the click event which would cause trouble for toggling.
      // In any case calling setState triggers a render. This leads to the fact
      // that the click event won't be triggered anyways. Nik assumes it's due the
      // element won't be in the DOM anymore.
      // This also means the Select's onClick won't be triggered for touchDevices.
      event.preventDefault();

      /* To avoid weird behaviour we check before focusing again - no specific use-case found */
      var wrapperNode = _reactDom2.default.findDOMNode(_this.wrapper);
      if (document.activeElement !== wrapperNode) {
        wrapperNode.focus();
      }

      if (_this.state.isTouchedToToggle) {
        if (_this.state.isOpen) {
          _this.setState({ isOpen: false });
        } else {
          _this.setState({ isOpen: true });
        }
      }

      _this.setState({ isTouchedToToggle: false, isActive: false });

      if (_this.props.onTouchEnd) {
        _this.props.onTouchEnd(event);
      }
    };

    _this._onTouchCancelToggleMenu = function (event) {
      _this.setState({ isTouchedToToggle: false, isActive: false });

      if (_this.props.onTouchCancel) {
        _this.props.onTouchCancel(event);
      }
    };

    _this._onMouseDown = function (event) {
      _this.setState({ isActive: true });

      if (_this.props.onMouseDown) {
        _this.props.onMouseDown(event);
      }
    };

    _this._onMouseUp = function (event) {
      _this.setState({ isActive: false });

      if (_this.props.onMouseUp) {
        _this.props.onMouseUp(event);
      }
    };

    _this._onMouseUpOnDocument = function () {
      _this.setState({ isActive: false });
    };

    _this._onContextMenu = function () {
      _this.setState({ isActive: false });
    };

    _this._onArrowDownKeyDown = function () {
      if (_this.state.focusedOptionValue !== void 0) {
        var indexOfFocusedOption = _this._getIndexOfFocusedOption();

        if (hasNext(_this.options, indexOfFocusedOption)) {
          _this.setState({
            focusedOptionValue: _this.options[indexOfFocusedOption + 1].props.value
          });
        }
      } else {
        _this.setState({
          focusedOptionValue: (0, _first2.default)(_this.options).props.value
        });
      }
    };

    _this._onArrowUpKeyDown = function () {
      if (_this.state.focusedOptionValue !== void 0) {
        var indexOfFocusedOption = _this._getIndexOfFocusedOption();

        if (hasPrevious(_this.options, indexOfFocusedOption)) {
          _this.setState({
            focusedOptionValue: _this.options[indexOfFocusedOption - 1].props.value
          });
        }
      } else {
        _this.setState({
          focusedOptionValue: (0, _last2.default)(_this.options).props.value
        });
      }
    };

    _this._onEnterOrSpaceKeyDown = function () {
      _this._triggerChange(_this.state.focusedOptionValue);
    };

    _this._onKeyDown = function (event) {
      if (!_this.props.disabled) {
        if (!(0, _isEmpty2.default)(_this.options)) {
          if (!_this.state.isOpen) {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === ' ') {
              event.preventDefault();
              _this.setState({ isOpen: true });
            }
          } else {
            // Updates the state to set focus on the next option
            // In case no option is active it should jump to the first.
            // In case it is the last it should stop there.
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              _this._onArrowDownKeyDown();
            } else if (event.key === 'ArrowUp') {
              event.preventDefault();
              _this._onArrowUpKeyDown();
            } else if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              _this._onEnterOrSpaceKeyDown();
            }
          }

          if (event.key === 'Escape') {
            event.preventDefault();
            _this.setState({ isOpen: false });
          }
        }
      }

      if (_this.props.wrapperProps && _this.props.wrapperProps.onKeyDown) {
        _this.props.wrapperProps.onKeyDown(event);
      }
    };

    _this._onClickToggleMenu = function (event) {
      if (!_this.props.disabled) {
        if (_this.state.isOpen) {
          _this.setState({ isOpen: false });
        } else {
          _this.setState({ isOpen: true });
        }
      }

      if (_this.props.onClick) {
        _this.props.onClick(event);
      }
    };

    var selectedValue = void 0;
    var focusedOptionValue = void 0;

    if (properties.children) {
      _this.children = (0, _flattenReactChildren2.default)(properties.children);
      _this.options = (0, _filter2.default)(_this.children, isOption);
    }

    if ((0, _has2.default)(properties, 'valueLink')) {
      selectedValue = properties.valueLink.value;
      focusedOptionValue = selectedValue;
    } else if ((0, _has2.default)(properties, 'value')) {
      selectedValue = properties.value;
      focusedOptionValue = selectedValue;
    } else if ((0, _has2.default)(properties, 'defaultValue')) {
      selectedValue = properties.defaultValue;
      focusedOptionValue = selectedValue;
    } else if (!(0, _isEmpty2.default)(_this.children) && !(0, _some2.default)(_this.children, isPlaceholder)) {
      var firstOption = (0, _first2.default)(_this.options);
      selectedValue = firstOption ? firstOption.props.value : void 0;
      focusedOptionValue = selectedValue;
    } else if (!(0, _isEmpty2.default)(_this.children)) {
      var _firstOption = (0, _first2.default)(_this.options);
      focusedOptionValue = _firstOption ? _firstOption.props.value : void 0;
    }

    _this.state = {
      isOpen: false,
      isFocused: false,
      selectedValue: selectedValue,
      focusedOptionValue: focusedOptionValue,
      selectedOptionWrapperProps: sanitizeSelectedOptionWrapperProps(properties),
      wrapperProps: sanitizeWrapperProps(properties.wrapperProps),
      menuProps: sanitizeMenuProps(properties.menuProps),
      caretProps: sanitizeCaretProps(properties.caretProps),
      isTouchedToToggle: false
    };
    return _this;
  }

  (0, _createClass3.default)(Select, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        isDisabled: this.props.disabled,
        isHoveredValue: this.state.focusedOptionValue
      };
    }

    /*
     * Generates the style-id & inject the focus & hover style.
     */

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var id = (0, _uniqueId2.default)();

      // Note: To ensure server side rendering creates the same results React's internal
      // id for this element is leveraged.
      this.selectedOptionWrapperId = this.props.id ? this.props.id : 'belle-select-id-' + id;
      this._styleId = 'style-id' + id;
      updatePseudoClassStyle(this._styleId, this.props);

      if (_exenv.canUseDOM) {
        this.mouseUpOnDocumentCallback = this._onMouseUpOnDocument;
        document.addEventListener('mouseup', this.mouseUpOnDocumentCallback);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      if (properties.children) {
        this.children = (0, _flattenReactChildren2.default)(properties.children);
        this.options = (0, _filter2.default)(this.children, isOption);
      }

      var newState = {
        selectedOptionWrapperProps: sanitizeSelectedOptionWrapperProps(properties),
        wrapperProps: sanitizeWrapperProps(properties.wrapperProps),
        menuProps: sanitizeMenuProps(properties.menuProps),
        caretProps: sanitizeCaretProps(properties.caretProps)
      };

      if ((0, _has2.default)(properties, 'valueLink')) {
        newState.selectedValue = properties.valueLink.value;
        newState.focusedOptionValue = properties.valueLink.value;
      } else if ((0, _has2.default)(properties, 'value')) {
        newState.selectedValue = properties.value;
        newState.focusedOptionValue = properties.value;
      }

      this.setState(newState);
      (0, _injectStyle.removeStyle)(this._styleId);
      updatePseudoClassStyle(this._styleId, properties);
    }

    /*
     * In case shouldPositionOptions is active the scrollTop position is stored
     * to be applied later on. The menu is hidden to make sure it is
     * not displayed beofre repositioned.
     */

  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProperties, nextState) {
      var shouldPositionOptions = (0, _has2.default)(nextProperties, 'shouldPositionOptions') ? nextProperties.shouldPositionOptions : _selectConfig2.default.shouldPositionOptions;

      if (shouldPositionOptions) {
        var menuNode = _reactDom2.default.findDOMNode(this.menu);
        this.cachedMenuScrollTop = menuNode.scrollTop;

        if (!this.state.isOpen && nextState.isOpen) {
          menuNode.style.display = 'none';
        }
      }
    }

    /*
     * In case shouldPositionOptions is active when opening the menu it is
     * repositioned & switched to be visible.
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(previousProperties, previousState) {
      var shouldPositionOptions = (0, _has2.default)(this.props, 'shouldPositionOptions') ? this.props.shouldPositionOptions : _selectConfig2.default.shouldPositionOptions;

      if (shouldPositionOptions && !this.props.disabled) {
        var menuNode = _reactDom2.default.findDOMNode(this.menu);

        // the menu was just opened
        if (!previousState.isOpen && this.state.isOpen && this.children && this.children.length > 0) {
          var positionOptions = (0, _has2.default)(this.props, 'positionOptions') ? this.props.positionOptions : _selectConfig2.default.positionOptions;
          positionOptions(this);

          // restore the old scrollTop position
        } else {
          menuNode.scrollTop = this.cachedMenuScrollTop;
        }

        var separators = (0, _filter2.default)(this.children, isSeparator);
        var childrenPresent = !(0, _isEmpty2.default)(this.options) || !(0, _isEmpty2.default)(separators);
        if (!previousState.isOpen && this.state.isOpen && childrenPresent) {
          var menuStyle = (0, _assign2.default)({}, _selectStyle2.default.menuStyle, this.props.menuStyle);
          menuNode.style.display = menuStyle.display;
        }
      }
    }

    /*
     * Remove a component's associated styles whenever it gets removed from the DOM.
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _injectStyle.removeStyle)(this._styleId);
      if (_exenv.canUseDOM) {
        document.removeEventListener('mouseup', this.mouseUpOnDocumentCallback);
      }
    }

    /*
     * Update the focusedOption based on Option the user is touching.
     *
     * Unfortunately updating the focusedOption only works in case the menu
     * is not scrollable.
     * If a setState would be triggered during a touch with the intention to
     * scroll the setState would trigger a re-render & prevent the scrolling.
     */


    /*
     * Identifies if the menu is scrollable.
     */


    /*
     * Triggers a change event after the user touched on an Option.
     */


    /*
     * Triggers a change event after the user touched on an Option.
     */


    /*
     * Triggers a change event after the user clicked on an Option.
     */


    /*
     * In order to inform the user which element in the document is active the
     * component keeps track of when it's de-selected and depending on that
     * close the menu.
     */


    /*
     * In order to inform the user which element in the document is active the
     * component keeps track of when it's de-selected and depending on that
     * close the menu.
     */


    /*
     * In order to inform the user which Option is active the component keeps
     * track of when an option is in focus by the user and depending on that
     * provide a visual indicator.
     */


    /*
     * Initiate the toggle for the menu.
     */


    /*
     * Toggle the menu after a user touched it & resets the pressed state
     * for to toggle.
     */


    /*
     * Reset the precondition to initialize a toggle of the menu.
     */


    /*
     * Set isActive to true on mouse-down.
     */


    /*
     * Set isActive to false on mouse-up.
     */


    /*
     * Set isActive to false on mouse-up.
     */


    /*
     * Set isActive to false on is context menu opens on select's div.
     */


    /*
     * Update focus for the options for an already open menu.
     *
     * The user experience of HTML's native select is good and the goal here is to
     * achieve the same behaviour.
     *
     * - Focus on the first entry in case no options is focused on.
     * - Switch focus to the next option in case one option already has focus.
     */


    /*
     * Update focus for the options for an already open menu.
     *
     * The user experience of HTML's native select is good and the goal here is to
     * achieve the same behaviour.
     *
     * - Focus on the last entry in case no options is focused on.
     * - Switch focus to the previous option in case one option already has focus.
     */


    /*
     * After the user pressed the `Enter` or `Space` key for an already open
     * menu the focused option is selected.
     *
     * Same as _onClickAtOption this update the state & dispatches a change event.
     */


    /*
     * Manages the keyboard events.
     *
     * In case the Select is in focus, but closed ArrowDown, ArrowUp, Enter and
     * Space will result in opening the menu.
     *
     * In case the menu is already open each key press will have
     * different effects already documented in the related methods.
     *
     * Pressing Escape will close the menu.
     */


    /*
     * Toggle the menu after a user clicked on it.
     */

  }, {
    key: '_getIndexOfFocusedOption',


    /*
     * Returns the index of the entry with a certain value from the component's
     * children.
     *
     * The index search includes only option components.
     */
    value: function _getIndexOfFocusedOption() {
      var _this2 = this;

      return (0, _findIndex2.default)(this.options, function (element) {
        return element.props.value === _this2.state.focusedOptionValue;
      });
    }

    /*
     * Returns the value of the child with a certain index.
     */

  }, {
    key: '_getValueForIndex',
    value: function _getValueForIndex(index) {
      return this.options[index].props.value;
    }

    /*
     * After an option has been selected the menu gets closed and the
     * selection processed.
     *
     * Depending on the component's properties the value gets updated and the
     * provided change callback for onUpdate or valueLink is called.
     */

  }, {
    key: '_triggerChange',
    value: function _triggerChange(value) {
      if ((0, _has2.default)(this.props, 'valueLink')) {
        this.props.valueLink.requestChange(value);
        this.setState({
          isOpen: false
        });
      } else if ((0, _has2.default)(this.props, 'value')) {
        this.setState({
          isOpen: false
        });
      } else {
        this.setState({
          focusedOptionValue: value,
          selectedValue: value,
          isOpen: false
        });
      }

      if (this.props.onUpdate) {
        this.props.onUpdate({ value: value });
      }
    }
  }, {
    key: '_renderChildren',
    value: function _renderChildren() {
      var _this3 = this;

      var optionsIndex = 0;

      return _react2.default.Children.map(this.children, function (entry, index) {
        if (isOption(entry)) {
          // filter out all non-Option Components
          var localOptionIndex = optionsIndex;
          var isHovered = entry.props.value === _this3.state.focusedOptionValue;
          var element = _react2.default.createElement(
            _selectItem2.default,
            {
              onItemClick: _this3._onClickAtOption,
              onItemTouchStart: _this3._onTouchStartAtOption,
              onItemTouchMove: _this3._onTouchMoveAtOption,
              onItemTouchEnd: _this3._onTouchEndAtOption,
              onItemTouchCancel: _this3._onTouchCancelAtOption,
              onItemMouseEnter: _this3._onMouseEnterAtOption,
              isHovered: isHovered,
              index: localOptionIndex,
              key: index
            },
            entry
          );
          optionsIndex++;

          return element;
        } else if (isSeparator(entry)) {
          return _react2.default.createElement(
            'li',
            {
              key: index,
              role: 'presentation'
            },
            entry
          );
        }

        return null;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var defaultStyle = (0, _assign2.default)({}, _selectStyle2.default.style, this.props.style);
      var hoverStyle = (0, _assign2.default)({}, defaultStyle, _selectStyle2.default.hoverStyle, this.props.hoverStyle);
      var focusStyle = (0, _assign2.default)({}, defaultStyle, _selectStyle2.default.focusStyle, this.props.focusStyle);
      var activeStyle = (0, _assign2.default)({}, defaultStyle, _selectStyle2.default.activeStyle, this.props.activeStyle);
      var disabledStyle = (0, _assign2.default)({}, defaultStyle, _selectStyle2.default.disabledStyle, this.props.disabledStyle);
      var disabledHoverStyle = (0, _assign2.default)({}, disabledStyle, _selectStyle2.default.disabledHoverStyle, this.props.disabledHoverStyle);
      var menuStyle = (0, _assign2.default)({}, _selectStyle2.default.menuStyle, this.props.menuStyle);
      var caretToCloseStyle = (0, _assign2.default)({}, _selectStyle2.default.caretToCloseStyle, this.props.caretToCloseStyle);
      var caretToOpenStyle = (0, _assign2.default)({}, _selectStyle2.default.caretToOpenStyle, this.props.caretToOpenStyle);
      var disabledCaretToOpenStyle = (0, _assign2.default)({}, caretToOpenStyle, _selectStyle2.default.disabledCaretToOpenStyle, this.props.disabledCaretToOpenStyle);
      var wrapperStyle = (0, _assign2.default)({}, _selectStyle2.default.wrapperStyle, this.props.wrapperStyle);

      var selectedOptionOrPlaceholder = void 0;
      if (this.state.selectedValue !== void 0) {
        var selectedEntry = (0, _find2.default)(this.children, function (entry) {
          return entry.props.value === _this4.state.selectedValue;
        });

        if (selectedEntry) {
          selectedOptionOrPlaceholder = _react2.default.cloneElement(selectedEntry, {
            _isDisplayedAsSelected: true
          });
        }
      } else {
        selectedOptionOrPlaceholder = (0, _find2.default)(this.children, isPlaceholder);
      }

      var separators = (0, _filter2.default)(this.children, isSeparator);
      var childrenNotPresent = (0, _isEmpty2.default)(this.options) && (0, _isEmpty2.default)(separators);
      var computedMenuStyle = this.props.disabled || !this.state.isOpen || childrenNotPresent ? { display: 'none' } : menuStyle;
      var hasCustomTabIndex = this.props.wrapperProps && this.props.wrapperProps.tabIndex;
      var tabIndex = hasCustomTabIndex ? this.props.wrapperProps.tabIndex : '0';

      var selectedOptionWrapperStyle = void 0;
      if (this.props.disabled) {
        if (this.state.isTouchedToToggle) {
          selectedOptionWrapperStyle = disabledHoverStyle;
        } else {
          selectedOptionWrapperStyle = disabledStyle;
        }

        tabIndex = -1;
      } else {
        if (this.state.isActive) {
          selectedOptionWrapperStyle = activeStyle;
        } else if (this.state.isFocused) {
          selectedOptionWrapperStyle = focusStyle;
        } else if (this.state.isTouchedToToggle) {
          selectedOptionWrapperStyle = hoverStyle;
        } else {
          selectedOptionWrapperStyle = defaultStyle;
        }
      }

      var caretStyle = void 0;
      if (this.props.disabled) {
        caretStyle = disabledCaretToOpenStyle;
      } else if (this.state.isOpen) {
        caretStyle = caretToCloseStyle;
      } else {
        caretStyle = caretToOpenStyle;
      }

      return _react2.default.createElement(
        'div',
        (0, _assign2.default)({
          style: wrapperStyle,
          tabIndex: tabIndex,
          onKeyDown: this._onKeyDown,
          onBlur: this._onBlur,
          onFocus: this._onFocus,
          ref: function ref(c) {
            return _this4.wrapper = c;
          }
        }, this.state.wrapperProps),
        _react2.default.createElement(
          'div',
          (0, _assign2.default)({
            onClick: this._onClickToggleMenu,
            onTouchStart: this._onTouchStartToggleMenu,
            onTouchEnd: this._onTouchEndToggleMenu,
            onTouchCancel: this._onTouchCancelToggleMenu,
            onContextMenu: this._onContextMenu,
            onMouseDown: this._onMouseDown,
            onMouseUp: this._onMouseUp,
            style: selectedOptionWrapperStyle,
            className: (0, _unionClassNames2.default)(this.props.className, this._styleId),
            ref: function ref(c) {
              return _this4.selectedOptionWrapper = c;
            },
            role: 'button',
            'aria-expanded': this.state.isOpen,
            id: this.selectedOptionWrapperId
          }, this.state.selectedOptionWrapperProps),
          selectedOptionOrPlaceholder,
          _react2.default.createElement('span', (0, _assign2.default)({
            style: caretStyle
          }, this.state.caretProps))
        ),
        _react2.default.createElement(
          'ul',
          (0, _assign2.default)({
            style: computedMenuStyle,
            role: 'listbox',
            'aria-labelledby': this.selectedOptionWrapperId,
            ref: function ref(c) {
              return _this4.menu = c;
            }
          }, this.state.menuProps),
          this._renderChildren()
        )
      );
    }
  }]);
  return Select;
}(_react.Component);

Select.displayName = 'Select';
Select.propTypes = selectPropTypes;
Select.childContextTypes = {
  isDisabled: _react.PropTypes.bool.isRequired,
  isHoveredValue: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.number])
};
Select.defaultProps = {
  disabled: false
};
exports.default = Select;

//# sourceMappingURL=impl.js.map