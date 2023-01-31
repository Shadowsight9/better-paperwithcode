import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import monkey, { cdn, util } from 'vite-plugin-monkey'
import ElementPlus from 'unplugin-element-plus/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ElementPlus(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://paperswithcode.com/dataset/*'],
      },
      build: {
        externalGlobals: [
          [
            'vue',
            cdn
              .jsdelivr('Vue', 'dist/vue.global.prod.js')
              .concat('https://unpkg.com/vue-demi@latest/lib/index.iife.js')
              .concat(
                await util.fn2dataUrl(() => {
                  // @ts-expect-error work with element-plus
                  window.Vue = Vue
                }),
              ),
          ],
          [
            'element-plus',
            cdn.jsdelivr('ElementPlus', 'dist/index.full.min.js'),
          ],
        ],
        externalResource: {
          'element-plus/dist/index.css': cdn.jsdelivr(),
        },
      },
    }),
  ],
})
