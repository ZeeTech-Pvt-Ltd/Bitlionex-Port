import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // scripts/build.mjs creates .ssr-dist/ for the SSR prerender pass and
      // deletes it again at the end. Without this the watcher races that
      // create/delete pair and the dev server dies with EBUSY on whatever
      // file it happened to be adding, so running a build while `npm run dev`
      // is up would kill the dev server.
      ignored: ['**/.ssr-dist/**'],
    },
  },
})
