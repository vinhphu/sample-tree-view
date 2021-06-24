"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MinusSquare = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _Remove = _interopRequireDefault(require("@material-ui/icons/Remove"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const MinusSquare = props => {
  return /*#__PURE__*/_react.default.createElement(_Remove.default, _extends({
    fontSize: "inherit",
    style: {
      width: 16,
      height: 16
    }
  }, props));
};

exports.MinusSquare = MinusSquare;