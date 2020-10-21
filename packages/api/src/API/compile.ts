export const compile: Framework.API.Compile = function (
  this: Framework.Bud,
) {
  this.compiler.compile()

  if (this.mode.is('development')) {
    this.features.enabled('hot')
      ? this.server.addHotMiddleware()
      : this.server.addDevMiddleware()

    this.features.enabled('proxy') &&
      this.server.addProxyMiddleware()
  }

  this.cli.run()
}
