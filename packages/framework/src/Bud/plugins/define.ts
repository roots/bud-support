import {DefinePlugin} from 'webpack'

export const options: OptionsFactory = bud =>
  Object.entries(bud.env)
    .filter(([key]: [string, string]) => !key.includes('SECRET'))
    .reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {},
    ) ?? {}

export const make: Framework.Extension.Make = (opts: Options) =>
  new DefinePlugin(opts)

export const when: Framework.Extension.When = (_bud, opts) =>
  opts ? true : false

export type OptionsFactory = (
  bud: Framework.Bud,
) => Framework.Index<DefinePlugin.CodeValueObject>

export type Options = Framework.Index<
  DefinePlugin.CodeValueObject
>
