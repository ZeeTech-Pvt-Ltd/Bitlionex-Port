// =========================================================
// Sample market data that drives the visuals
// =========================================================
// Everything in this file is ILLUSTRATIVE. None of it is live market data and
// none of it is a claim about performance.
//
// LABELLING. Each panel that renders these numbers labels itself twice, on
// screen: a badge in the panel head reading "Sample data" or "Illustrative",
// and a subtitle reading "Sample account", "Sample allocation" or "Worked
// example". Those two are the whole of the notice now - the longer paragraph
// that used to sit at the foot of every panel was removed at the operator's
// request, along with the equivalent line in the footer.
//
// The consequence to keep in mind: the labels are per PANEL, not global. Any
// new visual built from this file needs its own badge and subtitle, because
// there is no longer a site-wide sentence covering it. The market strip under
// the hero is the one visual without either, which is noted in Ticker.jsx.
//
// The series are DETERMINISTIC. They are generated once from a fixed seed at
// module load, so the value is identical in the Node prerender and in the
// browser. Anything random here would produce different markup on the server
// and the client, and React would throw the server's HTML away on hydration.
// =========================================================

/* A tiny deterministic generator - mulberry32. Same seed, same numbers,
   every run, on every machine. */
function seeded(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * A wandering line, shaped to look like a price series rather than noise:
 * each step is mostly yesterday plus a small nudge, with the occasional
 * larger move so the curve has some character.
 *
 * @param {number} seed  fixes the series
 * @param {number} count how many points
 * @param {number} start first value
 * @param {number} drift average step size, as a fraction of the start
 * @param {number} vol   how wide the steps swing around that drift
 */
function series(seed, count, start, drift, vol) {
  const rnd = seeded(seed)
  const out = [start]
  let v = start
  for (let i = 1; i < count; i += 1) {
    const shock = rnd() < 0.12 ? (rnd() - 0.5) * vol * 5 : 0
    const step = (rnd() - 0.5) * vol + drift + shock
    v = Math.max(v * (1 + step), start * 0.35)
    out.push(v)
  }
  return out
}

const round2 = (n) => Math.round(n * 100) / 100

/* -------------------------------------------------------------------------
   The market strip under the hero
   ------------------------------------------------------------------------- */

export const TICKER = [
  { sym: 'BTC', name: 'Bitcoin', price: 96420.5, change: 1.84 },
  { sym: 'ETH', name: 'Ethereum', price: 3184.2, change: 2.41 },
  { sym: 'SOL', name: 'Solana', price: 187.64, change: -1.12 },
  { sym: 'XRP', name: 'XRP', price: 2.31, change: 0.76 },
  { sym: 'ADA', name: 'Cardano', price: 0.92, change: -0.44 },
  { sym: 'LINK', name: 'Chainlink', price: 24.18, change: 3.05 },
  { sym: 'DOT', name: 'Polkadot', price: 7.42, change: -1.68 },
  { sym: 'AVAX', name: 'Avalanche', price: 41.86, change: 1.27 },
  { sym: 'MATIC', name: 'Polygon', price: 0.58, change: -2.03 },
  { sym: 'ATOM', name: 'Cosmos', price: 8.94, change: 0.91 },
]

/* -------------------------------------------------------------------------
   The hero panel
   ------------------------------------------------------------------------- */

export const HERO_SERIES = series(20260925, 44, 100, 0.0016, 0.019)
export const HERO_SPARK = series(77021, 22, 100, 0.0012, 0.014)

export const HERO_TILES = [
  { label: 'Positions tracked', value: '12', delta: null },
  { label: 'Marked this week', value: '+2.4%', delta: 'up' },
]

/* -------------------------------------------------------------------------
   Allocation ring - five slices, which is inside the six-segment ceiling
   where a part-to-whole ring still reads at a glance.
   ------------------------------------------------------------------------- */

export const ALLOCATION = [
  { label: 'Bitcoin', weight: 38, tone: 'var(--series-1)' },
  { label: 'Ethereum', weight: 24, tone: 'var(--series-2)' },
  { label: 'Large cap altcoins', weight: 18, tone: 'var(--series-3)' },
  { label: 'Stablecoins', weight: 14, tone: 'var(--series-4)' },
  { label: 'Unallocated cash', weight: 6, tone: 'var(--seq-1)' },
]

/* -------------------------------------------------------------------------
   Signal scorecard - what the research layer publishes on each asset.
   ------------------------------------------------------------------------- */

export const SIGNALS = [
  { label: 'Trend', score: 78 },
  { label: 'Liquidity', score: 92 },
  { label: 'Volatility', score: 41 },
  { label: 'Concentration', score: 63 },
  { label: 'Data coverage', score: 86 },
]

/* -------------------------------------------------------------------------
   Drawdown - the same shape the risk section plots. Deliberately an
   unflattering one: a 34% peak-to-trough fall is the number most people
   signing up have not sat through yet.
   ------------------------------------------------------------------------- */

export const DRAWDOWN = series(4242, 40, 100, -0.004, 0.026).map((v) => ({
  peak: 100,
  value: round2(v),
}))

export const DRAWDOWN_STATS = [
  { label: 'Largest fall shown', value: '-34%' },
  { label: 'Longest recovery', value: '11 months' },
  { label: 'Days underwater', value: '268' },
]

/* -------------------------------------------------------------------------
   How It Works - the three steps
   ------------------------------------------------------------------------- */

export const STEPS = [
  {
    n: '01',
    title: 'Connect Your Holdings',
    body:
      'Add the coins you already own and how much of each. No exchange login, no wallet keys, and no money moving anywhere. You type in what you hold and that is it.',
  },
  {
    n: '02',
    title: 'The Research Layer Reads The Market',
    body:
      'Our models watch price, volume, liquidity and on chain activity across the major venues. Every position you hold gets scored on the same five measures, updated as new data lands.',
  },
  {
    n: '03',
    title: 'You See What Changed And Why',
    body:
      'Your dashboard shows what moved, how much of your money sits in one place, and which positions the research has turned cautious on. You decide what to do with that. We never trade for you.',
  },
]

/* -------------------------------------------------------------------------
   Method - how the research is put together. Named sources, so a reader can
   judge the inputs rather than take the output on trust.
   ------------------------------------------------------------------------- */

export const METHOD_INPUTS = [
  { label: 'Spot price feeds', detail: 'Major exchanges, checked continuously' },
  { label: 'Order book depth', detail: 'How easily a position could be exited' },
  { label: 'On chain activity', detail: 'Network flows and holder behaviour' },
  { label: 'Derivatives positioning', detail: 'Funding rates and open interest' },
  { label: 'Published research', detail: 'Public filings, protocol updates, releases' },
]

export const METHOD_LIMITS = [
  'A score is a summary of what the data showed today. It is not a prediction.',
  'Thin markets produce thin data. Where coverage is poor, the score says so instead of guessing.',
  'No model has seen the next twelve months. Ours has not either.',
]

/* -------------------------------------------------------------------------
   Coverage - what the tracker actually accepts
   ------------------------------------------------------------------------- */

// FOUR rows, not five. The grid is two columns, so a fifth left a stray row
// hanging on its own. Four fits as a clean 2x2.
//
// Stablecoins and cash were merged rather than dropped, because the two were
// always describing one thing - money held flat rather than exposed - and the
// section's own lede already makes that point. Nothing was removed from what
// the tracker claims to cover.
//
// Six was the other option the operator offered. It is not taken because it
// would need a fifth asset class, and there is no honest one to add: every
// category here is a coverage claim, and inventing a category to fill a grid
// is the same mistake as inventing a number.
export const COVERAGE = [
  {
    badge: 'BTC',
    name: 'Bitcoin',
    meta: 'Tracked in full, the deepest data of any asset here',
    weight: 'Full',
  },
  {
    badge: 'ETH',
    name: 'Ethereum',
    meta: 'Tracked in full, including staking and network activity',
    weight: 'Full',
  },
  {
    badge: 'TOP',
    name: 'Large Cap Altcoins',
    meta: 'The twenty largest by market value, reviewed each quarter',
    weight: '20 assets',
  },
  {
    badge: 'STB',
    name: 'Stablecoins And Cash',
    meta: 'Counted for weight rather than growth, including the cash you held back',
    weight: '8 + AUD',
  },
]

/* -------------------------------------------------------------------------
   Risk band - what can actually go wrong
   ------------------------------------------------------------------------- */

// `icon` names a topic, not a shape, and RiskBand maps it to a component. The
// pairing lives here with the words it belongs to, so that editing a heading
// means looking at its icon in the same place - and so a reorder cannot
// silently shuffle the icons onto the wrong rows.
export const RISKS = [
  {
    icon: 'falling',
    title: 'Crypto can fall faster than it rises.',
    body:
      'Falls of 30% to 50% are ordinary in this market, not rare events. Money you need in the next few years should not be in it.',
  },
  {
    icon: 'score',
    title: 'A score is not a promise.',
    body:
      'Our research describes what the data showed. It cannot tell you what happens next, and a high score is not a guarantee of anything.',
  },
  {
    icon: 'concentration',
    title: 'Concentration creeps up on you.',
    body:
      'One coin doing well can quietly become most of what you own. Your dashboard measures this, but only you can act on it.',
  },
  {
    icon: 'custody',
    title: 'We do not hold your money.',
    body:
      'Your coins stay wherever they are. That means their safety is your platform’s job and yours, not ours.',
  },
]

/* -------------------------------------------------------------------------
   Trust strip - the four figures in the band under the hero.
   -------------------------------------------------------------------------
   THESE ARE OPERATOR-SUPPLIED BUSINESS FIGURES, not sample data and not
   estimates. They were given as real, verified numbers on 2026-09-28, which is
   the only reason they are here: this project's brief bans invented figures and
   customer counts outright, and every one of these is a claim about actual
   scale rather than a description of what the service does.

   That makes them different in kind from everything else in this file. If any
   of them stops being true - volume drops, the trader count changes, markets
   are dropped, uptime slips - the number has to change with it. A stale figure
   here is a false statement on a page that asks Australians for their phone
   number, which is a legal exposure rather than a copy problem.
   ------------------------------------------------------------------------- */

export const TRUST = [
  { label: 'Monthly trading volume', value: '2.8B+' },
  { label: 'Active traders worldwide', value: '96K+' },
  { label: 'Crypto & stock markets', value: '120+' },
  { label: 'Platform uptime', value: '99.9%' },
]

/* -------------------------------------------------------------------------
   Formats a number the way the visuals show it, so a value is never written
   two ways in two places.
   ------------------------------------------------------------------------- */

const audFmt = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
})

const priceFmt = new Intl.NumberFormat('en-AU', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatAud(value) {
  return audFmt.format(value)
}

export function formatPrice(value) {
  return priceFmt.format(value)
}

export function formatChange(value) {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}
