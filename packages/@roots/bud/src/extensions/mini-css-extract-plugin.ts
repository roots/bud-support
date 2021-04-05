import {Framework, Module} from '@roots/bud-framework'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

declare type Options = Module.Options<MiniCssExtractPlugin.PluginOptions>

/**
 * Plugin name
 */
export const name: Module.Name = 'mini-css-extract-plugin'

/**
 * Options
 */
export const options: Options = ({store}: Framework) => ({
  filename: `css/${
    store.isTrue('options.hash')
      ? store.get('options.hashFormat').concat('.css')
      : store.get('options.fileFormat').concat('.css')
  }`,

  chunkFilename: `css/${
    store.isTrue('options.hash')
      ? store.get('options.hashFormat').concat('.[id].css')
      : store.get('options.fileFormat').concat('.[id].css')
  }`,
})

/**
 * Make
 */
export const make: Module['make'] = (options: Options) =>
  new MiniCssExtractPlugin(options.all())

/**
 * Load in production
 */
export const when: Module.When = ({isProduction}) => isProduction
