'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cardStyle = require('bit/style/card-style');

var _cardStyle2 = _interopRequireDefault(_cardStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * # Card Component
 * 
 * Note: The card is designed to work on non-white areas. To provide a nice appearance on white areas please change the box-shadow or borders.
 * 
 * ## Properties:
 * * Any property valid for a HTML div like style, id, className, ...
 * 
 * For extended info, go to [Belle](http://nikgraf.github.io/belle/#/component/card?_k=q65bro) documentation.
 * 
 * ## Standard example
 * ```js
 * <!-- basic card example -->
 * <Card style={{ borderTop: '1px solid #f2f2f2' }}>
 *     Add any content here like paragraphs, images or other components …
 * </Card>
 * ```
 * 
 * ## Card with a full-width image
 * ```js
 * <!-- image card example -->
 * <Card style={{ borderTop: '1px solid #f2f2f2',
 *     width: 265,
 *     padding: '20px 0' }}>
 *     <img src="images/ngorongoro_caldera_small.jpg"
 *         width="100%" />
 * </Card>
 * ```
 * @bit
 */

/*
 * Card component with a light shadow.
 *
 * This component will apply any attribute to the div that has been provided as
 * property & is valid for a div.
 */
var Card = function (_Component) {
  (0, _inherits3.default)(Card, _Component);

  function Card(properties) {
    (0, _classCallCheck3.default)(this, Card);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Card.__proto__ || (0, _getPrototypeOf2.default)(Card)).call(this, properties));

    var style = properties.style,
        childProps = (0, _objectWithoutProperties3.default)(properties, ['style']); // eslint-disable-line no-unused-vars

    _this.childProps = childProps;
    return _this;
  }

  (0, _createClass3.default)(Card, [{
    key: 'componentWillReceiveProps',


    /*
     * Update the childProps based on the updated properties passed to the card.
     */
    value: function componentWillReceiveProps(properties) {
      var style = properties.style,
          childProps = (0, _objectWithoutProperties3.default)(properties, ['style']); // eslint-disable-line no-unused-vars

      this.childProps = childProps;
    }
  }, {
    key: 'render',
    value: function render() {
      var divStyle = (0, _assign2.default)({}, _cardStyle2.default.style, this.props.style);

      return _react2.default.createElement(
        'div',
        (0, _assign2.default)({}, this.childProps, { style: divStyle }),
        this.props.children
      );
    }
  }]);
  return Card;
}(_react.Component); // eslint-disable-line no-unused-vars


Card.displayName = 'Card';
Card.propTypes = {
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  style: _react.PropTypes.object
};
exports.default = Card;

//# sourceMappingURL=impl.js.map