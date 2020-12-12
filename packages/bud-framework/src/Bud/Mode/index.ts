import type {Bud} from '@roots/bud-typings'
import type {Configuration} from 'webpack'

declare interface Mode {
  bud: Bud.Ref

  ci: boolean

  get(): Configuration['mode']

  set(mode: Configuration['mode']): Bud

  is(check: Configuration['mode']): boolean
}

/**
 * ## bud.mode
 *
 * Utility for working with the webpack compiler's mode setting.
 *
 * [🔗 Documentation on bud.mode](#)
 */
export default class implements Mode {
  bud: Bud.Ref

  ci: boolean

  public constructor(bud: Bud) {
    this.bud = bud.get
    this.ci = false
  }

  /**
   * ## bud.mode.get
   *
   * Returns the currently set mode.
   *
   * ### Usage
   *
   * ```js
   * bud.mode.get()
   * ```
   */
  get(): Configuration['mode'] {
    return this.bud().config.get('mode')
  }

  /**
   * ## bud.mode.set
   *
   * Set the mode value.
   *
   * Accepted values: `production`, `development`, `none`
   *
   * ### Usage
   *
   * ```js
   * bud.mode.set('production')
   * ```
   */
  set(mode: Configuration['mode']): Bud {
    this.bud().config.set('mode', mode)

    return this.bud()
  }

  /**
   * ## bud.mode.is
   *
   * Returns `true` if webpack mode matches the mode passed to it.
   *
   * Returns `false` if it does not.
   *
   * ### Usage
   *
   * ```js
   * bud.mode.is('production')
   * // returns true if bud.mode.get() === 'production'
   * ```
   */
  is(check: Configuration['mode']): boolean {
    return this.bud().config.is('mode', check)
  }
}
