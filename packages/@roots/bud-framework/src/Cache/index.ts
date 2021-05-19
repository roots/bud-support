import {Service} from '../Service'

declare interface Cache extends Service {
  /**
   * ## cache.version
   *
   * A hash created from the stringified contents of the project config files
   * and its dependencies.
   */
  version: string

  /**
   * ## cache.enabled
   *
   * Returns boolean true if cache is enabled
   *
   * Cache is enabled when there is a cache record to read on disk and
   * the buildCache feature is enabled.
   *
   * ```js
   * app.cache.enabled()
   * // => true if cache is enabled
   * ```
   */
  enabled(): boolean
}

export {Cache}
