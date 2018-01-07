webpackJsonp([2],{

/***/ 327:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = __webpack_require__(50);

var _reactRedux = __webpack_require__(52);

var _selector = __webpack_require__(335);

var _selector2 = _interopRequireDefault(_selector);

var _actions = __webpack_require__(336);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapStateToProps = (0, _selector2.default)();

var actionCreators = {
  increaseCounter: _actions.increaseCounter,
  decreaseCounter: _actions.decreaseCounter
};

var CounterPage = (_dec = (0, _reactRedux.connect)(mapStateToProps, actionCreators), _dec(_class = (_temp = _class2 = function (_React$Component) {
  _inherits(CounterPage, _React$Component);

  function CounterPage() {
    _classCallCheck(this, CounterPage);

    return _possibleConstructorReturn(this, (CounterPage.__proto__ || Object.getPrototypeOf(CounterPage)).apply(this, arguments));
  }

  _createClass(CounterPage, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Obligatory Counter Example!'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'button',
            { onClick: this.props.increaseCounter },
            '+'
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.props.decreaseCounter },
            '-'
          ),
          this.props.currentCount
        )
      );
    }
  }]);

  return CounterPage;
}(_react2.default.Component), _class2.propTypes = {
  currentCount: _propTypes2.default.number.isRequired
}, _temp)) || _class);
exports.default = CounterPage;

/***/ }),

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectCounterPageDomain = undefined;

var _reselect = __webpack_require__(153);

var selectCounterPageDomain = function selectCounterPageDomain() {
  return function (state) {
    return state.counterReducer;
  };
};

var selectCounterPage = function selectCounterPage() {
  return (0, _reselect.createSelector)(selectCounterPageDomain(), function (substate) {
    return substate;
  });
};

exports.default = selectCounterPage;
exports.selectCounterPageDomain = selectCounterPageDomain;

/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decreaseCounter = exports.increaseCounter = undefined;

var _constants = __webpack_require__(155);

var increaseCounter = exports.increaseCounter = function increaseCounter() {
  return {
    type: _constants.INCREASE_COUNTER
  };
};

var decreaseCounter = exports.decreaseCounter = function decreaseCounter() {
  return {
    type: _constants.DECREASE_COUNTER
  };
};

/***/ })

});
//# sourceMappingURL=2.js.map