import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { canUseDOM } from 'exenv';

import omit from 'bit/utils/omit';
import filter from 'bit/utils/filter';
import filterReactChildren from 'bit/utils/filter-react-children';
import find from 'bit/utils/find';
import first from 'bit/utils/first';
import flattenReactChildren from 'bit/utils/flatten-react-children';
import isEmpty from 'bit/utils/is-empty';
import findIndex from 'bit/utils/find-index';
import has from 'bit/utils/has';
import some from 'bit/utils/some';
import last from 'bit/utils/last';
import uniqueId from 'bit/utils/unique-id';
import unionClassNames from 'bit/utils/union-class-names';
import { injectStyles, removeStyle } from 'bit/utils/inject-style';
import isComponentOfType from 'bit/utils/is-component-of-type';

import style from 'bit/style/select-style';
import config from 'bit/config/select-config';

import Option from 'bit/components/option';
import Placeholder from 'bit/components/placeholder';
import Separator from 'bit/components/separator';
import SelectItem from 'bit/components/select-item';

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
  return isComponentOfType(Placeholder, reactElement);
}

/*
 * Returns true if the provided property is a Option component from Belle.
 */
function isOption(reactElement) {
  return isComponentOfType(Option, reactElement);
}

/*
 * Returns true if the provided property is a Separator component from Belle.
 */
function isSeparator(reactElement) {
  return isComponentOfType(Separator, reactElement);
}

/*
 * Verifies that the children is an array containing only Options & at maximum
 * one Placeholder.
 */
function validateChildrenAreOptionsAndMaximumOnePlaceholder(props, propName, componentName) {
  const validChildren = filterReactChildren(props[propName], (node) => (
    (isOption(node) || isSeparator(node) || isPlaceholder(node))
  ));
  if (React.Children.count(props[propName]) !== React.Children.count(validChildren)) {
    return new Error(`Invalid children supplied to \`${componentName}\`, expected an Option, Separator or Placeholder component from Belle.`);
  }

  const placeholders = filterReactChildren(props[propName], (node) => isPlaceholder(node));
  if (React.Children.count(placeholders) > 1) {
    return new Error(`Invalid children supplied to \`${componentName}\`, expected only one Placeholder component.`);
  }

  return undefined;
}

const selectPropTypes = {
  children: validateChildrenAreOptionsAndMaximumOnePlaceholder,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
  ]),
  onUpdate: PropTypes.func,
  valueLink: PropTypes.shape({
    value: PropTypes.string.isRequired,
    requestChange: PropTypes.func.isRequired,
  }),
  className: PropTypes.string,
  shouldPositionOptions: PropTypes.bool,
  positionOptions: PropTypes.func,
  style: PropTypes.object,
  focusStyle: PropTypes.object,
  hoverStyle: PropTypes.object,
  activeStyle: PropTypes.object,
  wrapperStyle: PropTypes.object,
  menuStyle: PropTypes.object,
  caretToOpenStyle: PropTypes.object,
  caretToCloseStyle: PropTypes.object,
  wrapperProps: PropTypes.object,
  menuProps: PropTypes.object,
  caretProps: PropTypes.object,
  disabled: PropTypes.bool,
  disabledStyle: PropTypes.object,
  disabledHoverStyle: PropTypes.object,
  disabledCaretToOpenStyle: PropTypes.object,
  id: PropTypes.string,
  onClick: PropTypes.func,
  onTouchCancel: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchStart: PropTypes.func,
};

/*
 * Update hover style for the speficied styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param properties {object} - the components properties optionally containing hoverStyle
 */
function updatePseudoClassStyle(styleId, properties) {
  const hoverStyle = {
    ...style.hoverStyle,
    ...properties.hoverStyle,
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
      style: disabledHoverStyle,
      pseudoClass: 'hover',
      disabled: true,
    },
  ];
  injectStyles(styles);
}

/*
 * Returns true in case there one more element in the list.
 */
const hasNext = (list, currentIndex) => currentIndex + 2 <= list.length;

/*
 * Returns true in case there is one previous element in the list.
 */
