import {Framework} from '@roots/bud-framework'
import {Loader} from '../Loader/index'
import {boundMethod as bind} from 'autobind-decorator'
import {Base} from '../shared/Base'

export {Item}

namespace Item {
  export type LoaderFn = (app: Framework) => Loader
  export type OptionsFn = (app: Framework) => Options
  export type Options = {[key: string]: any}

  export interface Output {
    loader: string
    options?: {[key: string]: any}
  }
}

class Item extends Base {
  protected loader: Item.LoaderFn
  protected options: Item.OptionsFn

  public constructor({
    loader,
    options,
  }: {
    loader: Item.LoaderFn | Loader
    options?: Item.OptionsFn | Item.Options
  }) {
    super()

    this.setLoader(loader)
    options && this.setOptions(options)
  }

  @bind
  public setLoader(loader: Item.LoaderFn | Loader) {
    this.loader = this.normalizeInput<Loader>(loader)
  }

  @bind
  public setOptions(options: Item.OptionsFn | Item.Options) {
    this.options = this.normalizeInput<Item.Options>(options)
  }

  @bind
  public mergeOptions(
    options: Item.OptionsFn | Item.Options,
    app: Framework,
  ) {
    this.setOptions({
      ...this.options(app),
      ...this.normalizeInput<Item.Options>(options),
    })
  }

  @bind
  public make(app: Framework): Item.Output {
    const output: Item.Output = {
      loader: this.loader(app).make(app),
    }

    if (this.options) {
      output.options = this.options(app)
    }

    return output
  }
}
