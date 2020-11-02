/**
 * @type {Framework.Bud}
 */
const bud = require('../packages/bud/lib')

bud
  .use([
    '@roots/bud-babel',
    '@roots/bud-eslint',
    '@roots/bud-postcss',
    '@roots/bud-wordpress-manifests',
    '@roots/bud-react',
  ])
  .library(['react', 'react-dom'])
  .entry('foo', ['foo.js'])
  .gzip()

bud.run()
