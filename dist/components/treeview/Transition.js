"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _web = require("@react-spring/web");

var _Collapse = _interopRequireDefault(require("@material-ui/core/Collapse"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TransitionComponent = props => {
  const style = (0, _web.useSpring)({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)'
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: "translate3d(".concat(props.in ? 0 : 20, "px,0,0)")
    }
  });
  return /*#__PURE__*/_react.default.createElement(_web.animated.div, {
    style: style
  }, /*#__PURE__*/_react.default.createElement(_Collapse.default, props));
};

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: _propTypes.default.bool
};
var _default = TransitionComponent;
exports.default = _default;