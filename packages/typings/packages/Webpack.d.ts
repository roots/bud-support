import {
  Configuration, Options, RuleSetRule, Compiler, RuleSetCondition, RuleSetLoader, RuleSetQuery, RuleSetUse, RuleSetUseItem, Watching, HotModuleReplacementPlugin, Resolve, Stats, ProgressPlugin,
  ICompiler, MultiCompiler, Plugin, ExternalsObjectElement, Entry, EntryFunc,
  Module, Output,
} from 'webpack'

export namespace Webpack {
  export {
    Compiler,
    Configuration,
    Entry,
    EntryFunc,
    ExternalsObjectElement,
    Module,
    MultiCompiler,
    Options,
    Output,
    RuleSetCondition,
    RuleSetLoader,
    RuleSetQuery,
    RuleSetRule,
    RuleSetUse,
    RuleSetUseItem,
    Watching,
    HotModuleReplacementPlugin,
    Plugin,
    ProgressPlugin,
    Resolve,
    Stats,
    ICompiler,
  }
}