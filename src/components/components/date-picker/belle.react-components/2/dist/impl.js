'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _injectStyle = require('bit/utils/inject-style');

var _unionClassNames = require('bit/utils/union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

var _has = require('bit/utils/has');

var _has2 = _interopRequireDefault(_has);

var _map = require('bit/utils/map');

var _map2 = _interopRequireDefault(_map);

var _shift = require('bit/utils/shift');

var _shift2 = _interopRequireDefault(_shift);

var _reverse = require('bit/utils/reverse');

var _reverse2 = _interopRequireDefault(_reverse);

var _omit = require('bit/utils/omit');

var _omit2 = _interopRequireDefault(_omit);

var _uniqueId = require('bit/utils/unique-id');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _convertDateToDateKey = require('bit/utils/convert-date-to-date-key');

var _convertDateToDateKey2 = _interopRequireDefault(_convertDateToDateKey);

var _getDateKey = require('bit/utils/get-date-key');

var _getDateKey2 = _interopRequireDefault(_getDateKey);

var _getDateForDateKey = require('bit/utils/get-date-for-date-key');

var _getDateForDateKey2 = _interopRequireDefault(_getDateForDateKey);

var _getWeekArrayForMonth = require('bit/utils/get-week-array-for-month');

var _getWeekArrayForMonth2 = _interopRequireDefault(_getWeekArrayForMonth);

var _getLastDayForMonth = require('bit/utils/get-last-day-for-month');

var _getLastDayForMonth2 = _interopRequireDefault(_getLastDayForMonth);

var _getLocaleData = require('bit/utils/get-locale-data');

var _getLocaleData2 = _interopRequireDefault(_getLocaleData);

var _today = require('bit/utils/today');

var _today2 = _interopRequireDefault(_today);

var _datePickerStyle = require('bit/style/date-picker-style');

var _datePickerStyle2 = _interopRequireDefault(_datePickerStyle);

var _datePickerConfig = require('bit/config/date-picker-config');

var _datePickerConfig2 = _interopRequireDefault(_datePickerConfig);

var _actionArea = require('bit/components/action-area');

var _actionArea2 = _interopRequireDefault(_actionArea);

var _disabledDay = require('bit/components/disabled-day');

var _disabledDay2 = _interopRequireDefault(_disabledDay);

var _day = require('bit/components/day');

var _day2 = _interopRequireDefault(_day);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # DatePicker Component
 * 
 * ## Properties:
 * * `{Value Reference} valueLink` (optional) - Behaves like the valueLink property of a native form components. ValueLink allows to enable two-way data binding between a state property and the value in the user interface.
 * * `{Date} defaultValue` (optional) - Behaves like the defaultValue property of a native form components. The date can be manipulated through the user interface.
 * * `{Date} value` (optional) - Behaves like the value property of a native form components. The date can not be manipulated through the user interface.
 * * `{Integer (1-12)} defaultMonth` (optional) - When initially rendered the date picker will be display with the provided month.
 * * `{Integer} defaultYear` (optional) - When initially rendered the date picker will be display with the provided year.
 * * `{Date} min` (optional) - Sets the minimum date a user can select.
 * * `{Date} max` (optional) - Sets the maximum date a user can select.
 * * `{String} locale` (optional) - Date picker will be rendered according to this locale.
 * * `{Boolean} showOtherMonthDate` (optional. default: true) - This property can be used to show/hide the display of other month dates in date picker. Even if other month dates are displayed in date picker they will be disabled.
 * * `{Function} renderDay` (optional) - This function can be used to distinctly style some day(s).
 * * `{Function} onUpdate` (optional) - The function will be called when user selects some day.
 * * `{Function} onMonthUpdate` (optional) - The function will be called when user navigated to different month or year.
 * * `{Boolean} readOnly `(optional. default: false) - When set to true the date picker will be displayed as read only component. User can focus to read only date picker, change month but will not be able to select some day. Different styling can also be applied to read only date picker.
 * * `{Boolean} disabled` (optional. default: false) - When set to true the date picker will be displayed as disabled component. User can do no interaction with this component, it can not even be focused. Disabled date picker is styled differently.
 * * `{Boolean} preventFocusStyleForTouchAndClick` (optional. default: true) - Prevents the focus style being applied to the date picker in case the it becomes focused by a click or touch.
 * * `{Object} todayStyle` (optional) - The property can be used to add to / change the styling of current date.
 * * `{Object} selectedDayStyle` (optional) - The property can be used to add to / change the styling of the selected date.
 * * `{Object} otherMonthDayStyle` (optional) - The property can be used to add to / change the styling of other month day in date picker.
 * * `{Object} weekendStyle` (optional) - The property can be used to add to/change the styling of weekend.
 * * Properties for handling various events(focus, mouse events, touch events, change in selectedDate, month or year):tabIndex, onFocus, onBlur, onKeyDown, onMouseDown, onMouseUp, onTouchStart, onTouchEnd, onTouchCancel, onUpdate, onMonthUpdate.
 * * ... for adding attributes to specific coponents inside date picker:dayProps, navBarProps, prevMonthNavProps, prevMonthNavIconProps, nextMonthNavProps, nextMonthNavIconProps, monthLabelProps, dayLabelProps, weekHeaderProps, weekGridProps.
 * * ... for adding class to date picker wrapper:className.
 * * ... for adding styling to various parts of html structure of date picker: style, disabledStyle, readOnlyStyle, hoverStyle, activeStyle, focusStyle, disabledHoverStyle, navBarStyle, prevMonthNavStyle, prevMonthNavIconStyle, hoverPrevMonthNavStyle, activePrevMonthNavStyle, nextMonthNavStyle, nextMonthNavIconStyle, hoverNextMonthNavStyle, activeNextMonthNavStyle, weekHeaderStyle, monthLabelStyle, dayLabelStyle, disabledDayLabelStyle, weekendLabelStyle, dayStyle, disabledDayStyle, readOnlyDayStyle, activeDayStyle, focusDayStyle, disabledFocusDayStyle, todayStyle, selectedDayStyle, otherMonthDayStyle, weekendStyle.
 * 
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/date-picker?_k=6uouuh) documentation.
 * 
 * ## Standard example
 * ```js
 * <DatePicker defaultValue={new Date(${TODAY.getFullYear()},  ${TODAY.getMonth()}, 15)} />
 * ```
 * 
 * ## Internal HTML Structure
 * This should help developer to understand how the DatePicker is structured in order to use the API
 * ```js
 * <div style={ style }>
 * <div>
 *   <!-- this is navigation bar at the top -->
 *   <div style={ navBarStyle }>
 *     <span style={ prevMonthStyle }></span>
 *     <span style={ monthLabelStyle }></span>
 *     <span style={ nextMonthStyle }></span>
 *   </div>
 *   <!-- this is week header -->
 *   <div style={ weekHeaderStyle }>
 *     <span style={ dayLabelStyle }></span>
 *     <span style={ dayLabelStyle }></span>
 *     <span style={ dayLabelStyle }></span>
 *     <span style={ dayLabelStyle }></span>
 *     <span style={ dayLabelStyle }></span>
 *     <span style={ dayLabelStyle }></span>
 *     <span style={ dayLabelStyle }></span>
 *   </div>
 *   <!-- following is repeated for each week -->
 *   <div style={ dayStyle }></div>
 *   <div style={ dayStyle }></div>
 *   <div style={ dayStyle }></div>
 *   <div style={ dayStyle }></div>
 *   <div style={ dayStyle }></div>
 *   <div style={ dayStyle }></div>
 *   <div style={ dayStyle }></div>
 * </div>
 * </div>
 * ```
 * 
 * ## DatePicker with other month days hidden but weekends styled differently
 * ```js
 * <DatePicker defaultValue={new Date(${TODAY.getFullYear()},  ${TODAY.getMonth()}, 15)}
 *             showOtherMonthDate={ false } />
 * ```
 * 
 * ## DatePicker highlighting special day
 * ```js
 * <DatePicker readOnly
 *           renderDay={ this.renderDay }
 *           defaultMonth={ 12 } />
 *
 * renderDay(day) {
 * if (day.getDate() === 25 && day.getMonth() === 11) {
 *   return (
 *     <div>
 *       <span style={{color: '#FFDA46'}}>✵</span>
 *       <span style={{color: 'red'}}>
 *         { day.getDate() }
 *       </span>
 *     </div>
 *   );
 * }
 * return (
 *   day.getDate()
 * );
 * }
 * ```
 * 
 * ## Localization support in DatePicker
 * Belle has inbuilt support for following locales: Arabic, French, Hebrew, Dutch, Chinese. Adding support for a new locale is very easy, check [Configuration](http://nikgraf.github.io/belle/#/configuration?_k=gfx4lz).
 * ```js
 * <DatePicker defaultValue={new Date(${TODAY.getFullYear()},  ${TODAY.getMonth()}, 15)}
 *             locale={ this.state.selectedLocale } />
 * ```
 * 
 * ## Controlled DatePicker component with onMonthUpdate callBack and reset option implemented
 * ```js
 * <DatePicker onMonthUpdate={ this.onMonthUpdate }
 *           defaultMonth={ this.state.selectedMonth }
 *           defaultYear={ this.state.selectedYear }
 *           valueLink={ this.linkState('selectedDate') } />
 *
 * <div>
 * <div>Date: { this.state.selectedDate ?
 *              this.state.selectedDate.getMonth() + '/' +
 *              this.state.selectedDate.getDate() + '/' +
 *              this.state.selectedDate.getFullYear() : '-'}
 * </div>
 * <div>Month: {this.state.selectedMonth}</div>
 * <div>Year: {this.state.selectedYear}</div>
 * <div><a onClick={ this.resetDate }>Reset Date</a></div>
 * </div>
 *
 * onMonthUpdate(month, year) {
 * this.setState({
 *   selectedMonth: month,
 *   selectedYear: year
 * });
 * }
 *
 * resetDate() {
 * this.setState({
 *   selectedDate: undefined
 * });
 * }
 * ```
 * 
 * ## Read only DatePicker
 * ```js
 * <DatePicker defaultValue={new Date(${TODAY.getFullYear()},  ${TODAY.getMonth()}, 15)}
 *             readOnly/>
 * ```
 * 
 * ## Disabled DatePicker
 * ```js
 * <DatePicker defaultValue={new Date(${TODAY.getFullYear()},  ${TODAY.getMonth()}, 15)}
 *             disabled />
 * ```
 * @bit
 */

var datePickerPropTypes = {
  // value related props
  defaultValue: _react.PropTypes.instanceOf(Date),
  value: _react.PropTypes.instanceOf(Date),
  valueLink: _react.PropTypes.shape({
    value: _react.PropTypes.instanceOf(Date),
    requestChange: _react.PropTypes.func.isRequired
  }),

  min: _react.PropTypes.instanceOf(Date),
  max: _react.PropTypes.instanceOf(Date),

  // component config related props
  locale: _react.PropTypes.string,
  month: _react.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  defaultMonth: _react.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  year: _react.PropTypes.number,
  defaultYear: _react.PropTypes.number,
  showOtherMonthDate: _react.PropTypes.bool,
  renderDay: _react.PropTypes.func,
  tabIndex: _react.PropTypes.number,
  'aria-label': _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  readOnly: _react.PropTypes.bool,
  preventFocusStyleForTouchAndClick: _react.PropTypes.bool,

  // event callbacks for wrapper
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func,
  onMouseDown: _react.PropTypes.func,
  onMouseUp: _react.PropTypes.func,
  onTouchStart: _react.PropTypes.func,
  onTouchEnd: _react.PropTypes.func,
  onTouchCancel: _react.PropTypes.func,

  // callbacks for change of values
  onUpdate: _react.PropTypes.func,
  onMonthUpdate: _react.PropTypes.func,

  // props
  dayProps: _react.PropTypes.object,
  navBarProps: _react.PropTypes.object,
  prevMonthNavProps: _react.PropTypes.object,
  prevMonthNavIconProps: _react.PropTypes.object,
  nextMonthNavProps: _react.PropTypes.object,
  nextMonthNavIconProps: _react.PropTypes.object,
  monthLabelProps: _react.PropTypes.object,
  dayLabelProps: _react.PropTypes.object,
  weekHeaderProps: _react.PropTypes.object,
  weekGridProps: _react.PropTypes.object,

  // ClassNames
  className: _react.PropTypes.string,

  // wrapper styles
  style: _react.PropTypes.object,
  disabledStyle: _react.PropTypes.object,
  readOnlyStyle: _react.PropTypes.object,
  hoverStyle: _react.PropTypes.object,
  activeStyle: _react.PropTypes.object,
  focusStyle: _react.PropTypes.object,
  disabledHoverStyle: _react.PropTypes.object,

  // navbar styles
  navBarStyle: _react.PropTypes.object,

  // prevMonthNav styles
  prevMonthNavStyle: _react.PropTypes.object,
  prevMonthNavIconStyle: _react.PropTypes.object,
  hoverPrevMonthNavStyle: _react.PropTypes.object,
  activePrevMonthNavStyle: _react.PropTypes.object,

  // nextMonthNav styles
  nextMonthNavStyle: _react.PropTypes.object,
  nextMonthNavIconStyle: _react.PropTypes.object,
  hoverNextMonthNavStyle: _react.PropTypes.object,
  activeNextMonthNavStyle: _react.PropTypes.object,

  weekHeaderStyle: _react.PropTypes.object,

  // monthlbl styles
  monthLabelStyle: _react.PropTypes.object,

  // daylbl styles
  dayLabelStyle: _react.PropTypes.object,
  disabledDayLabelStyle: _react.PropTypes.object,
  weekendLabelStyle: _react.PropTypes.object,

  // day styles
  dayStyle: _react.PropTypes.object,
  disabledDayStyle: _react.PropTypes.object,
  readOnlyDayStyle: _react.PropTypes.object,
  activeDayStyle: _react.PropTypes.object,
  focusDayStyle: _react.PropTypes.object,
  disabledFocusDayStyle: _react.PropTypes.object,
  todayStyle: _react.PropTypes.object,
  selectedDayStyle: _react.PropTypes.object,
  otherMonthDayStyle: _react.PropTypes.object,
  weekendStyle: _react.PropTypes.object
};

/*
 * Returns an object with properties that are relevant for the wrapping div of the date picker.
 */
function sanitizeWrapperProps(properties) {
  return (0, _omit2.default)(properties, (0, _keys2.default)(datePickerPropTypes));
}

/*
 * Returns an object with properties that are relevant for day span.
 */
function sanitizeEmptyDayProps(properties) {
  return (0, _omit2.default)(properties, ['key', 'style']);
}

/*
 * Returns an object with properties that are relevant for day span.
 */
function sanitizeDisabledDayProps(properties) {
  return (0, _omit2.default)(properties, ['key', 'onMouseEnter', 'onMouseLeave', 'style']);
}

/*
 * Returns an object with properties that are relevant for day span.
 */
function sanitizeDayProps(properties) {
  return (0, _omit2.default)(properties, ['key', 'onMouseDown', 'onMouseUp', 'onMouseEnter', 'onMouseLeave', 'onTouchStart', 'onTouchEnd', 'onTouchCancel', 'aria-selected', 'style', 'role']);
}

function sanitizeNavBarProps(properties) {
  return (0, _omit2.default)(properties, ['style']);
}

function sanitizePrevMonthNavProps(properties) {
  return (0, _omit2.default)(properties, ['aria-label', 'className', 'onClick', 'style']);
}

function sanitizePrevMonthNavIconProps(properties) {
  return (0, _omit2.default)(properties, ['style']);
}

function sanitizeNextMonthNavProps(properties) {
  return (0, _omit2.default)(properties, ['aria-label', 'className', 'onClick', 'style']);
}

function sanitizeNextMonthNavIconProps(properties) {
  return (0, _omit2.default)(properties, ['style']);
}

function sanitizeMonthLabelProps(properties) {
  return (0, _omit2.default)(properties, ['id', 'role', 'style']);
}

function sanitizeDayLabelProps(properties) {
  return (0, _omit2.default)(properties, ['key', 'role', 'style']);
}

function sanitizeWeekHeaderProps(properties) {
  return (0, _omit2.default)(properties, ['style']);
}

function sanitizeWeekGridProps(properties) {
  return (0, _omit2.default)(properties, ['role', 'style']);
}

/*
 * Injects pseudo classes for styles into the DOM.
 */
function updatePseudoClassStyle(pseudoStyleIds, properties, preventFocusStyleForTouchAndClick) {
  var styles = [{
    id: pseudoStyleIds.prevMonthNavStyleId,
    style: (0, _assign2.default)({}, _datePickerStyle2.default.hoverPrevMonthNavStyle, properties.hoverPrevMonthNavStyle),
    pseudoClass: 'hover'

  }, {
    id: pseudoStyleIds.nextMonthNavStyleId,
    style: (0, _assign2.default)({}, _datePickerStyle2.default.hoverNextMonthNavStyle, properties.hoverNextMonthNavStyle),
    pseudoClass: 'hover'
  }];
  var focusStyle = void 0;
  if (preventFocusStyleForTouchAndClick) {
    focusStyle = { outline: 0 };
  } else {
    focusStyle = (0, _assign2.default)({}, _datePickerStyle2.default.focusStyle, properties.focusStyle);
  }

  styles.push({
    id: pseudoStyleIds.styleId,
    style: focusStyle,
    pseudoClass: 'focus'
  });
  (0, _injectStyle.injectStyles)(styles);
}

/*
 * DatePicker React Component.
 *
 * This implementation follows the recommendations proposed here:
 * http://www.w3.org/TR/wai-aria-practices/#datepicker
 */

var DatePicker = function (_Component) {
  (0, _inherits3.default)(DatePicker, _Component);

  function DatePicker(properties) {
    (0, _classCallCheck3.default)(this, DatePicker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DatePicker.__proto__ || (0, _getPrototypeOf2.default)(DatePicker)).call(this, properties));

    _initialiseProps.call(_this);

    var selectedDate = void 0;
    var month = void 0;
    var year = void 0;

    if ((0, _has2.default)(properties, 'valueLink')) {
      selectedDate = properties.valueLink.value;
    } else if ((0, _has2.default)(properties, 'value')) {
      selectedDate = properties.value;
    } else if ((0, _has2.default)(properties, 'defaultValue')) {
      selectedDate = properties.defaultValue;
    }

    if (properties.defaultMonth) {
      month = properties.defaultMonth - 1;
    } else if (selectedDate) {
      month = selectedDate.getMonth();
    } else {
      month = (0, _today2.default)().getMonth();
    }

    if (properties.defaultYear) {
      year = properties.defaultYear;
    } else if (selectedDate) {
      year = selectedDate.getFullYear();
    } else {
      year = (0, _today2.default)().getFullYear();
    }

    _this.state = {
      isFocused: false,
      isActive: false,
      selectedDate: selectedDate,
      month: month,
      year: year
    };

    _this.localeData = (0, _getLocaleData2.default)(properties.locale);
    _this.wrapperProps = sanitizeWrapperProps(properties);
    _this.dayProps = sanitizeDayProps(properties.dayProps);
    _this.disabledDayProps = sanitizeDisabledDayProps(properties.dayProps);
    _this.emptyDayProps = sanitizeEmptyDayProps(properties.dayProps);
    _this.navBarProps = sanitizeNavBarProps(properties.navBarProps);
    _this.prevMonthNavProps = sanitizePrevMonthNavProps(properties.prevMonthNavProps);
    _this.prevMonthNavIconProps = sanitizePrevMonthNavIconProps(properties.prevMonthNavIconProps);
    _this.nextMonthNavProps = sanitizeNextMonthNavProps(properties.nextMonthNavProps);
    _this.nextMonthNavIconProps = sanitizeNextMonthNavIconProps(properties.nextMonthNavIconProps);
    _this.monthLabelProps = sanitizeMonthLabelProps(properties.monthLabelProps);
    _this.dayLabelProps = sanitizeDayLabelProps(properties.dayLabelProps);
    _this.weekHeaderProps = sanitizeWeekHeaderProps(properties.weekHeaderProps);
    _this.weekGridProps = sanitizeWeekGridProps(properties.weekGridProps);

    _this.preventFocusStyleForTouchAndClick = (0, _has2.default)(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : _datePickerConfig2.default.preventFocusStyleForTouchAndClick;
    return _this;
  }

  (0, _createClass3.default)(DatePicker, [{
    key: 'componentWillMount',


    /*
     * Generates the style-id based on React's unique DOM node id.
     * Calls function to inject the pseudo classes into the dom.
     */
    value: function componentWillMount() {
      var id = (0, _uniqueId2.default)();
      this.pseudoStyleIds = {};
      this.pseudoStyleIds.styleId = 'wrapper-style-id' + id;
      this.pseudoStyleIds.prevMonthNavStyleId = 'prevMonthNav-style-id' + id;
      this.pseudoStyleIds.nextMonthNavStyleId = 'nextMonthNav-style-id' + id;
      updatePseudoClassStyle(this.pseudoStyleIds, this.props, this.preventFocusStyleForTouchAndClick);
    }

    /*
     * Function will update component state and styles as new props are received.
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      var newState = {};

      if ((0, _has2.default)(properties, 'valueLink')) {
        newState.selectedDate = properties.valueLink.value;
      } else if ((0, _has2.default)(properties, 'value')) {
        newState.selectedDate = properties.value;
      }

      this.setState(newState);

      this.localeData = (0, _getLocaleData2.default)(properties.locale);
      this.wrapperProps = sanitizeWrapperProps(properties);
      this.dayProps = sanitizeDayProps(properties.dayProps);
      this.disabledDayProps = sanitizeDisabledDayProps(properties.dayProps);
      this.emptyDayProps = sanitizeEmptyDayProps(properties.dayProps);
      this.navBarProps = sanitizeNavBarProps(properties.navBarProps);
      this.prevMonthNavProps = sanitizePrevMonthNavProps(properties.prevMonthNavProps);
      this.prevMonthNavIconProps = sanitizePrevMonthNavIconProps(properties.prevMonthNavIconProps);
      this.nextMonthNavProps = sanitizeNextMonthNavProps(properties.nextMonthNavProps);
      this.nextMonthNavIconProps = sanitizeNextMonthNavIconProps(properties.nextMonthNavIconProps);
      this.monthLabelProps = sanitizeMonthLabelProps(properties.monthLabelProps);
      this.dayLabelProps = sanitizeDayLabelProps(properties.dayLabelProps);
      this.weekHeaderProps = sanitizeWeekHeaderProps(properties.weekHeaderProps);
      this.weekGridProps = sanitizeWeekGridProps(properties.weekGridProps);

      this.preventFocusStyleForTouchAndClick = (0, _has2.default)(properties, 'preventFocusStyleForTouchAndClick') ? properties.preventFocusStyleForTouchAndClick : _datePickerConfig2.default.preventFocusStyleForTouchAndClick;

      (0, _injectStyle.removeAllStyles)((0, _keys2.default)(this.pseudoStyleIds));
      updatePseudoClassStyle(this.pseudoStyleIds, properties, this.preventFocusStyleForTouchAndClick);
    }

    /*
     * Removes pseudo classes from the DOM once component gets unmounted.
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _injectStyle.removeAllStyles)((0, _keys2.default)(this.pseudoStyleIds));
    }

    /*
     * Callback is called when wrapper is focused, it will conditionally set isFocused.
     *
     * In addition this.state.focusedDateKey will be set to current date of whichever month is displayed on date-picker (if this.state.focusedDateKey is undefined).
     */


    /*
     * Callback is called when wrapper is blurred, it will reset isFocused, focusedDateKey.
     */


    /*
      * Callback is called when wrapper receives mouseDown. Conditionally set isActive.
      */


    /*
     * Callback is called when wrapper receives mouseUp. Reset isActive.
     */


    /*
     * Callback is called when touch starts on wrapper. Conditionally sets isActive.
     */


    /*
     * Callback is called when touch ends on wrapper. Reset isActive.
     */


    /*
     * On keyDown on wrapper if date-picker is not disabled and some day is focused:
     * 1. arrow keys will navigate calendar
     * 2. enter key will set selectedDate of component
     * 3. space key will set / unset selectedDate
     * 4. props.onKeyDown will be called
     */


    /*
     * Function will handle pageUp key down event.
     */


    /*
     * Function will handle pageDown key down event.
     */


    /*
     * Callback is called when some day receives mouseDown.
     * It will conditionally set this.state.activeDay, this.state.focusedDateKey and call props.onDayMouseDown.
     *
     * Note: mouseEvent.button is supported by all browsers are are targeting: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
     */


    /*
     * Callback is called when some day receives mouseUp.
     * It will reset this.state.activeDay and call props.onDayMouseUp.
     */


    /*
     * Callback is called when some day receives MouseEnter. It will conditionally set this.state.focusedDateKey.
     */


    /*
     * Callback is called when some day receives MouseLeave. It will reset this.state.focusedDateKey.
     */


    /*
     * Callback is called when some day receives touchStart.
     * It will conditionally set this.state.activeDay and call props.onDayTouchStart.
     */


    /*
     * Callback is called when some day receives touchEnd.
     * It will reset this.state.activeDay and call props.onDayTouchEnd.
     */

  }, {
    key: '_triggerSelectDate',


    /*
     * Depending on whether component is controlled or uncontrolled the function will update this.state.selectedDate.
     * It will also call props.onUpdate.
     */
    value: function _triggerSelectDate(day, month, year) {
      if (!this.props.disabled && !this.props.readOnly) {
        var selectedDate = day ? new Date(year, month, day) : undefined;

        if ((0, _has2.default)(this.props, 'valueLink')) {
          this.props.valueLink.requestChange(selectedDate);
        } else if (!(0, _has2.default)(this.props, 'value')) {
          this.setState({
            selectedDate: selectedDate,
            month: month,
            year: year
          });
        }

        if (this.props.onUpdate) {
          this.props.onUpdate({
            value: selectedDate
          });
        }
      }
    }

    /*
     * Function will select / deselect date passed to it, it is used in case of 'Space' keyDown on a day.
     */

  }, {
    key: '_triggerToggleDate',
    value: function _triggerToggleDate(date) {
      if (!this.props.disabled && !this.props.readOnly) {
        var day = void 0;
        var month = void 0;
        var year = void 0;
        if (this.state.selectedDate && date && this.state.selectedDate.getDate() === date.getDate() && this.state.selectedDate.getMonth() === date.getMonth() && this.state.selectedDate.getFullYear() === date.getFullYear()) {
          day = undefined;
          month = this.state.month;
          year = this.state.year;
        } else {
          day = date.getDate();
          month = date.getMonth();
          year = date.getFullYear();
        }

        this._triggerSelectDate(day, month, year);
      }
    }
  }, {
    key: '_focusOnTheFistDayOfTheMonth',
    value: function _focusOnTheFistDayOfTheMonth() {
      this.setState({
        focusedDateKey: this.state.year + '-' + (this.state.month + 1) + '-1'
      });
    }
  }, {
    key: '_focusOnFallbackDay',
    value: function _focusOnFallbackDay() {
      if (this.state.lastHoveredDay) {
        this.setState({
          focusedDateKey: this.state.lastHoveredDay
        });
      } else {
        this._focusOnTheFistDayOfTheMonth();
      }
    }

    /*
     * The function is mainly used when some day is focused and Arrow keys are pressed to navigate to some other day.
     * days is the number of days by which focused should be moved ahead or behind.
     */

  }, {
    key: '_focusOtherDay',
    value: function _focusOtherDay(days) {
      var focusedDate = (0, _getDateForDateKey2.default)(this.state.focusedDateKey);
      var currentMonth = focusedDate.getMonth();

      var nextFocusedDate = (0, _getDateForDateKey2.default)(this.state.focusedDateKey);
      nextFocusedDate.setDate(nextFocusedDate.getDate() + days);
      var nextFocusedDateKey = (0, _convertDateToDateKey2.default)(nextFocusedDate);
      var nextMonth = nextFocusedDate.getMonth();

      if (nextMonth !== currentMonth) {
        if ((nextMonth < currentMonth || nextMonth === 11 && currentMonth === 0) && !(nextMonth === 0 && currentMonth === 11)) {
          this._decreaseMonthYear();
        } else if ((nextMonth > currentMonth || nextMonth === 0 && currentMonth === 11) && !(nextMonth === 11 && currentMonth === 0)) {
          this._increaseMonthYear();
        }
      }

      this.setState({
        focusedDateKey: nextFocusedDateKey
      });
    }

    /*
     * The function will decrease current month in state. It will also call props.onMonthUpdate.
     */

  }, {
    key: '_decreaseMonthYear',
    value: function _decreaseMonthYear() {
      var newMonth = void 0;
      var newYear = void 0;
      if (this.state.month === 0) {
        newMonth = 11;
        newYear = this.state.year - 1;
      } else {
        newMonth = this.state.month - 1;
        newYear = this.state.year;
      }

      this.setState({
        month: newMonth,
        year: newYear,
        focusedDateKey: undefined,
        lastHoveredDay: undefined
      });
      if (this.props.onMonthUpdate) {
        this.props.onMonthUpdate(newMonth + 1, newYear);
      }
    }

    /*
     * The function will increase current month in state. It will also call props.onMonthUpdate.
     */

  }, {
    key: '_increaseMonthYear',
    value: function _increaseMonthYear() {
      var newMonth = void 0;
      var newYear = void 0;
      if (this.state.month === 11) {
        newMonth = 0;
        newYear = this.state.year + 1;
      } else {
        newMonth = this.state.month + 1;
        newYear = this.state.year;
      }

      this.setState({
        month: newMonth,
        year: newYear,
        focusedDateKey: undefined,
        lastHoveredDay: undefined
      });
      if (this.props.onMonthUpdate) {
        this.props.onMonthUpdate(newMonth + 1, newYear);
      }
    }
  }, {
    key: '_isWithinMinAndMax',
    value: function _isWithinMinAndMax(date) {
      return !(this.props.min && date < this.props.min || this.props.max && date > this.props.max);
    }
  }, {
    key: '_renderPrevMonthNav',
    value: function _renderPrevMonthNav() {
      var prevMonthNavStyle = (0, _assign2.default)({}, _datePickerStyle2.default.prevMonthNavStyle, this.props.prevMonthNavStyle);

      var prevMonthNavIconStyle = (0, _assign2.default)({}, _datePickerStyle2.default.prevMonthNavIconStyle, this.props.prevMonthNavIconStyle);

      var className = this.pseudoStyleIds.prevMonthNavStyleId;
      if (this.props.prevMonthNavProps) {
        className = (0, _unionClassNames2.default)(this.props.prevMonthNavProps.className, className);
      }

      return _react2.default.createElement(
        _actionArea2.default,
        (0, _assign2.default)({
          onUpdate: this._onClickPrevMonth,
          style: prevMonthNavStyle,
          className: className,
          'aria-label': 'Go to previous month'
        }, this.prevMonthNavProps),
        _react2.default.createElement('div', (0, _assign2.default)({
          style: prevMonthNavIconStyle
        }, this.prevMonthNavIconProps))
      );
    }
  }, {
    key: '_renderNextMonthNav',
    value: function _renderNextMonthNav() {
      var nextMonthNavStyle = (0, _assign2.default)({}, _datePickerStyle2.default.nextMonthNavStyle, this.props.nextMonthNavStyle);

      var nextMonthNavIconStyle = (0, _assign2.default)({}, _datePickerStyle2.default.nextMonthNavIconStyle, this.props.nextMonthNavIconStyle);

      var className = this.pseudoStyleIds.nextMonthNavStyleId;
      if (this.props.nextMonthNavProps) {
        className = (0, _unionClassNames2.default)(this.props.nextMonthNavProps.className, className);
      }

      return _react2.default.createElement(
        _actionArea2.default,
        (0, _assign2.default)({
          onUpdate: this._onClickNextMonth,
          style: nextMonthNavStyle,
          className: className,
          'aria-label': 'Go to next month'
        }, this.nextMonthNavProps),
        _react2.default.createElement('div', (0, _assign2.default)({
          style: nextMonthNavIconStyle
        }, this.nextMonthNavIconProps))
      );
    }

    /*
     * Function will return jsx for rendering the nav bar for calendar.
     * Depending on following rules it will apply styles to prevMonthNav and nextMonthNav:
     * 1. If disabled hide navs
     * 2. If active apply activeStyles
     */

  }, {
    key: '_renderNavBar',
    value: function _renderNavBar() {
      var navBarStyle = (0, _assign2.default)({}, _datePickerStyle2.default.navBarStyle, this.props.navBarStyle);
      var monthLabelStyle = (0, _assign2.default)({}, _datePickerStyle2.default.monthLabelStyle, this.props.monthLabelStyle);

      return _react2.default.createElement(
        'div',
        (0, _assign2.default)({
          style: navBarStyle
        }, this.navBarProps),
        this._renderPrevMonthNav(),
        _react2.default.createElement(
          'span',
          (0, _assign2.default)({
            style: monthLabelStyle,
            role: 'heading'
            /*
              This label has an id as suggested in http://www.w3.org/TR/wai-aria-practices/#datepicker
            */
            , id: this.state.year + '-' + this.state.month
          }, this.monthLabelProps),
          this.localeData.monthNames[this.state.month] + ' ' + this.state.year
        ),
        this._renderNextMonthNav()
      );
    }

    /*
     * Function will return jsx for rendering the week header for calendar.
     * Disabled styles will be applied for disabled date-picker.
     * Day headers will be rendered using locale information.
     */

  }, {
    key: '_renderWeekHeader',
    value: function _renderWeekHeader() {
      var _this2 = this;

      var weekHeaderStyle = (0, _assign2.default)({}, _datePickerStyle2.default.weekHeaderStyle, this.props.weekHeaderStyle);

      var dayLabelStyle = (0, _assign2.default)({}, _datePickerStyle2.default.dayLabelStyle, this.props.dayLabelStyle);
      if (this.props.disabled) {
        dayLabelStyle = (0, _assign2.default)({}, dayLabelStyle, _datePickerStyle2.default.disabledDayLabelStyle, this.props.disabledDayLabelStyle);
      }

      var weekendLabelStyle = (0, _assign2.default)({}, dayLabelStyle, _datePickerStyle2.default.weekendLabelStyle, this.props.weekendLabelStyle);
      var dayNames = (0, _shift2.default)(this.localeData.dayNamesMin, this.localeData.firstDay);
      dayNames = this.localeData.isRTL ? (0, _reverse2.default)(dayNames) : dayNames;
      var weekendIndex = (7 - this.localeData.firstDay) % 7 + this.localeData.weekEnd;
      weekendIndex = this.localeData.isRTL ? 6 - weekendIndex : weekendIndex;

      return _react2.default.createElement(
        'div',
        (0, _assign2.default)({
          style: weekHeaderStyle
        }, this.weekHeaderProps),
        (0, _map2.default)(dayNames, function (dayAbbr, index) {
          return _react2.default.createElement(
            'span',
            (0, _assign2.default)({
              key: 'dayAbbr-' + index,
              style: index === weekendIndex ? weekendLabelStyle : dayLabelStyle,
              role: 'columnheader'
            }, _this2.dayLabelProps),
            dayAbbr
          );
        })
      );
    }

    /*
     * Function will return jsx for rendering the a day.
     * It will apply various styles in sequence as below (styles will be additive):
     * 1. If component is readOnly apply readOnly styles
     * 2. If component is disabled apply disabled styles
     *    - If component is disabled and hovered apply disableHover styles
     * 3. If day is weekend apply weekendStyle
     * 4. If its day in current month and component is not disabled or readOnly:
     *    - If its current day apply todayStyle
     *    - If this is selected day apply selectedDayStyle
     *    - If component is hovered apply hover styles
     *    - If component is hovered and active apply hoveredStyles + activeStyles
     *    - If component is hovered and not active but focused and preventFocusStyleForTouchAndClick apply focus styles
     * 5. If current day represents other months day in calendar apply otherMonthDayStyle
     */

  }, {
    key: '_renderDay',
    value: function _renderDay(currentDate, index) {
      var day = currentDate.getDate();
      var month = currentDate.getMonth();
      var year = currentDate.getFullYear();
      var isOtherMonth = month !== this.state.month;
      var dateKey = (0, _convertDateToDateKey2.default)(currentDate);
      var isDisabledDay = !this._isWithinMinAndMax(currentDate);

      var ariaSelected = false;

      var dayStyle = (0, _assign2.default)({}, _datePickerStyle2.default.dayStyle, this.props.dayStyle);

      if (this.props.readOnly) {
        dayStyle = (0, _assign2.default)({}, dayStyle, _datePickerStyle2.default.readOnlyDayStyle, this.props.readOnlyDayStyle);
      }

      if (isOtherMonth) {
        dayStyle = (0, _assign2.default)({}, dayStyle, _datePickerStyle2.default.otherMonthDayStyle, this.props.otherMonthDayStyle);
      }

      if (this.props.disabled || isDisabledDay) {
        dayStyle = (0, _assign2.default)({}, dayStyle, _datePickerStyle2.default.disabledDayStyle, this.props.disabledDayStyle);
      }

      if (currentDate.getDay() === this.localeData.weekEnd) {
        dayStyle = (0, _assign2.default)({}, dayStyle, _datePickerStyle2.default.weekendStyle, this.props.weekendStyle);
      }

      if (day === (0, _today2.default)().getDate() && month === (0, _today2.default)().getMonth() && year === (0, _today2.default)().getFullYear()) {
        dayStyle = (0, _assign2.default)({}, dayStyle, _datePickerStyle2.default.todayStyle, this.props.todayStyle);
      }

      if (this.state.selectedDate && day === this.state.selectedDate.getDate() && currentDate.getMonth() === this.state.selectedDate.getMonth() && currentDate.getFullYear() === this.state.selectedDate.getFullYear()) {
        dayStyle = (0, _assign2.default)({}, dayStyle, _datePickerStyle2.default.selectedDayStyle, this.props.selectedDayStyle);
        ariaSelected = true;
      }

      if (this.state.focusedDateKey === dateKey) {
        dayStyle = (0, _assign2.default)({}, dayStyle, _datePickerStyle2.default.focusDayStyle, this.props.focusDayStyle);
        if (this.props.disabled || isDisabledDay) {
          dayStyle = (0, _assign2.default)({}, dayStyle, _datePickerStyle2.default.disabledFocusDayStyle, this.props.disabledFocusDayStyle);
        }
      }

      if (!this.props.disabled && !this.props.readOnly && this.state.activeDay === dateKey) {
        dayStyle = (0, _assign2.default)({}, dayStyle, _datePickerStyle2.default.activeDayStyle, this.props.activeDayStyle);
      }

      var renderedDay = this.props.renderDay ? this.props.renderDay(currentDate) : day;

      if (!this.props.showOtherMonthDate && isOtherMonth) {
        return _react2.default.createElement('span', (0, _assign2.default)({
          key: 'day-' + index,
          style: dayStyle
        }, this.emptyDayProps));
      }

      if (isDisabledDay) {
        return _react2.default.createElement(
          _disabledDay2.default,
          {
            key: 'day-' + index,
            style: dayStyle,
            dateKey: dateKey,
            onDayMouseEnter: this._onDayMouseEnter,
            onDayMouseLeave: this._onDayMouseLeave,
            disabledDayProps: this.disabledDayProps
          },
          renderedDay
        );
      }

      return _react2.default.createElement(
        _day2.default,
        {
          key: 'day-' + index,
          dateKey: dateKey,
          onDayMouseDown: this._onDayMouseDown,
          onDayMouseUp: this._onDayMouseUp,
          onDayMouseEnter: this._onDayMouseEnter,
          onDayMouseLeave: this._onDayMouseLeave,
          onDayTouchStart: this._onDayTouchStart,
          onDayTouchEnd: this._onDayTouchEnd,
          onDayTouchCancel: this._onDayTouchCancel,
          selected: ariaSelected,
          style: dayStyle,
          dayProps: this.dayProps
        },
        renderedDay
      );
    }

    /*
     * Function will render:
     * - main calendar component
     * - call methods to render navBar and week header
     * - get array of weeks in a month and for each day in the week call method to render day
     *
     * It will apply styles sequentially according to Wrapper according to following rules:
     * 1. If component is readOnly apply readOnlyStyle
     * 2. If component is disabled apply disabledStyle
     *    - If disabled component is hovered apply disabledHoverStyle
     * 3. If component is not disabled:
     *    - If component is hovered apply hover style
     *    - If component is hovered and active apply hover + active styles
     *    - If component is hovered and focused but not active and preventFocusStyleForTouchAndClick is true apply focusStyles
     */

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var style = (0, _assign2.default)({}, _datePickerStyle2.default.style, this.props.style);
      if (this.props.readOnly) {
        style = (0, _assign2.default)({}, style, _datePickerStyle2.default.readOnlyStyle, this.props.readOnlyStyle);
      }

      if (this.props.disabled) {
        style = (0, _assign2.default)({}, style, _datePickerStyle2.default.disabledStyle, this.props.disabledStyle);
      }

      if (this.preventFocusStyleForTouchAndClick && this.state.isFocused) {
        style = (0, _assign2.default)({}, style, _datePickerStyle2.default.focusStyle, this.props.focusStyle);
      }

      if (this.state.isActive) {
        style = (0, _assign2.default)({}, style, _datePickerStyle2.default.activeStyle, this.props.activeStyle);
      }

      var weekArray = (0, _getWeekArrayForMonth2.default)(this.state.month, this.state.year, this.localeData.firstDay);

      var tabIndex = !this.props.disabled ? this.props.tabIndex : false;

      return _react2.default.createElement(
        'div',
        (0, _assign2.default)({
          tabIndex: tabIndex,
          onFocus: this._onFocus,
          onBlur: this._onBlur,
          onKeyDown: this._onKeyDown,
          onMouseDown: this._onMouseDown,
          onMouseUp: this._onMouseUp,
          onTouchStart: this._onTouchStart,
          onTouchEnd: this._onTouchEnd,
          onTouchCancel: this._onTouchCancel,
          'aria-label': this.props['aria-label'],
          'aria-disabled': this.props.disabled,
          'aria-readonly': this.props.readOnly,
          style: style,
          className: (0, _unionClassNames2.default)(this.props.className, this.pseudoStyleIds.styleId)
        }, this.wrapperProps),
        this._renderNavBar(),
        _react2.default.createElement(
          'div',
          (0, _assign2.default)({
            role: 'grid',
            style: _datePickerStyle2.default.weekGridStyle
          }, this.weekGridProps),
          this._renderWeekHeader(),
          (0, _map2.default)(weekArray, function (week) {
            var weekDays = _this3.localeData.isRTL ? (0, _reverse2.default)(week) : week;
            return (0, _map2.default)(weekDays, function (day, dayIndex) {
              return _this3._renderDay(day, dayIndex);
            });
          })
        )
      );
    }
  }]);
  return DatePicker;
}(_react.Component);

