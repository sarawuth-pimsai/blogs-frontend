import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default function ({ mode }) {
  const envPrefix = ['APP_', 'API_']
  // env config
  process.env = {
    ...process.env,
    ...loadEnv(mode, path.resolve(__dirname, './src'), envPrefix),
  }
  return defineConfig({
    plugins: [react()],
    envPrefix,
    resolve: {
      // path config
      alias: {
        '@api': path.resolve(process.cwd(), './src/api'),
        '@assets': path.resolve(process.cwd(), './src/assets'),
        '@components': path.resolve(process.cwd(), './src/components'),
        '@configs': path.resolve(process.cwd(), './src/configs'),
        '@core': path.resolve(process.cwd(), './src/core'),
        '@hooks': path.resolve(process.cwd(), './src/hooks'),
        '@layouts': path.resolve(process.cwd(), './src/layouts'),
        '@pages': path.resolve(process.cwd(), './src/pages'),
        '@routes': path.resolve(process.cwd(), './src/routes'),
        '@utils': path.resolve(process.cwd(), './src/utils'),
      },
    },
    // building config
    build: {
      rollupOptions: {
        output: {
          // chunk files config
          manualChunks: function (id) {
            if (/api/.test(id)) return 'layout'
          },
        },
      },
    },
  })
}
