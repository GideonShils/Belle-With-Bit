
/**
 * @bit
 * @name isEmpty
 * @description Returns true if object contains no values (no enumerable own-properties).
 * @param {Object} obj - an object
 */

export default function isEmpty(obj) {
  return !obj ||
    (Array.isArray(obj) && obj.length === 0) ||
    (Object.keys(obj).length === 0);
}