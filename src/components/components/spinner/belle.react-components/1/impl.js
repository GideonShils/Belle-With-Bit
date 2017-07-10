import React, { Component, PropTypes } from 'react';
import spinnerStyle from 'bit/style/spinner-style';

/**
 * # Spinner Component
 * To be used as loading indicator
 * 
 * ## Properties:
 * * `{Object} characterStyle` (optional) - The property can be used to specify styling for the spans wrapping the dots. Behaves like Reacts built-in style property.
 * * Any property valid for a HTML div like style, id, className, ...
 * 
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/spinner?_k=6nbmd7) documentation.
 * 
 * ## Standard example
 * ```js
 * <!-- basic spinner example -->
 * <Spinner />
 * ```
 * 
 * ## Button while loading
 * ```js
 * <!-- loading button example -->
 * <Button primary disabled>
 * Saving <Spinner characterStyle={{ fontSize: 18, color: '#fff' }} />
 * </Button>
 *
 * <Button disabled style={{ marginLeft: 10 }}>
 * Saving <Spinner characterStyle={{ fontSize: 18, color: '#C5C4C4' }} />
 * </Button>
 * ```
 * 
 * ## Card with a loading indicator
 * ```js
 * <!-- loading example -->
 * <Card style={{ fontSize: 20,
 *              color: '#666',
 *              textAlign: 'center',
 *              borderTop: '1px solid #f2f2f2',
 *           }}>
 * Loading <Spinner characterStyle={{ fontSize: 20 }} />
 * </Card>
 * ```
 * @bit
 */

const animationDelay = (delay) => ({
  MozAnimationDelay: delay,
  WebkitAnimationDelay: delay,
  OAnimationDelay: delay,
  animationDelay: delay,
});

/*
 * Spinner component.
 */
export default class Spinner extends Component {

  static displayName = 'Spinner';

  static propTypes = {
    characterProps: PropTypes.object,
    characterStyle: PropTypes.object,
    style: PropTypes.object,
  };

  render() {
    const { style, characterProps, characterStyle, ...childProps } = this.props;
    const computedCharStyle = { ...spinnerStyle.characterStyle, ...characterStyle };
    return (
      <span {...childProps} style={{ ...spinnerStyle.style, ...style }}>
        <span {...characterProps} style={ computedCharStyle }>
          .
        </span>
        <span {...characterProps} style={{ ...computedCharStyle, ...animationDelay('400ms') }}>
          .
        </span>
        <span {...characterProps} style={{ ...computedCharStyle, ...animationDelay('800ms') }}>
          .
        </span>
      </span>
    );
  }
}