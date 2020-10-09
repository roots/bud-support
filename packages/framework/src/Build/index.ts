import Webpack from 'webpack'

import entry from './entry'
import general from './general'
import module from './module'
import externals from './externals'
import output from './output'
import plugins from './plugins'
import resolve from './resolve'
import optimization from './optimization'

const builders = {
  entry,
  general,
  module,
  resolve,
  externals,
  output,
  plugins,
  optimization,
}

export default function (
  this: Framework.Bud,
): Webpack.Configuration {
  return Object.entries(builders).reduce(
    (config, [, builder]: [string, Build.Builders]) => ({
      ...config,
      ...builder.bind(this)(this.store['build'].all()),
    }),
    {},
  )
}
