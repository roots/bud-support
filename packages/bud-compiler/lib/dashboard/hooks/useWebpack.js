"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.useWebpack = void 0;
var react_1 = require("react");
var useProgress_1 = require("./useProgress");
var fs_extra_1 = __importDefault(require("fs-extra"));
var webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
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
     *
     * This callback is not utilized when running in hot mode. That is
     * handled in the useHotSyncServer hook and is managed by webpack
     * dev server middleware.
     */
    var webpackCallback = function (err, stats) {
        var results = {};
        /**
         * Add webpack compiler errors to state.
         */
        if (err) {
            results.error = err;
        }
        /**
         * Add webpack compiler stats to state
         */
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
    /**
     * Add progress plugin to state.
     */
    var _a = useProgress_1.useProgress(bud), progress = _a.progress, percentage = _a.percentage, message = _a.message;
    var _b = react_1.useState(null), progressApplied = _b[0], setProgressPluginApplied = _b[1];
    react_1.useEffect(function () {
        if (progress) {
            progress.apply(bud.compiler);
            setProgressPluginApplied(true);
        }
    }, [progress, bud]);
    /**
     * Run webpack compiler and log output to state.
     */
    var _c = react_1.useState(null), build = _c[0], setBuild = _c[1];
    var _d = react_1.useState(null), webpackRunning = _d[0], setWebpackRunning = _d[1];
    var _e = react_1.useState(null), client = _e[0], setClient = _e[1];
    var _f = react_1.useState(null), server = _f[0], setServer = _f[1];
    react_1.useEffect(function () {
        if (progressApplied && !webpackRunning) {
            setServer(new webpack_dev_server_1["default"](bud.compiler, {
                hot: true,
                port: 3000,
                inline: true,
                overlay: true,
                publicPath: bud.dist(),
                disableHostCheck: true,
                transportMode: 'ws',
                host: 'sage.valet'
            }));
        }
    }, [progressApplied, webpackRunning, hot, watch, bud]);
    react_1.useEffect(function () {
        server && fs_extra_1["default"].outputFile(bud.dist('hot'), "http://localhost:3000");
    }, [server, percentage]);
    /**
     * Stats state variables consumed by application.
     */
    var _g = react_1.useState([]), assets = _g[0], setAssets = _g[1];
    var _h = react_1.useState([]), warnings = _h[0], setWarnings = _h[1];
    var _j = react_1.useState([]), errors = _j[0], setErrors = _j[1];
    var _k = react_1.useState(null), hash = _k[0], setHash = _k[1];
    var _l = react_1.useState(null), time = _l[0], setTime = _l[1];
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
    var _m = react_1.useState(false), hasAssets = _m[0], setHasAssets = _m[1];
    react_1.useEffect(function () {
        if (assets && assets.length > 0) {
            setHasAssets(true);
        }
    }, [assets]);
    var _o = react_1.useState(false), hasWarnings = _o[0], setHasWarnings = _o[1];
    react_1.useEffect(function () {
        if (warnings && warnings.length > 0) {
            setHasWarnings(true);
        }
    }, [warnings]);
    var _p = react_1.useState(false), hasErrors = _p[0], setHasErrors = _p[1];
    react_1.useEffect(function () {
        if (errors && errors.length > 0) {
            setHasErrors(true);
        }
    }, [errors]);
    var _q = react_1.useState(false), hasHash = _q[0], setHasHash = _q[1];
    react_1.useEffect(function () {
        if (hash) {
            setHasHash(true);
        }
    }, [hash]);
    var _r = react_1.useState(false), hasTime = _r[0], setHasTime = _r[1];
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
        client: client,
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