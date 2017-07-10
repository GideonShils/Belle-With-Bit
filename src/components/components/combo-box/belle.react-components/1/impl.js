import React, { Component, PropTypes } from 'react';
import { injectStyles, removeAllStyles } from 'bit/utils/inject-style';
import unionClassNames from 'bit/utils/union-class-names';
import omit from 'bit/utils/omit';
import filterReactChildren from 'bit/utils/filter-react-children';
import has from 'bit/utils/has';
import isEmpty from 'bit/utils/is-empty';
import find from 'bit/utils/find';
import getArrayForReactChildren from 'bit/utils/get-array-for-react-children';
import uniqueId from 'bit/utils/unique-id';
import style from 'bit/style/combo-box-style';
import ComboBoxItem from 'bit/components/combo-box-item';

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

const comboBoxPropTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  valueLink: PropTypes.shape({
    value: PropTypes.string,
    requestChange: PropTypes.func.isRequired,
  }),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  wrapperProps: PropTypes.object,
  menuProps: PropTypes.object,
  caretProps: PropTypes.object,
  onUpdate: PropTypes.func,
  onInputMatch: PropTypes.func,
  tabIndex: PropTypes.number,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  caretClassName: PropTypes.string,
  style: PropTypes.object,
  wrapperStyle: PropTypes.object,
  hintStyle: PropTypes.object,
  menuStyle: PropTypes.object,
  focusStyle: PropTypes.object,
  disabledStyle: PropTypes.object,
  disabledHoverStyle: PropTypes.object,
  hoverStyle: PropTypes.object,
  caretToOpenStyle: PropTypes.object,
  caretToCloseStyle: PropTypes.object,
  disabledCaretToOpenStyle: PropTypes.object,
  maxOptions: PropTypes.number,
  displayCaret: PropTypes.bool,
  enableHint: PropTypes.bool,
  filterFunc: PropTypes.func,
  'aria-label': PropTypes.string,
};

/*
 * Update hover style for the specified styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param caretStyleId {string} - unique is assigned as class to caret span
 * @param properties {object} - the components properties optionally containing hoverStyle
 */
function updatePseudoClassStyle(styleId, caretStyleId, properties) {
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
  const caretFocusStyle = {
    ...style.caretFocusStyle,
  };

  const styles = [
    {
      id: styleId,
      style: hoverStyle,
      pseudoClass: 'hover',
    },
    {
      id: styleId,
      style: disabledHoverStyle,
      pseudoClass: 'hover',
      disabled: true,
    },
    {
      id: styleId,
      style: focusStyle,
      pseudoClass: 'focus',
    },
    {
      id: caretStyleId,
      style: caretFocusStyle,
      pseudoClass: 'focus',
    },
  ];
  injectStyles(styles);
}

/*
 * Returns an object with properties that are relevant for the wrapper div.
 */
function sanitizeWrapperProps(properties) {
  return omit(properties, [
    'style',
    'aria-label',
    'aria-disabled',
  ]);
}

/*
 * Returns an object with properties that are relevant for the input box.
 */
function sanitizeInputProps(properties) {
  return omit(properties, Object.keys(comboBoxPropTypes));
}

/*
 * Returns an object with properties that are relevant for the wrapping div of
 * the selected option.
 */
function sanitizeCaretProps(properties) {
  return omit(properties, [
    'style',
    'className',
    'onClick',
    'tabIndex',
  ]);
}

/*
 * Returns an object with properties that are relevant for the combo-box menu.
 */