const hasPrevious = (list, currentIndex) => currentIndex - 1 >= 0;

/*
 * Returns an object with properties that are relevant for the wrapping div of
 * the selected option.
 */
function sanitizeSelectedOptionWrapperProps(properties) {
  return omit(properties, Object.keys(selectPropTypes));
}

/*
 * Returns an object with properties that are relevant for the wrapping div of
 * the selected option.
 */
function sanitizeWrapperProps(properties) {
  return omit(properties, [
    'style',
    'ref',
    'tabIndex',
    'onKeyDown',
    'onBlur',
    'onFocus',
  ]);
}

/*
 * Returns an object with properties that are relevant for the wrapping div of
 * the selected option.
 */
function sanitizeMenuProps(properties) {
  return omit(properties, [
    'style',
    'ref',
    'aria-labelledby',
    'role',
  ]);
}

/*
 * Returns an object with properties that are relevant for the wrapping div of
 * the selected option.
 */
function sanitizeCaretProps(properties) {
  return omit(properties, [
    'style',
    'ref',
  ]);
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
export default class Select extends Component {

  /*
   * Initialize the component based on the provided properties.
   *
   * By default the Select is closed & the focused option in case the user opens
   * it will be the selected option.
   */
  constructor(properties) {
    super(properties);

    let selectedValue;
    let focusedOptionValue;

    if (properties.children) {
      this.children = flattenReactChildren(properties.children);
      this.options = filter(this.children, isOption);
    }

    if (has(properties, 'valueLink')) {
      selectedValue = properties.valueLink.value;
      focusedOptionValue = selectedValue;
    } else if (has(properties, 'value')) {
      selectedValue = properties.value;
      focusedOptionValue = selectedValue;
    } else if (has(properties, 'defaultValue')) {
      selectedValue = properties.defaultValue;
      focusedOptionValue = selectedValue;
    } else if (!isEmpty(this.children) && !some(this.children, isPlaceholder)) {
      const firstOption = first(this.options);
      selectedValue = firstOption ? firstOption.props.value : void 0;
      focusedOptionValue = selectedValue;
    } else if (!isEmpty(this.children)) {
      const firstOption = first(this.options);
      focusedOptionValue = firstOption ? firstOption.props.value : void 0;
    }

    this.state = {
      isOpen: false,
      isFocused: false,
      selectedValue,
      focusedOptionValue,
      selectedOptionWrapperProps: sanitizeSelectedOptionWrapperProps(properties),
      wrapperProps: sanitizeWrapperProps(properties.wrapperProps),
      menuProps: sanitizeMenuProps(properties.menuProps),
      caretProps: sanitizeCaretProps(properties.caretProps),
      isTouchedToToggle: false,
    };
  }

  static displayName = 'Select';

  static propTypes = selectPropTypes;

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
  };

  getChildContext() {
    return {
      isDisabled: this.props.disabled,
      isHoveredValue: this.state.focusedOptionValue,
    };
  }

  /*
   * Generates the style-id & inject the focus & hover style.
   */
  componentWillMount() {
    const id = uniqueId();

    // Note: To ensure server side rendering creates the same results React's internal
    // id for this element is leveraged.
    this.selectedOptionWrapperId = this.props.id ? this.props.id : `belle-select-id-${id}`;
    this._styleId = `style-id${id}`;
    updatePseudoClassStyle(this._styleId, this.props);

    if (canUseDOM) {
      this.mouseUpOnDocumentCallback = this._onMouseUpOnDocument;
      document.addEventListener('mouseup', this.mouseUpOnDocumentCallback);
    }
  }

  componentWillReceiveProps(properties) {
    if (properties.children) {
      this.children = flattenReactChildren(properties.children);
      this.options = filter(this.children, isOption);
    }

    const newState = {
      selectedOptionWrapperProps: sanitizeSelectedOptionWrapperProps(properties),
      wrapperProps: sanitizeWrapperProps(properties.wrapperProps),
      menuProps: sanitizeMenuProps(properties.menuProps),
      caretProps: sanitizeCaretProps(properties.caretProps),
    };

    if (has(properties, 'valueLink')) {
      newState.selectedValue = properties.valueLink.value;
      newState.focusedOptionValue = properties.valueLink.value;
    } else if (has(properties, 'value')) {
      newState.selectedValue = properties.value;
      newState.focusedOptionValue = properties.value;
    }

    this.setState(newState);
    removeStyle(this._styleId);
    updatePseudoClassStyle(this._styleId, properties);
  }

  /*
   * In case shouldPositionOptions is active the scrollTop position is stored
   * to be applied later on. The menu is hidden to make sure it is
   * not displayed beofre repositioned.
   */
  componentWillUpdate(nextProperties, nextState) {
    const shouldPositionOptions = has(nextProperties, 'shouldPositionOptions') ? nextProperties.shouldPositionOptions : config.shouldPositionOptions;

    if (shouldPositionOptions) {
      const menuNode = ReactDOM.findDOMNode(this.menu);
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
  componentDidUpdate(previousProperties, previousState) {
    const shouldPositionOptions = has(this.props, 'shouldPositionOptions') ? this.props.shouldPositionOptions : config.shouldPositionOptions;

    if (shouldPositionOptions && !this.props.disabled) {
      const menuNode = ReactDOM.findDOMNode(this.menu);

      // the menu was just opened
      if (!previousState.isOpen && this.state.isOpen && this.children && this.children.length > 0) {
        const positionOptions = has(this.props, 'positionOptions') ? this.props.positionOptions : config.positionOptions;
        positionOptions(this);

      // restore the old scrollTop position
      } else {
        menuNode.scrollTop = this.cachedMenuScrollTop;
      }

      const separators = filter(this.children, isSeparator);
      const childrenPresent = !isEmpty(this.options) || !isEmpty(separators);
      if (!previousState.isOpen && this.state.isOpen && childrenPresent) {
        const menuStyle = {
          ...style.menuStyle,
          ...this.props.menuStyle,
        };
        menuNode.style.display = menuStyle.display;
      }
    }
  }

  /*
   * Remove a component's associated styles whenever it gets removed from the DOM.
   */
  componentWillUnmount() {
    removeStyle(this._styleId);
    if (canUseDOM) {
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
  _onTouchStartAtOption = (event, index) => {
    if (event.touches.length === 1) {
      this._touchStartedAt = this._getValueForIndex(index);

      // save the scroll position
      const menuNode = ReactDOM.findDOMNode(this.menu);
      if (menuNode.scrollHeight > menuNode.offsetHeight) {
        this._scrollTopPosition = menuNode.scrollTop;

        // Note: don't use setState in here as it would prevent the scrolling
      } else {
        this._scrollTopPosition = 0;
        this.setState({ focusedOptionValue: this._touchStartedAt });
      }

      // reset interaction
      this._scrollActive = false;
    }
  };

  /*
   * Identifies if the menu is scrollable.
   */
  _onTouchMoveAtOption = () => {
    const menuNode = ReactDOM.findDOMNode(this.menu);
    if (menuNode.scrollTop !== this._scrollTopPosition) {
      this._scrollActive = true;
    }
  };

  /*
   * Triggers a change event after the user touched on an Option.
   */
  _onTouchEndAtOption = (event, index) => {
    if (this._touchStartedAt && !this._scrollActive) {
      const value = this._getValueForIndex(index);
      if (this._touchStartedAt === value) {
        event.preventDefault();
        this._triggerChange(value);
      }
    }

    this._touchStartedAt = undefined;
  };

  /*
   * Triggers a change event after the user touched on an Option.
   */
  _onTouchCancelAtOption = () => {
    this._touchStartedAt = undefined;
  };

  /*
   * Triggers a change event after the user clicked on an Option.
   */
  _onClickAtOption = (index) => {
    this._triggerChange(this._getValueForIndex(index));
  };

  /*
   * In order to inform the user which element in the document is active the
   * component keeps track of when it's de-selected and depending on that
   * close the menu.
   */
  _onBlur = (event) => {
    this.setState({
      isOpen: false,
      isFocused: false,
    });

    if (this.props.wrapperProps && this.props.wrapperProps.onBlur) {
      this.props.wrapperProps.onBlur(event);
    }
  };

  /*
   * In order to inform the user which element in the document is active the
   * component keeps track of when it's de-selected and depending on that
   * close the menu.
   */
  _onFocus = (event) => {
    this.setState({
      isFocused: true,
    });

    if (this.props.wrapperProps && this.props.wrapperProps.onFocus) {
      this.props.wrapperProps.onFocus(event);
    }
  };

  /*
   * In order to inform the user which Option is active the component keeps
   * track of when an option is in focus by the user and depending on that
   * provide a visual indicator.
   */
  _onMouseEnterAtOption = (index) => {
    this.setState({
      focusedOptionValue: this._getValueForIndex(index),
    });
  };

  /*
   * Initiate the toggle for the menu.
   */
  _onTouchStartToggleMenu = (event) => {
    if (event.touches.length === 1) {
      this.setState({ isTouchedToToggle: true, isActive: true });
    } else {
      this.setState({ isTouchedToToggle: false });
    }

    if (this.props.onTouchStart) {
      this.props.onTouchStart(event);
    }
  };

  /*
   * Toggle the menu after a user touched it & resets the pressed state
   * for to toggle.
   */
  _onTouchEndToggleMenu = (event) => {
    // In case touch events are used preventDefault is applied to avoid
    // triggering the click event which would cause trouble for toggling.
    // In any case calling setState triggers a render. This leads to the fact
    // that the click event won't be triggered anyways. Nik assumes it's due the
    // element won't be in the DOM anymore.
    // This also means the Select's onClick won't be triggered for touchDevices.
    event.preventDefault();

    /* To avoid weird behaviour we check before focusing again - no specific use-case found */
    const wrapperNode = ReactDOM.findDOMNode(this.wrapper);
    if (document.activeElement !== wrapperNode) {
      wrapperNode.focus();
    }

    if (this.state.isTouchedToToggle) {
      if (this.state.isOpen) {
        this.setState({ isOpen: false });
      } else {
        this.setState({ isOpen: true });
      }
    }

    this.setState({ isTouchedToToggle: false, isActive: false });

    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
  };

  /*
   * Reset the precondition to initialize a toggle of the menu.
   */
  _onTouchCancelToggleMenu = (event) => {
    this.setState({ isTouchedToToggle: false, isActive: false });

    if (this.props.onTouchCancel) {
      this.props.onTouchCancel(event);
    }
  };

  /*
   * Set isActive to true on mouse-down.
   */
  _onMouseDown = (event) => {
    this.setState({ isActive: true });

    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
  };

  /*
   * Set isActive to false on mouse-up.
   */
  _onMouseUp = (event) => {
    this.setState({ isActive: false });

    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }
  };

  /*
   * Set isActive to false on mouse-up.
   */
  _onMouseUpOnDocument = () => {
    this.setState({ isActive: false });
  };

  /*
   * Set isActive to false on is context menu opens on select's div.
   */
  _onContextMenu = () => {
    this.setState({ isActive: false });
  };

  /*
   * Update focus for the options for an already open menu.
   *
   * The user experience of HTML's native select is good and the goal here is to
   * achieve the same behaviour.
   *
   * - Focus on the first entry in case no options is focused on.
   * - Switch focus to the next option in case one option already has focus.
   */
  _onArrowDownKeyDown = () => {
    if (this.state.focusedOptionValue !== void 0) {
      const indexOfFocusedOption = this._getIndexOfFocusedOption();

      if (hasNext(this.options, indexOfFocusedOption)) {
        this.setState({
          focusedOptionValue: this.options[indexOfFocusedOption + 1].props.value,
        });
      }
    } else {
      this.setState({
        focusedOptionValue: first(this.options).props.value,
      });
    }
  };

  /*
   * Update focus for the options for an already open menu.
   *
   * The user experience of HTML's native select is good and the goal here is to
   * achieve the same behaviour.
   *
   * - Focus on the last entry in case no options is focused on.
   * - Switch focus to the previous option in case one option already has focus.
   */
  _onArrowUpKeyDown = () => {
    if (this.state.focusedOptionValue !== void 0) {
      const indexOfFocusedOption = this._getIndexOfFocusedOption();

      if (hasPrevious(this.options, indexOfFocusedOption)) {
        this.setState({
          focusedOptionValue: this.options[indexOfFocusedOption - 1].props.value,
        });
      }
    } else {
      this.setState({
        focusedOptionValue: last(this.options).props.value,
      });
    }
  };

  /*
   * After the user pressed the `Enter` or `Space` key for an already open
   * menu the focused option is selected.
   *
   * Same as _onClickAtOption this update the state & dispatches a change event.
   */
  _onEnterOrSpaceKeyDown = () => {
    this._triggerChange(this.state.focusedOptionValue);
  };

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
  _onKeyDown = (event) => {
    if (!this.props.disabled) {
      if (!isEmpty(this.options)) {
        if (!this.state.isOpen) {
          if (event.key === 'ArrowDown' ||
              event.key === 'ArrowUp' ||
              event.key === ' ') {
            event.preventDefault();
            this.setState({ isOpen: true });
          }
        } else {
          // Updates the state to set focus on the next option
          // In case no option is active it should jump to the first.
          // In case it is the last it should stop there.
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            this._onArrowDownKeyDown();
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            this._onArrowUpKeyDown();
          } else if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this._onEnterOrSpaceKeyDown();
          }
        }

        if (event.key === 'Escape') {
          event.preventDefault();
          this.setState({ isOpen: false });
        }
      }
    }

    if (this.props.wrapperProps && this.props.wrapperProps.onKeyDown) {
      this.props.wrapperProps.onKeyDown(event);
    }
  };

  /*
   * Toggle the menu after a user clicked on it.
   */
  _onClickToggleMenu = (event) => {
    if (!this.props.disabled) {
      if (this.state.isOpen) {
        this.setState({ isOpen: false });
      } else {
        this.setState({ isOpen: true });
      }
    }

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  /*
   * Returns the index of the entry with a certain value from the component's
   * children.
   *
   * The index search includes only option components.
   */
  _getIndexOfFocusedOption() {
    return findIndex(this.options, (element) => (
      element.props.value === this.state.focusedOptionValue
    ));
  }

  /*
   * Returns the value of the child with a certain index.
   */
  _getValueForIndex(index) {
    return this.options[index].props.value;
  }

  /*
   * After an option has been selected the menu gets closed and the
   * selection processed.
   *
   * Depending on the component's properties the value gets updated and the
   * provided change callback for onUpdate or valueLink is called.
   */
  _triggerChange(value) {
    if (has(this.props, 'valueLink')) {
      this.props.valueLink.requestChange(value);
      this.setState({
        isOpen: false,
      });
    } else if (has(this.props, 'value')) {
      this.setState({
        isOpen: false,
      });
    } else {
      this.setState({
        focusedOptionValue: value,
        selectedValue: value,
        isOpen: false,
      });
    }

    if (this.props.onUpdate) {
      this.props.onUpdate({ value });
    }
  }

  _renderChildren() {
    let optionsIndex = 0;

    return (
      React.Children.map(this.children, (entry, index) => {
        if (isOption(entry)) { // filter out all non-Option Components
          const localOptionIndex = optionsIndex;
          const isHovered = entry.props.value === this.state.focusedOptionValue;
          const element = (
            <SelectItem
              onItemClick={ this._onClickAtOption }
              onItemTouchStart={ this._onTouchStartAtOption }
              onItemTouchMove={ this._onTouchMoveAtOption }
              onItemTouchEnd={ this._onTouchEndAtOption }
              onItemTouchCancel={ this._onTouchCancelAtOption }
              onItemMouseEnter={ this._onMouseEnterAtOption }
              isHovered={ isHovered }
              index={localOptionIndex}
              key={ index }
            >
              { entry }
            </SelectItem>
          );
          optionsIndex++;

          return element;
        } else if (isSeparator(entry)) {
          return (
            <li
              key={ index }
              role="presentation"
            >
              { entry }
            </li>
          );
        }

        return null;
      })
    );
  }

  render() {
    const defaultStyle = {
      ...style.style,
      ...this.props.style,
    };
    const hoverStyle = {
      ...defaultStyle,
      ...style.hoverStyle,
      ...this.props.hoverStyle,
    };
    const focusStyle = {
      ...defaultStyle,
      ...style.focusStyle,
      ...this.props.focusStyle,
    };
    const activeStyle = {
      ...defaultStyle,
      ...style.activeStyle,
      ...this.props.activeStyle,
    };
    const disabledStyle = {
      ...defaultStyle,
      ...style.disabledStyle,
      ...this.props.disabledStyle,
    };
    const disabledHoverStyle = {
      ...disabledStyle,
      ...style.disabledHoverStyle,
      ...this.props.disabledHoverStyle,
    };
    const menuStyle = {
      ...style.menuStyle,
      ...this.props.menuStyle,
    };
    const caretToCloseStyle = {
      ...style.caretToCloseStyle,
      ...this.props.caretToCloseStyle,
    };
    const caretToOpenStyle = {
      ...style.caretToOpenStyle,
      ...this.props.caretToOpenStyle,
    };
    const disabledCaretToOpenStyle = {
      ...caretToOpenStyle,
      ...style.disabledCaretToOpenStyle,
      ...this.props.disabledCaretToOpenStyle,
    };
    const wrapperStyle = {
      ...style.wrapperStyle,
      ...this.props.wrapperStyle,
    };

    let selectedOptionOrPlaceholder;
    if (this.state.selectedValue !== void 0) {
      const selectedEntry = find(this.children, (entry) => (
        entry.props.value === this.state.selectedValue
      ));

      if (selectedEntry) {
        selectedOptionOrPlaceholder = React.cloneElement(selectedEntry, {
          _isDisplayedAsSelected: true,
        });
      }
    } else {
      selectedOptionOrPlaceholder = find(this.children, isPlaceholder);
    }

    const separators = filter(this.children, isSeparator);
    const childrenNotPresent = isEmpty(this.options) && isEmpty(separators);
    const computedMenuStyle = this.props.disabled || !this.state.isOpen || childrenNotPresent ? { display: 'none' } : menuStyle;
    const hasCustomTabIndex = this.props.wrapperProps && this.props.wrapperProps.tabIndex;
    let tabIndex = hasCustomTabIndex ? this.props.wrapperProps.tabIndex : '0';

    let selectedOptionWrapperStyle;
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

    let caretStyle;
    if (this.props.disabled) {
      caretStyle = disabledCaretToOpenStyle;
    } else if (this.state.isOpen) {
      caretStyle = caretToCloseStyle;
    } else {
      caretStyle = caretToOpenStyle;
    }

    return (
      <div
        style={ wrapperStyle }
        tabIndex={ tabIndex }
        onKeyDown={ this._onKeyDown }
        onBlur={ this._onBlur }
        onFocus={ this._onFocus }
        ref={(c) => this.wrapper = c}
        {...this.state.wrapperProps}
      >
        <div
          onClick={ this._onClickToggleMenu }
          onTouchStart={ this._onTouchStartToggleMenu }
          onTouchEnd={ this._onTouchEndToggleMenu }
          onTouchCancel={ this._onTouchCancelToggleMenu }
          onContextMenu={ this._onContextMenu }
          onMouseDown = { this._onMouseDown }
          onMouseUp = { this._onMouseUp }
          style={ selectedOptionWrapperStyle }
          className={ unionClassNames(this.props.className, this._styleId) }
          ref={(c) => this.selectedOptionWrapper = c}
          role="button"
          aria-expanded={ this.state.isOpen }
          id={ this.selectedOptionWrapperId }
          {...this.state.selectedOptionWrapperProps}
        >
          { selectedOptionOrPlaceholder }
          <span
            style={ caretStyle }
            {...this.state.caretProps}
          />
        </div>

        <ul
          style={ computedMenuStyle }
          role="listbox"
          aria-labelledby={ this.selectedOptionWrapperId }
          ref={(c) => this.menu = c}
          {...this.state.menuProps}
        >
          { this._renderChildren() }
        </ul>

      </div>
    );
  }
}