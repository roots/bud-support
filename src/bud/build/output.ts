import type {Bud, BuilderConstructor, OutputBuilder} from './types'

/**
 * Webpack output
 *
 * @param {Bud} bud
 * @return {OutputBuilder}
 */
const output: BuilderConstructor = (bud: Bud): OutputBuilder => ({
  bud,

  options: {
    output: {
      path: bud.state.paths.dist,
      publicPath: bud.state.paths.public,
      filename: bud.features.enabled('hash')
        ? '[name].[hash:8].js'
        : '[name].js',
    },
  },

  make: function () {
    return this.options
  },
})

export {output}
