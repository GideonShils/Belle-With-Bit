'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * # OptionStyle
 * Used for styling the Belle Option component
 * 
 * Belle provides you with the ability to modify the default appearance of its components.
 * 
 * With this example you overwrite the hover style of default Belle Option Component
 * ```js
 * import OptionStyle from 'bit/style/option-style';
 * 
 * OptionStyle.hoverStyle = {
 *  background: '#6FA8D1',
 *  color: '#BC5163',
 * }
 * ```
 * 
 * For extended information see the Belle [documentation] (http://nikgraf.github.io/belle/#/configuration?_k=pbr5zm)
 * @bit
 */

var optionStyle = {
  style: {
    boxSizing: 'border-box',
    color: '#666',
    cursor: 'pointer',
    padding: 10,
    fontSize: 15,
    /*
    To avoid any kind of flickering the user won't get feedback
    for selecting the option text
    */
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
    userSelect: 'none',
    /* This button can only be pressed */
    MsTouchAction: 'manipulation',
    touchAction: 'manipulation',
    /*
    Prevent flickering while tapping on WebKit
    http://stackoverflow.com/a/3516243/837709
    */
    WebkitTapHighlightColor: 'transparent'
  },

  hoverStyle: {
    background: '#F5F5F5',
    color: '#444'
  },

  selectStyle: {
    boxSizing: 'border-box',
    color: '#666',
    padding: 0,
    fontSize: 15,
    /*
    To avoid any kind of flickering the user won't get feedback
    for selecting the button text
    */
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
    userSelect: 'none',
    /* This button can only be pressed */
    MsTouchAction: 'manipulation',
    touchAction: 'manipulation',
    /*
    Prevent flickering while tapping on WebKit
    http://stackoverflow.com/a/3516243/837709
    */
    WebkitTapHighlightColor: 'transparent'
  },

  disabledSelectStyle: {
    color: '#9F9F9F',
    padding: 0
  }
};

exports.default = optionStyle;

//# sourceMappingURL=impl.js.map