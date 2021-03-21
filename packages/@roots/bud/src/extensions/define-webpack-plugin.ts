import {DefinePlugin} from 'webpack'
import type {Framework} from '@roots/bud-framework'
import type {Module} from '@roots/bud-typings'

export const name = `webpack-define-plugin`

export const make: Module.Make<
  DefinePlugin,
  Options
> = options => new DefinePlugin(options.all())

export const when: Module.When = (_bud, opts) =>
  opts.getEntries()?.length > 0

export const options: Module.Options<Options> = (
  bud: Framework,
) => {
  /**
   * .env values which contain PUBLIC
   */
  const fromEnv = bud.env
    .getEntries()
    .filter(([k]: [string, string]) => k.includes('APP_PUBLIC'))
    .reduce((a, [k, v]) => ({...a, [k]: JSON.stringify(v)}), {})

  const fromStore = bud.store.get('options.define')

  return {
    ...fromEnv,
    ...fromStore,
  }
}

interface Options {
  definitions: {
    [key: string]: DefinePlugin.CodeValueObject
  }
}