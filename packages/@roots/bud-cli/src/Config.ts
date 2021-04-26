import {cosmiconfig, Options} from 'cosmiconfig'
import TypeScriptLoader from '@endemolshinegroup/cosmiconfig-typescript-loader'
import {boundMethod as bind} from 'autobind-decorator'
import {Bud} from '@roots/bud'

export class Config {
  public app: Bud

  public searchPlaces: Options['searchPlaces']

  public loaders: Options['loaders'] = {
    '.ts': TypeScriptLoader,
  }

  public constructor(app: Bud, searchPlaces) {
    this.app = app
    this.searchPlaces = searchPlaces
  }

  @bind
  public async get() {
    const res = await cosmiconfig(this.app.name, {
      searchPlaces: this.searchPlaces,
      loaders: this.loaders,
    }).search()

    return res?.config ?? {}
  }

  @bind
  public async apply() {
    const raw = await this.get()
    const config = this.app.container(raw)

    config.has('extensions') &&
      config.get('extensions').forEach(ext => {
        this.app.use(require(ext))
      })

    config
      .getKeys()
      .filter(key => key !== 'extensions')
      .forEach(key => {
        this.app[key] && this.app[key](config.get(key))
      })
  }
}
