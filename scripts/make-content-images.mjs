// Derives every content image at the widths the pages actually display them,
// so a phone downloads a phone-sized file instead of a desktop one.
//
//   npm run images
//
// PageSpeed flagged 295 KiB of avoidable image transfer: the two square
// illustrations were shipping at 1000x1000 for a 372px display, and the logo
// was a 108px PNG for a 36px slot. Nothing was wrong with the images, only
// with serving one fixed size to every screen.
//
// SOURCES live in source-images/, which is gitignored. Outputs are committed,
// so a build machine does not need the originals - only a re-run does.
import { mkdirSync, readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(ROOT, 'source-images')
const OUT = path.join(ROOT, 'public')

// [source file, output base name, widths to produce]
//
// The widths are the display size at 1x, 2x and 3x. A square figure is shown
// at up to 520 CSS px, so 520 / 1040 / 1560 would be the honest ladder - but
// the sources are only 1000-1254px wide, so 800 and 1000 are used and the
// browser is left to pick. Producing an upscaled 1560 would add bytes and no
// detail.
const IMAGES = [
  ['img2.png', 'portfolio-app', [400, 800]],
  ['img3.png', 'market-app', [400, 800]],
  ['about 1.png', 'about-1', [400, 800]],
  ['about2.png', 'about-2', [400, 800]],
  ['about 3.png', 'about-3', [400, 800]],
  ['about4.png', 'about-4', [400, 800]],
]

mkdirSync(OUT, { recursive: true })

let written = 0
let bytes = 0

for (const [file, base, widths] of IMAGES) {
  const src = path.join(SRC, file)
  if (!existsSync(src)) {
    console.warn(`  skipped ${file} - not in source-images/`)
    continue
  }
  const meta = await sharp(src).metadata()
  for (const w of widths) {
    if (w > meta.width) continue
    // quality 78 rather than 82: PageSpeed's own note said the compression
    // could come up, and at these sizes the difference is not visible.
    const out = path.join(OUT, `${base}-${w}.webp`)
    const info = await sharp(src)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78, alphaQuality: 85, effort: 6 })
      .toFile(out)
    written++
    bytes += info.size
  }
  // The base name without a suffix is the largest, kept so nothing that
  // already points at it breaks.
  const full = path.join(OUT, `${base}.webp`)
  if (existsSync(full)) {
    const info = await sharp(src)
      .resize({ width: Math.min(1000, meta.width), withoutEnlargement: true })
      .webp({ quality: 78, alphaQuality: 85, effort: 6 })
      .toFile(full)
    bytes += info.size
  }
}

// The wordmark. Displayed at 36px, was a 108px PNG at 10.7 KB. WebP at the
// same 3x size is a fraction of that.
const LOGO = path.join(SRC, 'bitlionex-port-icon.webp')
if (existsSync(LOGO)) {
  const info = await sharp(LOGO)
    .resize(108, 108, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 88, alphaQuality: 90, effort: 6 })
    .toFile(path.join(OUT, 'logo-mark.webp'))
  written++
  bytes += info.size
  console.log(`  logo-mark.webp  ${Math.round(info.size / 1024)} KB  (was a 10.7 KB png)`)
}

console.log(`[content] wrote ${written} files, ${Math.round(bytes / 1024)} KB total`)
