import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import calculateTextareaHeight from 'bit/utils/calculate-textarea-height';
import { injectStyles, removeStyle } from 'bit/utils/inject-style';
import unionClassNames from 'bit/utils/union-class-names';
import omit from 'bit/utils/omit';
import has from 'bit/utils/has';
import uniqueId from 'bit/utils/unique-id';
import style from 'bit/style/text-input-style';

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

const newLineRegex = /[\r\n]/g;

const textInputPropTypes = {
  className: PropTypes.string,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  style: PropTypes.object,
  hoverStyle: PropTypes.object,
  focusStyle: PropTypes.object,
  allowNewLine: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledStyle: PropTypes.object,
  disabledHoverStyle: PropTypes.object,
  onUpdate: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  valueLink: PropTypes.shape({
    value: PropTypes.string.isRequired,
    requestChange: PropTypes.func.isRequired,
  }),
};

/*
 * Returns an object with properties that are relevant for the TextInput's textarea.
 *
 * As the height of the textarea needs to be calculated valueLink can not be
 * passed down to the textarea, but made available through this component.
 */
function sanitizeChildProps(properties) {
  const childProps = omit(properties, Object.keys(textInputPropTypes));
  if (typeof properties.valueLink === 'object') {
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
  const hoverStyle = {
    ...style.hoverStyle,
    ...properties.hoverStyle,
  };
  const focusStyle = {
    ...style.focusStyle,
    ...properties.focusStyle,
  };
  const disabledHoverStyle = {
    ...style.disabledHoverStyle,
    ...properties.disabledHoverStyle,
  };

  const styles = [
    {
      id: styleId,
      style: hoverStyle,
      pseudoClass: 'hover',
    },
    {
      id: styleId,
      style: focusStyle,
      pseudoClass: 'focus',
    },
    {
      id: styleId,
      style: disabledHoverStyle,
      pseudoClass: 'hover',
      disabled: true,
    },
  ];
  injectStyles(styles);
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
export default class TextInput extends Component {

  constructor(properties) {
    super(properties);
    let inputValue;

    if (has(properties, 'valueLink')) {
      inputValue = properties.valueLink.value;
    } else if (has(properties, 'value')) {
      inputValue = properties.value;
    } else if (has(properties, 'defaultValue')) {
      inputValue = properties.defaultValue;
    }

    this.state = {
      height: 'auto',
      inputValue,
    };
    this.textareaProps = sanitizeChildProps(properties);
  }

  static displayName = 'TextInput';

  static propTypes = textInputPropTypes;

  static defaultProps = {
    allowNewLine: false,
    disabled: false,
  };

  /*
   * Generates the style-id & inject the focus & hover style.
   */
  componentWillMount() {
    const id = uniqueId();
    this._styleId = `style-id${id}`;
    updatePseudoClassStyle(this._styleId, this.props);
  }

  /*
   * Right after the component go injected into the DOM it should be resized.
   */
  componentDidMount() {
    this._triggerResize(this.state.inputValue);
  }

  /*
   * Update the properties passed to the textarea and resize as with the new
   * properties the height might have changed.
   */
  componentWillReceiveProps(properties) {
    // Makes sure we have inputValue available when triggering a resize.
    const newState = {
      inputValue: this.state.inputValue,
    };
    if (has(properties, 'valueLink')) {
      newState.inputValue = properties.valueLink.value;
    } else if (has(properties, 'value')) {
      newState.inputValue = properties.value;
    }

    this.textareaProps = sanitizeChildProps(properties);
    removeStyle(this._styleId);
    updatePseudoClassStyle(this._styleId, properties);
    this.setState(newState, () => this._triggerResize(newState.inputValue));
  }

  /*
   * Remove a component's associated styles whenever it gets removed from the DOM.
   */
  componentWillUnmount() {
    removeStyle(this._styleId);
  }

  /*
   * Prevent any newline (except allowNewLine is active) and pass the event to
   * the onKeyDown property.
   *
   * This is an optimization to avoid adding a newline char & removing it right
   * away in the onUpdate callback.
   */
  _onKeyDown = (event) => {
    if (!this.props.allowNewLine && event.key === 'Enter') {
      event.preventDefault();
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  };

  /*
   * Update the height and calls the provided change callback for onUpdate
   * or valueLink.
   *
   * In addition newline characters are replaced by spaces in the textarea value
   * in case allowNewLine is set to false and newLine characters could be found.
   */
  _onChange = (event) => {
    let value = event.target.value;

    if (!this.props.allowNewLine && value.match(newLineRegex) !== null) {
      value = value.replace(newLineRegex, ' ');
    }

    if (has(this.props, 'valueLink')) {
      this.props.valueLink.requestChange(value);
    } else if (has(this.props, 'defaultValue')) {
      this.setState({
        inputValue: value,
      });
    }

    if (this.props.onUpdate) {
      this.props.onUpdate({ value });
    }

    this._triggerResize(value);
  };

  /*
   * Calculate the height and store the new height in the state to trigger a render.
   */
  _triggerResize(textareaValue) {
    const height = calculateTextareaHeight(ReactDOM.findDOMNode(this), textareaValue, this.props.minRows, this.props.maxRows, this.props.minHeight, this.props.maxHeight);
    this.setState({ height });
  }

  render() {
    let textareaStyle = {
      ...style.style,
      ...this.props.style,
    };

    if (this.props.disabled) {
      textareaStyle = {
        ...textareaStyle,
        ...style.disabledStyle,
        ...this.props.disabledStyle,
      };
    }

    textareaStyle.height = this.state.height;
    return (
      <textarea
        style={ textareaStyle }
        value = {this.state.inputValue}
        className={ unionClassNames(this.props.className, this._styleId) }
        onChange={ this._onChange }
        onKeyDown={ this._onKeyDown }
        disabled={ this.props.disabled }
        { ...this.textareaProps }
      />
    );
  }
}