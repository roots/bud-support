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
var dev = function (options) {
    if ((options === null || options === void 0 ? void 0 : options.enabled) == false) {
        this.features.disable('dev');
        delete options.enabled;
    }
    if (options === null || options === void 0 ? void 0 : options.watch) {
        this.features.enable('watch');
        this.options.set('watch', options.watch);
        delete options.watch;
    }
    this.options.set('webpack.devServer', __assign(__assign(__assign({}, this.options.get('webpack.devServer')), { contentBase: this.paths.get('dist') }), (options !== null && options !== void 0 ? options : [])));
    return this;
};
exports.dev = dev;
//# sourceMappingURL=dev.js.map