import {Bud} from '@roots/bud'
import {isString} from 'lodash'

/**
 *  return this.app.build.get(this.optionKey('plugins'))
    this.app.build.set(this.optionKey('plugins'), plugins)
 */

/**
 * PostCSSConfig API
 */
export class PostCssConfig implements Bud.PostCss {
  public app: Bud

  public _plugins: Bud.PostCss.Registry = {}

  public constructor({app}: {app: Bud}) {
    this.app = app
    this.setPlugin = this.setPlugin.bind(this)
    this.unsetPlugin = this.unsetPlugin.bind(this)
    this.setPluginOptions = this.setPluginOptions.bind(this)
  }

  public setPlugin(plugin: Bud.PostCss.Registrable) {
    this.plugins = {
      ...this.plugins,
      ...(isString(plugin)
        ? {[plugin]: plugin}
        : {[plugin[0]]: plugin[1]}),
    }

    return this
  }

  public unsetPlugin(plugin: string) {
    delete this.plugins[plugin]

    return this
  }

  public setPluginOptions(plugin: string, options: any) {
    this.plugins[plugin] = [this.plugins[plugin][0], options]

    return this
  }

  public get plugins() {
    return this._plugins
  }

  public set plugins(plugins) {
    this._plugins = plugins
  }

  public get options() {
    return {
      plugins: Object.values(this.plugins),
    }
  }
}
