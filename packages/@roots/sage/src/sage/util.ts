import {Sage} from './interface'
import {FileContainer} from '@roots/filesystem'

/**
 * Returns a util fn to check if a dep is used in the project package.json
 * and a container holding the project filesystem.
 */
export const projectInfo: (
  sage: Sage,
) => {
  deps: string[]
  files: string[]
} = (sage: Sage) => {
  const {projectInfo: pkg} = sage.discovery

  const fieldKeys = (key: string): string[] =>
    pkg.hasOwnProperty(key) ? Object.keys(pkg[key]) : []

  return {
    deps: [
      ...fieldKeys('dependencies'),
      ...fieldKeys('devDependencies'),
    ],
    files: sage.disk.get<FileContainer>('project').getKeys(),
  }
}