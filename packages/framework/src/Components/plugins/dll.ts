import * as Extension from '../../Extend/Extension'
import {DllPlugin, DllReferencePlugin} from 'webpack'

const dll: Extension.Factory = bud => ({
  bud,

  options: {
    context: bud.store['build'].get('context'),
    name: '[name]-[hash]',
    path: bud.dist('library/[name].json'),
  },

  make: function (): DllPlugin {
    return new DllPlugin(this.options)
  },

  when: function () {
    const {library} = this.bud.store['build'].get('entry')
    const enabled = this.bud.store['features'].enabled('library')

    return library && enabled
  },
})

const dllReference: Extension.Factory = bud => ({
  bud,

  options: {
    context: bud.store['build'].get('context'),
    manifest: bud.dist('library/manifest.json'),
    scope: 'xyz',
    sourceType: 'commonjs2',
  },

  make: function (): DllReferencePlugin {
    return new DllReferencePlugin(this.options)
  },

  when: function () {
    const {library} = this.bud.store['build'].get('entry')
    const enabled = this.bud.store['features'].enabled('library')
    const manifestExists = bud.fs.exists(
      'dist/library/manifest.json',
    )

    return library && enabled && manifestExists
  },
})

export {dll, dllReference}
