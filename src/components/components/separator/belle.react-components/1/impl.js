import React, { Component, PropTypes } from 'react';
import omit from 'bit/utils/omit';
import style from 'bit/style/separator-style';

/**
 * # Separator Component
 * This component should be used together with Belle's Select.
 * 
 * ## Properties:
 * * Any property valid for a HTML div like style, id, className, ...
 *
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/separator?_k=gntekj) documentation.
 * 
 * ## Standard example
 * ```js
 * <!-- basic select example with separators -->
 * <Select>
 * <Separator>America</Separator>
 * <Option value="san-francisco">San Francisco</Option>
 * <Option value="vancouver">Vancouver</Option>
 * <Separator>Asia</Separator>
 * <Option value="hong-kong">Hong Kong</Option>
 * <Option value="tokyo">Tokyo</Option>
 * <Separator>Europe</Separator>
 * <Option value="berlin">Berlin</Option>
 * <Option value="istanbul">Istanbul</Option>
 * <Option value="rome">Rome</Option>
 * <Option value="vienna">Vienna</Option>
 * </Select>
 * ```
 * @bit
 */

const separatorPropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.object,
};

/*
 * Returns an object with properties that are relevant for the wrapping div.
 */
function sanitizeChildProps(properties) {
  return omit(properties, Object.keys(separatorPropTypes));
}

/*
 * Separator component.
 */
export default class Separator extends Component {

  constructor(properties) {
    super(properties);
    this.state = {
      childProps: sanitizeChildProps(properties),
    };
  }

  static displayName = 'Separator';

  static propTypes = separatorPropTypes;

  /*
   * Update the childProperties based on the updated properties passed to the
   * Separator.
   */
  componentWillReceiveProps(properties) {
    this.setState({ childProps: sanitizeChildProps(properties) });
  }

  render() {
    const computedStyle = {
      ...style.style,
      ...this.props.style,
    };

    return (
      <div style={ computedStyle } {...this.state.childProps}>
        { this.props.children }
      </div>
    );
  }
}