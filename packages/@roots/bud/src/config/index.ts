import {Framework} from '@roots/bud-framework'

import {location} from './location'
import {server} from './server'
import {theme} from './theme'

export const config: Framework.Config = {
  name: 'bud',
  bail: true,
  ci: false,
  entry: {},
  alias: {},
  cache: true,
  clean: true,
  define: {},
  devtool: false,
  discover: false,
  externals: {},
  fileFormat: '[name]',
  hash: false,
  hashFormat: `[name].[hash]`,
  html: true,
  template: null,
  install: false,
  log: false,
  namedModules: true,
  noEmit: true,
  node: {
    module: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  stats: false,
  target: 'web',
  manifest: true,
  minify: true,
  mode: 'production',
  profile: false,
  runtimeChunk: false,
  splitChunksEnabled: false,
  splitChunks: {
    chunks: 'async',
    minSize: 20000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 30,
    maxInitialRequests: 30,
  },
  parallelism: 1,
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.css', '.json'],
    modules: [],
  },

  server,
  theme,
  location,
}
