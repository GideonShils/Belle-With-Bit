import React, { Component, PropTypes } from 'react';
import omit from 'bit/utils/omit';
import style from 'bit/style/option-style';

/**
 * # Option Component
 * 
 * This component should be used together with Belle's Select.
 * 
 * ## Properties:
 * * `{String, Boolean, Number} value` (required) - The value to be set in case this Option is selected. The value must be unique for all Options within one Select. It can be of type Boolean, String or Number.
 * * `{Object} hoverStyle` (optional) - Works like React's built-in style property. Becomes active once the user hovers over the Option with the cursor or focus on it by leveragin the key board inputs like Arrow-down or Arrow-up.
 * * Any property valid for a HTML div like style, id, className, ...
 * 
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/option?_k=oxoh5s) documentation.
 *
 * ## Standard example
 * ```js
 * <!-- basic select example with multiple options -->
 * <Select>
 * <Option value="berlin">Berlin</Option>
 * <Option value="tokyo">Tokyo</Option>
 * <Option value="vienna">Vienna</Option>
 * </Select>
 * ```
 * @bit
 */

const optionPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.object,
  hoverStyle: PropTypes.object,
  selectStyle: PropTypes.object,
  disabledSelectStyle: PropTypes.object,
  _isDisplayedAsSelected: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  identifier: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
  ]),
};

/*
 * Returns an object with properties that are relevant for the wrapping div.
 */
function sanitizeChildProps(properties) {
  return omit(properties, Object.keys(optionPropTypes));
}

/*
 * Option component.
 */
export default class Option extends Component {

  constructor(properties) {
    super(properties);
    this.state = {
      childProps: sanitizeChildProps(properties),
    };
  }

  static displayName = 'Option';

  static propTypes = optionPropTypes;

  static contextTypes = {
    isDisabled: PropTypes.bool.isRequired,
    isHoveredValue: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  static defaultProps = {
    _isDisplayedAsSelected: false,
  };

  /*
   * Update the childProps based on the updated properties passed to the
   * Option.
   */
  componentWillReceiveProps(properties) {
    this.setState({ childProps: sanitizeChildProps(properties) });
  }

  render() {
    let optionStyle;

    if (this.props._isDisplayedAsSelected) {
      optionStyle = {
        ...style.selectStyle,
        ...this.props.selectStyle,
      };
      if (this.context.isDisabled) {
        optionStyle = {
          ...optionStyle,
          ...style.disabledSelectStyle,
          ...this.props.disabledSelectStyle,
        };
      }
    } else {
      optionStyle = {
        ...style.style,
        ...this.props.style,
      };
      if (this.context.isHoveredValue === this.props.value) {
        optionStyle = {
          ...optionStyle,
          ...style.hoverStyle,
          ...this.props.hoverStyle,
        };
      }
    }

    return (
      <div
        style={ optionStyle }
        {...this.state.childProps}
      >
        { this.props.children }
      </div>
    );
  }
}