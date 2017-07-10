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

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _calculateTextareaHeight = require('bit/utils/calculate-textarea-height');

var _calculateTextareaHeight2 = _interopRequireDefault(_calculateTextareaHeight);

var _injectStyle = require('bit/utils/inject-style');

var _unionClassNames = require('bit/utils/union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

var _omit = require('bit/utils/omit');

var _omit2 = _interopRequireDefault(_omit);

var _has = require('bit/utils/has');

var _has2 = _interopRequireDefault(_has);

var _uniqueId = require('bit/utils/unique-id');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _textInputStyle = require('bit/style/text-input-style');

var _textInputStyle2 = _interopRequireDefault(_textInputStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # TextInput Component
 * Note: The TextInput automatically grows in height once the text becomes too long to fit in. Still every TextInput is just rendered as a simple HTML textarea.
 * 
 * ## Properties:
 * * `{Value Reference} valueLink` (optional) - Behaves like the valueLink poperty of any React rendered input of type="text" or textarea. ValueLink allows to enable two-way data binding between a state property and the value in the user interface.
 * * `{String} defaultValue` (optional) - Behaves like the defaultValue property of any React rendered input of type="text" or textarea. The TextInput's field value is set and can be manipulated through the user interface.
 * * `{String} value` (optional) - Behaves like the value property of any React rendered input of type="text" or textarea. The TextInput's field value is set and can not be manipulated through the user interface.
 * * `{Function} onUpdate` (optional) - Callback executed every time a user updates the text in the textarea. onUpdate has one argument which is an object containing the value e.g. { value: 'What a beautiful da' }.
 * * `{Boolean} disabled` (optional) - If true the Textarea will be disabled and text can't be manipulated by a user.
 * * `{Integer} minRows` (optional) - Once set the TextInput will always keep a minimum height to fit this amount of text input lines. This can be useful to indicate to users that it is expected from them to provide a certain amount of text input.
 * * `{Integer} maxRows` (optional) - Once set the TextInput will always keep a maximum height to fit this amount of text input lines. This can be useful to keep your layout sane even with a lot of text input.
 * * `{Integer} minHeight` (optional) - Will be deprecated with Belle 2.0.0. We recommend to use minRows.
 * * `{Integer} maxHeight` (optional) - Will be deprecated with Belle 2.0.0. We recommend to use maxRows.
 * * `{Object} hoverStyle` (optional) - Works like React's built-in style property except that it extends the properties from the base style. Becomes active once the user hovers over the input with the cursor.
 * * `{Object} focusStyle` (optional) - Works like React's built-in style property except that it extends the properties from the base style. Becomes active once the input is the element focused in the DOM.
 * * `{Object} disabledStyle` (optional) - Works like React's built-in style property except that it extends the properties from the base style. Becomes active once the textarea is disabled.
 * * `{Object} disabledHoverStyle` (optional) - Works like React's built-in style property except that it extends the properties from the base disabledStyle. Becomes active once the textarea is disabled and a user hovers over it.
 * * Any other property valid for a HTML textarea like style, placeholder, onClick, ...
 * 
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/text-input?_k=shc6fv) documentation.
 * 
 * ## Standard example
 * ```js
 * <!-- TextInput with a defaultValue -->
 * <TextInput defaultValue="Jane Doe" placeholder="Name" />
 * 
 * <!-- TextInput with allowNewLine set to true -->
 * <TextInput defaultValue="This TextInput has allowNewLine set to true. Just press 'Return' once editing the text." allowNewLine />
 * ```
 * 
 * ## TextInput with custom styling & two-way data binding
 * ```js
 * <TextInput minRows={ 3 }
 *      valueLink={ this.linkState('customTextInputValue') }
 *      placeholder="Just fill in whatever you like :)"
 *      style={{
 *        border: '1px solid #C8C8C8',
 *        padding: 10,
 *        width: 280,
 *        borderRadius: 3,
 *        boxShadow: 'inset 0 1px 2px #CCC'
 *      }}
 *      hoverStyle={{
 *        border: '1px solid #6C6C6C'
 *      }}
 *      focusStyle={{
 *        borderColor: '#53C7F2',
 *        boxShadow: 'inset 0 1px 2px #CCC, 0 0 8px #53C7F2'
 *      }} />
 *
 * <p>Two-way data binding: { this.state.customTextInputValue }</p>
 * ```
 * 
 * ## Disabled Text Input
 * ```js
 * <TextInput disabled defaultValue="Maecenas eu placerat ante. Fusce venenatis. Duis tincidunt mi at quam condimentum lobortis condimentum lobortis." />
 * ```
 * @bit
 */

var newLineRegex = /[\r\n]/g;

var textInputPropTypes = {
  className: _react.PropTypes.string,
  minHeight: _react.PropTypes.number,
  maxHeight: _react.PropTypes.number,
  minRows: _react.PropTypes.number,
  maxRows: _react.PropTypes.number,
  style: _react.PropTypes.object,
  hoverStyle: _react.PropTypes.object,
  focusStyle: _react.PropTypes.object,
  allowNewLine: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  disabledStyle: _react.PropTypes.object,
  disabledHoverStyle: _react.PropTypes.object,
  onUpdate: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func,
  value: _react.PropTypes.string,
  defaultValue: _react.PropTypes.string,
  valueLink: _react.PropTypes.shape({
    value: _react.PropTypes.string.isRequired,
    requestChange: _react.PropTypes.func.isRequired
  })
};

/*
 * Returns an object with properties that are relevant for the TextInput's textarea.
 *
 * As the height of the textarea needs to be calculated valueLink can not be
 * passed down to the textarea, but made available through this component.
 */
function sanitizeChildProps(properties) {
  var childProps = (0, _omit2.default)(properties, (0, _keys2.default)(textInputPropTypes));
  if ((0, _typeof3.default)(properties.valueLink) === 'object') {
    childProps.value = properties.valueLink.value;
  }

  return childProps;
}

/*
 * Update hover & focus style for the speficied styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param properties {object} - the components properties optionally containing hoverStyle & focusStyle
 */
function updatePseudoClassStyle(styleId, properties) {
  var hoverStyle = (0, _assign2.default)({}, _textInputStyle2.default.hoverStyle, properties.hoverStyle);
  var focusStyle = (0, _assign2.default)({}, _textInputStyle2.default.focusStyle, properties.focusStyle);
  var disabledHoverStyle = (0, _assign2.default)({}, _textInputStyle2.default.disabledHoverStyle, properties.disabledHoverStyle);

  var styles = [{
    id: styleId,
    style: hoverStyle,
    pseudoClass: 'hover'
  }, {
    id: styleId,
    style: focusStyle,
    pseudoClass: 'focus'
  }, {
    id: styleId,
    style: disabledHoverStyle,
    pseudoClass: 'hover',
    disabled: true
  }];
  (0, _injectStyle.injectStyles)(styles);
}

/*
 * TextInput component with great UX like autogrowing & handling states
 *
 * Note on styling: Right now this component doen't allow to change style after
 * initialisation.
 *
 * Note on resizing:
 * If you fill a textarea only with spaces and the cursor reaches the right end
 * it won't break the line. This leads to unexpected behaviour for the automatic
 * resizing.
 *
 * This component was highly inspired by the great work from these guys
 * - Andrey Popp: https://github.com/andreypopp/react-textarea-autosize
 * - Eugene: https://gist.github.com/eugene1g/5dbaa7d35d0c7d5c2c56
 */

var TextInput = function (_Component) {
  (0, _inherits3.default)(TextInput, _Component);

  function TextInput(properties) {
    (0, _classCallCheck3.default)(this, TextInput);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TextInput.__proto__ || (0, _getPrototypeOf2.default)(TextInput)).call(this, properties));

    _this._onKeyDown = function (event) {
      if (!_this.props.allowNewLine && event.key === 'Enter') {
        event.preventDefault();
      }

      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(event);
      }
    };

    _this._onChange = function (event) {
      var value = event.target.value;

      if (!_this.props.allowNewLine && value.match(newLineRegex) !== null) {
        value = value.replace(newLineRegex, ' ');
      }

      if ((0, _has2.default)(_this.props, 'valueLink')) {
        _this.props.valueLink.requestChange(value);
      } else if ((0, _has2.default)(_this.props, 'defaultValue')) {
        _this.setState({
          inputValue: value
        });
      }

      if (_this.props.onUpdate) {
        _this.props.onUpdate({ value: value });
      }

      _this._triggerResize(value);
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
      height: 'auto',
      inputValue: inputValue
    };
    _this.textareaProps = sanitizeChildProps(properties);
    return _this;
  }

  (0, _createClass3.default)(TextInput, [{
    key: 'componentWillMount',


    /*
     * Generates the style-id & inject the focus & hover style.
     */
    value: function componentWillMount() {
      var id = (0, _uniqueId2.default)();
      this._styleId = 'style-id' + id;
      updatePseudoClassStyle(this._styleId, this.props);
    }

    /*
     * Right after the component go injected into the DOM it should be resized.
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._triggerResize(this.state.inputValue);
    }

    /*
     * Update the properties passed to the textarea and resize as with the new
     * properties the height might have changed.
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      var _this2 = this;

      // Makes sure we have inputValue available when triggering a resize.
      var newState = {
        inputValue: this.state.inputValue
      };
      if ((0, _has2.default)(properties, 'valueLink')) {
        newState.inputValue = properties.valueLink.value;
      } else if ((0, _has2.default)(properties, 'value')) {
        newState.inputValue = properties.value;
      }

      this.textareaProps = sanitizeChildProps(properties);
      (0, _injectStyle.removeStyle)(this._styleId);
      updatePseudoClassStyle(this._styleId, properties);
      this.setState(newState, function () {
        return _this2._triggerResize(newState.inputValue);
      });
    }

    /*
     * Remove a component's associated styles whenever it gets removed from the DOM.
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _injectStyle.removeStyle)(this._styleId);
    }

    /*
     * Prevent any newline (except allowNewLine is active) and pass the event to
     * the onKeyDown property.
     *
     * This is an optimization to avoid adding a newline char & removing it right
     * away in the onUpdate callback.
     */


    /*
     * Update the height and calls the provided change callback for onUpdate
     * or valueLink.
     *
     * In addition newline characters are replaced by spaces in the textarea value
     * in case allowNewLine is set to false and newLine characters could be found.
     */

  }, {
    key: '_triggerResize',


    /*
     * Calculate the height and store the new height in the state to trigger a render.
     */
    value: function _triggerResize(textareaValue) {
      var height = (0, _calculateTextareaHeight2.default)(_reactDom2.default.findDOMNode(this), textareaValue, this.props.minRows, this.props.maxRows, this.props.minHeight, this.props.maxHeight);
      this.setState({ height: height });
    }
  }, {
    key: 'render',
    value: function render() {
      var textareaStyle = (0, _assign2.default)({}, _textInputStyle2.default.style, this.props.style);

      if (this.props.disabled) {
        textareaStyle = (0, _assign2.default)({}, textareaStyle, _textInputStyle2.default.disabledStyle, this.props.disabledStyle);
      }

      textareaStyle.height = this.state.height;
      return _react2.default.createElement('textarea', (0, _assign2.default)({
        style: textareaStyle,
        value: this.state.inputValue,
        className: (0, _unionClassNames2.default)(this.props.className, this._styleId),
        onChange: this._onChange,
        onKeyDown: this._onKeyDown,
        disabled: this.props.disabled
      }, this.textareaProps));
    }
  }]);
  return TextInput;
}(_react.Component);

TextInput.displayName = 'TextInput';
TextInput.propTypes = textInputPropTypes;
TextInput.defaultProps = {
  allowNewLine: false,
  disabled: false
};
exports.default = TextInput;

//# sourceMappingURL=impl.js.map