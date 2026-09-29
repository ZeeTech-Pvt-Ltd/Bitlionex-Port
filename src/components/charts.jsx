import { useId, useMemo, useState } from 'react'

/**
 * Chart primitives, drawn as plain SVG.
 *
 * House specs, applied here once so no individual chart can drift from them:
 *
 *   Line          2px, round join and cap.
 *   Area fill     the line's own hue at 10% opacity. A wash, never a block.
 *   Marker        r=4, so 8px across, with a 2px ring in the surface colour so
 *                 it stays legible where it crosses the line.
 *   Grid          one step off surface, hairline, solid. Never dashed.
 *   Text          always a text token, never the series colour. A tick or
 *                 label never wears the hue of the thing it labels.
 *   Bars          rounded at the data end, square at the baseline.
 *
 * Every chart here carries a hover layer, because a chart on a web page is
 * interactive whether or not it was designed to be. The tooltip is the
 * reader's way in to the exact numbers, which is also what lets the visible
 * labels stay sparing.
 */

const round = (n) => Math.round(n * 10) / 10

/** Builds the "M x y L x y ..." path for a series scaled into a box. */
function linePath(points, x0, y0, w, h, min, max) {
  const span = max - min || 1
  return points
    .map((v, i) => {
      const x = x0 + (i / Math.max(points.length - 1, 1)) * w
      const y = y0 + h - ((v - min) / span) * h
      return `${i === 0 ? 'M' : 'L'}${round(x)} ${round(y)}`
    })
    .join(' ')
}

/** Same geometry as linePath, closed along the baseline, for the area wash. */
function areaPath(points, x0, y0, w, h, min, max) {
  const line = linePath(points, x0, y0, w, h, min, max)
  const bottom = y0 + h
  const right = x0 + w
  return `${line} L${round(right)} ${round(bottom)} L${round(x0)} ${round(bottom)} Z`
}

/** Nice round tick values, so an axis never reads "3,847.22". */
function niceTicks(min, max, count = 4) {
  const span = max - min || 1
  const raw = span / count
  const mag = Math.pow(10, Math.floor(Math.log10(raw)))
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) || mag * 10
  const start = Math.floor(min / step) * step
  const out = []
  for (let v = start; v <= max + step * 0.001; v += step) {
    if (v >= min - step * 0.001) out.push(round(v))
  }
  return out
}

/* -------------------------------------------------------------------------
   Sparkline - a trend the eye reads without stopping. No axes, no labels.
   Always paired with the number it belongs to, never standing alone.
   ------------------------------------------------------------------------- */

export function Sparkline({ data, tone = 'var(--series-1)', width = 108, height = 34, label }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const pad = 3
  const path = linePath(data, pad, pad, width - pad * 2, height - pad * 2, min, max)
  const lastX = width - pad
  const span = max - min || 1
  const lastY = pad + (height - pad * 2) - ((data[data.length - 1] - min) / span) * (height - pad * 2)
  const gid = useId()

  return (
    <svg
      className="chart"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={label}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={tone} stopOpacity="0.18" />
          <stop offset="100%" stopColor={tone} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath(data, pad, pad, width - pad * 2, height - pad * 2, min, max)} fill={`url(#${gid})`} />
      <path d={path} className="chart__line" stroke={tone} />
      <circle cx={lastX} cy={lastY} r="4" className="chart__dot" fill={tone} />
    </svg>
  )
}

/* -------------------------------------------------------------------------
   LineChart - the workhorse. One series, one axis, hover crosshair, tooltip.
   A single series needs no legend box: the panel heading already names it.
   ------------------------------------------------------------------------- */

