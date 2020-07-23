import {DefinePlugin} from 'webpack'

const define: WebpackAdapter = () => ({
  mergeOptions: function () {
    return this.bud.options.env
  },
  make: function () {
    return new DefinePlugin(this.options)
  },
  when: function () {
    return this.options
  },
})

export {define}
import type {WebpackAdapter} from '../..'