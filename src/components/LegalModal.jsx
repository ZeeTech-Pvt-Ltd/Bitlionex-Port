import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Close } from './icons.jsx'
import RichText from './RichText.jsx'

/**
 * Legal documents, opened in place.
 *
 * The consent checkbox in the registration form links to the Privacy Policy
 * and the Terms. Sending someone to /privacy mid-signup loses everything they
 * had typed, so both links open the document over the form instead. The same
 * documents are still real pages at their own URLs, which is what the footer
 * links to and what a search engine indexes.
 *
 * Docs render from src/data/legal.js, the same source the routes use, so the
 * modal and the page can never say different things.
 */

const LegalContext = createContext({ openLegal: () => {}, closeLegal: () => {}, openDoc: null })

export function useLegal() {
  return useContext(LegalContext)
}

export function LegalProvider({ children }) {
  const [openDoc, setOpenDoc] = useState(null) // 'terms' | 'privacy' | 'risk' | null
  // The documents are fetched the first time one is opened, not imported.
  // They are about 30 KB of prose, they are already in the prerendered HTML of
  // the three legal routes, and a visitor who never opens the modal should
  // never download them. As a static import this file sits in the layout, so
  // it was pulling them into every page on the site.
  const [docs, setDocs] = useState(null)
  const closeRef = useRef(null)
  // Whatever had focus when the modal opened, so it can be handed back.
  const returnFocusRef = useRef(null)

  const openLegal = useCallback((id) => {
    returnFocusRef.current = document.activeElement
    setOpenDoc(id)
  }, [])

  const closeLegal = useCallback(() => {
    setOpenDoc(null)
    // Put focus back where it was, or a keyboard user is dropped at the top
    // of the document with no idea where they are.
    const el = returnFocusRef.current
    if (el && typeof el.focus === 'function') el.focus()
  }, [])

  // Escape closes, and the page behind stops scrolling while the modal is up.
  useEffect(() => {
    if (!openDoc) return undefined

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeLegal()
        return
      }
      // Keep Tab inside the dialog. Two focusable things live in here, the
      // close button and the scrollable body, so the cycle is short.
      if (e.key !== 'Tab') return
      const root = closeRef.current?.closest('[role="dialog"]')
      if (!root) return
      const focusables = root.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])')
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [openDoc, closeLegal])

  useEffect(() => {
    if (!openDoc || docs) return undefined
    let cancelled = false
    import('../data/legal.js').then((m) => {
      if (!cancelled) setDocs(m.LEGAL_DOCS)
    })
    return () => {
      cancelled = true
    }
  }, [openDoc, docs])

  const doc = openDoc && docs ? docs[openDoc] : null

  return (
    <LegalContext.Provider value={{ openLegal, closeLegal, openDoc }}>
      {children}

      {doc && (
        <div
          className="modal"
          onClick={(e) => {
            // Only a click on the backdrop itself closes it. Without the
            // target check, a click that started inside the document and
            // ended on the backdrop would close the dialog mid-sentence.
            if (e.target === e.currentTarget) closeLegal()
          }}
        >
          <div className="modal__box" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title">
            <div className="modal__head">
              <h2 id="legal-modal-title">{doc.title}</h2>
              <button
                type="button"
                className="modal__close"
                onClick={closeLegal}
                ref={closeRef}
                aria-label={`Close ${doc.title}`}
              >
                <Close size={18} />
              </button>
            </div>
            <div className="modal__body prose">
              <p className="prose__meta">Last reviewed {doc.updated}</p>
              <p>{doc.intro}</p>
              {doc.sections.map((section) => (
                <div key={section.id}>
                  <h3 id={`modal-${section.id}`}>{section.heading}</h3>
                  {section.paras.map((p, i) => (
                    <RichText as="p" text={p} key={i} />
                  ))}
                  {section.list && (
                    <ul>
                      {section.list.map((item, i) => (
                        <RichText as="li" text={item} key={i} />
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </LegalContext.Provider>
  )
}
