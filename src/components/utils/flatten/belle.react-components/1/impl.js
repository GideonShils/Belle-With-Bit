
/**
 * @bit
 * @name flatten
 * @description Flattens a nested array (the nesting can be to any depth).
 * @param {...array} arrays - at least one array must be provided
 */

export default function flatten(...arrays) {
  if (arrays) {
    const result = [];
    flattenInternal(result, arrays);
    return result;
  }

  return undefined;
}

// Recursive internal function for flattening an iterable.
function flattenInternal(output, element) {
  if (element) {
    element.forEach((obj) => {
      if (Array.isArray(obj)) {
        flattenInternal(output, obj);
      } else {
        output.push(obj);
      }
    });
  }
}