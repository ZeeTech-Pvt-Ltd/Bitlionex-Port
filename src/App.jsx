import { useEffect, useState } from 'react'
import useReveal from './hooks/useReveal.js'
import { renderRoute } from './renderRoute.jsx'

// Clean path routing: "/" -> home, "/about" -> About, anything unknown -> 404.
// Fragment anchors such as #register keep working as in-page scroll links.
const KNOWN_ROUTES = [
  'about',
  'contact',
  'faq',
  'terms',
  'privacy',
  'risk-disclosure',
  'thank-you',
]

// Legacy case variants and old slugs rewrite the URL bar rather than render,
// so a stale link ends somewhere real instead of on a 404.
const LEGACY_PATHS = {
  '/About': '/about',
  '/FAQ': '/faq',
  '/Contact': '/contact',
  '/disclosure': '/risk-disclosure',
  '/risk': '/risk-disclosure',
  '/privacy-policy': '/privacy',
  '/terms-and-conditions': '/terms',
}

const getRoute = (path = location.pathname) => {
  const clean = path.split('?')[0].replace(/\/+$/, '')
  if (!clean || clean === '/') return 'home'
  const first = LEGACY_PATHS[clean] ? LEGACY_PATHS[clean].slice(1) : clean.slice(1)
  return KNOWN_ROUTES.includes(first) ? first : '404'
}

export default function App() {
  const [route, setRoute] = useState(getRoute)
  useReveal(route)

  // Migrate old "#/about" style links, shared before clean URLs existed, to
  // clean paths, and rewrite legacy slugs in the URL bar on direct visits.
  useEffect(() => {
    const h = location.hash
    if (h.startsWith('#/')) {
      const p = h.slice(2).split('?')[0]
      history.replaceState(null, '', p || '/')
      setRoute(getRoute())
      return
    }
    const clean = location.pathname.replace(/\/+$/, '')
    const target = LEGACY_PATHS[clean]
    if (target) {
      history.replaceState(null, '', target)
      setRoute(getRoute())
    }
  }, [])

  // Back and forward navigation between clean paths.
  useEffect(() => {
    const onPop = () => {
      const next = getRoute()
      setRoute(next)
      if (next !== 'home') window.scrollTo(0, 0)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // SPA link handling. Two cases matter:
  //
  //   data-scroll  in-page section links. They carry a clean href, so the URL
  //                bar and the hover preview stay hash free, plus the selector
  //                to scroll to. On a route page they go home first, because
  //                those sections only exist on home.
  //   href="/path" real navigation via pushState, no page reload.
  //
  // Anything external, mailto:, tel: or a plain "#" placeholder is left to the
  // browser.
  useEffect(() => {
    const scrollToSelector = (selector) => {
      if (selector === '#top') window.scrollTo(0, 0)
      else document.querySelector(selector)?.scrollIntoView()
    }

    const onClick = (e) => {
      const a = e.target.closest('a[href]')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href) return

      const scrollTarget = a.getAttribute('data-scroll')
      if (scrollTarget) {
        e.preventDefault()
        if (route === 'home') {
          scrollToSelector(scrollTarget)
        } else {
          history.pushState(null, '', '/')
          setRoute('home')
          // One frame for the home tree to mount before hunting the section.
          setTimeout(() => scrollToSelector(scrollTarget), 80)
        }
        return
      }

      if (href === '#') {
        e.preventDefault()
        return
      }

      if (href.startsWith('#')) {
        e.preventDefault()
        if (route === 'home') {
          scrollToSelector(href)
        } else {
          history.pushState(null, '', '/')
          setRoute('home')
          setTimeout(() => scrollToSelector(href), 80)
        }
        return
      }

      if (/^(https?:)?\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return
      }

      if (href.startsWith('/')) {
        const cleanHref = href.split('?')[0].replace(/\/+$/, '')
        const target = LEGACY_PATHS[cleanHref] || href
        const next = getRoute(target)
        e.preventDefault()
        if (next === route) {
          window.scrollTo(0, 0)
          return
        }
        history.pushState(null, '', target)
        setRoute(next)
        window.scrollTo(0, 0)
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [route])

  return renderRoute(route)
}
