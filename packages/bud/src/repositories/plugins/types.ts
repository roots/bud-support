import type {Bud} from '../../util/types'
export type {Bud}

export type WebpackAdapter = () => any
export type CorePlugin = () => any
export type Extension = WebpackAdapter | CorePlugin | any
export type PluginsRepo = Extension[]
import type BrowserSyncPlugin from 'browser-sync-webpack-plugin'
export type {BrowserSyncPlugin}
export type {CleanWebpackPlugin} from 'clean-webpack-plugin'

export interface BudPlugin {
  /**
   * Set options
   */
  setOptions?: (any) => any

  /**
   * Merge options
   */
  mergeOptions?: (any) => any

  /**
   * Make plugin output.
   */
  make?: (any) => any

  /**
   * Conditions that need to be met in order to engage plugin functionality.
   */
  when?: (any) => any
}

export type Controller = {
  bud?: Bud
  plugin?: BudPlugin
  name?: string
  init?: (repository: any) => any
  build?: (any) => any
  final?: (any) => any
  bindPluginProps?: () => any
  ensurePluginProp?: (arg0: string, arg1: any) => any
  setPluginOptions?: () => any
  mergePluginOptions?: () => any
  makePlugin?: () => any
  doPluginHook?: (hook: string, ...args: any) => any
}