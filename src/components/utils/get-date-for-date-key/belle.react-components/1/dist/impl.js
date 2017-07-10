'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @bit
 * @name getDateForDateKey
 * @description Returns the date for a date string representation.
 * @param year {number} - any year
 * @param month {number} - can be between 1 and 12
 * @param day {number} - can be between 1 and 31 depending on the month
 * @returns {date} - the parse date
 */

var getDateForDateKey = function getDateForDateKey(dateKey) {
  var splittedDate = dateKey.split('-');
  return new Date(parseInt(splittedDate[0], 10), parseInt(splittedDate[1], 10) - 1, parseInt(splittedDate[2], 10));
};

exports.default = getDateForDateKey;

//# sourceMappingURL=impl.js.map