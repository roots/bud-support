/**
 * @roots/bud v.2.0.0-next {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
var features = {
    /**
     * Default enabled
     */
    babel: true,
    clean: true,
    dashboard: true,
    manifest: true,
    postcss: true,
    /**
     * Opt-in
     */
    browsersync: false,
    hash: false,
    hot: false,
    minify: false,
    splitting: true,
    vendor: false,
    runtimeChunk: false,
    overlay: false,
    sourceMap: false,
    watch: false,
    debug: false,
};

export { features };