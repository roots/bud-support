import {
  Framework as Contract,
  MaybeCallable,
  Bootstrapper,
} from '@roots/bud-typings'
import {Container} from '@roots/container'
import {Service} from '../Service'
import {isEqual, isFunction} from 'lodash'

/**
 * Bud framework base class
 */
export abstract class Framework implements Contract {
  public name = 'bud'

  public services: Container

  public abstract build: Contract.Build

  public abstract cache: Contract.Cache

  public abstract cli: Contract.CLI

  public abstract compiler: Contract.Compiler

  public abstract dashboard: Contract.Dashboard

  public abstract dependencies: Contract.Dependencies

  public abstract discovery: Contract.Discovery

  public abstract disk: Contract.Disk

  public abstract env: Contract.Env

  public abstract extensions: Contract.Extensions

  public abstract hooks: Contract.Hooks

  public abstract logger: Contract.Logger

  public abstract server: Contract.Server

  public abstract store: Contract.Store

  public abstract get mode(): 'development' | 'production'

  public abstract get isProduction(): boolean

  public abstract get isDevelopment(): boolean

  public abstract topics(topics: string[], caller?: string)

  public abstract subscribe<T = any>(
    name: string,
    caller?: string,
  ): T

  public abstract publish<T = any>(
    name: {[key: string]: any},
    caller?: string,
  )

  /**
   * Constructor
   */
  constructor(services: {
    [key: string]: new (app: Framework['get']) =>
      | Service
      | Bootstrapper
  }) {
    this.access = this.access.bind(this)
    this.boot = this.boot.bind(this)
    this.bootstrap = this.bootstrap.bind(this)
    this.get = this.get.bind(this)
    this.container = this.container.bind(this)
    this.pipe = this.pipe.bind(this)
    this.sequence = this.sequence.bind(this)
    this.register = this.register.bind(this)
    this.when = this.when.bind(this)

    /**
     * Containerize services
     */
    this.services = this.container(services)
  }

  /**
   * Lifecycle: bootstrap
   */
  bootstrap(): this {
    /**
     * NODE_ENV & BABEL_ENV
     */
    process.env.NODE_ENV = this.mode
    process.env.BABEL_ENV = this.mode

    /**
     * Instantiate services
     */
    this.services.mutateStoreEntries(
      (name: string, Instance) =>
        (this[name] = new Instance(this.get)),
    )

    /**
     * Call end of lifecycle method
     */
    this.services.every((service: string | number) =>
      this.get<Service>(service).bootstrapped(this),
    )

    /**
     * Boot
     */
    this.register().boot()

    return this
  }

  /**
   * Lifecycle: registration
   */
  register(): this {
    this.services.every(service => {
      this.log(`Registering ${service}`)
      this.get<Service>(service).register()
    })

    this.services.every(service => {
      this.get<Service>(service).registered(this)
    })

    return this
  }

  /**
   * Lifecycle boot
   */
  public boot(): this {
    this.services.every(service => {
      this.log(`Booting ${service}`)
      this.get<Service>(service).boot()
    })

    this.services.every(service => {
      this.get<Service>(service).booted(this)
    })

    return this
  }

  /**
   * Get framework.
   */
  public get<T = this>(service?: string | number): T {
    return service ? this[service] : this
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
  public access<I = unknown>(value: MaybeCallable<I>): I {
    return isFunction(value) ? value(this) : value
  }

  /**
   * ## container
   *
   * Make a new container
   *
   * ### Usage
   *
   * ```js
   * const container = app.container({data: 'stuff'})
   * container.get('data') // => 'stuff'
   * ```
   */
  public container(repository?: any): Container {
    return new Container(repository ?? {})
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
   *   bud => app.srcPath('resources'),
   *   bud => app.proxy(),
   * ])
   * ```
   */
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
  public sequence(fns: Array<(app: this) => any>): this {
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
  public when(
    test: ((app: Framework) => boolean) | boolean,
    isTrue: (app: Framework) => any,
    isFalse?: (app: Framework) => any,
  ): Framework {
    isEqual(this.access(test), true)
      ? isFunction(isTrue) && isTrue.bind(this)(this)
      : isFunction(isFalse) && isFalse.bind(this)(this)

    return this
  }

  public log(...args) {
    this.logger.instance.scope(this.name).log(...args)
  }

  /**
   * Log info message
   */
  public info(...args) {
    this.logger.instance.scope(this.name).info(...args)
  }

  /**
   * Log warning message
   */
  public warning(...args) {
    this.logger.instance.scope(this.name).warning(...args)
  }

  /**
   * Log warning message
   */
  public debug(...args) {
    this.logger.instance.scope(this.name).debug(...args)
  }

  /**
   * Log error message
   */
  public error(...args) {
    this.logger.instance.scope(this.name).error(...args)
  }
}
