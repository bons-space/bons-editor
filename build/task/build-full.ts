import path from 'path'
import { rollup } from 'rollup'
import resolve, { nodeResolve } from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias';
import vue from '@vitejs/plugin-vue'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import { compRoot, output } from '../utils/paths'
import { target, generateExternal } from '../utils/rollup'
import { PKG_CAMELCASE_NAME } from '../utils/constants'

const build = async (minify: boolean) => {
  const input = [
    // root
    path.resolve(compRoot, 'index.ts'),
  ]
  const customResolver = resolve({
    extensions: ['.ts', '.vue', '.scss'],
  });

  const bundle = await rollup({
    input,
    plugins: [
      // @ts-ignore
      vue(),
      nodeResolve(),
      esbuild({
        target,
        sourceMap: minify,
        treeShaking: true,
      }),
      alias({
        // @ts-ignore
        customResolver,
        entries: [
          { find: '@', replacement: path.resolve(compRoot) },
        ],
      }),
      minify
        ? minifyPlugin({
          target,
          sourceMap: minify,
        })
        : null,
    ],
    treeshake: true,
    external: generateExternal({ full: false }),
  })

  await Promise.all([
    bundle.write({
      format: 'esm',
      file: path.resolve(output, `index${minify ? '.min' : ''}.mjs`),
      exports: undefined,
      sourcemap: minify,
    }),
    bundle.write({
      format: 'umd',
      file: path.resolve(output, `index${minify ? '.min' : ''}.js`),
      exports: 'named',
      sourcemap: minify,
      name: PKG_CAMELCASE_NAME,
      globals: {
        vue: 'Vue',
      },
    }),
  ])
}

export const buildFull = async () => {
  await Promise.all([build(false), build(true)])
}
