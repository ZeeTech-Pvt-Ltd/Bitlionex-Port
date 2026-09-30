import { BRAND_MARK, BRAND_PORT } from '../data/site.js'

/**
 * The wordmark and the mark.
 *
 * The mark is the operator's own artwork - two offset rounded squares with an
 * up arrow and a down arrow, indigo into mint. It is NOT redrawn here. Every
 * size is derived from the 512px master by scripts/make-icons.mjs, so the
 * header, the browser tab, the home-screen icon and the social card are all
 * the same drawing and a change to the master propagates everywhere.
 *
 * 36px on screen, served at 108px, which covers every display density in use.
 *
 * @param {{ onDeep?: boolean, compact?: boolean }} props
 *   onDeep  - inverts the wordmark for the dark band.
 *   compact - drops the "PORT" line, for tight spaces.
 */
export default function Logo({ onDeep = false, compact = false }) {
  return (
    <span className="logo">
      {/* alt is empty on purpose. The wordmark beside it already reads the
          name aloud, and the link wrapping this whole thing carries its own
          label - a third announcement is noise, not accessibility. */}
      {/* WebP, not the PNG. The mark is a flat two tone drawing, so WebP at the
          same 108px is a third of the size - 3 KB against 11 KB, for an image
          that is on every page of the site. */}
      <img className="logo__mark" src="/logo-mark.webp" width="36" height="36" alt="" />

      <span className="logo__text">
        <span className="logo__name" style={onDeep ? { color: '#fff' } : undefined}>
          {BRAND_MARK}
        </span>
        {!compact && (
          <span className="logo__sub" style={onDeep ? { color: 'var(--sand-bright)' } : undefined}>
            {BRAND_PORT}
          </span>
        )}
      </span>
    </span>
  )
}
