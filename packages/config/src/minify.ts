import Bud from '@roots/bud-types'

export const minify: Bud.Config.Minify = function () {
  this.store['features'].enable('minify')

  return this
}
