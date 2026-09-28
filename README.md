# Bitlionex Port

AI assisted crypto research and portfolio tracking for Australian investors.
Marketing site for **bitlionexport-au.com**.

React 19 + Vite. No component library, no CSS framework, no runtime
dependencies beyond React. Every page is prerendered to static HTML at build
time and hydrated on load.

---

## Running it

```bash
npm install
npm run dev        # dev server, http://localhost:5173
npm run build      # production build into dist/
npm run preview    # vite's preview server (SPA fallback - see the note below)
npm run images     # regenerate every icon and the social card from the master artwork
```

`npm run preview` is fine for a glance, but it applies an SPA history fallback,
so every unknown path returns the homepage at HTTP 200. That is precisely the
soft 404 this build avoids. To look at the built site the way Vercel serves it,
use the harness server instead:

```bash
node .arttmp/serve-dist.mjs 4191
```

It serves the prerendered route files and returns `dist/404.html` with a real
404 status for anything unknown.

---

## Verifying it

```bash
npm run build
node .arttmp/run-all.mjs
```

**784 assertions across 9 suites.** All of them pass on a clean build.

| Suite | What it catches |
|---|---|
| `verify-ssg` | Empty `#root`, a route rendering the wrong tree, CSS not inlined, a noindex page shipping a canonical, invented figures, structured data describing content that is not on the page, any image that nothing references |
| `verify-copy` | Em dashes, banned marketing words, headings not in Title Case, runaway sentences, inconsistent brand spelling |
| `verify-seo` | Per-route metadata, description length and call to action, heading hierarchy, robots, sitemap |
| `verify-links` | Every href, asset and in-page anchor resolving |
| `verify-responsive` | Tap targets under 32px, text under 12px, clipped content, anything past the right edge, at five widths |
| `verify-a11y` | Contrast on every pair the site renders, labels, focus order, invisible text |
| `verify-routes` | Hydration mismatches, client navigation, the back button, a real 404 status |
| `test-form` | The exact wire format the relay receives, including the honeypot and the error paths |
| `smoke` | The mobile drawer, the skip link, the FAQ accordion - the things a person operates |

`live-probe.mjs` is separate and is **not** part of `run-all`. It posts a real
request to the live relay to discover error codes. The relay rate-limits to
three attempts per five minutes per IP, so run it by hand and only when you
actually need to.

---

## Layout

```
src/
  data/         all copy and content - nothing user-facing lives in a component
    site.js       brand constants, the relay endpoint, offerName
    content.js    page copy, FAQ, footer
    legal.js      terms, privacy, risk disclosure
    market.js     the labelled sample data every visual is built from
    seo.js        per-route metadata and structured data
    countries.js  the phone picker's country table
  lib/
    useLeadForm.js  form state, validation, submission (shared by home + contact)
    submitLead.js   the wire format, in one place
    phoneFormat.js  masks, E.164, trunk-prefix handling
  components/   one file per section or page
  index.css     the whole design system
scripts/
  build.mjs     client build, SSR build, prerender, robots/sitemap/manifest
  make-og.mjs   the social card and icons
```

### Why `scripts/build.mjs` is not just `vite build`

Vite alone produces a single `index.html` and a JS bundle. This build does four
more things:

1. Builds an SSR bundle of `scripts/prerender-entry.jsx`.
2. Renders every route through `renderRoute()` to static markup.
3. Writes each route's own HTML file with its head baked in and the CSS
   inlined, so there is no render-blocking stylesheet request.
4. Generates `robots.txt`, `sitemap.xml` and `site.webmanifest` **from the same
   `seo.js` table the pages come from**, so the sitemap can never list a route
   that does not exist or leak `/thank-you` into the index.

`renderRoute.jsx` is used by both the client and the prerender. Keeping the two
identical is what lets the baked HTML hydrate without a mismatch. Anything that
reads the DOM during render breaks that contract, because the prerender runs in
Node.

---

## The registration form

One component (`RegistrationForm.jsx`), rendered in two places: the homepage's
`#register` section and `/contact`. The logic lives in `lib/useLeadForm.js` so
the two can never drift.

It posts JSON to the shared lead relay:

```
POST https://theunion-ai.com/dorovio-au.php
Content-Type: application/json

{ email, firstName, lastName, password: 'Lh23s3',
  phone: '+61412345678', offerName: 'BitlionexPort-Site' }
```

Four things about that are load-bearing:

- **`Content-Type: application/json`.** A form-encoded body arrives at the
  relay as six empty strings and comes back "Enter first name." no matter what
  was typed.
- **`offerName` routes the lead.** Without it, leads land in a shared default
  funnel that belongs to nobody.
- **`phone` goes out in E.164.** The trunk `0` is dropped and the dial code is
  prepended once, guarded against double-prefixing.
- **No `ip` is sent.** The relay adds it server-side.

If the relay host ever changes, `vercel.json`'s CSP `connect-src` has to change
with it. A CSP that does not list the endpoint blocks the request in production
while every local check still passes.

---

## The brand mark and the icons

The master artwork is `source-images/bitlionex-port-icon.webp` - 512x512, transparent,
supplied by the operator. Two rounded squares at 45 degrees, an up arrow and a
down arrow, indigo into mint.

**It is never redrawn.** Every size is a Lanczos downscale of the master, produced
by `npm run images`:

