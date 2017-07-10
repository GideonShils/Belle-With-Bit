'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actionAreaStyle = require('bit/style/action-area-style');

var _actionAreaStyle2 = _interopRequireDefault(_actionAreaStyle);

var _omit = require('bit/utils/omit');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * # ActionArea Component
 * 
 * The purpose of this component is to provide a button like behaviour for a
 * click like interaction within other components. Button can't be used in such
 * cases as it always will have it's own focus which is not desired in
 * components like DatePicker e.g. next month button.
 * 
 * Note: Use the ActionArea's onUpdate instead of onClick as otherwise on iOS9
 * 
 * The ActionArea will trigger onFocus for it's parent with a set tabindex.
 * @bit
 */

var actionAreaPropTypes = {
  activeStyle: _react.PropTypes.object,
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  hoverStyle: _react.PropTypes.object,
  onTouchStart: _react.PropTypes.func,
  onTouchEnd: _react.PropTypes.func,
  onTouchCancel: _react.PropTypes.func,
  onMouseDown: _react.PropTypes.func,
  onMouseEnter: _react.PropTypes.func,
  onMouseLeave: _react.PropTypes.func,

  // TODO investigate how we solve mouseUp in other compents (like the right click edgecase)
  onMouseUp: _react.PropTypes.func,
  onUpdate: _react.PropTypes.func,
  onClick: _react.PropTypes.func,
  style: _react.PropTypes.object
};

function sanitizeChildProps(properties) {
  return (0, _omit2.default)(properties, (0, _keys2.default)(actionAreaPropTypes));
}

/*
 * ActionArea
 *
 * The purpose of this component is to provide a button like behaviour for a
 * click like interaction within other components. Button can't be used in such
 * cases as it always will have it's own focus which is not desired in
 * components like DatePicker e.g. next month button.
 *
 * Note: Use the ActionArea's onUpdate instead of onClick as otherwise on iOS9
 * the ActionArea will trigger onFocus for it's parent with a set tabindex.
 */

var ActionArea = function (_Component) {
  (0, _inherits3.default)(ActionArea, _Component);

  function ActionArea(properties) {
    (0, _classCallCheck3.default)(this, ActionArea);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ActionArea.__proto__ || (0, _getPrototypeOf2.default)(ActionArea)).call(this, properties));

    _this.state = {
      // Note: On touch devices mouseEnter is fired while mouseLeave is not.
      // This would result in a hover effect that keeps active until another
      // element is focused on. This would result in the same behaviour as using
      // the :hover pseudo class. To prevent it from happening activating the
      // hover state is prevented when a touch event has been triggered before.
      // source: http://stackoverflow.com/a/22444532/837709
      isIgnoringHover: false,
      isActive: false,
      isHovered: false
    };

    _this._onMouseEnter = function (event) {
      if (!_this.state.isIgnoringHover) {
        _this.setState({
          isHovered: true,
          isIgnoringHover: false
        });
      }

      if (_this.props.onMouseEnter) {
        _this.props.onMouseEnter(event);
      }
    };

    _this._onMouseLeave = function (event) {
      _this.setState({
        isHovered: false
      });

      if (_this.props.onMouseLeave) {
        _this.props.onMouseLeave(event);
      }
    };

    _this._onMouseDown = function (event) {
      if (event.button === 0) {
        _this.setState({
          isActive: true
        });
      }

      if (_this.props.onMouseDown) {
        _this.props.onMouseDown(event);
      }
    };

    _this._onMouseUp = function (event) {
      if (event.button === 0) {
        _this.setState({
          isActive: false
        });
      }

      if (_this.props.onMouseUp) {
        _this.props.onMouseUp(event);
      }
    };

    _this._onTouchStart = function (event) {
      if (event.touches.length === 1) {
        _this.setState({
          isActive: true,
          isIgnoringHover: true
        });
      }

      if (_this.props.onTouchStart) {
        _this.props.onTouchStart(event);
      }
    };

    _this._onTouchEnd = function () {
      _this.setState({
        isActive: false,
        isIgnoringHover: true
      });

      if (_this.props.onTouchEnd) {
        _this.props.onTouchEnd(event);
      }
    };

    _this._onTouchCancel = function () {
      _this.setState({
        isActive: false,
        isIgnoringHover: true
      });

      if (_this.props.onTouchCancel) {
        _this.props.onTouchCancel(event);
      }
    };

    _this._onClick = function (event) {
      if (_this.props.onClick) {
        _this.props.onClick(event);
      }

      if (_this.props.onUpdate) {
        _this.props.onUpdate({});
      }
    };

    _this.childProps = sanitizeChildProps(properties);
    return _this;
  }

  (0, _createClass3.default)(ActionArea, [{
    key: 'componentWillReceiveProps',


    /*
     * Update the childProps based on the updated properties passed to the card.
     */
    value: function componentWillReceiveProps(properties) {
      this.childProps = sanitizeChildProps(properties);
    }

    /*
     * As soon as the mouse enters the component the isHovered state is activated.
     *
     * The state isHovered is not set to true in case onMouseEnter was triggered
     * by a touch event.
     */


    /*
     * Deactivate the isHovered state.
     */


    /*
     * Activates the active state in case the main mouse button was pressed.
     */


    /*
     * Triggers onUpdate in case the mouse button was pressed on this element.
     *
     * In addition the active state is deactivated.
     */


    /*
     * Updates the button to be active and makes sure the next onMouseEnter is
     * ignored.
     */


    /*
     * Triggers onUpdate in case the touch event started on this element and makes
     * sure the next onMouseEnter is ignored.
     */


    /*
     * Updates the button to be release and makes sure the next onMouseEnter is
     * ignored.
     */

  }, {
    key: 'render',
    value: function render() {
      var style = (0, _assign2.default)({}, _actionAreaStyle2.default.style, this.props.style);
      if (this.state.isHovered) {
        style = (0, _assign2.default)({}, style, _actionAreaStyle2.default.hoverStyle, this.props.hoverStyle);
      }

      if (this.state.isActive) {
        style = (0, _assign2.default)({}, style, _actionAreaStyle2.default.activeStyle, this.props.activeStyle);
      }

      return _react2.default.createElement(
        'div',
        (0, _assign2.default)({
          role: 'button'
        }, this.childProps, {
          onMouseDown: this._onMouseDown,
          onMouseUp: this._onMouseUp,
          onMouseEnter: this._onMouseEnter,
          onMouseLeave: this._onMouseLeave,
          onTouchStart: this._onTouchStart,
          onTouchEnd: this._onTouchEnd,
          onTouchCancel: this._onTouchCancel,
          onClick: this._onClick,
          style: style
        }),
        this.props.children
      );
    }
  }]);
  return ActionArea;
}(_react.Component);

ActionArea.displayName = 'ActionArea';
ActionArea.propTypes = actionAreaPropTypes;
exports.default = ActionArea;

//# sourceMappingURL=impl.js.map