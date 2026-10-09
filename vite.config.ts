import { federation } from '@module-federation/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'hostApp',
      // alias used in imports -> where to find that remote's remoteEntry.js
      remotes: {
        remoteApp: {
          type: 'module',
          name: 'remoteApp',
          entry: 'http://localhost:5001/remoteEntry.js',
        },
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  server: { port: 5000, strictPort: true },
  preview: { port: 5000, strictPort: true },
  build: { target: 'esnext' },
})
