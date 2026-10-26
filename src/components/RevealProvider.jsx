'use client'

import { usePathname } from 'next/navigation'
import useReveal from '@/hooks/useReveal.js'

/**
 * Runs the scroll-reveal observer for the whole document.
 *
 * The hook rebuilds its observers per route, because the previous route's
 * elements are gone. In the Vite build that trigger was the route name the
 * hand-rolled router held in state; here it is the App Router's pathname.
 *
 * The prerendered HTML ships with every section visible - the reveal rules in
 * globals.css only hide them under `@media (scripting: enabled)` - so this
 * only takes over once JS is running.
 */
export default function RevealProvider() {
  const pathname = usePathname()
  useReveal(pathname)
  return null
}
