import vfile from 'to-vfile'
import remark from 'remark'
import toc from 'remark-toc'
import emoji from 'remark-emoji'
import git from 'remark-github'
import _ from 'lodash'

const replacements = [
  [
    /\(url:(.*?)\)/g,
    `(https://github.com/roots/bud/tree/stable/$1)`,
  ],
  [
    /\(docs:(.*?)\)/g,
    `(https://github.com/roots/bud/tree/stable/docs/$1.md)`
  ],
  [
    /\[badge\]\(npm:(.*?)\)/g,
    '![npm](https://img.shields.io/npm/v/$1.svg?color=%23525ddc&style=flat-square)',
  ],
  [
    /\[readme\]\((.*?)\)/g,
    `[📚 README](https://github.com/roots/bud/tree/stable/packages/$1/README.md)`,
  ],
  [
    /\[(\@roots\/.*?)\]\((.*?)\)/g,
    `[**$1 $2**](https://github.com/roots/bud/tree/stable/packages/$1/$2)`,
  ],
  [
    /`(\@roots\/.*?)`/g,
    `[**$1**](https://github.com/roots/bud/tree/stable/packages/$1)`,
  ],
]

const banner = (pkg) => {
  let res: string

  let banner = parseFile(require.resolve('./templates/banner.md'))

  banner.contents = Buffer.from(
    banner.contents.toString()
      .replaceAll(`__name__`, pkg.name)
      .replaceAll(`__description__`, pkg.description)
  )

  remark()
    .process(banner, (err, file) => {
      err && console.error(err)
      res = String(file.contents)
    })

  return res
}

const footer = (pkg) => {
  let result: string

  let footer = parseFile(require.resolve('./templates/footer.md'))

  footer.contents = Buffer.from(
    footer.contents.toString()
      .replaceAll(/{{name}}/g, pkg.name)
      .replaceAll(/{{description}}/g, pkg.description)
  )

  remark()
    .process(footer, (err, file) => {
      err && console.error(err)
      result = String(file.contents)
    })

  return result
}

const parseFile = filePath => vfile.readSync(filePath)

const fromFile = (srcFile, pkg) => {
  let result: string

  const mdv = parseFile(srcFile)

  mdv.contents = mdv.contents.toString() as string

  replacements.forEach(([f, r]) => {
    mdv.contents = mdv.contents.replace(f, r)
  })

  mdv.contents = Buffer.from(mdv.contents)

  remark()
    .use(toc, {tight: true})
    .use(git, { repo: 'git@github.com:roots/bud' })
    .use(emoji)
    .process(mdv, (err, file) => {
      err && console.error(err)
      result = String(file.contents)
    })

  result = result.replace(`## toc`, '')

  return _.join([banner(pkg),  result,  footer(pkg)], '\n')
}

export {parseFile, fromFile}
