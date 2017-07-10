
/**
 * # TextInputStyle
 * Used for styling the Belle Spinner component
 * 
 * Belle provides you with the ability to modify the default appearance of its components.
 * 
 * With this example you overwrite the focus style of default Belle TextInput Component
 * ```js
 * import TextInputStyle from 'bit/style/text-input-style';
 * 
 * TextInputStyle.focusStyle = {
 *  outline: 0, // to avoid default focus behaviour
*   borderBottom: '2px solid #6FA8D1',
 * }
 * ```
 * 
 * For extended information see the Belle [documentation] (http://nikgraf.github.io/belle/#/configuration?_k=pbr5zm)
 * @bit
 */

const textInputStyle = {
  style: {
    /* normalize.css v3.0.1 */
    font: 'inherit',
    margin: 0,

    /* Reset the default borderRadius for Mobile Safari */
    borderRadius: 0,

    /* Belle TextInput style */
    overflow: 'hidden',
    resize: 'none',
    width: '100%',
    fontSize: 15,
    padding: '7px 0 5px 0',
    color: '#505050',
    border: '0 solid #fff',
    borderBottom: '1px solid #ccc',
    background: 'none',
    display: 'block',
    boxSizing: 'border-box',
    minHeight: '0px',

    /* animations */
    transition: 'border-bottom 0.2s',
    transitionTimingFunction: 'ease-out',
  },

  hoverStyle: {
    borderBottom: '1px solid #92D6EF',
  },

  focusStyle: {
    outline: 0, // to avoid default focus behaviour
    borderBottom: '1px solid #6EB8D4',
  },

  disabledStyle: {
    borderBottom: '1px dotted #9F9F9F',
    color: '#9F9F9F',
  },

  disabledHoverStyle: {
    borderBottom: '1px dotted #92D6EF',
    color: '#9F9F9F',
    cursor: 'not-allowed',
  },
};

export default textInputStyle;