import type {Bud} from '../..'
import type {WebpackRule} from '@roots/bud-types'

const font = (bud: Bud): WebpackRule =>
  bud.hooks.filter('webpack.module.rules.font', {
    test: bud.hooks.filter(
      'bud.module.rules.font.test',
      bud.patterns.get('font'),
    ),

    use: bud.hooks.filter('bud.module.rules.font.use', [
      bud.loaders.get('file'),
    ]),
  })

export {font}