export function LineChart({
  data,
  height = 170,
  tone = 'var(--series-1)',
  formatValue = (v) => String(Math.round(v)),
  formatLow,
  formatHigh,
  pointLabels,
  ariaLabel,
}) {
  const [hover, setHover] = useState(null)
  const gid = useId()

  // The left and bottom padding are sized for the axis text at 12px - the
  // smallest size this site sets anywhere. Anything narrower and the y-axis
  // labels collide with the plot.
  const W = 560
  const H = height
  const padL = 54
  const padR = 16
  const padT = 16
  const padB = 28
  const plotW = W - padL - padR
  const plotH = H - padT - padB

  const min = Math.min(...data)
  const max = Math.max(...data)
  const ticks = useMemo(() => niceTicks(min, max), [min, max])
  // Give the axis room to breathe past the data, so the line never touches
  // the frame.
  const axisMin = Math.min(min, ticks[0])
  const axisMax = Math.max(max, ticks[ticks.length - 1])

  const xAt = (i) => padL + (i / Math.max(data.length - 1, 1)) * plotW
  const yAt = (v) => padT + plotH - ((v - axisMin) / (axisMax - axisMin || 1)) * plotH

  // The overlay is one wide hit target rather than a target per point: 40
  // dots would be 40 tiny targets.
  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const rel = ((e.clientX - rect.left) / rect.width) * W
    const frac = (rel - padL) / plotW
    const idx = Math.round(frac * (data.length - 1))
    setHover(Math.max(0, Math.min(data.length - 1, idx)))
  }

  const label = formatLow && formatHigh ? { low: formatLow(data[0]), high: formatHigh(min) } : null
  const hv = hover === null ? null : data[hover]

  return (
    <div style={{ position: 'relative' }}>
      <svg
        className="chart"
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label={ariaLabel}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tone} stopOpacity="0.14" />
            <stop offset="100%" stopColor={tone} stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Gridlines first, so the data sits on top of the furniture. */}
        <g className="chart__grid">
          {ticks.map((t) => (
            <line key={t} x1={padL} y1={round(yAt(t))} x2={W - padR} y2={round(yAt(t))} />
          ))}
        </g>

        {ticks.map((t) => (
          <text key={t} className="chart__axis" x={padL - 9} y={round(yAt(t)) + 4} textAnchor="end">
            {formatValue(t)}
          </text>
        ))}

        <path d={areaPath(data, padL, padT, plotW, plotH, axisMin, axisMax)} fill={`url(#${gid})`} />
        <path d={linePath(data, padL, padT, plotW, plotH, axisMin, axisMax)} className="chart__line" stroke={tone} />

        {/* Crosshair */}
        {hover !== null && (
          <g>
            <line
              x1={round(xAt(hover))}
              y1={padT}
              x2={round(xAt(hover))}
              y2={padT + plotH}
              stroke={tone}
              strokeWidth="1"
              opacity="0.35"
            />
            <circle cx={round(xAt(hover))} cy={round(yAt(hv))} r="5" className="chart__dot" fill={tone} />
          </g>
        )}

        {/* End marker and its direct label. The label rides the line end
            rather than sitting in a box on every point. */}
        {hover === null && (
          <>
            <circle
              cx={round(xAt(data.length - 1))}
              cy={round(yAt(data[data.length - 1]))}
              r="4.5"
              className="chart__dot"
              fill={tone}
            />
            <text
              className="chart__axis"
              x={round(xAt(data.length - 1)) - 2}
              y={round(yAt(data[data.length - 1])) - 12}
              textAnchor="end"
              style={{ fontWeight: 700, fill: 'var(--ink)', fontSize: 12 }}
            >
              {formatValue(data[data.length - 1])}
            </text>
          </>
        )}

        {label && (
          <text className="chart__axis" x={padL} y={H - 6} textAnchor="start">
            {label.low}
          </text>
        )}
        {pointLabels?.last && (
          <text className="chart__axis" x={W - padR} y={H - 6} textAnchor="end">
            {pointLabels.last}
          </text>
        )}
      </svg>

      {hover !== null && (
        <div
          role="status"
          aria-live="off"
          style={{
            position: 'absolute',
            top: 6,
            left: `${(xAt(hover) / W) * 100}%`,
            transform: 'translateX(-50%)',
            background: 'var(--indigo-deep)',
            color: '#fff',
            borderRadius: 10,
            padding: '7px 11px',
            fontSize: '0.78rem',
            fontWeight: 600,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <span style={{ opacity: 0.75, fontWeight: 500 }}>
            {pointLabels?.index ? `${pointLabels.index(hover)} ` : ''}
          </span>
          {formatValue(hv)}
        </div>
      )}
    </div>
  )
}

