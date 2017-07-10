import has from 'bit/utils/has';
/**
 * @bit
 * @name keys
 * @description Returns all the names of the object's own properties. This will not include properties inherited through prototypes.
 * @param {object} obj - object to be used
 */

export default function keys(obj) {
  const objKeys = [];
  for (const key in obj) if (has(obj, key)) objKeys.push(key);
  return objKeys;
}