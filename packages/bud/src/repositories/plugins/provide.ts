import {ProvidePlugin} from 'webpack'
import type {WebpackAdapter} from './types'

const provide = () => ({
  setOptions: function () {
    return this.bud.options.get('auto')
  },
  make: function () {
    return new ProvidePlugin(this.options)
  },
  when: function () {
    return this.bud.options.has('auto')
  },
})

export {provide}