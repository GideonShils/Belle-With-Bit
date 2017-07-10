import keys from 'bit/utils/keys';
/**
 * @bit
 * @name mapObject
 * @description Returns a new object by mapping each property in an object through a transformation function (predicate).
 * @param {object} obj - object to be based upon
 * @param {function} predicate - function to transform the property
 */

export default function mapObject(obj, predicate) {
  if (obj) {
    const result = [];
    const objKeys = keys(obj);
    objKeys.forEach((key, index) => {
      if (predicate) {
        result[index] = predicate(obj[key], key);
      }
    });
    return result;
  }

  return undefined;
}