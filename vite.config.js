import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // The build needs to know which chunks the entry pulls in statically, so it
    // can emit a modulepreload for each. Without it the browser discovers the
    // shared react and jsx-runtime chunks only after parsing the entry, and
    // fetches them in a waterfall - two extra round trips on the critical path,
    // which cost more on slow 4G than the code-splitting saved.
    manifest: true,
  },
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
