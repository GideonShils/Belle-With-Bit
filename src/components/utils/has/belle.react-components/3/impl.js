
/**
 * @bit
 * @name has
 * @description Returns true if the object contain the given key.
 * @param {object} obj - object to be inspected
 * @param {string} key - name of the property
 * @returns {boolean}
 *
 */
export default function has(obj, key) {
  return obj !== undefined && obj !== null && Object.prototype.hasOwnProperty.call(obj, key);
}