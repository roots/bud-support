import {
  Handler,
  Application as Express,
  Handler as ExpressHandler,
} from 'express'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import {Options as ProxyOptions} from 'http-proxy-middleware'
import {Compiler, Options as WebpackOptions} from 'webpack'
declare class Server implements Server.Interface {
  instance: Server.Interface['instance']
  config: Server.Interface['config']
  compiler: Server.Interface['compiler']
  constructor(
    compiler?: Server.Interface['compiler'],
    config?: Server.Interface['config'],
  )
  getServer(): this['instance']
  setServer(instance: Express): this
  getConfig(): this['config']
  setConfig(config: Server.Interface['config']): this
  getCompiler(): this['compiler']
  setCompiler(compiler: Server.Interface['compiler']): this
  addMiddleware(middleware: Handler): this
  addDevMiddleware(): this
  addHotMiddleware(): this
  addProxyMiddleware(): this
  listen(): void
}
declare namespace Server {
  /**
   * Bud development server.
   */
  interface Interface {
    /**
     * Express instance.
     */
    instance: Express
    /**
     * Get Express instance.
     */
    getServer: () => Express
    /**
     * Set Express instance.
     */
    setServer: (server: Express) => this
    /**
     * Server configuration.
     */
    config: Config
    /**
     * Get Express instance.
     */
    getConfig: () => Config
    /**
     * Set Express instance.
     */
    setConfig: (config: Config) => this
    /**
     * Webpack compiler.
     */
    compiler: Compiler
    /**
     * Get compiler.
     */
    getCompiler: () => Compiler
    /**
     * Set compiler.
     */
    setCompiler: (compiler: Compiler) => this
    /**
     * Add middleware to Express instance.
     */
    addMiddleware: (middleware: ExpressHandler) => this
    /**
     * Add dev middleware
     */
    addDevMiddleware: () => this
    /**
     * Add hot middleware
     */
    addHotMiddleware: () => this
    /**
     * Add dev middleware
     */
    addProxyMiddleware: () => this
    /**
     * Binds and listens for connections on the host and port specified in the config.
     */
    listen: () => void
  }
  /**
   * Server configuration
   */
  interface Config {
    /**
     * The development server host
     * @example example.test
     */
    host?: string
    /**
     * The development server port
     * @example 3000
     */
    port?: number
    /**
     * Proxy origin
     */
    from?: {
      /**
       * Proxy origin host
       * @example example.test
       */
      host?: string
      /**
       * Proxy origin port
       * @example 8080
       */
      port?: number
    }
    /**
     * Proxy destination
     */
    to?: {
      /**
       * Proxy destination host
       * @example localhost
       */
      host?: string
      /**
       * Proxy destination port
       * @example 3000
       */
      port?: number
    }
    /**
     * The index path for web server, defaults to "index.html".
     */
    index?: WebpackDevMiddleware.Options['index']
    /**
     * Should hot middleware be used?
     */
    hot?: boolean
    /**
     * Should hotOnly middleware be used?
     */
    hotOnly?: boolean
    /**
     * The public path that the middleware is bound to.
     */
    publicPath?: WebpackDevMiddleware.Options['publicPath']
    /**
     * Proxy setting: object passed to  https.createServer
     */
    ssl?: ProxyOptions['ssl']
    /**
     * Proxy setting: set to true to verify SSL certificates
     */
    secure?: ProxyOptions['secure']
    /**
     * Proxy setting: proxy websockets.
     */
    ws?: ProxyOptions['ws']
    /**
     * Proxy setting: rewrite the location host/port on (301/302/307/308) redirects based on requested host/port.
     */
    autoRewrite?: ProxyOptions['autoRewrite']
    /**
     * Proxy setting: change the origin of the host header to the target URL
     */
    changeOrigin?: ProxyOptions['changeOrigin']
    disableHostCheck?: WebpackDevMiddleware.Options[]
    /**
     * Proxy setting: specify whether you want to follow redirects
     */
    followRedirects?: ProxyOptions['followRedirects']
    /**
     * Filename to serve as index.
     */
    filename?: WebpackDevMiddleware.Options['filename']
    /**
     * This property allows a user to pass custom HTTP headers on each request. eg. { "X-Custom-Header": "yes" }
     */
    headers?: WebpackDevMiddleware.Options['headers']
    /**
     * This option instructs the module to operate in 'lazy' mode,
     * meaning that it won't recompile when files change, but rather on each request.
     */
    lazy?: WebpackDevMiddleware.Options['lazy']
    /**
     * This property allows a user to pass the list of HTTP request methods accepted by the server.
     * @default [ 'GET', 'HEAD' ]
     */
    methods?: WebpackDevMiddleware.Options['methods']
    /**
     * This property allows a user to register custom mime types or extension mappings
     * @default null
     */
    mimeTypes?:
      | WebpackDevMiddleware.MimeTypeMap
      | WebpackDevMiddleware.OverrideMimeTypeMap
      | null
    /**
     * Instructs the module to enable or disable the server-side rendering mode
     */
    serverSideRender?: WebpackDevMiddleware.Options['serverSideRender']
    /**
     * Specify polling, etc.
     */
    watchOptions?: WebpackOptions.WatchOptions
    /**
     * If true, the option will instruct the module to write files to the configured location on disk as specified in your webpack config file
     * This option also accepts a Function value, which can be used to filter which files are written to disk
     */
    writeToDisk?: WebpackDevMiddleware.Options['writeToDisk']
  }
  interface Options {
    /**
     * Server configuration.
     */
    config: Config
    /**
     * Webpack compiler.
     */
    compiler: Compiler
  }
}
export default Server
//# sourceMappingURL=index.d.ts.map
