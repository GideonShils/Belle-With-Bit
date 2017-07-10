'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * # PlaceholderSTyle
 * Used for styling the Belle Placeholder component
 * 
 * Belle provides you with the ability to modify the default appearance of its components.
 * 
 * With this example you overwrite the disabled style of default Belle Placeholder Component
 * ```js
 * import PlaceholderStyle from 'bit/style/placeholder-style';
 * 
 * PlaceholderStyle.disabledStyle = {
 *  color: '#6FA8D1',
 *  cursor: 'not-allowed',
 * }
 * ```
 * 
 * For extended information see the Belle [documentation] (http://nikgraf.github.io/belle/#/configuration?_k=pbr5zm)
 * @bit
 */

/**
 * @bit
 * @name placeholderStyle
 * @description Used for styling the Belle Placeholder component
 */

var placeholderStyle = {
  style: {
    boxSizing: 'border-box',
    color: '#666',
    cursor: 'pointer',
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

  disabledStyle: {
    color: '#9F9F9F',
    cursor: 'not-allowed'
  }
};

exports.default = placeholderStyle;

//# sourceMappingURL=impl.js.map