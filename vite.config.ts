import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

export default defineConfig({
    plugins: [
        vue({ template: { transformAssetUrls } }),
        quasar({
            sassVariables: fileURLToPath(
                new URL('./src/assets/quasar-variables.sass', import.meta.url)
            ),
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            components: path.resolve(__dirname, 'src/components'),
        },
    },
})
