import Webpack from 'webpack'
import {RequireExactlyOne, SetOptional, ValueOf} from 'type-fest'
import {Framework, MappedType} from './'

/**
 * ## bud.extensions
 *
 * Extensions controller for the Bud framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 * [📦 @roots/bud-extensions](https://github.io/roots/bud-extensions)
 * [🔗 Documentation](#)
 */
export interface Extensions
  extends Framework.ServiceContainer<Framework> {
  set(
    name: string,
    extension:
      | Framework.MaybeCallable<Module>
      | Module.Options
      | Module.Boot
      | Module.Register
      | Module.Registrable.Source[
          | 'setLoaders'
          | 'setItems'
          | 'setRules']
      | string,
  ): this

  use(pkg: string): this
}

/**
 * ## bud.extension
 *
 * Extends framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 * [📦 @roots/bud-extensions](https://github.io/roots/bud-extensions)
 * [🔗 Documentation](#)
 */
export interface Extension extends Framework.ServiceContainer {
  readonly app: Framework

  make(): Webpack.Plugin

  isPlugin(): boolean

  isPluginEnabled(): boolean

  setOptions(options: Framework.Index<any>): void

  setBuilders(builders: [string, CallableFunction][]): void
}

/**
 * Extension module (source)
 */
export interface Module {
  register?: (app: Framework) => void

  options?: Module.Options

  boot?: Module.Boot

  api?: Module.Api

  setLoaders?: Module.Registrable.Source['setLoaders']

  setItems?: Module.Registrable.Source['setItems']

  setRules?: Module.Registrable.Source['setRules']

  make?: Module.Make

  when?: Module.When
}

export namespace Module {
  /**
   * Registration signature for Loader, Rule, Item
   */
  export type Register<K = Module> = SetOptional<ValueOf<K>>

  export type Registrable = {
    setItems: Framework.Item.Module
    setRules: Framework.Rule.Module
    setLoaders: Framework.Loader.Module | string
  }

  export namespace Registrable {
    /**
     * Base keys
     */
    export type Key = 'setItems' | 'setRules' | 'setLoaders'

    /**
     * Base values
     */
    export type Value =
      | Framework.Item.Module
      | Framework.Rule.Module
      | Framework.Loader.Module

    export type Source = SetOptional<
      {
        [K in keyof Registrable]: MappedType.MaybeCallable<
          MappedType.One<
            | [string, Registrable[K]]
            | [string, Registrable[K]][]
            | {[key: string]: Registrable[K]}
            | {[key: string]: Registrable[K]}[]
          >,
          Framework
        >
      }
    >

    export namespace Source {
      export type Value =
        | [string, Registrable.Value]
        | Array<[string, Registrable.Value]>
        | {[key: string]: Registrable.Value}
    }

    export type Normalized = {
      [K in keyof Registrable]: Entries.Tuple[K]
    }

    export type Tuple = [string, Value]

    export namespace Entries {
      export type Index = SetOptional<
        {
          [K in keyof Registrable]: Registrable[K]
        }
      >

      export type Tuple = SetOptional<
        {
          [K in keyof Registrable]: [string, Registrable[K]]
        }
      >

      export type ArrayedTuple = SetOptional<
        {
          [K in keyof Registrable]: MappedType.Many<
            Array<[string, Registrable[K]]>
          >
        }
      >
    }

    export type Product = SetOptional<
      {
        [K in keyof Registrable]: {[key: string]: Registrable[K]}
      }
    >
  }

  export type Api =
    | {[key: string]: CallableFunction}
    | ((bud?: Framework) => {[key: string]: CallableFunction})

  export type Boot = (bud: Framework) => void

  export type Options<T = any> =
    | T
    | ((app: Framework) => T)
    | any

  export type Make<P = unknown, T = Options> =
    | ((options: Framework.Container<T>, bud?: Framework) => P)
    | P

  export type When = (
    bud: Framework,
    opt?: Framework.Container,
  ) => boolean
}
