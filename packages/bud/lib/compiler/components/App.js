"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.App = void 0;
var react_1 = __importStar(require("react"));
var ink_1 = require("ink");
var prop_types_1 = __importDefault(require("prop-types"));
var Nav_1 = require("./Nav");
var BuildInfo_1 = require("./BuildInfo");
/**
 * App
 *
 * @prop {React.Component[]} children
 * @prop {object} state
 * @prop {object} build
 * @prop {object} options
 * @prop {number} width
 * @prop {number} height
 * @return {PropTypes.Component}
 */
var App = function (_a) {
    var children = _a.children, state = _a.state, build = _a.build, bud = _a.bud, width = _a.width, height = _a.height;
    var _b = react_1.useState({}), focused = _b[0], setFocused = _b[1];
    react_1.useEffect(function () {
        setFocused(state);
    }, [state]);
    return (react_1["default"].createElement(ink_1.Box, { width: width, minHeight: height, paddingRight: 1, paddingBottom: 1, paddingTop: 1, flexDirection: "column" },
        react_1["default"].createElement(Nav_1.Nav, { build: build, focused: focused || {}, bud: bud }),
        children,
        react_1["default"].createElement(ink_1.Spacer, null),
        react_1["default"].createElement(BuildInfo_1.BuildInfo, { build: build, width: width })));
};
exports.App = App;
App.propTypes = {
    children: prop_types_1["default"].array,
    state: prop_types_1["default"].object,
    build: prop_types_1["default"].object,
    bud: prop_types_1["default"].object,
    width: prop_types_1["default"].number,
    height: prop_types_1["default"].number
};
//# sourceMappingURL=App.js.map