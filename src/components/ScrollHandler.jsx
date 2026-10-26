'use client'

import { useEffect } from 'react'

/**
 * Handles the in-page anchors the design uses.
 *
 * Every "register" and "how it works" link is a plain `#register` /
 * `#how-it-works` hash. Two things have to be true when one is clicked:
 *
 *   on the homepage      scroll to the section, and keep the URL clean - no
 *                        fragment appears in the address bar
 *   on any other route   those sections do not exist there, so go home first
 *
 * The Vite build did this in App.jsx's click interceptor, alongside the SPA
 * router. The App Router owns navigation now, so this handles only the hash
 * case and leaves every other link to the browser.
 */
export default function ScrollHandler() {
  useEffect(() => {
    const onClick = (event) => {
      const anchor = event.target.closest('a[href]')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      // A bare "#" is a placeholder link. Swallow it so the URL bar stays
      // clean rather than gaining a lone hash.
      if (href === '#') {
        event.preventDefault()
        return
      }

      if (!href.startsWith('#')) return

      event.preventDefault()
      const isHome = window.location.pathname === '/'

      if (!isHome) {
        // A full load, not a client transition: the target section only exists
        // on the homepage, and the fragment has to survive the navigation for
        // the browser to scroll to it.
        window.location.assign(`/${href}`)
        return
      }

      if (href === '#top') {
        window.scrollTo(0, 0)
        return
      }

      document.querySelector(href)?.scrollIntoView()
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
