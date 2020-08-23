/**
 * @roots/bud-dependency-extraction-webpack-plugin v.2.0.0-next.0 {@link https://roots.io/bud}
 *
 * Adds @wordpress/dependency-extraction-webpack-plugin to Bud
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var DependencyExtractionWebpackPlugin__default = /*#__PURE__*/_interopDefaultLegacy(DependencyExtractionWebpackPlugin);

/**
 * ## bud.dependencyExtraction
 *
 * Configures @wordpress/dependency-extraction-webpack-plugin
 *
 * @see https://git.io/JJLxM
 *
 * ```js
 * bud.dependencyManifest({
 *   outputFormat: 'js',
 *   injectPolyfill: false,
 * })
 * ```
 */
const dependencyExtractionConfig = function (settings) {
    settings &&
        this.options.set('webpack.plugins.dependencyExtraction', {
            ...this.options.get('webpack.plugins.dependencyExtraction'),
            ...settings,
        });
    return this;
};
const adapter = (bud) => ({
    bud,
    name: 'wordpress-dependency-extraction-plugin',
    mergeOptions: function () {
        return this.bud.options.get('webpack.plugins.dependencyExtraction');
    },
    make: function () {
        return new DependencyExtractionWebpackPlugin__default['default'](this.bud.options.get('webpack.plugins.dependencyExtraction'));
    },
});
const extraction = (bud) => ({
    bud,
    name: 'bud-dependency-extraction',
    make: function () {
        this.bud.options.set('webpack.plugins.dependencyExtraction', {});
        this.bud.apply('dependencyExtraction', dependencyExtractionConfig);
        this.bud.plugins.add(adapter);
    },
});

exports.extraction = extraction;
