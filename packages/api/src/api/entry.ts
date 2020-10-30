import Webpack from 'webpack'

export const entry: Framework.API.Entry = function (
  name: string,
  assets: string | string[] | Webpack.Entry | Webpack.EntryFunc,
) {
  this.build.config.merge('entry', {
    [name]: assets,
  })

  return this
}