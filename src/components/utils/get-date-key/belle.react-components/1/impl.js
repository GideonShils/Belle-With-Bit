
/**
 * @bit
 * @name getDateKey
 * @description Returns the string representation for a provided year, month & day.
 * @param year {number} - any year
 * @param month {number} - can be between 1 and 12
 * @param day {number} - can be between 1 and 31 depending on the month
 * @returns {string}: a string representing the date in the format yyyy-mm-dd
 */

const getDateKey = (year, month, day) => `${year}-${month}-${day}`;

export default getDateKey;