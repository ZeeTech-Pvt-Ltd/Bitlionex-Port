/**
 * Icons, drawn inline.
 *
 * A local set rather than an icon package: the site needs thirteen glyphs, and
 * a dependency that ships three thousand of them to deliver thirteen is a lot
 * of bytes and one more thing to keep patched.
 *
 * Every icon is decorative. Each one takes its colour from the CSS context it
 * sits in via currentColor, is sized with the `size` prop, and carries
 * aria-hidden, because the text beside it already says what it means. An icon
 * that is the only content of a control gets its label from that control.
 */

const base = (size, className) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
  className,
})

export const Check = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const CheckCircle = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </svg>
)

export const ChevronDown = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const ArrowRight = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
)

export const Menu = ({ size = 20, className }) => (
  <svg {...base(size, className)}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </svg>
)

export const Close = ({ size = 20, className }) => (
  <svg {...base(size, className)}>
    <path d="M6 6 18 18" />
    <path d="M18 6 6 18" />
  </svg>
)

export const Alert = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
)

export const Shield = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

export const Loader = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <path d="M12 3v4" />
    <path d="M12 17v4" />
    <path d="M5.6 5.6 8.5 8.5" />
    <path d="m15.5 15.5 2.9 2.9" />
    <path d="M3 12h4" />
    <path d="M17 12h4" />
    <path d="m5.6 18.4 2.9-2.9" />
    <path d="m15.5 8.5 2.9-2.9" />
  </svg>
)

export const Search = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)



export const Compass = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5.2-5.2 2 2-5.2 5.2-2Z" />
  </svg>
)

export const TrendDown = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <path d="m3 7 6.5 6.5 4-4L21 17" />
    <path d="M21 12v5h-5" />
  </svg>
)

export const Clock = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
)

export const User = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
  </svg>
)

/**
 * A dial with a needle.
 *
 * Reads as "a reading taken", which is the point: a score is a measurement of
 * what the data showed, not a claim about what happens next. A target or a
 * tick would have read as "goal reached" and said the opposite.
 *
 * The needle stops just inside the arc on purpose. An earlier version ran it
 * to the arc's edge and the two lines merged into a single shape at 19px -
 * it read as a hump, not a dial. Ending it short of the rim is what makes the
 * needle legible as a separate mark.
 */
export const Gauge = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <path d="M4 17.5a8 8 0 0 1 16 0" />
    <path d="m12 17.5 4.2-6.2" />
    <circle cx="12" cy="17.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
)

/**
 * A pie with one slice carrying most of the weight.
 *
 * The two radii are 225 degrees apart rather than 90, so the reader sees a
 * dominant segment and a remainder. A clean quarter-split is the tidier icon
 * and the wrong one here - the risk being described is one holding quietly
 * becoming most of the portfolio, which an even split does not show.
 */
export const PieChart = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 12V3" />
    <path d="M12 12 5.6 18.4" />
  </svg>
)

/**
 * A wallet with a clasp. Custody - whose pocket the money is in.
 *
 * Drawn as the familiar two-part silhouette rather than a rounded rectangle
 * with a dot. The rectangle version was built first and read as a bank card or
 * a battery at 19px; the protruding clasp is the one detail that makes a
 * wallet a wallet at this size.
 */
export const Wallet = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <path d="M19 8V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1" />
    <path d="M21 10h-3.5a2 2 0 0 0 0 4H21z" />
  </svg>
)

export const Mail = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
)

export const MapPin = ({ size = 18, className }) => (
  <svg {...base(size, className)}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)
