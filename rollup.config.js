import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import summary from 'rollup-plugin-summary'
import terser from '@rollup/plugin-terser'

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
    },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: 'dist/',
        declarationMap: true,
      }),
      nodeResolve(),
      summary(),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.mjs',
      format: 'esm',
    },
    plugins: [
      typescript(),
      nodeResolve(),
      summary(),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      name: 'Penguist',
      file: 'dist/browser/penguist.min.js',
      format: 'iife',
    },
    plugins: [
      typescript(),
      nodeResolve(),
      terser(),
      summary(),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      name: 'Penguist',
      file: 'dist/browser/penguist.js',
      format: 'iife',
    },
    plugins: [
      typescript(),
      nodeResolve(),
      summary(),
    ],
  },
]

