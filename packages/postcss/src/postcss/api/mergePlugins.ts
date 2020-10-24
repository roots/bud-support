import {lodash as _} from '@roots/bud-support'

/**
 * Merge postcss plugins
 */
export const mergePlugins: PostCss.Config = function (
  plugins: PostCss.PluginStore,
) {
  const {options} = this.bud.build.getItem('postcss') as any // 😇

  this.bud.build.mergeItem('postcss', {
    options: {
      ...options,
      postcssOptions: {
        ...options.postcssOptions,
        plugins: {
          ...(options.plugins ?? {}),
          ...plugins,
        },
      },
    },
  })

  return this
}
