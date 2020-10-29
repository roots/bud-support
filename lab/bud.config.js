const bud = require('../packages/bud/lib')

bud.extensions
  .use('@roots/bud-babel')
  .use('@roots/bud-eslint')
  .use('@roots/bud-postcss')
  .use('@roots/bud-sass')
  .use('@roots/bud-tailwindcss')
  .use('@roots/bud-purgecss')
  .use('@roots/bud-wordpress-manifests')
  .next()

  .template()

  .when(bud.mode.is('production'), bud => {
    bud.minify()
    bud.gzip()
  }, bud => {
    bud.dev({hot: true})
  })
  .entry('bar', ['bar.js'])
  .run()
