module.exports = bud => {
  bud
    .use([
      require('@roots/bud-babel'),
      require('@roots/bud-postcss'),
      require('@roots/bud-tailwindcss'),
    ])
    .entry({
      app: ['app.css', 'app.js'],
    })
    .template()

  console.log(process.env.NODE_ENV)

  return bud
}
