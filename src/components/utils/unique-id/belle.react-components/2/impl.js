
/**
 * @bit
 * @name uniqueId
 * @description Helper method for Belle components.
 */

export default function uniqueId() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}