import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  export interface Framework {
    /**
     * ## bud.provide  [💁 Fluent]
     *
     * Makes a variable/module available throughout the entire
     * application without needing to import it explicitly.
     *
     * ### Usage
     *
     * ```js
     * bud.provide({
     *   jquery: '$',
     * })
     * ```
     */
    provide: Provide
  }

  namespace Framework.Api {
    export {Provide}
    export {Provided}
  }
}

export type Provide = (packages?: Provided) => Framework

export interface Provided {
  [key: string]: string | string[]
}

export const provide: Framework.Api.Provide = function (
  packages,
) {
  this.hooks.on(
    'extension/webpack-provide-plugin/options',
    (provided: Framework.Api.Provided) => ({
      ...provided,
      ...Object.entries(packages).reduce(
        (a, [k, v]) => ({
          ...a,
          ...(!Array.isArray(v)
            ? {[v]: k}
            : {
                ...a,
                ...v.reduce(
                  (a, pkg) => ({
                    ...a,
                    [pkg]: k,
                  }),
                  {},
                ),
              }),
        }),
        {},
      ),
    }),
  )

  return this
}