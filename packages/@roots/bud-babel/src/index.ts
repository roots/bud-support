import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
import {BabelConfig} from './bud.babel'

/**
 * Extension name
 */
export const name: Module['name'] = '@roots/bud-babel'

/**
 * bud.babel configuration interface
 */
export const api: Module['api'] = (app: Framework) => ({
  babel: new BabelConfig(app),
})

/**
 * Extension dependencies
 */
export const devDependencies: Module['devDependencies'] = [
  'babel-loader',
  '@babel/core',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-transform-runtime',
  '@babel/preset-env',
]

/**
 * Topics
 */
export const topics: Module['topics'] = [
  'item/babel',
  'item/babel/loader',
  'item/babel/options',
  'item/babel/options/root',
  'item/babel/options/presets',
  'item/babel/options/plugins',
  'item/babel/options/cacheDirectory',
  'loader/babel',
]

/**
 * Publishes
 */
export const publish: Module['publish'] = (app: Framework) => ({
  /**
   * rule/js/use
   */
  'rule/js/use': () => [
    app.subscribe('item/cache'),
    app.subscribe('item/thread'),
    app.subscribe('item/babel'),
  ],

  /**
   * loader/babel
   */
  'loader/babel': () => require.resolve('babel-loader'),

  /**
   * item/babel
   */
  'item/babel': () => ({
    loader: app.subscribe('loader/babel'),
    options: app.subscribe('item/babel/options'),
  }),
  'item/babel/options': () => ({
    cacheDirectory: app.subscribe(
      'item/babel/options/cacheDirectory',
    ),
    root: app.subscribe('item/babel/options/root'),
    presets: app.subscribe('item/babel/options/presets'),
    plugins: app.subscribe('item/babel/options/plugins'),
  }),
  'item/babel/options/root': () =>
    app.subscribe('location/project'),
  'item/babel/options/cacheDirectory': () =>
    app.disk.path.posix.join(
      app.subscribe('location/project'),
      app.subscribe('location/storage'),
    ),
  'item/babel/options/presets': () =>
    Object.values(app.babel.presets).map(([preset, options]) => [
      preset,
      options,
    ]),
  'item/babel/options/plugins': () =>
    Object.values(app.babel.plugins).map(([plugin, options]) => [
      plugin,
      options,
    ]),

  /**
   * babel/config
   */
  'item/babel/config': () => app.babel.hasProjectConfig,
})

/**
 * Boot extension
 */
export const boot = (app: Framework) => {
  app.babel.log.info('Configuring babel defaults')

  app.babel
    .setPresets(['@babel/preset-env'])
    .setPlugins([
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-syntax-dynamic-import',
    ])
    .setPluginOptions('@babel/plugin-transform-runtime', {
      helpers: false,
    })
}
