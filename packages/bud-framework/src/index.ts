import {bootstrap} from './bootstrap'

export {
  Plugin,
  PluginRepository,
  PluginRepositoryDefinition,
  PluginConditional,
  PluginInterface,
  PluginMake,
  PluginOptions,
  PluginPropFallback,
  PluginController,
  PluginControllerInterface,
  PluginTransform,
} from './pluginControllerFactory'

export {
  ContainerInterface,
  Repository,
  RepositoryDefinition,
  FileContainerInterface,
  PluginContainerInterface,
  Container,
  FileContainer,
  ContainerBind,
  PluginContainer,
} from './container'

export {Util, Fab, Format, ProjectRoot} from './util'

export {Hooks, Hook, RegisteredHooks} from './hooks'

const framework = new bootstrap()
export {framework, bootstrap}
