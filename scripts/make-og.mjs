// Renders the social share card, public/og-image.png (1200x630).
//
//   npm run images
//
// The card is generated rather than hand drawn so the palette and the mark
// stay tied to the design tokens: change a colour in src/index.css, re-run
// this, and the card follows.
//
// The MARK is the operator's own artwork, embedded from the master icon
// rather than redrawn, so the card cannot drift from the header logo, the
// favicon or the app icon. The other icon sizes are produced by
// scripts/make-icons.mjs; this script only makes the card.
//
// Output is committed. This is NOT part of `npm run build`, because a build
// machine without a rasteriser should still be able to ship the site.
import { mkdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'public')
const MASTER = path.join(ROOT, 'source-images', 'bitlionex-port-icon.webp')

// Mirrors the tokens in src/index.css. Kept in step by hand, because this
// script runs rarely and a stale hex here is visible the moment the card is
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
// here. The card is a static asset, so an exact match matters less than the
// palette and the layout being right.
const SANS = 'Helvetica, Arial, sans-serif'

// The mark, inline. A PNG data URI rather than a drawn approximation: the
// artwork is two offset rings, two arrows and a diagonal gradient, and the
// card is the one place someone sees it next to the page it came from.
const markPng = await sharp(MASTER)
  .resize(168, 168, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer()
const MARK = `data:image/png;base64,${markPng.toString('base64')}`

const ogSvg = `
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
        font-size="62" fill="${INK}">Your crypto holdings,</text>
  <text x="92" y="406" font-family="${SANS}" font-weight="600" letter-spacing="-1.8"
        font-size="62" fill="${INDIGO_MID}">in one clear picture.</text>

  <rect x="92" y="446" width="104" height="5" rx="2.5" fill="${MINT}"/>

  <text x="92" y="506" font-family="${SANS}" font-size="25" fill="${MUTED}">AI assisted research and portfolio tracking for Australian investors.</text>

  <!-- No figure anywhere on this card, deliberately. A number on a social
       preview is a number nobody can source and nobody can correct. -->
  <text x="1108" y="564" font-family="${SANS}" font-size="21" fill="${INK}"
        text-anchor="end" font-weight="600">bitlionexport-au.com</text>
</svg>
`

mkdirSync(OUT, { recursive: true })

await sharp(Buffer.from(ogSvg)).png({ compressionLevel: 9 }).toFile(path.join(OUT, 'og-image.png'))

console.log('[og] wrote public/og-image.png (1200x630), mark embedded from the master icon')