function sanitizeMenuProps(properties) {
  return omit(properties, [
    'style',
    'ref',
    'role',
  ]);
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
export default class ComboBox extends Component {

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
      isOpen: false,
      focusedOptionIndex: undefined,
      inputValue: inputValue || '',
      wrapperProps: sanitizeWrapperProps(properties.wrapperProps),
      inputProps: sanitizeInputProps(properties),
      caretProps: sanitizeCaretProps(properties.caretProps),
      menuProps: sanitizeMenuProps(properties.menuProps),
    };

    this.filteredOptions = ComboBox.filterOptions(inputValue, properties);
  }

  static displayName = 'ComboBox';

  static propTypes = comboBoxPropTypes;

  static childContextTypes = {
    isDisabled: PropTypes.bool.isRequired,
    isHoveredValue: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  static defaultProps = {
    disabled: false,
    displayCaret: false,
    enableHint: false,
    'aria-label': 'ComboBox',
    filterFunc, // TODO rename to filterFunction in 4.0.0
    tabIndex: 0,
    children: [],
  };

  getChildContext() {
    let value;
    if (typeof this.state.focusedOptionIndex !== 'undefined') {
      value = this.filteredOptions[this.state.focusedOptionIndex].props.value;
    }

    return {
      isDisabled: this.props.disabled,
      isHoveredValue: value,
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
  _getHint() {
    if (this.state.isOpen) {
      const filteredOptions = this.filteredOptions;
      if (filteredOptions && filteredOptions.length > 0) {
        let hint;
        const focusedOptionIndex = this.state.focusedOptionIndex;
        const inputValue = this.state.inputValue;
        if (focusedOptionIndex >= 0) {
          hint = filteredOptions[focusedOptionIndex].props.value;
        } else if (inputValue && inputValue.length > 0) {
          hint = filteredOptions[0].props.value;
        }

        if (hint) {
          if (inputValue && inputValue.length > 0) {
            const position = hint.toLowerCase().indexOf(inputValue.toLowerCase());
            if (position === 0) {
              return inputValue + hint.substr(inputValue.length, (hint.length - inputValue.length));
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
  componentWillMount() {
    const id = uniqueId();
    this._styleId = `style-id${id}`;
    this._caretStyleId = `caretStyle-id${id}`;
    updatePseudoClassStyle(this._styleId, this._caretStyleId, this.props);
  }

  componentWillReceiveProps(properties) {
    const newState = {
      wrapperProps: sanitizeWrapperProps(properties.wrapperProps),
      inputProps: sanitizeInputProps(properties),
      caretProps: sanitizeCaretProps(properties.caretProps),
      menuProps: sanitizeMenuProps(properties.menuProps),
    };

    if (has(properties, 'valueLink')) {
      newState.inputValue = properties.valueLink.value || '';
    } else if (has(properties, 'value')) {
      newState.inputValue = properties.value || '';
    }

    if (newState.inputValue) {
      newState.filteredOptions = ComboBox.filterOptions(newState.inputValue, properties);
    }

    this.setState(newState);

    removeAllStyles([this._styleId, this._caretStyleId]);
    updatePseudoClassStyle(this._styleId, this._caretStyleId, properties);
  }

  /*
   * Remove a component's associated styles whenever it gets removed from the DOM.
   */
  componentWillUnmount() {
    removeAllStyles([this._styleId, this._caretStyleId]);
  }

  /*
   * Update focusedOptionIndex when an option is touched.
   */
  _onTouchStartAtOption = (event, index) => {
    if (!this.props.disabled && event.touches.length === 1) {
      this._touchStartedAt = index;
      this.setState({ focusedOptionIndex: index });
    }
  };

  /*
   * Triggers a change event after the user touched on an Option.
   */
  _onTouchEndAtOption = (event, index) => {
    if (!this.props.disabled && this._touchStartedAt) {
      if (this._touchStartedAt === index) {
        event.preventDefault();
        this._triggerChange(this._getValueForIndex(index));
      }

      this._touchStartedAt = undefined;
    }
  };

  /*
   * Update focusedOptionIndex to undefined on touch cancel.
   */
  _onTouchCancelAtOption = () => {
    if (!this.props.disabled) {
      this._touchStartedAt = undefined;
      this.setState({ focusedOptionIndex: undefined });
    }
  };

  /*
   * Closed opened combo-box options and removed focusStyles on blur.
   */
  _onBlur = (event) => {
    if (!this.props.disabled) {
      this.setState({
        isOpen: false,
        focusedOptionIndex: undefined,
      });
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  /*
   * Set focused state when element is focused.
   */
  _onFocus = (event) => {
    if (!this.props.disabled) {
      this.setState({
        isOpen: true,
      });
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  /*
   * Open/ Close menu when create is clicked.
   */
  _onCaretClick = () => {
    if (!this.props.disabled) {
      const isOpen = !this.state.isOpen;
      this.setState({
        isOpen,
      });
    }
  };

  /*
   * Update focusedOptionIndex for component when mouse enters an option.
   */
  _onMouseEnterAtOption = (index) => {
    if (!this.props.disabled) {
      this.setState({
        focusedOptionIndex: index,
      });
    }
  };

  /*
   * Set focusedOptionIndex to undefined.
   */
  _onMouseLeaveAtOption = () => {
    if (!this.props.disabled) {
      this.setState({
        focusedOptionIndex: undefined,
      });
    }
  };

  /*
   * Update component value when an option is clicked.
   */
  _onClickAtOption = (index) => {
    if (!this.props.disabled) {
      this._triggerChange(this._getValueForIndex(index));
    }
  };

  /*
   * Handle keyDown in input (when input is focused):
   * 1. ComboBox is closed and ArrowDown/ ArrowUp is pressed -> open the ComboBox
   * 2. ComboBox is opened and ArrowDown is pressed -> highlight next option
   * 3. ComboBox is opened and ArrowUp is pressed -> highlight previous option
   * 4. ComboBox is opened and ArrowRight is pressed -> value of hint is copied over to inputBox
   * 5. ComboBox is opened and Enter/ Tab is pressed -> update input value to value of option
   * 6. ComboBox is opened and Esc is pressed -> close ComboBox
   */
  _onKeyDown = (event) => {
    if (!this.props.disabled) {
      if (!this.state.isOpen) {
        if (event.key === 'ArrowDown' ||
          event.key === 'ArrowUp') {
          event.preventDefault();
          this.setState({
            isOpen: true,
          });
        }
      } else {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          this._onArrowDownKeyDown();
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          this._onArrowUpKeyDown();
        } else if (event.key === 'ArrowRight') {
          if (this.props.enableHint) {
            event.preventDefault();
            const hint = this._getHint();
            if (hint) {
              this._userUpdateValue(hint);
            }
          }
        } else if (event.key === 'Enter') {
          event.preventDefault();
          this._onEnterOrTabKeyDown();
        } else if (event.key === 'Tab') {
          // event.preventDefault(); should not be called here else tab
          // will not be able to take user to next component on the page
          this._onEnterOrTabKeyDown();
        } else if (event.key === 'Escape') {
          event.preventDefault();
          this.setState({
            isOpen: false,
            focusedOptionIndex: undefined,
          });
        }
      }
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  };

  /*
   * Highlight next option when arrowDown key is pressed.
   * Highlight first option if currently last option is focused.
   */
  _onArrowDownKeyDown = () => {
    let index = 0;
    if (this.state.focusedOptionIndex !== undefined && (this.state.focusedOptionIndex + 1) < this.filteredOptions.length) {
      index = this.state.focusedOptionIndex + 1;
    }

    this.setState({
      focusedOptionIndex: index,
    });
  };

  /*
   * Highlight previous option when arrowUp key is pressed.
   * Highlight last option if currently first option is focused.
   */
  _onArrowUpKeyDown() {
    if (this.filteredOptions.length > 0) {
      let index = this.filteredOptions.length - 1;
      if (this.state.focusedOptionIndex) {
        index = this.state.focusedOptionIndex - 1;
      }

      this.setState({
        focusedOptionIndex: index,
      });
    }
  }

  /*
   * Update value of Input box to the value of highlighted option.
   */
  _onEnterOrTabKeyDown() {
    if (this.state.focusedOptionIndex >= 0) {
      this._triggerChange(this.filteredOptions[this.state.focusedOptionIndex].props.value);
    }
  }

  /*
   * The function will return options (if any) who's value is same as value of the combo-box input.
   */
  _findMatch(value) {
    return find(this.filteredOptions, (entry) => entry.props.value === value);
  }

  /*
   * The function is called when user selects an option. Function will do following:
   * 1. Close the options
   * 2. Change value of input depending on whether its has value, defaultValue or valueLink property
   * 3. Call onUpdate props function
   */
  _triggerChange(value) {
    if (has(this.props, 'valueLink')) {
      this.props.valueLink.requestChange(value);
      this.setState({
        isOpen: false,
        focusedOptionIndex: undefined,
      });
    } else if (has(this.props, 'value')) {
      this.setState({
        isOpen: false,
        focusedOptionIndex: undefined,
      });
    } else {
      this.setState({
        inputValue: value,
        isOpen: false,
        focusedOptionIndex: undefined,
      });
      this.filteredOptions = ComboBox.filterOptions(value, this.props);
    }

    const obj = { value, isOptionSelection: true, isMatchingOption: true };
    const matchedOption = this._findMatch(value);
    obj.identifier = matchedOption ? matchedOption.props.identifier : undefined;

    if (this.props.onUpdate) {
      this.props.onUpdate(obj);
    }
  }

  /*
   * The function is called when user type/ paste value in the input box.
   */
  _onChange = (event) => {
    const value = event.target.value;
    this._userUpdateValue(value);
  };

  /*
   * Returns the value of the child with a certain index.
   */
  _getValueForIndex(index) {
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
  _userUpdateValue(value) {
    if (has(this.props, 'valueLink')) {
      this.props.valueLink.requestChange(value);
      this.setState({
        isOpen: true,
        focusedOptionIndex: undefined,
      });
    } else if (has(this.props, 'value')) {
      this.setState({
        isOpen: true,
        focusedOptionIndex: undefined,
      });
    } else {
      this.setState({
        inputValue: value,
        isOpen: true,
        focusedOptionIndex: undefined,
      });
      this.filteredOptions = ComboBox.filterOptions(value, this.props);
    }

    const obj = { value, isOptionSelection: false, isMatchingOption: false };

    const matchedOption = this._findMatch(value);
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
  static filterOptions(inputValue, properties) { /* eslint react/sort-comp:0*/
    let filteredOptions = [];
    if (!isEmpty(properties.children)) {
      if (inputValue) {
        filteredOptions = filterReactChildren(properties.children, (entry) => (
          properties.filterFunc(inputValue, entry.props.value)
        ));
      } else {
        filteredOptions = getArrayForReactChildren(properties.children, (entry) => entry);
      }

      if (properties.maxOptions) {
        filteredOptions = filteredOptions.splice(0, properties.maxOptions);
      }
    }

    return filteredOptions;
  }

  render() {
    let inputStyle = {
      ...style.style,
      ...this.props.style,
    };
    const hintStyle = {
      ...style.hintStyle,
      ...this.props.hintStyle,
    };
    const wrapperStyle = {
      ...style.wrapperStyle,
      ...this.props.wrapperStyle,
    };
    const menuStyle = {
      ...style.menuStyle,
      ...this.props.menuStyle,
    };

    const hint = this.props.enableHint ? this._getHint() : undefined;
    const placeHolder = !hint ? this.props.placeholder : undefined;
    const inputClassName = unionClassNames(this.props.className, this._styleId);
    const tabIndex = this.props.tabIndex ? this.props.tabIndex : '0';

    if (this.props.disabled) {
      inputStyle = {
        ...inputStyle,
        ...style.disabledStyle,
        ...this.props.disabledStyle,
      };
    }

    // todo: Currently there are no different hover styles for caret, like select they are probably not really needed.
    let caretStyle;
    if (this.props.displayCaret) {
      if (this.props.disabled) {
        caretStyle = {
          ...style.caretToOpenStyle,
          ...this.props.caretToOpenStyle,
          ...style.disabledCaretToOpenStyle,
          ...this.props.disabledCaretToOpenStyle,
        };
      } else if (this.state.isOpen) {
        caretStyle = {
          ...style.caretToCloseStyle,
          ...this.props.caretToCloseStyle,
        };
      } else {
        caretStyle = {
          ...style.caretToOpenStyle,
          ...this.props.caretToOpenStyle,
        };
      }
    }

    const computedMenuStyle = (this.state.isOpen && !this.props.disabled && this.filteredOptions && this.filteredOptions.length > 0) ? menuStyle : { display: 'none' };

    // using value for input makes it a controlled component and it will be changed in controlled manner if (1) user enters value, (2) user selects some option
    // value will be updated depending on whether user has passed value / valueLink / defaultValue as property
    return (
      <div
        style={ wrapperStyle }
        aria-label = { this.props['aria-label'] }
        aria-disabled = { this.props.disabled }
        {...this.state.wrapperProps}
      >
        <input
          style={ hintStyle }
          value={ hint }
          tabIndex = { -1 }
          key="style-hint"
          readOnly
        />

        <input
          disabled = { this.props.disabled }
          aria-disabled = { this.props.disabled }
          value={ this.state.inputValue }
          placeholder={ placeHolder }
          style={ inputStyle }
          className={ inputClassName }
          onChange={ this._onChange }
          tabIndex={ tabIndex }
          onBlur={ this._onBlur }
          onFocus={ this._onFocus }
          onKeyDown={ this._onKeyDown }
          aria-autocomplete="list"
          key="combo-input"
          {...this.state.inputProps}
        />
        <span
          style={ caretStyle }
          className = { this._caretStyleId }
          onClick = { this._onCaretClick }
          tabIndex = { -1 }
          {...this.state.caretProps}
        />

        <ul
          style={ computedMenuStyle }
          role="listbox"
          aria-expanded={ this.state.isOpen }
          {...this.state.menuProps}
        >
          {
            React.Children.map(this.filteredOptions, (entry, index) => ((
              <ComboBoxItem
                key={ index }
                index={ index }
                onItemTouchStart={ this._onTouchStartAtOption }
                onItemTouchEnd={ this._onTouchEndAtOption }
                onItemTouchCancel={ this._onTouchCancelAtOption }
                onItemClick={ this._onClickAtOption }
                onItemMouseEnter={ this._onMouseEnterAtOption }
                onItemMouseLeave={ this._onMouseLeaveAtOption }
              >
                { entry }
              </ComboBoxItem>
            )))
          }
        </ul>

      </div>
    );
  }
}