import * as esbuild from 'esbuild'

let result = await esbuild.transform('let ele = <>x</>', {
  jsx: 'preserve',
  loader: 'jsx',
  jsxFactory: 'string'
})

console.log(result.code)