import type {Bud} from '../Bud'
import type {Extension} from '../Extension'

export as namespace Extensions

/**
 * Extensions controller
 */
declare class Extensions {
  /**
   * The Bud instance.
   *
   * @type {Bud}
   */
  bud: Bud

  /**
   * @type {Framework.Index<Framework.Extension>}
   */
  extensions: Framework.Index<Framework.Extension>

  /**
   * Register extension
   */
  register(
    name: string,
    extension: Framework.Extension.Factory,
  ): void

  /**
   * Boot an extension.
   *
   * @param {Framework.Index<Extension.Factory>} definitions
   */
  public boot(
    definitions: Framework.Index<Framework.Extension.Factory>,
  ): void

  /**
   * Get plugin options.
   *
   * @param {string} extension
   */
  getOptions: (
    extension: string,
  ) => any

  /**
   * Set the options on a booted extension.
   *
   * @param {string} extension
   */
  setOptions: (
    extension: string,
    options: any,
  ) => void

  /**
   * Make all plugin extensions
   *
   * @note applies only to webpack plugins
   *
   * @returns {Extension.Product[]}
   */
  makePlugins(): Extension.Product[]

  /**
   * Bind all config API methods.
   */
  public bindApi(
    methods: Framework.Index<CallableFunction>,
  ): void
}