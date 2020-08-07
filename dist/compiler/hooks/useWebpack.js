import { useState, useEffect } from 'react';
import { useProgress } from './useProgress';
import { useHotSyncServer } from './useHotSyncServer';
/**
 * Hook: useWebpack
 *
 * @prop {Bud} bud
 */
var useWebpack = function (bud) {
    /**
     * Query bud for mode settings.
     */
    var hot = useState(bud.features.enabled('hot'))[0];
    var watch = useState(bud.features.enabled('watch'))[0];
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
            bud.logger.error({ name: 'bud.compiler', err: err }, 'webpack compiler callback generated build errors');
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
            bud.logger.info({
                name: 'bud.compiler',
                assets: results.stats.assets.map(function (asset) { return asset.name; })
            }, 'webpack compiler callback generated prototypal build stats');
        }
        setBuild(results);
    };
    /**
     * Add progress plugin to state.
     */
    var _a = useProgress(bud), progressPlugin = _a.progressPlugin, percentage = _a.percentage, message = _a.message;
    var _b = useState(null), progressPluginApplied = _b[0], setProgressPluginApplied = _b[1];
    useEffect(function () {
        if (progressPlugin) {
            progressPlugin.apply(bud.compiler);
            setProgressPluginApplied(true);
            bud.logger.info({ name: 'bud.compiler' }, 'progress plugin applied');
        }
    }, [progressPlugin, bud]);
    /**
     * Run webpack compiler and log output to state.
     */
    var _c = useState({}), build = _c[0], setBuild = _c[1];
    var _d = useState(null), webpackRunning = _d[0], setWebpackRunning = _d[1];
    useEffect(function () {
        if (progressPluginApplied && !webpackRunning) {
            /** Hot builds are handled by WDS middleware */
            if (hot) {
                return;
            }
            /**
             * Run compiler in watch mode if bud watch feature is enabled.
             */
            if (watch) {
                bud.logger.info({
                    name: 'bud.compiler',
                    hot: hot,
                    watch: watch,
                    progressPluginApplied: progressPluginApplied,
                    webpackRunning: webpackRunning
                }, 'starting compiler in watch mode');
                bud.compiler.watch({}, webpackCallback);
                /**
                 * Otherwise, run the vanilla compiler.
                 */
            }
            else {
                bud.logger.info({
                    name: 'bud.compiler',
                    hot: hot,
                    watch: watch,
                    progressPluginApplied: progressPluginApplied,
                    webpackRunning: webpackRunning
                }, 'starting compiler in run mode');
                bud.compiler.run(webpackCallback);
            }
            setWebpackRunning(true);
        }
    }, [progressPluginApplied, webpackRunning, hot, watch, bud]);
    /**
     * Assets are generated by webpack's core compiler when not in hot mode.
     * This is set to the build state variable above.
     *
     * When in hot mode assets are generated by WDS middleware slotted onto
     * BrowserSync. This is set to the devStats state variable
     * in the useHotSyncServer hook. That call happens below.
     *
     * Only one of them will run at a time.
     */
    /**
     * Stats state variables consumed by application.
     */
    var _e = useState([]), assets = _e[0], setAssets = _e[1];
    var _f = useState([]), warnings = _f[0], setWarnings = _f[1];
    var _g = useState([]), errors = _g[0], setErrors = _g[1];
    var _h = useState(null), hash = _h[0], setHash = _h[1];
    var _j = useState(null), time = _j[0], setTime = _j[1];
    var _k = useHotSyncServer(bud, webpackCallback), hotSyncServer = _k[0], devStats = _k[1];
    /**
     * Assets generated by webpack compiler.run or webpack compiler.watch
     */
    useEffect(function () {
        var _a, _b, _c, _d, _e;
        ((_a = build === null || build === void 0 ? void 0 : build.stats) === null || _a === void 0 ? void 0 : _a.assets) && setAssets(build.stats.assets);
        ((_b = build === null || build === void 0 ? void 0 : build.stats) === null || _b === void 0 ? void 0 : _b.warnings) && setWarnings(build.stats.warnings);
        ((_c = build === null || build === void 0 ? void 0 : build.stats) === null || _c === void 0 ? void 0 : _c.errors) && setErrors(build.stats.errors);
        ((_d = build === null || build === void 0 ? void 0 : build.stats) === null || _d === void 0 ? void 0 : _d.hash) && setHash(build.stats.hash);
        ((_e = build === null || build === void 0 ? void 0 : build.stats) === null || _e === void 0 ? void 0 : _e.time) && setTime(build.stats.time);
    }, [build]);
    /**
     * Assets generated by WDS middleware (hot builds)
     */
    useEffect(function () {
        (devStats === null || devStats === void 0 ? void 0 : devStats.assets) && setAssets(devStats.assets);
        (devStats === null || devStats === void 0 ? void 0 : devStats.warnings) && setWarnings(devStats.warnings);
        (devStats === null || devStats === void 0 ? void 0 : devStats.errors) && setErrors(devStats.errors);
        (devStats === null || devStats === void 0 ? void 0 : devStats.hash) && setHash(devStats.hash);
        (devStats === null || devStats === void 0 ? void 0 : devStats.time) && setTime(devStats.time);
    }, [devStats]);
    /**
     * For convenience set a boolean conditional state variable
     * for tracked build stats. This affords not having to
     * litter length > 0 checks throughout the rest of the application.
     */
    var _l = useState(false), hasAssets = _l[0], setHasAssets = _l[1];
    useEffect(function () {
        if (assets && assets.length > 0) {
            setHasAssets(true);
            bud.logger.info({ name: 'bud.compiler', assets: assets.map(function (asset) { return asset.name; }) }, 'new state: assets');
        }
    }, [assets]);
    var _m = useState(false), hasWarnings = _m[0], setHasWarnings = _m[1];
    useEffect(function () {
        if (warnings && warnings.length > 0) {
            setHasWarnings(true);
            bud.logger.info({ name: 'bud.compiler', warnings: warnings.map(function (asset) { return asset.name; }) }, 'new state: warnings');
        }
    }, [warnings]);
    var _o = useState(false), hasErrors = _o[0], setHasErrors = _o[1];
    useEffect(function () {
        if (errors && errors.length > 0) {
            setHasErrors(true);
            bud.logger.info({ name: 'bud.compiler', errors: errors.map(function (asset) { return asset.name; }) }, 'new state: errors');
        }
    }, [errors]);
    var _p = useState(false), hasHash = _p[0], setHasHash = _p[1];
    useEffect(function () {
        if (hash) {
            setHasHash(true);
            bud.logger.info({ name: 'bud.compiler', hash: hash }, 'new state: hash');
        }
    }, [hash]);
    var _q = useState(false), hasTime = _q[0], setHasTime = _q[1];
    useEffect(function () {
        if (time) {
            setHasTime(true);
            bud.logger.info({ name: 'bud.compiler', payload: time }, 'new state: time');
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
        done: done,
        success: success,
        message: message,
        hotSyncServer: hotSyncServer
    };
};
export { useWebpack };
//# sourceMappingURL=useWebpack.js.map