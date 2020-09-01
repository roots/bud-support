import {Api} from '@roots/bud-typings'

const dev: Api.Dev = function (options) {
  if (options?.hasOwnProperty('enabled')) {
    this.features.set('dev', options.enabled)
  } else {
    this.features.enable('dev')
  }

  if (!options) {
    return this
  }

  this.options.merge('webpack.devServer', options)

  return this
}

export {dev}
