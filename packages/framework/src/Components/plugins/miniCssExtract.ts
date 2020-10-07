import {MiniCssExtractPlugin} from './externals'

const miniCssExtract: Framework.Extension.Factory = bud => ({
  bud,

  make: function () {
    return new MiniCssExtractPlugin({
      filename: this.bud.store['features'].enabled('hash')
        ? '[name].[hash].css'
        : '[name].css',
    })
  },

  when: function () {
    return !this.bud.mode.is('development')
  },
})

export {miniCssExtract as default}
