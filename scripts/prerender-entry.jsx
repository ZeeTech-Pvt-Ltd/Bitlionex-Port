// Build-time SSG entry - compiled by `vite build --ssr`, then executed by
// build.mjs in Node.
//
// For each route it renders the exact same React tree the client would
// produce (renderRoute from src/renderRoute.jsx) to static markup, so the
// baked HTML hydrates without a mismatch. renderRoute deliberately bypasses
// <App/>, which reads location.pathname during render - impossible in Node.
import { renderToString } from 'react-dom/server'
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

export default function prerender() {
  const pages = {}
  for (const route of ROUTES) {
    pages[route] = renderToString(renderRoute(route))
  }
  return pages
}
