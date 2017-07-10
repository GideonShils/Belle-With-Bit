'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getDateKey = require('bit/utils/get-date-key');

var _getDateKey2 = _interopRequireDefault(_getDateKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @bit
 * @name convertDateToDateKey
 * @description Returns the string representation for a provided date.
 * @param date {date} - a valid date
 * @returns {string}: a string representing the date in the format yyyy-mm-dd
 *
 */

var convertDateToDateKey = function convertDateToDateKey(date) {
  return (0, _getDateKey2.default)(date.getFullYear(), date.getMonth() + 1, date.getDate());
};

exports.default = convertDateToDateKey;

//# sourceMappingURL=impl.js.map