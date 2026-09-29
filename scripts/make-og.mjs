// Renders one social share card per indexable route, public/og-<route>.png
// (1200x630 each).
//
//   npm run images
//
// One card per page rather than one card for the whole site. A single shared
// image meant every page unfurled identically, so a link to the FAQ and a link
// to the Risk Disclosure looked the same in a feed and neither said what it
// was. The copy for each card lives in src/data/seo.js next to the page's
// title, so the two are edited together.
//
// The cards are generated rather than hand drawn so the palette and the mark
// stay tied to the design tokens: change a colour in src/index.css, re-run
// this, and every card follows.
//
// The MARK is the operator's own artwork, embedded from the master icon rather
// than redrawn, so a card cannot drift from the header logo, the favicon or
// the app icon. The other icon sizes come from scripts/make-icons.mjs.
//
// Output is committed. This is NOT part of `npm run build`, because a build
// machine without a rasteriser should still be able to ship the site.
import { mkdirSync, readFileSync, rmSync, existsSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { seo } from '../src/data/seo.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'public')
const MASTER = path.join(ROOT, 'source-images', 'bitlionex-port-icon.webp')

// Mirrors the tokens in src/index.css. Kept in step by hand, because this
// script runs rarely and a stale hex here is visible the moment a card is
// looked at.
const BG = '#F7F7FC'
const PAPER = '#FFFFFF'
const INK = '#14142B'
const MUTED = '#63637A'
const INDIGO_MID = '#4A45B5'
const MINT = '#A0D0D0'
const SAND = '#F0D0A0'
const BORDER = '#E2E2EE'

// The site sets headings in Instrument Sans, but this SVG is rasterised by
// librsvg, which can only reach fonts installed on the machine, not the WOFF2
// in public/fonts. A system sans is the closest thing that renders reliably
// here. A card is a static asset, so an exact match matters less than the
// palette and the layout being right.
const SANS = 'Helvetica, Arial, sans-serif'

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// The mark, inline. A PNG data URI rather than a drawn approximation: the
// artwork is two offset rings, two arrows and a diagonal gradient, and the
// card is often the first thing someone sees.
const markPng = await sharp(MASTER)
  .resize(168, 168, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer()
const MARK = `data:image/png;base64,${markPng.toString('base64')}`

const cardSvg = ({ line1, line2, note }) => `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>

  <!-- The two discs from the hero, same mint and sand, at card scale. -->
  <circle cx="1080" cy="70" r="210" fill="${MINT}" opacity="0.45"/>
  <circle cx="120" cy="600" r="150" fill="${SAND}" opacity="0.5"/>

  <rect x="44" y="44" width="1112" height="542" rx="26" fill="${PAPER}" stroke="${BORDER}" stroke-width="2"/>

  <!-- The operator's mark, embedded from the master icon. -->
  <image x="78" y="76" width="96" height="96" xlink:href="${MARK}" href="${MARK}" />

  <text x="200" y="136" font-family="${SANS}" font-weight="600"
        font-size="40" fill="${INK}">Bitlionex</text>
  <text x="200" y="168" font-family="${SANS}" font-weight="600"
        font-size="17" letter-spacing="3.4" fill="${INDIGO_MID}">PORT</text>

  <!-- Headline. Tracking is negative to match the h1 treatment on the page. -->
  <text x="92" y="330" font-family="${SANS}" font-weight="600" letter-spacing="-1.8"
        font-size="62" fill="${INK}">${esc(line1)}</text>
  <text x="92" y="406" font-family="${SANS}" font-weight="600" letter-spacing="-1.8"
        font-size="62" fill="${INDIGO_MID}">${esc(line2)}</text>

  <rect x="92" y="446" width="104" height="5" rx="2.5" fill="${MINT}"/>

  <text x="92" y="506" font-family="${SANS}" font-size="25" fill="${MUTED}">${esc(note)}</text>

  <!-- No figure anywhere on any card, deliberately. A number on a social
       preview is a number nobody can source and nobody can correct. -->
  <text x="1108" y="564" font-family="${SANS}" font-size="21" fill="${INK}"
        text-anchor="end" font-weight="600">bitlionexport-au.com</text>
</svg>
`

mkdirSync(OUT, { recursive: true })

// Every route that carries card copy gets one. thank-you and the 404 do not:
// both are noindex, so nothing should ever unfurl them, and ogImageFor() falls
// back to the home card if something does.
const routes = Object.entries(seo).filter(([, conf]) => conf.card)
if (!routes.length) throw new Error('No routes in src/data/seo.js carry card copy.')

const written = []
for (const [route, conf] of routes) {
  const file = path.join(OUT, `og-${route}.png`)
  await sharp(Buffer.from(cardSvg(conf.card))).png({ compressionLevel: 9 }).toFile(file)
  written.push(`og-${route}.png`)
}

// The single shared card this replaces. Removed rather than left behind: it
// would ship unreferenced, and the build's asset check flags exactly that.
const old = path.join(OUT, 'og-image.png')
if (existsSync(old)) {
  rmSync(old)
  console.log('[og] removed public/og-image.png (superseded by the per-route cards)')
}

console.log(`[og] wrote ${written.length} cards at 1200x630, mark embedded from the master icon:`)
console.log(`     ${written.join(', ')}`)
