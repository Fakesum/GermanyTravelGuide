import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'
import { faviconsPlugin } from '@darkobits/vite-plugin-favicons';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), faviconsPlugin({
    icons: {
      favicons: {
        source: './favicon.ico'
      }
    }
  }), viteStaticCopy({
    targets: [
      {src: "src/assets/marker-icon-2x.png", dest: "./assets"}
    ]
  })],
})