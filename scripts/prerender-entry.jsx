// Build-time SSG entry - compiled by `vite build --ssr`, then executed by
// build.mjs in Node.
//
// For each route it renders the exact same React tree the client would produce
// (renderRoute from src/renderRoute.jsx) to static markup, so the baked HTML
// hydrates without a mismatch. renderRoute deliberately bypasses <App/>, which
// reads location.pathname during render - impossible in Node.
//
// renderToPipeableStream, not renderToString.
//
// The route components are React.lazy(), so that a visitor to the homepage does
// not download the legal pages, the contact form and the 404. renderToString
// does not support Suspense - it throws rather than waiting - so the prerender
// uses the streaming API and waits for onAllReady, which fires once every
// suspended component has resolved. The output is the same complete document;
// nothing is streamed to a client, the string is just collected.
import { Writable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { renderRoute } from '../src/renderRoute.jsx'

// Must stay in step with OUTPUT in build.mjs and the keys in src/data/seo.js.
const ROUTES = [
  'home',
  'about',
  'contact',
  'faq',
  'terms',
  'privacy',
  'risk-disclosure',
  'thank-you',
  '404',
]

/**
 * Renders one element tree to a complete HTML string.
 *
 * Resolves on `writable` finishing rather than on onAllReady, because onAllReady
 * means "React has finished producing" and the bytes may still be in flight to
 * the writable. Resolving too early would truncate the page.
 */
function renderToStringAsync(element) {
  return new Promise((resolve, reject) => {
    let html = ''
    const sink = new Writable({
      write(chunk, _encoding, done) {
        html += chunk.toString()
        done()
      },
    })
    sink.on('finish', () => resolve(html))
    sink.on('error', reject)

    const { pipe, abort } = renderToPipeableStream(element, {
      onAllReady() {
        pipe(sink)
      },
      onShellError(error) {
        // Nothing rendered at all - a real failure, and the build should stop.
        reject(error)
      },
      onError(error) {
        // A recoverable error inside a boundary. React has already switched to
        // the fallback for that subtree, so the page is incomplete rather than
        // absent. Loud, because a silently degraded page is worse than a failed
        // build - the harness would catch it, but only after the build passed.
        console.error('[prerender] recoverable error while rendering:', error.message)
      },
    })

    // A backstop. A lazy component whose chunk never resolves would otherwise
    // hang the build with no explanation.
    setTimeout(() => {
      abort()
      reject(new Error('prerender timed out after 20s'))
    }, 20000).unref()
  })
}

export default async function prerender() {
  const pages = {}
  for (const route of ROUTES) {
    pages[route] = await renderToStringAsync(renderRoute(route))
  }
  return pages
}
