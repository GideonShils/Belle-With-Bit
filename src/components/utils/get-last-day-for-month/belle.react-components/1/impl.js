
/**
 * @bit
 * @name getLastDayForMonth
 * @description Helper method for Belle DatePicker component
 */

const getLastDayForMonth = (year, month) => new Date(year, month + 1, 0);

export default getLastDayForMonth