import i18n from 'bit/config/i18n-config';
/**
 * @bit
 * @name getLocaleData
 * @description Function will return locale data for locale. If data is not available in config files it will return default data.
 * @param locale - locale for which data is needed.
 * @returns {Object}: Object containing locale data.
 *
 */

const getLocaleData = (locale) => {
  const localeResult = {};
  let lData;
  if (locale) {
    lData = i18n.localeData[locale];
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December',
  ];

  localeResult.monthNames = (lData && lData.monthNames) ? lData.monthNames : monthNames;
  localeResult.dayNamesMin = (lData && lData.dayNamesMin) ? lData.dayNamesMin : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  localeResult.firstDay = (lData && lData.firstDay) ? lData.firstDay : 0;
  localeResult.weekEnd = (lData && lData.weekEnd) ? lData.weekEnd : 0;
  localeResult.isRTL = (lData && lData.isRTL) ? lData.isRTL : false;
  return localeResult;
};

export default getLocaleData