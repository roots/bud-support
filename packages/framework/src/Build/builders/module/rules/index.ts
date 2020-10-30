import oneOf from './oneOf'
import pre from './pre'

export default function (
  this: Framework.Bud,
): Framework.Webpack.Configuration['module']['rules'] {
  return this.hooks.filter('webpack.module.rules', [
    ...pre.bind(this)(),
    {
      oneOf: oneOf.bind(this)(),
    },
  ])
}