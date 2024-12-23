import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // 匹配到 `/api` 的请求会被代理到目标服务器
      '/api': {
        target: 'http://your-backend-server.com', // 目标服务器
        changeOrigin: true,                      // 是否更改源为目标服务器
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径：将 `/api` 移除
      },
    },
  },
})