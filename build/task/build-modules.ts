import path from 'path'
import { rollup } from 'rollup'
import resolve, { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from '@vitejs/plugin-vue'
import alias from '@rollup/plugin-alias';
import esbuild from 'rollup-plugin-esbuild'
import { compRoot, outputEsm, outputCjs } from '../utils/paths'
import { target, generateExternal } from '../utils/rollup'

export const buildModules = async () => {
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
        sourceMap: true,
      }),
      alias({
        // @ts-ignore
        customResolver,
        entries: [
          { find: '@', replacement: path.resolve(compRoot) },
        ],
      }),
    ],
    treeshake: false,
    external: generateExternal({ full: true }),
  })

  await Promise.all([
    bundle.write({
      format: 'esm',
      dir: outputEsm,
      exports: undefined,
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      entryFileNames: '[name].mjs',
    }),
    bundle.write({
      format: 'cjs',
      dir: outputCjs,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      entryFileNames: '[name].js',
    }),
  ])
}
