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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.useWebpack = void 0;
var react_1 = require("react");
var useProgress_1 = require("./useProgress");
var fs_extra_1 = __importDefault(require("fs-extra"));
var webpack_dev_server_1 = __importStar(require("webpack-dev-server"));
/**
 * Hook: useWebpack
 *
 * @prop {Bud} bud
 */
var useWebpack = function (bud) {
    /**
     * Query bud for mode settings.
     */
    var hot = react_1.useState(bud.features.enabled('hot'))[0];
    var watch = react_1.useState(bud.features.enabled('dev'))[0];
    /**
     * Webpack callback
     *
     * This is fired when webpack finishes each round of compilation.
     */
    var webpackCallback = function (err, stats) {
        var results = {};
        if (err) {
            results.error = err;
        }
        if (stats) {
            results.stats = stats.toJson({
                version: true,
                hash: true,
                time: true,
                assets: true,
                errors: true,
                warnings: true,
                chunks: false,
                modules: false,
                entrypoints: false,
                assetsByChunkName: false,
                logging: false,
                children: false,
                namedChunkGroups: false
            });
        }
        setBuild(results);
    };
    var _a = useProgress_1.useProgress(bud), progress = _a.progress, percentage = _a.percentage, message = _a.message;
    var _b = react_1.useState(null), progressApplied = _b[0], setProgressPluginApplied = _b[1];
    react_1.useEffect(function () {
        if (progress) {
            progress.apply(bud.compiler);
            setProgressPluginApplied(true);
        }
    }, [progress, bud]);
    var _c = react_1.useState(null), build = _c[0], setBuild = _c[1];
    var _d = react_1.useState(null), webpackRunning = _d[0], setWebpackRunning = _d[1];
    var _e = react_1.useState(null), server = _e[0], setServer = _e[1];
    react_1.useEffect(function () {
        if (!progressApplied && !webpackRunning) {
            return;
        }
        webpack_dev_server_1.addDevServerEntrypoints(bud.compiler, bud.options.get('webpack.devServer'));
        var server = new webpack_dev_server_1["default"](bud.compiler, bud.options.get('webpack.devServer')).listen(3000);
        setServer(server);
        setWebpackRunning(true);
    }, [progressApplied, webpackRunning, hot, watch, bud]);
    react_1.useEffect(function () {
        server &&
            percentage >= 1 &&
            fs_extra_1["default"].outputFile(bud.dist('hot'), "http://" + bud.options.get('webpack.devServer.host') + ":" + bud.options.get('webpack.devServer.port') + "/" + bud.options.get('webpack.devServer.publicPath'));
    }, [webpackRunning, percentage]);
    /**
     * Stats state variables consumed by application.
     */
    var _f = react_1.useState([]), assets = _f[0], setAssets = _f[1];
    var _g = react_1.useState([]), warnings = _g[0], setWarnings = _g[1];
    var _h = react_1.useState([]), errors = _h[0], setErrors = _h[1];
    var _j = react_1.useState(null), hash = _j[0], setHash = _j[1];
    var _k = react_1.useState(null), time = _k[0], setTime = _k[1];
    /**
     * Assets generated by webpack compiler.run or webpack compiler.watch
     */
    react_1.useEffect(function () {
        var _a, _b, _c, _d, _e;
        ((_a = build === null || build === void 0 ? void 0 : build.stats) === null || _a === void 0 ? void 0 : _a.assets) && setAssets(build.stats.assets);
        ((_b = build === null || build === void 0 ? void 0 : build.stats) === null || _b === void 0 ? void 0 : _b.warnings) && setWarnings(build.stats.warnings);
        ((_c = build === null || build === void 0 ? void 0 : build.stats) === null || _c === void 0 ? void 0 : _c.errors) && setErrors(build.stats.errors);
        ((_d = build === null || build === void 0 ? void 0 : build.stats) === null || _d === void 0 ? void 0 : _d.hash) && setHash(build.stats.hash);
        ((_e = build === null || build === void 0 ? void 0 : build.stats) === null || _e === void 0 ? void 0 : _e.time) && setTime(build.stats.time);
    }, [build]);
    /**
     * For convenience set a boolean conditional state variable
     * for tracked build stats. This affords not having to
     * litter length > 0 checks throughout the rest of the application.
     */
    var _l = react_1.useState(false), hasAssets = _l[0], setHasAssets = _l[1];
    react_1.useEffect(function () {
        if (assets && assets.length > 0) {
            setHasAssets(true);
        }
    }, [assets]);
    var _m = react_1.useState(false), hasWarnings = _m[0], setHasWarnings = _m[1];
    react_1.useEffect(function () {
        if (warnings && warnings.length > 0) {
            setHasWarnings(true);
        }
    }, [warnings]);
    var _o = react_1.useState(false), hasErrors = _o[0], setHasErrors = _o[1];
    react_1.useEffect(function () {
        if (errors && errors.length > 0) {
            setHasErrors(true);
        }
    }, [errors]);
    var _p = react_1.useState(false), hasHash = _p[0], setHasHash = _p[1];
    react_1.useEffect(function () {
        if (hash) {
            setHasHash(true);
        }
    }, [hash]);
    var _q = react_1.useState(false), hasTime = _q[0], setHasTime = _q[1];
    react_1.useEffect(function () {
        if (time) {
            setHasTime(true);
        }
    }, [time]);
    /**
     * Build needs to have assets/errors present
     * before returning true for build.done even if the percentage is 100%.
     * This is because progress finishes slightly before the assets
     * finish processing into state and so only checking for % it is common
     * to end up with no asset logs rendered to the CLI before the application
     * exits.
     */
    var done = percentage === 1 && (hasAssets || hasErrors);
    var success = percentage === 1 && hasAssets && !hasErrors;
    /**
     * Return state to consumers.
     */
    return {
        assets: assets,
        hasAssets: hasAssets,
        errors: errors,
        hasErrors: hasErrors,
        hash: hash,
        hasHash: hasHash,
        time: time,
        hasTime: hasTime,
        warnings: warnings,
        hasWarnings: hasWarnings,
        percentage: percentage,
        server: server,
        done: done,
        success: success,
        message: message
    };
};
exports.useWebpack = useWebpack;
//# sourceMappingURL=useWebpack.js.map