import React, { Component, PropTypes } from 'react';
import omit from 'bit/utils/omit';
import style from 'bit/style/placeholder-style';

/**
 * # Placeholder Component
 * 
 * This component should be used together with Belle's Select
 * 
 * ## Properties:
 * * Any property valid for a HTML div like style, id, className, ...
 * 
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/placeholder?_k=parg4w) documentation.
 *
 * ## Standard example
 * ```js
 * <!-- basic select example with a placeholder -->
 * <Select>
 * <Placeholder>Choose a City</Placeholder>
 * <Option value="tokyo">Tokyo</Option>
 * <Option value="vienna">Vienna</Option>
 * </Select>
 * ```
 * @bit
 */

const placeholderPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.object,
  disabledStyle: PropTypes.object,
  _isDisabled: PropTypes.bool,
};

/*
 * Returns an object with properties that are relevant for the wrapping div.
 */
function sanitizeChildProps(properties) {
  return omit(properties, Object.keys(placeholderPropTypes));
}

/*
 * Placeholder component.
 */
export default class Placeholder extends Component {

  constructor(properties) {
    super(properties);
    this.state = {
      childProps: sanitizeChildProps(properties),
    };
  }

  static displayName = 'Placeholder';

  static propTypes = placeholderPropTypes;

  static defaultProps = {
    _isDisabled: false,
  };

  /*
   * Update the childProps based on the updated properties passed to the
   * Placeholder.
   */
  componentWillReceiveProps(properties) {
    this.setState({ childProps: sanitizeChildProps(properties) });
  }

  render() {
    let computedStyle = {
      ...style.style,
      ...this.props.style,
    };
    if (this.props._isDisabled) {
      computedStyle = {
        ...computedStyle,
        ...style.disabledStyle,
        ...this.props.disabledStyle,
      };
    }

    return (
      <div style={ computedStyle } {...this.state.childProps}>
        { this.props.children }
      </div>
    );
  }
}