DatePicker.displayName = 'DatePicker';
DatePicker.propTypes = datePickerPropTypes;
DatePicker.defaultProps = {
  tabIndex: 0,
  'aria-label': 'datepicker',
  disabled: false,
  readOnly: false,
  showOtherMonthDate: true
};

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this._onFocus = function () {
    if (!_this4.props.disabled) {
      if (!_this4.state.isActive) {
        var newState = {
          isFocused: true
        };
        if (!_this4.state.focusedDateKey) {
          if (_this4.state.selectedDate && _this4.state.selectedDate.getMonth() === _this4.state.month && _this4.state.selectedDate.getFullYear() === _this4.state.year) {
            newState.focusedDateKey = (0, _convertDateToDateKey2.default)(_this4.state.selectedDate);
          } else if (_this4.state.month === (0, _today2.default)().getMonth() && _this4.state.year === (0, _today2.default)().getFullYear()) {
            newState.focusedDateKey = (0, _getDateKey2.default)((0, _today2.default)().getFullYear(), (0, _today2.default)().getMonth() + 1, (0, _today2.default)().getDate());
          } else {
            newState.focusedDateKey = (0, _getDateKey2.default)(_this4.state.year, _this4.state.month + 1, 1);
          }
        }

        _this4.setState(newState);
      }
    }

    if (_this4.props.onFocus) {
      _this4.props.onFocus(event); // eslint-disable-line no-restricted-globals
    }
  };

  this._onBlur = function () {
    if (!_this4.props.disabled) {
      _this4.setState({
        isFocused: false,
        focusedDateKey: undefined
      });
    }

    if (_this4.props.onBlur) {
      _this4.props.onBlur(event); // eslint-disable-line no-restricted-globals
    }
  };

  this._onMouseDown = function (event) {
    if (!_this4.props.disabled && event.button === 0) {
      _this4.setState({
        isActive: true
      });
    }

    if (_this4.props.onMouseDown) {
      _this4.props.onMouseDown(event);
    }
  };

  this._onMouseUp = function (event) {
    if (!_this4.props.disabled && event.button === 0) {
      _this4.setState({
        isActive: false
      });
    }

    if (_this4.props.onMouseUp) {
      _this4.props.onMouseUp(event);
    }
  };

  this._onTouchStart = function (event) {
    if (!_this4.props.disabled && event.touches.length === 1) {
      _this4.setState({
        isActive: true
      });
    }

    if (_this4.props.onTouchStart) {
      _this4.props.onTouchStart(event);
    }
  };

  this._onTouchEnd = function () {
    if (!_this4.props.disabled) {
      _this4.setState({
        isActive: false
      });
    }

    if (_this4.props.onTouchEnd) {
      _this4.props.onTouchEnd(event); // eslint-disable-line no-restricted-globals
    }
  };

  this._onTouchCancel = function () {
    _this4.setState({
      isActive: false
    });

    if (_this4.props.onTouchCancel) {
      _this4.props.onTouchCancel(event); // eslint-disable-line no-restricted-globals
    }
  };

  this._onKeyDown = function (event) {
    if (!_this4.props.disabled) {
      if (event.key === 'Home') {
        // Moves to the first day of the current month.
        event.preventDefault();
        _this4._focusOnTheFistDayOfTheMonth();
      } else if (event.key === 'End') {
        // Moves to the last day of the current month.
        event.preventDefault();
        var date = (0, _getLastDayForMonth2.default)(_this4.state.year, _this4.state.month);
        _this4.setState({
          focusedDateKey: (0, _convertDateToDateKey2.default)(date)
        });
      }

      if (_this4.state.focusedDateKey) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          _this4._focusOtherDay(7);
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          _this4._focusOtherDay(-7);
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          _this4._focusOtherDay(_this4.localeData.isRTL ? 1 : -1);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          _this4._focusOtherDay(_this4.localeData.isRTL ? -1 : 1);
        } else if (event.key === 'PageUp') {
          _this4._onPageUpKeyDown(event);
        } else if (event.key === 'PageDown') {
          _this4._onPageDownKeyDown(event);
        } else if (event.key === 'Enter') {
          event.preventDefault();
          var _date = (0, _getDateForDateKey2.default)(_this4.state.focusedDateKey);
          if (_this4._isWithinMinAndMax(_date)) {
            _this4._triggerSelectDate(_date.getDate(), _date.getMonth(), _date.getFullYear());
          }
        } else if (event.key === ' ') {
          event.preventDefault();
          var _date2 = (0, _getDateForDateKey2.default)(_this4.state.focusedDateKey);
          if (_this4._isWithinMinAndMax(_date2)) {
            _this4._triggerToggleDate(_date2);
          }
        }
      } else {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          _this4._focusOnFallbackDay();
        }
      }
    }

    if (_this4.props.onKeyDown) {
      _this4.props.onKeyDown(event);
    }
  };

  this._onPageUpKeyDown = function (event) {
    // Moves to the same date in the previous month.
    event.preventDefault();

    // TODO extract this to a helper function and test various edge cases
    var date = void 0;
    var lastDayInMonth = (0, _getLastDayForMonth2.default)(_this4.state.year, _this4.state.month - 1);
    var focusedDate = (0, _getDateForDateKey2.default)(_this4.state.focusedDateKey);

    // jump from March 30 to Feb 29
    if (focusedDate.getDate() > lastDayInMonth.getDate()) {
      date = lastDayInMonth;
    } else {
      date = (0, _getDateForDateKey2.default)(_this4.state.focusedDateKey);
      date.setMonth(date.getMonth() - 1);
    }

    _this4.setState({
      focusedDateKey: (0, _convertDateToDateKey2.default)(date),
      month: date.getMonth(),
      year: date.getFullYear(),
      lastHoveredDay: undefined
    });
  };

  this._onPageDownKeyDown = function (event) {
    // Moves to the same date in the next month.
    event.preventDefault();

    // TODO extract this to a helper function and test various edge cases
    var date = void 0;
    var lastDayInMonth = (0, _getLastDayForMonth2.default)(_this4.state.year, _this4.state.month + 1);
    var focusedDate = (0, _getDateForDateKey2.default)(_this4.state.focusedDateKey);

    // Use case: Jump from Jan 31 to Feb 29
    if (focusedDate.getDate() > lastDayInMonth.getDate()) {
      date = lastDayInMonth;
    } else {
      date = (0, _getDateForDateKey2.default)(_this4.state.focusedDateKey);
      date.setMonth(date.getMonth() + 1);
    }

    _this4.setState({
      focusedDateKey: (0, _convertDateToDateKey2.default)(date),
      month: date.getMonth(),
      year: date.getFullYear(),
      lastHoveredDay: undefined
    });
  };

  this._onDayMouseDown = function (dateKey, event) {
    if (event.button === 0 && !_this4.props.disabled && !_this4.props.readOnly) {
      _this4.setState({
        activeDay: dateKey
      });
    }

    if (_this4.props.dayProps && _this4.props.dayProps.onMouseDown) {
      _this4.props.dayProps.onMouseDown(event);
    }
  };

  this._onDayMouseUp = function (dateKey, event) {
    if (event.button === 0 && !_this4.props.disabled && !_this4.props.readOnly && _this4.state.activeDay === dateKey) {
      var date = (0, _getDateForDateKey2.default)(dateKey);
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();
      _this4._triggerSelectDate(day, month, year);
      _this4.setState({
        // Note: updating focusedDateKey in mouseEnter normally would be good enough,
        // but it is necessary to set on mouseUp for the following edge case:
        // A user moves the cursor over a day. Moves on with the keyboard and
        // then without moving again just pressing the mouse. In this case
        // mouseEnter did not get called again.
        focusedDateKey: dateKey,
        activeDay: undefined
      });
    }

    if (_this4.props.dayProps && _this4.props.dayProps.onMouseUp) {
      _this4.props.dayProps.onMouseUp(event);
    }
  };

  this._onDayMouseEnter = function (dateKey, event) {
    if (!_this4.props.readOnly) {
      _this4.setState({
        focusedDateKey: dateKey
      });
    }

    if (_this4.props.dayProps && _this4.props.dayProps.onMouseEnter) {
      _this4.props.dayProps.onMouseEnter(event);
    }
  };

  this._onDayMouseLeave = function (dateKey, event) {
    if (!_this4.props.readOnly && event.button === 0 && _this4.state.focusedDateKey === dateKey) {
      _this4.setState({
        focusedDateKey: undefined,
        lastHoveredDay: _this4.state.focusedDateKey
      });
    }

    if (_this4.props.dayProps && _this4.props.dayProps.onMouseLeave) {
      _this4.props.dayProps.onMouseLeave(event);
    }
  };

  this._onDayTouchStart = function (dateKey, event) {
    if (!_this4.props.disabled && !_this4.props.readOnly && event.touches.length === 1) {
      _this4.setState({
        activeDay: dateKey
      });
    }

    if (_this4.props.dayProps && _this4.props.dayProps.onTouchStart) {
      _this4.props.dayProps.onTouchStart(event);
    }
  };

  this._onDayTouchEnd = function (dateKey, event) {
    if (!_this4.props.disabled && !_this4.props.readOnly) {
      var date = (0, _getDateForDateKey2.default)(dateKey);
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();
      _this4._triggerSelectDate(day, month, year);
      if (_this4.state.activeDay === dateKey) {
        _this4.setState({
          activeDay: undefined
        });
      }
    }

    if (_this4.props.dayProps && _this4.props.dayProps.onTouchEnd) {
      _this4.props.dayProps.onTouchEnd(event);
    }
  };

  this._onDayTouchCancel = function (dateKey, event) {
    _this4.setState({
      activeDay: undefined
    });

    if (_this4.props.dayProps && _this4.props.dayProps.onTouchCancel) {
      _this4.props.dayProps.onTouchCancel(event);
    }
  };

  this._onClickPrevMonth = function () {
    _this4._decreaseMonthYear();
    if (_this4.props.prevMonthNavProps && _this4.props.prevMonthNavProps.onClick) {
      _this4.props.prevMonthNavProps.onClick(event); // eslint-disable-line no-restricted-globals
    }
  };

  this._onClickNextMonth = function () {
    _this4._increaseMonthYear();
    if (_this4.props.nextMonthNavProps && _this4.props.nextMonthNavProps.onClick) {
      _this4.props.nextMonthNavProps.onClick(event); // eslint-disable-line no-restricted-globals
    }
  };
};

exports.default = DatePicker;

//# sourceMappingURL=impl.js.map