// Derives every icon the site needs from the supplied artwork.
//
//   npm run images
//
// SOURCE: source-images/bitlionex-port-icon.webp, 512x512, transparent.
// Supplied by the operator. It is the master - every size below comes from it,
// and nothing here redraws or restyles the mark.
//
// Why raster derivatives rather than a hand-traced SVG: the mark is two
// offset rounded-square rings at 45 degrees, two arrows, and a diagonal
// gradient, with a soft shadow where the rings cross. A hand trace would very
// plausibly come out subtly wrong - a corner radius off, an arrow a few pixels
// out - and a logo that is almost right is worse than no logo. Downscaling
// with Lanczos is faithful at every size we need, and the source is 512px so
// there is real detail to lose.
//
// Outputs are committed. This is NOT part of `npm run build`, so a build
// machine without a rasteriser can still ship the site.
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(ROOT, 'source-images', 'bitlionex-port-icon.webp')
const OUT = path.join(ROOT, 'public')

mkdirSync(OUT, { recursive: true })

const src = sharp(SRC)
const meta = await src.metadata()
if (meta.width !== meta.height || meta.width < 256) {
  throw new Error(
    `The icon source should be square and at least 256px. Got ${meta.width}x${meta.height}.`,
  )
}

/**
 * Resize with a transparent background, preserving the artwork's own margins.
 * `contain` rather than `cover` so nothing is ever cropped.
 */
const square = (size, file) =>
  sharp(SRC)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, file))

/**
 * The same, flattened onto an opaque background.
 *
 * iOS does not honour transparency in a home-screen icon - it composites onto
 * black, which would turn the indigo half of this mark into a murky smear.
 * Flattening onto white here is what stops that happening.
 */
const squareOnWhite = (size, file) =>
  sharp(SRC)
    .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .flatten({ background: '#ffffff' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, file))

// Browser tab. Two sizes because a 16px tab is still a real case, and letting
// the browser downscale a 32 would be visibly worse.
await square(32, 'favicon-32.png')
await square(16, 'favicon-16.png')

// iOS home screen. 180 is the size Apple reads; opaque, see above.
await squareOnWhite(180, 'apple-touch-icon.png')

// Android / PWA, referenced from site.webmanifest. The maskable variant is
// padded to 80% so Android's circular mask never clips an arrow tip - the
// artwork already carries a small margin, and this adds the rest.
await square(192, 'icon-192.png')
await square(512, 'icon-512.png')
await sharp(SRC)
  .resize(410, 410, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .extend({
    top: 51,
    bottom: 51,
    left: 51,
    right: 51,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .flatten({ background: '#322e80' }) // --indigo-deep, so the safe zone is not white
  .png({ compressionLevel: 9 })
  .toFile(path.join(OUT, 'icon-maskable-512.png'))

// The header and footer wordmark is produced by make-content-images.mjs as
// WebP. It used to be a PNG here, at 11 KB for a 36px slot; the same mark as
// WebP is 3 KB and it appears on every page.

console.log(
  '[icons] wrote favicon-32.png, favicon-16.png, apple-touch-icon.png,\n' +
    '        icon-192.png, icon-512.png, icon-maskable-512.png\n' +
    `        (from ${path.relative(ROOT, SRC)}, ${meta.width}x${meta.height})`,
)
