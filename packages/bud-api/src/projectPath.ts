import {Api} from '@roots/bud-typings'

export const projectPath: Api.ProjectPath = function (dir) {
  this.disk.baseDir = dir

  return this
}
