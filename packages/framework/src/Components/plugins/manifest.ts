import ManifestPlugin from 'webpack-manifest-plugin'

export const options: (
  bud: Framework.Bud,
) => ManifestPlugin.Options = ({store}) => ({
  publicPath: store['build'].get('output.publicPath'),
  fileName: 'manifest.json',
  writeToFileEmit: true,
})

export const make: (
  opts: ManifestPlugin.Options,
) => ManifestPlugin = opts => new ManifestPlugin(opts)

export const when: Adapter.when = ({store}) =>
  store['features'].enabled('manifest')
