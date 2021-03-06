import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { injectStyles, removeStyle } from 'bit/utils/inject-style';
import omit from 'bit/utils/omit';
import has from 'bit/utils/has';
import last from 'bit/utils/last';
import first from 'bit/utils/first';
import uniqueId from 'bit/utils/unique-id';
import isComponentOfType from 'bit/utils/is-component-of-type';
import { requestAnimationFrame, cancelAnimationFrame } from 'bit/utils/animation-frame-management';
import unionClassNames from 'bit/utils/union-class-names';

import style from 'bit/style/toggle-style';
import config from 'bit/config/toggle-config';

import Choice from 'bit/components/choice';

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
  const propValue = props[propName];
  if (!propValue) {
    return undefined;
  }

  if (!Array.isArray(propValue) || propValue.length !== 2) {
    return new Error(`Invalid ${propName} supplied to \`${componentName}\`, expected exactly two Choice components.`);
  }

  for (let i = 0; i < propValue.length; ++i) {
    const item = propValue[i];
    if (!item || !isComponentOfType(Choice, item)) {
      return new Error(`Invalid ${propName}[${i}] supplied to \`${componentName}\`, expected a Choice component from Belle.`);
    }
  }

  if (first(propValue).props.value === last(propValue).props.value) {
    return new Error(`Invalid ${propName} supplied to \`${componentName}\`, expected different value properties for the provided Choice components.`);
  }

  return undefined;
}

const togglePropTypes = {
  activeHandleStyle: PropTypes.object,
  children: validateChoices,
  className: PropTypes.string,
  defaultValue: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledHandleStyle: PropTypes.object,
  disabledStyle: PropTypes.object,
  firstChoiceProps: PropTypes.object,
  firstChoiceStyle: PropTypes.shape({
    width: PropTypes.number,
  }),
  focusStyle: PropTypes.object,
  handleProps: PropTypes.shape({
    onMouseDown: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchMove: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchCancel: PropTypes.func,
  }),
  handleStyle: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  hoverHandleStyle: PropTypes.object,
  onBlur: PropTypes.func,
  onUpdate: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseUp: PropTypes.func,
  onTouchStart: PropTypes.func,
  secondChoiceProps: PropTypes.object,
  secondChoiceStyle: PropTypes.shape({
    width: PropTypes.number,
  }),
  sliderProps: PropTypes.shape({
    onClick: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchMove: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchCancel: PropTypes.func,
  }),
  sliderStyle: PropTypes.object,
  sliderWrapperProps: PropTypes.object,
  sliderWrapperStyle: PropTypes.object,
  style: PropTypes.shape({
    width: PropTypes.number,
  }),
  value: PropTypes.bool,
  valueLink: PropTypes.shape({
    value: PropTypes.bool.isRequired,
    requestChange: PropTypes.func.isRequired,
  }),
  wrapperProps: PropTypes.object,
};

function sanitizeChildProps(properties) {
  return omit(properties, Object.keys(togglePropTypes));
}

function sanitizeSliderProps(properties) {
  return omit(properties, [
    'style',
    'onClick',
    'onTouchStart',
    'onTouchMove',
    'onTouchEnd',
    'onTouchCancel',
  ]);
}

function sanitizeSliderWrapperProps(properties) {
  return omit(properties, [
    'ref',
    'style',
  ]);
}

function sanitizeChoiceProps(properties) {
  return omit(properties, [
    'ref',
    'style',
  ]);
}

function sanitizeHandleProps(properties) {
  return omit(properties, [
    'onMouseDown',
    'onMouseMove',
    'onMouseUp',
    'onMouseLeave',
    'onTouchStart',
    'onTouchMove',
    'onTouchEnd',
    'onTouchCancel',
    'ref',
    'style',
  ]);
}

/*
 * Update focus style for the speficied styleId.
 *
 * @param styleId {string} - a unique id that exists as class attribute in the DOM
 * @param properties {object} - the components properties optionally containing custom styles
 */
