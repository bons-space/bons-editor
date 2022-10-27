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
  }))
