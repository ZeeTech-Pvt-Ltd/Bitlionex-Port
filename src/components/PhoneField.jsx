import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { countries } from '../data/countries.js'
import { getCountry } from '../lib/phoneFormat.js'
import { ChevronDown, Search } from './icons.jsx'

/** Shown at the top of the picker before anything is typed. */
const POPULAR = ['AU', 'NZ', 'GB', 'US', 'IN', 'PK', 'PH', 'ZA']

const byIso = new Map(countries.map(([iso, name, dial]) => [iso, { iso, name, dial }]))

function Flag({ iso, className = '' }) {
  const [ok, setOk] = useState(true)
  if (!ok) {
    // A flag we cannot resolve leaves the dial code as the identifier rather
    // than a broken-image icon.
    return <span className={`flag flag--missing ${className}`} aria-hidden="true" />
  }
  return (
    <img
      className={`flag ${className}`}
      src={`/flags/${iso.toLowerCase()}.svg`}
      alt=""
      width="22"
      height="16"
      loading="lazy"
      decoding="async"
      onError={() => setOk(false)}
    />
  )
}

/**
 * The country selector and the phone input, presented as one field.
 *
 * Built as a combobox rather than a <select> because the list carries a flag,
 * a name and a dial code per row, and because a searchable list of 240
 * countries is unusable without type-to-filter. The ARIA wiring is the whole
 * point of hand-rolling it: role=combobox on the search box, role=listbox on
 * the list, role=option on each row, and aria-activedescendant tracking the
 * highlighted row so a screen reader announces it as the visitor arrows down.
 *
 * Keyboard contract:
 *   ArrowDown/ArrowUp  move the highlight (wrapping at the ends)
 *   Home/End           first and last
 *   Enter              select the highlighted row
 *   Escape             close and return focus to the trigger
 *   after selecting    focus returns to the phone input
 */
export default function PhoneField({
  country,
  phone,
  placeholder,
  onCountryChange,
  onPhoneChange,
  onBlur,
  error,
  errorId,
}) {
  const uid = useId()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const wrapRef = useRef(null)
  const triggerRef = useRef(null)
  const searchRef = useRef(null)
  const listRef = useRef(null)
  const inputRef = useRef(null)

  const selected = byIso.get(country) ?? getCountry(country)

  const { popular, rest, flat } = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^\+/, '')
    if (!q) {
      const pop = POPULAR.map((iso) => byIso.get(iso)).filter(Boolean)
      const others = countries
        .filter(([iso]) => !POPULAR.includes(iso))
        .map(([iso, name, dial]) => ({ iso, name, dial }))
      return { popular: pop, rest: others, flat: [...pop, ...others] }
    }
    const matches = countries
      .map(([iso, name, dial]) => ({ iso, name, dial }))
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.iso.toLowerCase().includes(q) ||
          String(c.dial).startsWith(q),
      )
    return { popular: [], rest: matches, flat: matches }
  }, [query])

  // Keep the highlight inside the filtered list as it shrinks.
  useEffect(() => {
    setActive((a) => (flat.length ? Math.min(a, flat.length - 1) : -1))
  }, [flat.length])

  // Close on an outside pointer press. pointerdown rather than click so the
  // list closes before a following click lands on whatever is underneath.
  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  // Focus the search box when the list opens.
  useEffect(() => {
    if (open) searchRef.current?.focus()
  }, [open])

  // Keep the highlighted row on screen while arrowing through a long list.
  useEffect(() => {
    if (!open || active < 0) return
    const el = listRef.current?.querySelector(`[data-index="${active}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [active, open])

  const openList = () => {
    setQuery('')
    setActive(0)
    setOpen(true)
  }

  const select = (iso) => {
    onCountryChange(iso)
    setOpen(false)
    // Return focus to the number input - the visitor's next act is to type.
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  const onSearchKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => (a < 0 ? 0 : Math.min(flat.length - 1, a + 1)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => (a <= 0 ? -1 : a - 1))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActive(flat.length ? 0 : -1)
    } else if (e.key === 'End') {
      e.preventDefault()
      setActive(flat.length ? flat.length - 1 : -1)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const target = flat[active] ?? flat[0]
      if (target) select(target.iso)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      triggerRef.current?.focus()
    }
  }

  const renderRow = (c, i) => (
    <li
      key={c.iso}
      id={`${uid}-opt-${c.iso}`}
      data-index={i}
      role="option"
      aria-selected={active === i}
      className={`picker__option${active === i ? ' is-active' : ''}${c.iso === country ? ' is-selected' : ''}`}
      // mousemove rather than mouseenter: Chrome fires mouseenter after a
      // scroll, which would steal the highlight the keyboard just set.
      onMouseMove={() => setActive(i)}
      onClick={() => select(c.iso)}
    >
      <Flag iso={c.iso} />
      <span className="picker__name">{c.name}</span>
      <span className="picker__dial tnum">+{c.dial}</span>
    </li>
  )

  const activeId = open && active >= 0 && flat[active] ? `${uid}-opt-${flat[active].iso}` : undefined

  return (
    <div className="field">
      {/* Stable id, not the generated one. The browser verification harness
          in .arttmp/ and password managers both select on id="phone", and
          only one registration form is ever mounted per page. */}
      <label htmlFor="phone">
        Phone Number <span className="field__req" aria-hidden="true">*</span>
      </label>

      <div
        className={`phone${error ? ' is-invalid' : ''}`}
        ref={wrapRef}
        onBlur={(e) => {
          // Only bubble a blur that leaves the whole composite field.
          if (!wrapRef.current?.contains(e.relatedTarget)) onBlur?.()
        }}
      >
        <button
          type="button"
          ref={triggerRef}
          className="phone__trigger"
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
              e.preventDefault()
              openList()
            }
          }}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={`${uid}-list`}
          aria-label={`Country: ${selected.name}, dial code +${selected.dial}. Change country`}
        >
          <Flag iso={selected.iso} />
          <span className="phone__dial tnum">+{selected.dial}</span>
          <ChevronDown className={`phone__chevron${open ? ' is-open' : ''}`} width={16} height={16} />
        </button>

        <input
          ref={inputRef}
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={placeholder}
          value={phone}
          required
          onChange={(e) => onPhoneChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="phone__input"
        />

        {open && (
          <div className="picker">
            <div className="picker__search">
              <Search width={16} height={16} aria-hidden="true" />
              <input
                ref={searchRef}
                type="search"
                role="combobox"
                aria-expanded="true"
                aria-controls={`${uid}-list`}
                aria-activedescendant={activeId}
                aria-label="Search countries"
                placeholder="Search country or code"
                autoComplete="off"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(0)
                }}
                onKeyDown={onSearchKeyDown}
              />
            </div>

            <ul id={`${uid}-list`} ref={listRef} role="listbox" aria-label="Countries" className="picker__list">
              {popular.length > 0 && (
                <>
                  <li className="picker__group" role="presentation">
                    Common
                  </li>
                  {popular.map((c, i) => renderRow(c, i))}
                  <li className="picker__group" role="presentation">
                    All countries
                  </li>
                </>
              )}
              {rest.map((c, i) => renderRow(c, popular.length + i))}
              {flat.length === 0 && (
                <li className="picker__empty" role="presentation">
                  No countries match “{query}”.
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {error && (
        <p className="field__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}
