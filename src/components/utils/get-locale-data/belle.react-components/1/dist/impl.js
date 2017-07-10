'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _i18nConfig = require('bit/config/i18n-config');

var _i18nConfig2 = _interopRequireDefault(_i18nConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @bit
 * @name getLocaleData
 * @description Function will return locale data for locale. If data is not available in config files it will return default data.
 * @param locale - locale for which data is needed.
 * @returns {Object}: Object containing locale data.
 *
 */

var getLocaleData = function getLocaleData(locale) {
  var localeResult = {};
  var lData = void 0;
  if (locale) {
    lData = _i18nConfig2.default.localeData[locale];
  }

  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  localeResult.monthNames = lData && lData.monthNames ? lData.monthNames : monthNames;
  localeResult.dayNamesMin = lData && lData.dayNamesMin ? lData.dayNamesMin : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  localeResult.firstDay = lData && lData.firstDay ? lData.firstDay : 0;
  localeResult.weekEnd = lData && lData.weekEnd ? lData.weekEnd : 0;
  localeResult.isRTL = lData && lData.isRTL ? lData.isRTL : false;
  return localeResult;
};

exports.default = getLocaleData;

//# sourceMappingURL=impl.js.map