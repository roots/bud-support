/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('../packages/bud/lib')
bud.entry('app', 'foo.js')

console.log(bud.build().optimization)