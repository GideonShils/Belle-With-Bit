"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @bit
 * @name getWeekArrayForMonth
 * @description The function will take a month and year value and will return an array of weeks for that month.
 * Each element in this array will be in-turn an array of days in the week.
 * @param {number} month - the month for which array of weeks is needed
 * @param {number} year - the year for which array of weeks is needed
 * @param {number} firstDayOfWeek - first day of the week in the locale
 * @returns {Array}: Array of weeks in a month, each week is in turn array of days in that week
 */

var getWeekArrayForMonth = function getWeekArrayForMonth(month, year, firstDayOfWeek) {
  var monthDay = new Date(year, month, 1);

  // Todo: simplify this calculation of first date
  var firstDate = 1 + firstDayOfWeek - monthDay.getDay();
  firstDate = firstDate <= 1 ? firstDate : firstDate - 7;
  monthDay.setDate(firstDate);
  var lastDate = new Date(year, month + 1, 0);

  var weekArray = [];
  while (monthDay <= lastDate) {
    var newWeek = [];
    for (var dayCounter = 0; dayCounter < 7; dayCounter++) {
      var weekDate = new Date(monthDay.getFullYear(), monthDay.getMonth(), monthDay.getDate());
      newWeek.push(weekDate);
      monthDay.setDate(monthDay.getDate() + 1);
    }

    weekArray.push(newWeek);
  }

  return weekArray;
};

exports.default = getWeekArrayForMonth;

//# sourceMappingURL=impl.js.map