
import {eslint} from './js/eslint'
import {babel} from './js/babel'
import {typescript} from './js/typescript'

import {css} from './css/css'
import {module as cssModule} from './css/module'
import {scss} from './scss/scss'
import {module as scssModule} from './scss/module'
import {postCss} from './postCss'

import {font} from './font'
import {image} from './image'
import {svg} from './svg'

/**
 * Webpack loaders
 */
const rules = bud => ({
  bud,
  postCss,
  output: {},
  options: {
    module: {
      strictExportPresence: true,
    },
  },

  /**
   * Make webpack rules
   */
  make: function () {
    this.pre()
    this.output = {
      ...this.options,
      module: {
        ...this.options.module,
        rules: [
          eslint(this).make(),
          babel(this).make(),
          typescript(this).make(),
          css(this).make(),
          cssModule(this).make(),
          scss(this).make(),
          scssModule(this).make(),
          font(this).make(),
          image(this).make(),
          svg(this).make(),
        ],
      },
    }

  this.output.module.rules =
    this.output.module.rules.filter(type => type !== null)

    this.post()

    return this.output
  },

  /**
   * Hook: pre_loaders
   */
  pre: function () {
    this.bud.hooks.call('pre_loaders', this)
  },

  /**
   * Hook post_loaders
   */
  post: function () {
    this.bud.hooks.call('post_loaders', this.output)
  },
})

export {rules}