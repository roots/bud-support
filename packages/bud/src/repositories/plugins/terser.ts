import {TerserPlugin} from './externals'
import type {Plugin} from '@roots/bud-typings'

const terser: Plugin = bud => ({
  bud,

  options: bud.options.get('webpack.plugins.terser'),

  make: function () {
    return new TerserPlugin(this.options)
  },

  when: function () {
    return this.bud.features.enabled('minify')
  },
})

export {terser}
