import type {
  BabelConfiguration,
  Copy,
  Dev,
  PostCssConfiguration,
  Target,
  WordPressDependenciesOptions,
} from './types'

const babelFallback: BabelConfiguration = {
  presets: [],
  plugins: [],
}

const babel: (configs) => BabelConfiguration = function (configs) {
  return configs.has('babel') ? configs.require('babel') : babelFallback
}

const browserSync: (flags) => object = flags => ({
  host: flags.has('host') ? flags.get('host') : 'localhost',
  port: flags.get('port') ? flags.get('port') : 3000,
  proxy: flags.get('proxy') ? flags.get('proxy') : 'localhost',
  online: false,
  open: false,
})

const copy: Copy = {patterns: []}

const dependencyManifest: WordPressDependenciesOptions = {
  combineAssets: false,
  combinedOutputFile: null,
  injectPolyfill: false,
  outputFormat: 'json',
  useDefaults: true,
}

const postCss: (configs) => PostCssConfiguration = function (configs) {
  const fallback: PostCssConfiguration = {plugins: []}

  return configs.has('postCss') ? configs.require('postCss') : fallback
}

const target: Target = 'web'

const terser = {
  terserOptions: {
    parse: {
      ecma: 8,
    },
    compress: {
      ecma: 5,
      warnings: false,
      comparisons: false,
      inline: 2,
    },
    mangle: {
      safari10: true,
    },
    output: {
      ecma: 5,
      comments: false,
      ascii_only: true,
    },
  },
  cache: true,
  parallel: true,
}

const typescript = configs =>
  configs.has('typescript') ? configs.require('typescript') : null

/**
 * Options container.
 */
const options = {
  copy,
  dependencyManifest,
  dev: {},
  devtool: 'source-map',
  extensions: ['.js', '.json'],
  filenameTemplate: {
    hashed: '[name].[hash:8]',
    default: '[name]',
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
  },
  inlineManifest: {
    name: 'runtime',
  },
  postCss: {},
  scss: {},
  splitting: {
    maxChunks: null,
  },
  target,
  terser,
  uglify: {
    cache: true,
    chunkFilter: ({name}) => name === 'vendor',
    extractComments: false,
    parallel: true,
    uglifyOptions: {
      output: {
        beautify: false,
      },
      compress: false,
      mangle: {
        toplevel: true,
      },
    },
  },
  vendor: {name: 'vendor'},
}

export {options, babel, browserSync, postCss, typescript}
