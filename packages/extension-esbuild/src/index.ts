import './interface'
import {Bud} from '@roots/bud'
import {ESBuildPlugin, ESBuildMinifyPlugin} from 'esbuild-loader'
import * as configApi from './api'

export const name = '@roots/bud-esbuild'

export const boot = (app: Bud) => {
  /**
   * Source tsconf from project (if available)
   */
  const tsconfigRaw = app.disk
    .get('project')
    .has('tsconfig.json')
    ? app.disk.get('project').readJson('tsconfig.json')
    : {
        compilerOptions: {
          importsNotUsedAsValues: 'remove',
        },
      }

  /**
   * Resolve typescript extensions
   */
  app.hooks.on('webpack.resolve.extensions', exts => [
    ...exts,
    '.ts',
    '.tsx',
  ])

  /**
   * Add esbuild minimizer
   */
  app.hooks.on(
    'webpack.optimization',
    (
      optimization: Bud.Webpack.Configuration['optimization'],
    ): Bud.Webpack.Configuration['optimization'] => ({
      ...optimization,
      minimizer: [
        new ESBuildMinifyPlugin({
          target: app.build.get('items.esbuild.options.target'),
          exclude: app.store.get('patterns.modules'),
        }),
      ],
    }),
  )

  /**
   * Set esbuild as the default loader for jsx? tsx? rules
   */
  app.build
    .set('loaders.esbuild', app =>
      require.resolve('esbuild-loader'),
    )

    .set('items.esbuild-js', {
      loader: app.build.access('loaders.esbuild'),
      options: {
        loader: 'js',
        target: 'es2015',
      },
    })

    .set('items.esbuild-ts', {
      loader: app.build.access('loaders.esbuild'),
      options: {
        loader: 'ts',
        target: 'es2015',
        tsconfigRaw,
      },
    })

    .set('rules.ts', {
      test: (app: Bud) => app.store.access('patterns.ts'),
      use: (app: Bud) => [app.build.access('items.esbuild-ts')],
    })

    .set('rules.js.use', [app.build.access('items.esbuild-js')])

  /**
   * Add the esbuild-loader webpack plugin
   */
  app.extensions.add('esbuild', {
    make: () => new ESBuildPlugin(),
  })

  /**
   * Add bud.esbuild for config
   */
  Object.assign(app, {
    esbuild: {
      setOptions: configApi.setOptions.bind(app),
      jsx: configApi.jsx.bind(app),
    },
  })
}
