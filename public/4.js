webpackJsonp([4],{

/***/ 322:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.defaultMemoize = defaultMemoize;
exports.createSelectorCreator = createSelectorCreator;
exports.createStructuredSelector = createStructuredSelector;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function defaultEqualityCheck(a, b) {
  return a === b;
}

function defaultMemoize(func) {
  var equalityCheck = arguments.length <= 1 || arguments[1] === undefined ? defaultEqualityCheck : arguments[1];

  var lastArgs = null;
  var lastResult = null;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (lastArgs === null || lastArgs.length !== args.length || !args.every(function (value, index) {
      return equalityCheck(value, lastArgs[index]);
    })) {
      lastResult = func.apply(undefined, args);
    }
    lastArgs = args;
    return lastResult;
  };
}

function getDependencies(funcs) {
  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

  if (!dependencies.every(function (dep) {
    return typeof dep === 'function';
  })) {
    var dependencyTypes = dependencies.map(function (dep) {
      return typeof dep;
    }).join(', ');
    throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
  }

  return dependencies;
}

function createSelectorCreator(memoize) {
  for (var _len2 = arguments.length, memoizeOptions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    memoizeOptions[_key2 - 1] = arguments[_key2];
  }

  return function () {
    for (var _len3 = arguments.length, funcs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      funcs[_key3] = arguments[_key3];
    }

    var recomputations = 0;
    var resultFunc = funcs.pop();
    var dependencies = getDependencies(funcs);

    var memoizedResultFunc = memoize.apply(undefined, [function () {
      recomputations++;
      return resultFunc.apply(undefined, arguments);
    }].concat(memoizeOptions));

    var selector = function selector(state, props) {
      for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        args[_key4 - 2] = arguments[_key4];
      }

      var params = dependencies.map(function (dependency) {
        return dependency.apply(undefined, [state, props].concat(args));
      });
      return memoizedResultFunc.apply(undefined, _toConsumableArray(params));
    };

    selector.resultFunc = resultFunc;
    selector.recomputations = function () {
      return recomputations;
    };
    selector.resetRecomputations = function () {
      return recomputations = 0;
    };
    return selector;
  };
}

var createSelector = exports.createSelector = createSelectorCreator(defaultMemoize);

function createStructuredSelector(selectors) {
  var selectorCreator = arguments.length <= 1 || arguments[1] === undefined ? createSelector : arguments[1];

  if (typeof selectors !== 'object') {
    throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));
  }
  var objectKeys = Object.keys(selectors);
  return selectorCreator(objectKeys.map(function (key) {
    return selectors[key];
  }), function () {
    for (var _len5 = arguments.length, values = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      values[_key5] = arguments[_key5];
    }

    return values.reduce(function (composition, value, index) {
      composition[objectKeys[index]] = value;
      return composition;
    }, {});
  });
}

/***/ }),

/***/ 325:
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

var _propTypes = __webpack_require__(3);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = __webpack_require__(60);

var _reactRedux = __webpack_require__(90);

var _selector = __webpack_require__(333);

var _selector2 = _interopRequireDefault(_selector);

var _actions = __webpack_require__(334);

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

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectCounterPageDomain = undefined;

var _reselect = __webpack_require__(322);

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

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decreaseCounter = exports.increaseCounter = undefined;

var _constants = __webpack_require__(317);

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
//# sourceMappingURL=4.js.map