import {Core} from './Core'
import {Container} from '@roots/container'
import _ from 'lodash'
import {boundMethod as bind} from 'autobind-decorator'

import type {
  Build,
  Cache,
  CLI,
  Dependencies,
  Discovery,
  Disk,
  Env,
  Error,
  Extension,
  Extensions,
  Express,
  FileContainer,
  Hooks,
  Index,
  Logger,
  Module,
  Server,
  Service,
  Store,
  MaybeCallable,
  Bootstrapper,
  Webpack,
} from '@roots/bud-typings'
import {Services} from './Services'

export {Framework}

declare namespace Framework {
  export {
    Build,
    Cache,
    CLI,
    Container,
    Dependencies,
    Discovery,
    Disk,
    Env,
    Error,
    Extension,
    Extensions,
    Express,
    FileContainer,
    Hooks,
    Index,
    Logger,
    Module,
    Server,
    Service,
    Store,
    MaybeCallable,
    Bootstrapper,
    Webpack,
  }
}

/**
 * Framework abstract
 */
abstract class Framework extends Core {
  [key: string]: any

  public name = 'bud'

  public abstract build: Build

  public abstract cache: Cache

  public abstract dependencies: Dependencies

  public abstract discovery: Discovery

  public abstract disk: Disk

  public abstract env: Env

  public abstract extensions: Extensions

  public abstract hooks: Hooks

  public abstract server: Server

  public abstract logger: Logger

  public abstract store: Store

  /**
   * Lifecycle: bootstrap
   */
  @bind
  public bootstrap(
    providerDefinitions: Index<Service.Constructor>,
  ) {
    /**
     * Instantiate services
     */
    this.services = new Services(providerDefinitions, this)

    this.services.getKeys().map(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        get() {
          return this.services.get(key)
        },
      })
    })

    /**
     * Assign to process
     */
    Object.assign(process.env, {
      NODE_ENV: this.mode,
      BABEL_ENV: this.mode,
    })

    /**
     * Lifecycle
     */
    ;[
      'bootstrap',
      'bootstrapped',
      'register',
      'registered',
      'boot',
      'booted',
    ].forEach(event =>
      this.services.getKeys().map(key =>
        this.when(this.services.get(key)[event], function () {
          this.services.get(key)[event](this)
        }),
      ),
    )

    return this
  }

  /**
   * Webpack.Configuration['mode'] accessor
   */
  public get mode() {
    return process.argv.includes('development') ||
      process.argv.includes('dev')
      ? 'development'
      : 'production'
  }

  /**
   * Production check
   */
  public get isProduction(): boolean {
    return this.mode === 'production'
  }

  /**
   * Dev check
   */
  public get isDevelopment(): boolean {
    return this.mode === 'development'
  }

  /**
   * Subscribe
   */
  @bind
  public subscribe<T = any>(
    name: `${Hooks.Name}`,
    caller?: string,
  ): T {
    return this.hooks.filter<T>(caller ? [caller, name] : name)
  }

  /**
   * Publish
   */
  @bind
  public publish(
    pubs: Hooks.PublishDict,
    caller?: string,
  ): Framework {
    Object.entries(pubs).map(
      ([name, pub]: [`${Hooks.Name}`, any]) => {
        this.hooks.on(caller ? [caller, name] : name, pub)
      },
    )

    return this
  }

  /**
   * ## access
   *
   * If a value is a function it will call that
   * function and return the result.
   *
   * If the value is not a function it will return its value.
   *
   * ```js
   * const isAFunction = (option) => `option value: ${option}`
   * const isAValue = 'option value: true'
   *
   * access(isAFunction, true)
   * // => `option value: true`
   *
   * access(isAValue)
   * // => `option value: true`
   * ```
   */
  @bind
  public access<I = any>(
    this: Framework,
    value: ((app: Framework) => I) | I,
  ): I {
    return _.isFunction(value)
      ? (value as CallableFunction)(this)
      : value
  }

  /**
   * ## pipe [💁 Fluent]
   *
   * Execute an array of functions. The first is passed the
   * bud object Each will be the result of
   * the one preceeding it.
   *
   * Returns the final result.
   *
   * ### Usage
   *
   * ```js
   * app.pipe([
   *   bud => app.path('src'),
   *   bud => app.proxy(),
   * ])
   * ```
   */
  @bind
  public pipe<I = any, R = any>(
    fns: CallableFunction[],
    value: I,
  ): R {
    return (value = fns.reduce((val, fn) => {
      return fn(val)
    }, value))
  }

  /**
   * Sequence functions
   */
  @bind
  public sequence(
    fns: Array<(app: Framework) => any>,
  ): Framework {
    fns.reduce((_val, fn) => {
      return fn.bind(this)(this)
    }, this)

    return this
  }

  /**
   * ## when  [💁 Fluent]
   *
   * Executes a function if a given test is `true`.
   *
   * - The first parameter is the conditional check.
   *     - It can be a boolean statement (app.inDevelopment)
   *     - It can be a fn, which is passed the app and returns the boolean
   *
   * - The second parameter is the function to be run if `true`.
   *
   * - The third paramter is optional; ran if not `true`.
   *
   * ### Usage
   *
   * ```js
   * app.when(app.mode.is('production'), () => app.vendor())
   * ```
   */
  @bind
  public when(
    test: ((app: Framework) => boolean) | boolean,
    isTrue: (app: Framework) => any,
    isFalse?: (app: Framework) => any,
  ): Framework {
    _.isEqual(this.access(test), true)
      ? _.isFunction(isFalse) && isTrue(this).bind(this)
      : _.isFunction(isFalse) && isFalse(this).bind(this)

    return this
  }

  /**
   * Log message
   */
  @bind
  public log(...args) {
    this.logger.instance.scope(this.name).log(...args)
  }

  /**
   * Log info message
   */
  @bind
  public info(...args) {
    this.logger.instance.scope(this.name).info(...args)
  }

  /**
   * Log warning message
   */
  @bind
  public warning(...args) {
    this.logger.instance.scope(this.name).warning(...args)
  }

  /**
   * Log warning message
   */
  @bind
  public debug(...args) {
    this.logger.instance.scope(this.name).debug(...args)
  }

  /**
   * Log error message
   */
  @bind
  public error(...args) {
    this.logger.instance.scope(this.name).error(...args)
  }
}
