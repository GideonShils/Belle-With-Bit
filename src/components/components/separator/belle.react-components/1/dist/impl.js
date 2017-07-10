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

var _omit = require('bit/utils/omit');

var _omit2 = _interopRequireDefault(_omit);

var _separatorStyle = require('bit/style/separator-style');

var _separatorStyle2 = _interopRequireDefault(_separatorStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # Separator Component
 * This component should be used together with Belle's Select.
 * 
 * ## Properties:
 * * Any property valid for a HTML div like style, id, className, ...
 *
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/separator?_k=gntekj) documentation.
 * 
 * ## Standard example
 * ```js
 * <!-- basic select example with separators -->
 * <Select>
 * <Separator>America</Separator>
 * <Option value="san-francisco">San Francisco</Option>
 * <Option value="vancouver">Vancouver</Option>
 * <Separator>Asia</Separator>
 * <Option value="hong-kong">Hong Kong</Option>
 * <Option value="tokyo">Tokyo</Option>
 * <Separator>Europe</Separator>
 * <Option value="berlin">Berlin</Option>
 * <Option value="istanbul">Istanbul</Option>
 * <Option value="rome">Rome</Option>
 * <Option value="vienna">Vienna</Option>
 * </Select>
 * ```
 * @bit
 */

var separatorPropTypes = {
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  style: _react.PropTypes.object
};

/*
 * Returns an object with properties that are relevant for the wrapping div.
 */
function sanitizeChildProps(properties) {
  return (0, _omit2.default)(properties, (0, _keys2.default)(separatorPropTypes));
}

/*
 * Separator component.
 */

var Separator = function (_Component) {
  (0, _inherits3.default)(Separator, _Component);

  function Separator(properties) {
    (0, _classCallCheck3.default)(this, Separator);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Separator.__proto__ || (0, _getPrototypeOf2.default)(Separator)).call(this, properties));

    _this.state = {
      childProps: sanitizeChildProps(properties)
    };
    return _this;
  }

  (0, _createClass3.default)(Separator, [{
    key: 'componentWillReceiveProps',


    /*
     * Update the childProperties based on the updated properties passed to the
     * Separator.
     */
    value: function componentWillReceiveProps(properties) {
      this.setState({ childProps: sanitizeChildProps(properties) });
    }
  }, {
    key: 'render',
    value: function render() {
      var computedStyle = (0, _assign2.default)({}, _separatorStyle2.default.style, this.props.style);

      return _react2.default.createElement(
        'div',
        (0, _assign2.default)({ style: computedStyle }, this.state.childProps),
        this.props.children
      );
    }
  }]);
  return Separator;
}(_react.Component);

Separator.displayName = 'Separator';
Separator.propTypes = separatorPropTypes;
exports.default = Separator;

//# sourceMappingURL=impl.js.map