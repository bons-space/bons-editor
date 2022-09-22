import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'; // 打包分析

const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig(({ mode }: UserConfig): UserConfig =>
  // 根据环境变量加载环境变量文件
  ({
    base: '/',
    server: {
      host: 'localhost',
      port: 5500,
      open: true,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    plugins: [
      vue(),
      svgLoader(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        directoryAsNamespace: true,
        dirs: ['src/components'],
        resolvers: [ElementPlusResolver()],
      }),
      visualizer(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
        },
      },
    },
    build: {
      lib: {
        entry: resolve(__dirname, './src'),
        name: 'bonsEditor',
        fileName: 'bons-editor',
      },
      minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用esbuild
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          exports: 'named',
          inlineDynamicImports: true,
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: 'assets/js/[name]-[hash].js',
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: 'assets/js/[name]-[hash].js',
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: 'assets/static/[name]-[hash].[ext]',
        },
      },
      terserOptions: {
        compress: {
          // 生产环境时移除console
          drop_console: process.env.NODE_ENV !== 'production',
          drop_debugger: process.env.NODE_ENV !== 'production',
        },
      },
    },
  }))
