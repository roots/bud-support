import Bud from '@roots/bud-types'

export const addExtensions: Bud.Config.AddExtensions = function (
  extensions,
) {
  const normalize: (ext: string) => string = ext =>
    ext.replace(/^(\.)([^ .]+)?/, '$2')

  if (typeof extensions == 'string') {
    mergeExt.bind(this)(normalize(extensions))
  } else {
    extensions
      .map(normalize)
      .map((ext: string) => mergeExt.bind(this)(ext))
  }

  return this
}

function mergeExt(this: Bud, ext: string): void {
  const webpack = this.store.use('webpack')

  if (webpack.get('resolve.extensions').includes(`.${ext}`)) {
    return
  }

  webpack.merge('resolve.extensions', [
    ...webpack.get('resolve.extensions'),
    `.${ext}`,
  ])
}
