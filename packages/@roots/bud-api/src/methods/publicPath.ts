declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.publicPath  [💁 Fluent]
     *
     * By default it is assumed that assets are served from webroot (`/`).
     * You can use this method to replace this value for apps  served from
     * a subdirectory.
     *
     * ### Usage
     *
     * Set the default path for a [@roots/sage project](https://github.com/roots/sage):
     *
     * ```js
     * bud.publicPath('/app/themes/sage/dist')
     * ```
     */
    publicPath: PublicPath
  }
}

type PublicPath = (path?: string) => string

export const publicPath: PublicPath = function (path?: string) {
  return `${this.hooks.subscribe('location/publicPath')}${
    path ?? ''
  }`
}
