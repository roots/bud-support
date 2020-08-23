import {join, resolve} from 'path'
import {argv} from 'yargs'
import type {Container, RepositoryDefinition} from '../container'

type Directory = string
type Paths = Container

/**
 * Current working dir
 */
const cwd: Directory = process.cwd()

/**
 * Bud framework dir.
 */
const framework: Directory = resolve(__dirname, '../')

/**
 * Src arg
 */
const ensureStr: (any) => string = possibleStr =>
  (possibleStr as string) ? possibleStr : ''

/**
 * Paths repo.
 */
const paths: RepositoryDefinition = {
  name: 'paths',
  register: {
    cwd,
    project: cwd,
    framework,
    src: argv['src'] ? join(cwd, ensureStr(argv['src'])) : join(cwd),
    public: argv['public'] ? ensureStr(argv['public']) : '/',
    dist: argv['dist']
      ? join(cwd, ensureStr(argv['dist']))
      : join(cwd),
  },
}

export {paths}
export type {Directory, Paths}
