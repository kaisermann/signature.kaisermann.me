import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import butternut from 'rollup-plugin-butternut'

import postcss from 'rollup-plugin-postcss'
import cssnano from 'cssnano'

import stylus from 'stylus'

const cssPreprocessor = (content, id) =>
  new Promise((resolve, reject) => {
    const renderer = stylus(content, {
      filename: id,
      sourcemap: { inline: true },
    })
    renderer.render((err, code) => {
      if (err) {
        return reject(err)
      }
      resolve({ code, map: renderer.sourcemap })
    })
  })

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/signature.js',
    format: 'iife',
  },
  plugins: [
    postcss({
      preprocessor: cssPreprocessor,
      extensions: ['.css', '.styl'],
      plugins: [cssnano({ core: true, discardComments: true })],
      // extract: './dist/signature.css',
    }),
    nodeResolve({ jsnext: true, main: true }),
    commonjs(),
    buble({
      transforms: {
        arrow: true,
        dangerousForOf: true,
      },
    }),
    butternut(),
  ],
}
