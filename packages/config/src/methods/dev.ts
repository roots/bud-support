import {Config} from '..'

export const dev: Config.Dev = function (config) {
  // Enable dev
  this.store['features'].enable('dev')

  if (!config) return this

  // Enable proxy middleware
  if (config.to || config.from) {
    this.store['features'].enable('proxy')
  }

  // Enable host middleware
  if (config.hot) {
    this.store['features'].enable('hot')
    this.store['server'].set('hot', true)
  }

  // Merge conf
  this.store['server'].repository = {
    ...this.store['server'],
    ...config,
  }

  return this
}