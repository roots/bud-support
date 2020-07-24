"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.dev = void 0;
/**
 * Development server settings
 */
var dev = function (options) {
    this.state.options.dev = __assign(__assign({}, this.state.options.dev), options);
    return this;
};
exports.dev = dev;
//# sourceMappingURL=dev.js.map