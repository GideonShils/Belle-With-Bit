"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @bit
 * @name getLastDayForMonth
 * @description Helper method for Belle DatePicker component
 */

var getLastDayForMonth = function getLastDayForMonth(year, month) {
  return new Date(year, month + 1, 0);
};

exports.default = getLastDayForMonth;

//# sourceMappingURL=impl.js.map