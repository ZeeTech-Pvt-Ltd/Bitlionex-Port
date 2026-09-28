import { useEffect, useRef, useState } from 'react'
import { Close, Menu } from './icons.jsx'
import Logo from './Logo.jsx'
import { NAV } from '../data/content.js'

/**
 * Header - sticky, with a mobile drawer.
 *
 * The bar is transparent over the hero and grows a border and a shadow once
 * the page has scrolled, so it does not draw a line across the hero artwork
 * before there is anything to separate it from.
 *
 * The drawer does four things that a naive one does not, and each of them was
 * a real bug somewhere:
 *
 *   It locks the page behind it. A menu you can scroll under is a menu you
 *   lose track of.
 *   It closes on Escape, and on a press outside it. Both are what people try
 *   first when a panel is covering the screen.
 *   It puts focus back on the button when it closes, so a keyboard user is
 *   not dropped at the top of the document.
 *   It closes on EVERY navigation, including a link to the page you are
 *   already on. Tapping "Home" while on the home page changes no route, so a
 *   close-on-route-change effect never fires and the menu stays open over the
 *   page it just scrolled to the top of.
 *
 * Links are plain hrefs. App.jsx intercepts the click and pushes state, so
 * they work with no JS, are crawlable, and still navigate without a reload
 * when JS is running.
 */
export default function Header({ route }) {
  const [open, setOpen] = useState(false)
  const [stuck, setStuck] = useState(false)
  const toggleRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on a route change. This catches the header's own nav links and the
  // footer's, but NOT a link to the page you are already on - the handler
  // below covers that one.
  useEffect(() => {
    setOpen(false)
  }, [route])

  // While the drawer is up: lock the page behind it, and let Escape close it.
  useEffect(() => {
    if (!open) return undefined

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open])

  const close = () => {
    setOpen(false)
    toggleRef.current?.focus()
  }

  return (
    <header className="header" data-stuck={stuck}>
      <div className="wrap">
        <div className="header__bar">
          <a
            className="header__brand"
            href="/"
            aria-label="Bitlionex Port, home"
            style={{ textDecoration: 'none' }}
          >
            <Logo />
          </a>

          <nav className="header__nav" aria-label="Main">
            {NAV.map((item) => (
              <a
                key={item.href}
                className="header__link"
                href={item.href}
                aria-current={route === item.route ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header__actions">
            <a className="btn btn--primary btn--sm" href="#register" data-scroll="#register">
              Open Your Account
            </a>
            <button
              type="button"
              className="header__toggle"
              ref={toggleRef}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <Close size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className="drawer" id="mobile-nav" data-open={open}>
        <div className="wrap">
          <nav aria-label="Mobile">
            {NAV.map((item) => (
              <a
                key={item.href}
                className="drawer__link"
                href={item.href}
                aria-current={route === item.route ? 'page' : undefined}
                // Closes on every tap, including the one that goes nowhere
                // because the visitor is already on that page.
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            className="btn btn--primary btn--block drawer__cta"
            href="#register"
            data-scroll="#register"
            onClick={() => setOpen(false)}
          >
            Open Your Account
          </a>
        </div>
      </div>

      {/* Tap outside to close. Rendered only while the drawer is up, so it
          never intercepts a press when there is nothing to dismiss. */}
      {open && (
        <button
          type="button"
          className="header__scrim"
          aria-label="Close menu"
          onPointerDown={close}
        />
      )}
    </header>
  )
}
