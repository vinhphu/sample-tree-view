"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _icons = require("../icons");

var _Transition = _interopRequireDefault(require("./Transition"));

var _lab = require("@material-ui/lab");

var _lodash = _interopRequireDefault(require("lodash"));

var _SearchContext = require("../progressive-search/SearchContext");

var _ProcedureCodeResponse = require("../../features/doctor-search/model/ProcedureCodeResponse");

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const StyledTreeItem = (0, _styles.withStyles)(theme => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3
    },
    width: '16px',
    color: theme.palette.primary.main
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: "1px dashed ".concat((0, _styles.fade)(theme.palette.primary.main, 0.4))
  },
  label: {
    color: theme.palette.text.primary,
    paddingLeft: '5px',
    top: '-5px',
    lineHeight: 1.8,
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.08) !important'
    }
  }
}))(props => /*#__PURE__*/_react.default.createElement(_lab.TreeItem, _extends({}, props, {
  TransitionComponent: _Transition.default
})));
const useStyles = (0, _styles.makeStyles)(theme => ({
  root: {
    height: 'auto',
    flexGrow: 1,
    width: '100%'
  },
  highlight: {
    [theme.breakpoints.only('xs')]: {
      fontSize: '15px'
    },
    color: theme.palette.primary.main,
    fontWeight: '600'
  },
  truncated: {
    [theme.breakpoints.only('xs')]: {
      fontSize: '15px'
    }
  }
}));

const SmarterTreeView = props => {
  const {
    data,
    onClickOption,
    highlight,
    isSelected,
    isExpanded
  } = props;
  const [, setSearch] = (0, _react.useContext)(_SearchContext.SearchContext);
  const classes = useStyles();

  const renderTree = function renderTree() {
    let nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : data;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, nodes.map((node, index) => {
      const exp = new _ProcedureCodeResponse.NodeDetails();
      return /*#__PURE__*/_react.default.createElement(StyledTreeItem, {
        id: node.nodeDetails.icd10Code,
        key: node.nodeDetails.icd10Code,
        nodeId: node.nodeDetails.icd10Code,
        label: computeLabel(node.nodeDetails)
      }, Array.isArray(node.children) && node.children.length !== 0 ? renderTree(node.children) : null);
    }));
  };

  const hanldeOnchangeCheckbox = event => {
    console.log(event.target.checked);
  };

  const [selectedItem, setSelectedItem] = (0, _react.useState)('');
  (0, _react.useEffect)(() => {// setSelectedItem('A79');
  }, [selectedItem]);

  const computeLabel = nodeDetail => {
    const {
      icd10Code,
      icd10Description
    } = nodeDetail;
    const highlightIndex = icd10Description.indexOf(highlight);

    let result = /*#__PURE__*/_react.default.createElement("div", {
      onClick: event => {
        event.preventDefault();
        setSearch("".concat(icd10Code, " - ").concat(icd10Description));
      }
    }, /*#__PURE__*/_react.default.createElement(_Checkbox.default // checked={icd10Code == selectedItem ? true : false}
    , {
      onChange: hanldeOnchangeCheckbox
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: classes.truncated,
      style: {
        width: '100%'
      }
    }, icd10Code, " - ", icd10Description));

    if (highlightIndex !== -1 && !_lodash.default.isEmpty(highlight)) {
      const previous = icd10Description.slice(0, highlightIndex);
      const after = icd10Description.slice(highlightIndex + highlight.length, icd10Description.length);
      result = /*#__PURE__*/_react.default.createElement("div", {
        onClick: event => {
          event.preventDefault();
          setSearch("".concat(icd10Code, " - ").concat(icd10Description));
        }
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: classes.truncated
      }, icd10Code, " - ", previous), /*#__PURE__*/_react.default.createElement("span", {
        className: classes.highlight
      }, highlight), /*#__PURE__*/_react.default.createElement("span", {
        className: classes.truncated
      }, after));
    }

    return result;
  };

  const getNodeIds = function getNodeIds() {
    let nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : data;
    let nodeIds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    nodes.map(node => {
      if (Array.isArray(node.children) && node.children.length !== 0) {
        nodeIds.push(node.nodeDetails.icd10Code);
        getNodeIds(node.children, nodeIds);
      }
    });
    return nodeIds;
  };

  (0, _react.useEffect)(() => {
    if (data && data.length !== 0) {
      renderTree();
    }
  }, [data]);
  return /*#__PURE__*/_react.default.createElement(_lab.TreeView, {
    className: classes.root,
    defaultExpanded: isExpanded ? getNodeIds(data, []) : ''
  }, renderTree(data));
};

SmarterTreeView.propTypes = {
  data: _propTypes.default.array,
  highlight: _propTypes.default.string,
  onClickOption: _propTypes.default.func,
  isExpanded: _propTypes.default.bool,
  isSelected: _propTypes.default.bool
};
SmarterTreeView.defaultProps = {
  data: [],
  isExpanded: true,
  isSelected: false,
  highlight: '',
  onClickOption: () => {}
};
var _default = SmarterTreeView;
exports.default = _default;