function updatePseudoClassStyle(styleId, properties, preventFocusStyleForTouchAndClick) {
  let focusStyle;
  if (preventFocusStyleForTouchAndClick) {
    focusStyle = { outline: 0 };
  } else {
    focusStyle = {
      ...style.focusStyle,
      ...properties.focusStyle,
    };
  }

  const styles = [
    {
      id: styleId,
      style: focusStyle,
      pseudoClass: 'focus',
    },
  ];

  injectStyles(styles);
}

/*
 * Toggle component
 */
export default class Toggle extends Component {

  constructor(properties) {
    super(properties);

    let value;
    if (has(properties, 'valueLink')) {
      value = properties.valueLink.value;
    } else if (has(properties, 'value')) {
      value = properties.value;
    } else if (has(properties, 'defaultValue')) {
      value = properties.defaultValue;
    } else {
      value = false;
    }

    this.state = {
      firstChoiceProps: sanitizeChoiceProps(properties.firstChoiceProps),
      childProps: sanitizeChildProps(properties),
      secondChoiceProps: sanitizeChoiceProps(properties.secondChoiceProps),
      handleProps: sanitizeHandleProps(properties.handleProps),
      isActive: false,
      isDraggingWithMouse: false,
      isDraggingWithTouch: false,
      sliderProps: sanitizeSliderProps(properties.sliderProps),
      sliderWrapperProps: sanitizeSliderWrapperProps(properties.sliderWrapperProps),
      value,
      wasFocusedWithClickOrTouch: false,
    };

    this._touchStartedAtSlider = false;
    this._touchEndedNotInSlider = false;

    this._preventTouchSwitch = false;

    this._mouseDragStart = undefined;
    this._mouseDragEnd = undefined;
    this._preventMouseSwitch = false;

    // The isFocused attribute is used to apply the one-time focus animation.
    // As it is reset after every render it can't be set inside state as this
    // would trigger an endless loop.
    this.isFocused = false;

    this.preventFocusStyleForTouchAndClick = has(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : config.preventFocusStyleForTouchAndClick;
  }

  static displayName = 'Toggle';

  static propTypes = togglePropTypes;

  static defaultProps = {
    disabled: false,
  };

  /*
   * Generates the style-id & inject the focus style.
   */
  componentWillMount() {
    const id = uniqueId();
    this.styleId = `style-id${id}`;
    updatePseudoClassStyle(this.styleId, this.props, this.preventFocusStyleForTouchAndClick);
  }

  componentWillReceiveProps(properties) {
    const newState = {
      firstChoiceProps: sanitizeChoiceProps(properties.firstChoiceProps),
      childProps: sanitizeChildProps(properties),
      secondChoiceProps: sanitizeChoiceProps(properties.secondChoiceProps),
      handleProps: sanitizeHandleProps(properties.handleProps),
      sliderProps: sanitizeSliderProps(properties.sliderProps),
      sliderWrapperProps: sanitizeSliderWrapperProps(properties.sliderWrapperProps),
    };

    if (has(properties, 'valueLink')) {
      newState.value = properties.valueLink.value;
    } else if (has(properties, 'value')) {
      newState.value = properties.value;
    }

    this.setState(newState);

    this.preventFocusStyleForTouchAndClick = has(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : config.preventFocusStyleForTouchAndClick;

    removeStyle(this.styleId);
    updatePseudoClassStyle(this.styleId, properties, this.preventFocusStyleForTouchAndClick);
  }

  /*
   * Deactivate the focused attribute in order to make sure the focus animation
   * only runs once when the component is focused on & not after re-rendering
   * e.g when the user clicks on the toggle.
   */
  componentDidUpdate() {
    this.isFocused = false;
  }

  /*
   * Remove a component's associated styles whenever it gets removed from the DOM.
   */
  componentWillUnmount() {
    removeStyle(this.styleId);
  }

  /*
   * Activate the focused attribute used to determine when to show the
   * one-time focus animation and trigger a render.
   */
  _onFocus = (event) => {
    if (!this.props.disabled) {
      this.isFocused = true;
      this.forceUpdate();
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  /*
   * Deactivate the focused attribute used to determine when to show the
   * one-time focus animation and trigger a render.
   */
  _onBlur = (event) => {
    this.isFocused = false;
    this.setState({ wasFocusedWithClickOrTouch: false });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  _onMouseDownOnWrapper = (event) => {
    if (!this.props.disabled) {
      this.setState({ wasFocusedWithClickOrTouch: true, isActive: true });
    }

    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
  };

  _onMouseUpOnWrapper = (event) => {
    if (!this.props.disabled) {
      this.setState({ isActive: false });
    }

    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }
  };

  _onTouchStartOnWrapper = (event) => {
    if (!this.props.disabled) {
      this.setState({ wasFocusedWithClickOrTouch: true });
    }

    if (this.props.onTouchStart) {
      this.props.onTouchStart(event);
    }
  };

  _onClickAtSlider = (event) => {
    if (!this.props.disabled) {
      this._triggerChange(!this.state.value);
    }

    if (this.props.sliderProps && this.props.sliderProps.onClick) {
      this.props.sliderProps.onClick(event);
    }
  };

  _onMouseDownOnHandle = (event) => {
    // check for left mouse button pressed
    if (event.button === 0 && !this.props.disabled) {
      const defaultSliderOffset = this._getSliderOffset();
      this._mouseDragStart = event.pageX - (this.state.value ? defaultSliderOffset : 0);
      this._preventMouseSwitch = false;

      this.setState({
        isDraggingWithMouse: true,
        sliderOffset: (this.state.value ? defaultSliderOffset : 0),
      });
    }

    if (this.props.handleProps && this.props.handleProps.onMouseDown) {
      this.props.handleProps.onMouseDown(event);
    }
  };

  _onMouseMoveOnHandle = (event) => {
    if (this.state.isDraggingWithMouse && !this.props.disabled) {
      // the requestAnimationFrame function must be executed in the context of window
      // see http://stackoverflow.com/a/9678166/837709
      const animationFrame = requestAnimationFrame.call(
        window,
        this._triggerUpdateComponentOnMouseMove.bind(this, event.pageX)
      );

      if (this.previousMouseMoveFrame) {
        // the cancelAnimationFrame function must be executed in the context of window
        // see http://stackoverflow.com/a/9678166/837709
        cancelAnimationFrame.call(window, this.previousMouseMoveFrame);
      }

      this.previousMouseMoveFrame = animationFrame;
    }

    if (this.props.handleProps && this.props.handleProps.onMouseMove) {
      this.props.handleProps.onMouseMove(event);
    }
  };

  _onMouseUpOnHandle = (event) => {
    if (!this.props.disabled) {
      if (this._mouseDragEnd) {
        if (!this._preventMouseSwitch) {
          this._triggerChange(!this.state.value);
        } else if (this._preventMouseSwitch) {
          const value = this._mouseDragEnd > (this._getHandleWidth() / 2);
          this._triggerChange(value);
        }
      } else {
        this._triggerChange(!this.state.value);
      }
    }

    this._mouseDragStart = undefined;
    this._mouseDragEnd = undefined;
    this._preventMouseSwitch = false;

    if (this.props.handleProps && this.props.handleProps.onMouseUp) {
      this.props.handleProps.onMouseUp(event);
    }
  };

  _onMouseLeaveOnHandle = (event) => {
    if (!this.props.disabled) {
      if (this._mouseDragStart && !this._preventMouseSwitch) {
        this._triggerChange(!this.state.value);
      } else if (this._mouseDragStart && this._preventMouseSwitch) {
        const value = this._mouseDragEnd > (this._getHandleWidth() / 2);
        this._triggerChange(value);
      } else {
        this.setState({ isActive: false });
      }
    }

    this._mouseDragStart = undefined;
    this._mouseDragEnd = undefined;
    this._preventMouseSwitch = false;

    if (this.props.handleProps && this.props.handleProps.onMouseLeave) {
      this.props.handleProps.onMouseLeave(event);
    }
  };

  _onTouchStartAtSlider = (event) => {
    if (event.touches.length === 1 && !this.props.disabled) {
      this._touchStartedAtSlider = true;
      this.setState({
        isActive: true,
      });
    }

    if (this.props.sliderProps && this.props.sliderProps.onTouchStart) {
      this.props.sliderProps.onTouchStart(event);
    }
  };

  _onTouchMoveAtSlider = (event) => {
    if (event.touches.length === 1 && this._touchStartedAtSlider && !this.props.disabled) {
      // the requestAnimationFrame function must be executed in the context of window
      // see http://stackoverflow.com/a/9678166/837709
      const animationFrame = requestAnimationFrame.call(
        window,
        this._triggerUpdateComponentOnTouchMoveAtSlider.bind(this, event.touches[0])
      );

      if (this.previousTouchMoveAtSliderFrame) {
        // the cancelAnimationFrame function must be executed in the context of window
        // see http://stackoverflow.com/a/9678166/837709
        cancelAnimationFrame.call(window, this.previousTouchMoveAtSliderFrame);
      }

      this.previousTouchMoveAtSliderFrame = animationFrame;
    }

    if (this.props.sliderProps && this.props.sliderProps.onTouchMove) {
      this.props.sliderProps.onTouchMove(event);
    }
  };

  _onTouchEndAtSlider = (event) => {
    // prevent the onClick to happen
    event.preventDefault();

    if (this._touchStartedAtSlider && !this._touchEndedNotInSlider && !this.props.disabled) {
      this.setState({
        isActive: false,
      });
      this._triggerChange(!this.state.value);
    } else {
      this.setState({ isActive: false });
    }

    this._touchStartedAtSlider = false;
    this._touchEndedNotInSlider = false;

    if (this.props.sliderProps && this.props.sliderProps.onTouchEnd) {
      this.props.sliderProps.onTouchEnd(event);
    }
  };

  _onTouchCancelAtSlider = (event) => {
    this.setState({ isActive: false });
    this._touchStartedAtSlider = false;
    this._touchEndedNotInSlider = false;

    if (this.props.sliderProps && this.props.sliderProps.onTouchCancel) {
      this.props.sliderProps.onTouchCancel(event);
    }
  };

  _onTouchStartHandle = (event) => {
    event.preventDefault();

    // check for one touch as multiple could be browser gestures and only one
    // is relevant for us
    if (event.touches.length === 1 && !this.props.disabled) {
      this._preventTouchSwitch = false;

      const defaultSliderOffset = this._getSliderOffset();
      this.setState({
        isDraggingWithTouch: true,
        sliderOffset: (this.state.value ? defaultSliderOffset : 0),
      });

      this._touchDragStart = event.touches[0].pageX - (this.state.value ? defaultSliderOffset : 0);
    }

    if (this.props.handleProps && this.props.handleProps.onTouchStart) {
      this.props.handleProps.onTouchStart(event);
    }
  };

  _onTouchMoveHandle = (event) => {
    if (event.touches.length === 1 && this.state.isDraggingWithTouch && !this.props.disabled) {
      // the requestAnimationFrame function must be executed in the context of window
      // see http://stackoverflow.com/a/9678166/837709
      const animationFrame = requestAnimationFrame.call(
        window,
        this._triggerUpdateComponentOnTouchMoveAtHandle.bind(this, event.touches[0])
      );

      if (this.previousTouchMoveAtHandleFrame) {
        // the cancelAnimationFrame function must be executed in the context of window
        // see http://stackoverflow.com/a/9678166/837709
        cancelAnimationFrame.call(window, this.previousTouchMoveAtHandleFrame);
      }

      this.previousTouchMoveAtHandleFrame = animationFrame;
    }

    if (this.props.handleProps && this.props.handleProps.onTouchMove) {
      this.props.handleProps.onTouchMove(event);
    }
  };

  _onTouchEndHandle = (event) => {
    // prevent the onClick to happen
    event.preventDefault();

    if (this.state.isDraggingWithTouch && !this.props.disabled) {
      // no click & move was involved
      if (this._touchDragEnd) {
        if (this._preventTouchSwitch) {
          const value = this._touchDragEnd > (this._getHandleWidth() / 2);
          this._triggerChange(value);
        } else {
          this._triggerChange(!this.state.value);
        }
      } else { // click like
        this._triggerChange(!this.state.value);
      }
    } else {
      this.setState({
        isActive: false,
        isDraggingWithTouch: false,
      });
    }

    this._touchDragStart = undefined;
    this._touchDragEnd = undefined;
    this._preventTouchSwitch = false;

    if (this.props.handleProps && this.props.handleProps.onTouchEnd) {
      this.props.handleProps.onTouchEnd(event);
    }
  };

  _onTouchCancelHandle = (event) => {
    this.setState({
      isDraggingWithTouch: false,
    });
    this._touchDragStart = undefined;
    this._touchDragEnd = undefined;
    this._preventTouchSwitch = false;

    if (this.props.handleProps && this.props.handleProps.onTouchCancel) {
      this.props.handleProps.onTouchCancel(event);
    }
  };

  _onKeyDown = (event) => {
    if (!this.props.disabled) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this._onArrowLeftKeyDown();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        this._onArrowRightKeyDown();
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this._onEnterOrSpaceKeyDown();
      }
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  };

  /*
   * Flip value in case it is false.
   */
  _onArrowLeftKeyDown() {
    if (this.state.value === true) {
      this._triggerChange(false);
    }
  }

  /*
   * Flip value in case it is true.
   */
  _onArrowRightKeyDown() {
    if (this.state.value === false) {
      this._triggerChange(true);
    }
  }

   /*
    * Flip value and trigger change.
    */
  _onEnterOrSpaceKeyDown() {
    this._triggerChange(!this.state.value);
  }

  _onMouseEnterAtSliderWrapper = () => {
    this.setState({
      isHovered: true,
    });
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  };

  _onMouseLeaveAtSliderWrapper = () => {
    this.setState({
      isHovered: false,
      isActive: false,
    });
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  };

  _getHandleHeight() {
    return has(this.props.handleStyle, 'height') ? this.props.handleStyle.height : style.handleStyle.height;
  }

  _getHandleWidth() {
    return has(this.props.handleStyle, 'width') ? this.props.handleStyle.width : style.handleStyle.width;
  }

  _getSliderOffset() {
    const firstChoiceWidth = has(this.props.firstChoiceStyle, 'width') ? this.props.firstChoiceStyle.width : style.firstChoiceStyle.width;

    return firstChoiceWidth - this._getHandleWidth() / 2;
  }

  _getToggleWidth() {
    return has(this.props.style, 'width') ? this.props.style.width : style.style.width;
  }

  _triggerChange(value) {
    if (has(this.props, 'valueLink')) {
      this.props.valueLink.requestChange(value);
      this.setState({
        isDraggingWithMouse: false,
        isDraggingWithTouch: false,
        isActive: false,
      });
    } else if (has(this.props, 'value')) {
      this.setState({
        isDraggingWithMouse: false,
        isDraggingWithTouch: false,
        isActive: false,
      });
    } else {
      this.setState({
        value,
        isDraggingWithMouse: false,
        isDraggingWithTouch: false,
        isActive: false,
      });
    }

    if (this.props.onUpdate) {
      this.props.onUpdate({ value });
    }
  }

  _triggerUpdateComponentOnMouseMove(pageX) {
    const difference = pageX - this._mouseDragStart;

    if (this.state.value &&
        this._mouseDragEnd &&
        difference > this._mouseDragEnd) {
      this._preventMouseSwitch = true;
    } else if (!this.state.value &&
               this._mouseDragEnd &&
               difference < this._mouseDragEnd) {
      this._preventMouseSwitch = true;
    }

    this._mouseDragEnd = difference;

    if (difference < 0 || difference > this._getToggleWidth() - this._getHandleWidth()) return;

    this.setState({
      sliderOffset: difference,
    });
  }

  _triggerUpdateComponentOnTouchMoveAtSlider(touch) {
    const touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
    const firstChoiceNode = ReactDOM.findDOMNode(this.firstChoice);
    const secondChoiceNode = ReactDOM.findDOMNode(this.secondChoice);

    this._touchEndedNotInSlider = touchedElement !== firstChoiceNode &&
                                  touchedElement !== secondChoiceNode;
    if (this.state.isActive && this._touchEndedNotInSlider) {
      this.setState({ isActive: false });
    } else if (!this.state.isActive && !this._touchEndedNotInSlider) {
      this.setState({ isActive: true });
    }
  }

  _triggerUpdateComponentOnTouchMoveAtHandle(touch) {
    const sliderWrapperNode = ReactDOM.findDOMNode(this.sliderWrapper);
    const rect = sliderWrapperNode.getBoundingClientRect();
    const difference = touch.pageX - this._touchDragStart;
    const horizontalTolerance = this._getHandleWidth() * 2;
    const verticalTolerance = this._getHandleHeight() * 2;

    // touch left the allowed handle drag area
    if (touch.clientX < rect.left - horizontalTolerance ||
        touch.clientX > rect.right + horizontalTolerance ||
        touch.clientY < rect.top - verticalTolerance ||
        touch.clientY > rect.bottom + verticalTolerance) {
      if (this._preventTouchSwitch) {
        const value = difference > (this._getHandleWidth() / 2);
        this._triggerChange(value);
      } else {
        this._triggerChange(!this.state.value);
      }
    } else if (this.state.isDraggingWithTouch) { // is still dragging
      if (this.state.value &&
          this._touchDragEnd &&
          difference > this._touchDragEnd) {
        this._preventTouchSwitch = true;
      } else if (!this.state.value &&
                 this._touchDragEnd &&
                 difference < this._touchDragEnd) {
        this._preventTouchSwitch = true;
      }

      if (difference < 0 || difference > this._getToggleWidth() - this._getHandleWidth()) return;

      this._touchDragEnd = difference;
      this.setState({
        sliderOffset: difference,
      });
    }
  }

  render() {
    let wrapperStyle = {
      ...style.style,
      ...this.props.style,
    };

    if (this.isFocused && !this.state.wasFocusedWithClickOrTouch) {
      wrapperStyle = {
        ...wrapperStyle,
        ...style.focusStyle,
        ...this.props.focusStyle,
      };
    }

    let computedSliderStyle;
    let handleStyle;

    const sliderWrapperStyle = {
      ...style.sliderWrapperStyle,
      ...this.props.sliderWrapperStyle,
    };
    const defaultSliderOffset = this._getSliderOffset();

    if (this.state.isDraggingWithMouse || this.state.isDraggingWithTouch) {
      computedSliderStyle = {
        ...style.sliderStyle,
        ...this.props.sliderStyle,
        left: this.state.sliderOffset - defaultSliderOffset,
        transition: 'none',
      };

      // right now even when handle is clicked, it momentarily shows this grabbing styles
      // may be this.state.isDraggingWithMouse should be set to true only after mouse movement starts
      const activeStyle = {
        ...style.activeHandleStyle,
        ...this.props.handleStyle,
      };
      handleStyle = {
        ...style.handleStyle,
        ...activeStyle,
        ...this.props.activeHandleStyle,
        left: this.state.sliderOffset,
        transition: activeStyle.transition ? activeStyle.transition : 'none',
      };
    } else {
      handleStyle = {
        ...style.handleStyle,
        ...this.props.handleStyle,
      };
      computedSliderStyle = {
        ...style.sliderStyle,
        left: this.state.value ? 0 : -defaultSliderOffset,
      };

      if (this.state.isActive) {
        handleStyle = {
          ...handleStyle,
          ...style.activeHandleStyle,
          ...this.props.activeHandleStyle,
        };
      } else if (this.state.isHovered) {
        handleStyle = {
          ...handleStyle,
          ...style.hoverHandleStyle,
          ...this.props.hoverHandleStyle,
        };
      }

      const position = {
        left: this.state.value ? defaultSliderOffset : 0,
      };
      handleStyle = {
        ...handleStyle,
        ...position,
      };
    }

    const computedTrueChoice = first(this.props.children) ? first(this.props.children) : '✓';
    const computedFalseChoice = last(this.props.children) ? last(this.props.children) : '✘';

    const computedTrueChoiceStyle = {
      ...style.firstChoiceStyle,
      ...this.props.firstChoiceStyle,
    };
    const computedFalseChoiceStyle = {
      ...style.secondChoiceStyle,
      ...this.props.secondChoiceStyle,
    };

    const hasCustomTabIndex = this.props.wrapperProps && this.props.wrapperProps.tabIndex;
    let tabIndex = hasCustomTabIndex ? this.props.wrapperProps.tabIndex : '0';
    if (this.props.disabled) {
      tabIndex = -1;
      wrapperStyle = {
        ...wrapperStyle,
        ...style.disabledStyle,
        ...this.props.disabledStyle,
      };
      handleStyle = {
        ...handleStyle,
        ...style.disabledHandleStyle,
        ...this.props.disabledHandleStyle,
      };
    }

    const role = has(this.state.childProps, 'role') ? this.state.childProps.role : 'checkbox';

    return (
      <div
        style={ wrapperStyle }
        tabIndex={ tabIndex }
        className={ unionClassNames(this.props.className, this.styleId) }
        onKeyDown={ this._onKeyDown }
        onMouseDown={ this._onMouseDownOnWrapper }
        onMouseUp={ this._onMouseUpOnWrapper }
        onTouchStart={ this._onTouchStartOnWrapper }
        onFocus={ this._onFocus }
        onBlur={ this._onBlur }
        onMouseEnter = { this._onMouseEnterAtSliderWrapper }
        onMouseLeave = { this._onMouseLeaveAtSliderWrapper }
        role={ role }
        aria-checked={ this.state.value }
        {...this.state.childProps}
      >
        <div
          style={ sliderWrapperStyle }
          ref={(c) => this.sliderWrapper = c}
          {...this.state.sliderWrapperProps}
        >
          <div
            style={ computedSliderStyle }
            onClick={ this._onClickAtSlider }
            onTouchStart={ this._onTouchStartAtSlider }
            onTouchMove={ this._onTouchMoveAtSlider }
            onTouchEnd={ this._onTouchEndAtSlider }
            onTouchCancel={ this._onTouchCancelAtSlider }
            {...this.state.sliderProps}
          >
            <div
              ref={(c) => this.firstChoice = c}
              style={ computedTrueChoiceStyle }
              {...this.state.firstChoiceProps}
            >
              { computedTrueChoice }
            </div>
            <div
              ref={(c) => this.secondChoice = c}
              style={ computedFalseChoiceStyle }
              {...this.state.secondChoiceProps}
            >
              { computedFalseChoice }
            </div>
          </div>
        </div>
        <div
          ref={(c) => this.handle = c}
          style={ handleStyle }
          onMouseDown={ this._onMouseDownOnHandle }
          onMouseMove={ this._onMouseMoveOnHandle }
          onMouseUp={ this._onMouseUpOnHandle }
          onMouseLeave={ this._onMouseLeaveOnHandle }
          onTouchStart={ this._onTouchStartHandle }
          onTouchMove={ this._onTouchMoveHandle }
          onTouchEnd={ this._onTouchEndHandle }
          onTouchCancel={ this._onTouchCancelHandle }
          {...this.state.handleProps}
        />
      </div>
    );
  }
}