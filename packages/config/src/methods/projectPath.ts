import {Config} from '..'

export const projectPath: Config.ProjectPath = function (dir) {
  this.store['paths'].project = this.fs.path.normalize(dir)

  return this
}
