// Maps the per-route SEO config onto Next's Metadata API, so the same source
// of truth that used to drive <Seo/> now bakes the head at build time.
//
// src/data/seo.js is unchanged from the Vite build: title, description,
// keywords, robots, canonical and the per-route social card, keyed by route.
// What changed is who consumes it - Next's metadata export instead of a
// runtime head writer.
import { seo, ogImageFor, ogImageAltFor } from '@/data/seo.js'
import { SITE, BRAND } from '@/data/site.js'

/**
 * @param {string} route a key of `seo` - 'home', 'about', '404', …
 * @returns the object a page's `export const metadata` should carry
 */
export function pageMetadata(route) {
  const conf = seo[route]
  if (!conf) throw new Error(`No SEO config for route "${route}"`)

  const image = ogImageFor(route)

  const meta = {
    // absolute: the root layout must not wrap this in a title template.
    title: { absolute: conf.title },
    description: conf.description,
    robots: conf.robots,
    openGraph: {
      siteName: BRAND,
      title: conf.title,
      description: conf.description,
      url: conf.canonical || SITE,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: ogImageAltFor(route),
          type: 'image/png',
        },
      ],
      type: 'website',
      locale: 'en_AU',
    },
    twitter: {
      card: 'summary_large_image',
      title: conf.title,
      description: conf.description,
      images: [image],
    },
  }

  if (conf.keywords) meta.keywords = conf.keywords
  // Noindex routes carry no canonical. "Do not index me" and "here is my
  // canonical URL" are contradictory signals, so the tag is omitted rather
  // than pointed at the homepage.
  if (conf.canonical) meta.alternates = { canonical: conf.canonical }

  return meta
}
