import { useEffect } from 'react'

/**
 * Reveals [data-reveal] elements as they scroll into view.
 *
 * Every element starts hidden via `html.js .reveal` in index.css and is
 * flipped by setting data-revealed="true". Running the whole thing from CSS
 * means a page with no JS keeps its content visible - the hide rule is gated
 * on the `js` class that index.html adds inline.
 *
 * The observer is rebuilt on every route change because the previous route's
 * elements are gone. A safety net un-hides anything still hidden after a
 * moment, so a browser without IntersectionObserver (or one where the
 * observer silently fails) can never leave the page blank.
 *
 * @param {string} route current route name, used as the rebuild trigger
 */
export default function useReveal(route) {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal:not([data-revealed])')
    if (!nodes.length) return

    const show = (el) => el.setAttribute('data-revealed', 'true')

    if (typeof IntersectionObserver !== 'function') {
      nodes.forEach(show)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          show(entry.target)
          io.unobserve(entry.target)
        }
      },
      // Fire a little before the element reaches the fold so content is
      // already settled by the time it is actually being read.
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )

    nodes.forEach((el) => io.observe(el))

    // Safety net: nothing stays hidden because an observer never fired.
    const net = setTimeout(() => nodes.forEach(show), 2500)

    return () => {
      clearTimeout(net)
      io.disconnect()
    }
  }, [route])
}