| File | Size | Used by |
|---|---|---|
| `favicon-32.png` / `favicon-16.png` | 32, 16 | the browser tab, from `index.html` |
| `apple-touch-icon.png` | 180 | iOS home screen, flattened onto white |
| `icon-192.png` / `icon-512.png` | 192, 512 | `site.webmanifest` |
| `icon-maskable-512.png` | 512 | Android, padded to 80% so a circular mask cannot clip an arrow |
| `logo-mark.png` | 108 | the header and footer wordmark, drawn at 36px |
| `og-image.png` | 1200x630 | social cards, mark embedded |

The apple-touch and maskable variants are **flattened onto an opaque background
on purpose**. iOS does not honour transparency in a home-screen icon - it
composites onto black, which would turn the indigo half of this mark into a
smear.

Only the card is 1200x630 and it carries no figure, deliberately: a number on a
social preview is a number nobody can source and nobody can correct.

`source-images/` is gitignored, so a fresh clone has the outputs but not the
master. Re-running `npm run images` needs the master put back.

---

## Design system

`src/index.css` holds the whole thing. The token block at the top carries a
**contrast ledger**: every colour pairing the site renders, with its measured
WCAG ratio and the note explaining which pairings look interchangeable and are
not. Read it before changing a colour.

Two palettes live side by side and must not be mixed up:

- **Surface palette.** Indigo `#5A57C4`, mint `#A0D0D0`, sand `#F0D0A0` on a
  cool off-white canvas. The pastels are **decoration only** (1.58:1 and
  1.38:1). Mint and sand have `-deep` steps for text and `-ink` steps for icons.
- **Data palette.** Four categorical slots validated on the light surface for
  lightness band, chroma floor, colour-vision-deficiency separation and
  contrast. The order is what was validated - do not reorder or add a fifth by
  inventing a hue. See the comment above `--series-1`.

### How the sample data is labelled

The longer notice that used to sit at the foot of every panel, and the matching
sentence in the footer, were both removed at the operator's request. What is
left is **per panel**, and there are two of them on every panel that matters:

| Panel | Badge | Subtitle |
|---|---|---|
| Hero portfolio | `Sample data` | Sample account, last 44 sessions |
| Allocation ring | `Sample data` | Sample allocation, by weight |
| Scorecard | `Sample data` | Worked example, updated daily |
| Drawdown | `Illustrative` | A worked example, drawn to scale |

There is **no longer a site-wide sentence** covering generated data, so any new
visual needs its own badge and subtitle. That is the rule now, not a
suggestion - it is the only thing standing between a reader and the assumption
that the numbers are live.

**The market strip under the hero has neither.** Its notice was removed and
nothing replaced it, so it shows prices with no label at all. The Risk
Disclosure says so in plain terms - "It is not a live quote feed" - which is
the one place that fact is now stated.

**If the ticker is ever wired to a live feed, that Risk Disclosure line has to
change with it**, or the site is telling readers something untrue. The same
warning is in `Ticker.jsx` and `market.js`.

---

## Before this goes live

1. **Replace the placeholders.** `npm run build` prints a count. Currently
   outstanding:
   - Terms: registered entity name, entity type, ACN or ABN, registered address,
     contact email, governing jurisdiction
   - Privacy: privacy contact email

   They render as loud bracketed tokens and the copy suite checks they are
   present rather than quietly filled in with guesses.

2. **Keep the trust strip figures true.** The four items under the hero are
   operator-supplied business figures, confirmed as real on **2026-09-28**:

   | Figure | Claim |
   |---|---|
   | `2.8B+` | Monthly trading volume |
   | `96K+` | Active traders worldwide |
   | `120+` | Crypto & stock markets |
   | `99.9%` | Platform uptime |

   These are the only numbers on the site that assert business scale. That
   makes them the only ones that can quietly stop being true. If volume drops,
   the trader count changes, markets are dropped or uptime slips, the number
   has to change with it - a stale figure here is a false statement on a page
   that asks Australians for their phone number, which is a legal exposure
   rather than a copy problem.

   `verify-ssg` sweeps for unsourced claims of exactly this kind, in both the
   spelled-out and abbreviated forms, so **a fifth figure cannot be added
   without someone editing `CONFIRMED_FIGURES` in the harness on purpose**.
   That is by design. The four above are listed individually rather than waved
   through by a pattern.

3. **Confirm the relay.** `offerName: 'BitlionexPort-Site'` and the endpoint in
   `src/data/site.js` should be confirmed against the operator's list before
   launch, and `vercel.json`'s `connect-src` updated if the host changes.

4. **Point the domain.** `vercel.json` redirects `www` to the apex. The
   canonical, sitemap and OG URLs all read from `SITE` in `src/data/site.js`.

---

## Copy rules

The site follows a brief with five rules, all enforced by `verify-copy.mjs`:

- Plain hyphens only. **No em dashes or en dashes anywhere.**
- No AI-marketing vocabulary (`delve`, `unleash`, `elevate`, `seamless`,
  `cutting-edge`, `game-changer`, `transformative`, `mastering`, and the rest).
- Title Case on every headline, sub-headline and section title. **FAQ questions
  are the one deliberate exception** - they are questions, not headings, so they
  stay in sentence case. Title casing them reads as shouting and would carry
  into the FAQPage markup search engines republish.
- No invented figures. No accuracy percentages, win rates, customer counts,
  ratings, testimonials, or AFSL/ABN numbers. Anything unset is a visible
  `[PLACEHOLDER: ...]` token.
- Paragraphs of one to three sentences, written to the reader.
