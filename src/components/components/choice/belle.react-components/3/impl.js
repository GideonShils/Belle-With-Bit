import React, { Component, PropTypes } from 'react';

/**
 * # Choice Component
 * ## Properties:
 * * `{Boolean} value` (required) - The value to be set in case this Choice is set.
 * * Any property valid for a HTML div like style, id, className, ...
 *
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/choice?_k=jaxgej) documentation.
 * 
 * ## Standard example
 * ```js
 * <!-- toggle with custom choices -->
 * <Toggle defaultValue>
 * <Choice value>On</Choice>
 * <Choice value={ false }>Off</Choice>
 * </Toggle>
 * ```
 * @bit
 */

export default class Choice extends Component {

  static displayName = 'Choice';

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    value: PropTypes.bool.isRequired,
  };

  render() {
    return <div>{this.props.children}</div>;
  }
}