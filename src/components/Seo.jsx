import { useEffect } from 'react'
import { BRAND, SITE } from '../data/site.js'
import { OG_IMAGE, OG_IMAGE_ALT, schemasFor, seo } from '../data/seo.js'
import { FAQ_ITEMS } from '../data/content.js'

/**
 * Seo - per-route head management.
 *
 * Syncs <title>, meta description, keywords, robots, canonical, Open Graph,
 * Twitter cards and JSON-LD into document.head. Written imperatively so the
 * site needs no head management dependency.
 *
 * Every field here mirrors a field scripts/build.mjs bakes into the
 * prerendered HTML, field for field. If the two disagree, a visitor sees one
 * set of metadata on first paint and a different set after hydration, so
 * change both together.
 *
 * index.html ships the homepage defaults statically and this component
 * updates those elements in place, so nothing is duplicated.
 */

const upsertMeta = (attr, name, content) => {
  let el = document.head.querySelector(`[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
  return el
}

const removeMeta = (attr, name) => {
  document.head.querySelector(`[${attr}="${name}"]`)?.remove()
}

export default function Seo({ route }) {
  useEffect(() => {
    const conf = seo[route] || seo['404']

    // ---- <title> ----
    let title = document.head.querySelector('title')
    if (!title) {
      title = document.createElement('title')
      document.head.appendChild(title)
    }
    title.textContent = conf.title

    // ---- description / keywords / robots ----
    upsertMeta('name', 'description', conf.description)
    if (conf.keywords) upsertMeta('name', 'keywords', conf.keywords)
    else removeMeta('name', 'keywords')
    upsertMeta('name', 'robots', conf.robots)

    // ---- canonical ----
    // Absent on purpose for noindex routes. A page that says "do not index me"
    // and "here is my canonical URL" is telling a crawler two different
    // things, so the tag is removed rather than left over from the last route.
    let link = document.head.querySelector('link[rel="canonical"]')
    if (conf.canonical) {
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = conf.canonical
    } else {
      link?.remove()
    }

    // ---- Open Graph ----
    const og = {
      'og:site_name': BRAND,
      'og:title': conf.title,
      'og:description': conf.description,
      'og:url': conf.canonical || `${SITE}/`,
      'og:image': OG_IMAGE,
      'og:image:alt': OG_IMAGE_ALT,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:type': 'image/png',
      'og:type': 'website',
      'og:locale': 'en_AU',
    }
    for (const [k, v] of Object.entries(og)) {
      let el = document.head.querySelector(`meta[property="${k}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('property', k)
        document.head.appendChild(el)
      }
      el.setAttribute('content', v)
    }

    // ---- Twitter / X cards ----
    const tw = {
      'twitter:card': 'summary_large_image',
      'twitter:title': conf.title,
      'twitter:description': conf.description,
      'twitter:image': OG_IMAGE,
    }
    for (const [k, v] of Object.entries(tw)) {
      let el = document.head.querySelector(`meta[name="${k}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('name', k)
        document.head.appendChild(el)
      }
      el.setAttribute('content', v)
    }

    // ---- JSON-LD, replaced per route ----
    // The FAQ questions passed in are the ones this route actually renders, so
    // the markup cannot claim a question that is not on the page.
    const faqItems = route === 'home' || route === 'faq' ? FAQ_ITEMS : []

    document.head.querySelectorAll('script[data-seo-jsonld]').forEach((s) => s.remove())
    schemasFor(route, faqItems).forEach((data) => {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.dataset.seoJsonld = 'true'
      s.textContent = JSON.stringify(data)
      document.head.appendChild(s)
    })
  }, [route])

  return null
}
