import {
  Env,
  Logger,
  Build,
  Cache,
  CLI,
  Compiler,
  Extensions,
  Hooks,
  MaybeCallable,
  Mode,
  Server,
} from '@roots/bud-typings'

import {FileContainer, FileSystem} from '@roots/filesystem'
import {Container} from '@roots/container'

/**
 * Framework.
 */
export abstract class Framework {
  public abstract args: Container

  public abstract build: Build.Contract

  public abstract cache: Cache.Contract

  public abstract cli: CLI.Runner

  public abstract compiler: Compiler.Interface

  public abstract config: Container

  public abstract disk: FileSystem

  public abstract env: Env.Contract

  public abstract extensions: Extensions.Contract

  public abstract features: Container

  public abstract fs: FileContainer

  public abstract hooks: Hooks.Contract

  public abstract logger: Logger.Contract

  public abstract mode: Mode.Contract

  public abstract options: Container

  public abstract patterns: Container

  public abstract registry: Container

  public abstract server: Server.Contract

  public abstract callMeMaybe<I = unknown>(
    value: MaybeCallable<I>,
    ...args: unknown[]
  ): I

  public abstract makeContainer<T = unknown>(repository?: {
    [key: string]: T
  }): Container

  public abstract get(): this

  public abstract pipe(fns): this

  abstract init(): void

  protected abstract _disks(): void

  protected abstract _register(): void

  protected abstract _boot(): void
}
