
/**
 * # SeparatorStyle
 * Used for styling the Belle Separator component
 * 
 * Belle provides you with the ability to modify the default appearance of its components.
 * 
 * With this example you overwrite the hover style of default Belle Separator Component
 * ```js
 * import SeparatorStyle from 'bit/style/separator-style';
 * 
 * SeparatorStyle.style = {
 *  boxSizing: 'border-box',
 *  color: '#6FA8D1',
 *  fontWeight: 'bold',
 *  padding: 15,
 * }
 * ```
 * 
 * For extended information see the Belle [documentation] (http://nikgraf.github.io/belle/#/configuration?_k=pbr5zm)
 * @bit
 */

const separatorStyle = {
  style: {
    boxSizing: 'border-box',
    color: '#666',
    fontWeight: 'bold',
    padding: 10,
  },
};

export default separatorStyle;