import PageHero from './PageHero.jsx'
import Reveal from './Reveal.jsx'
import { SuitsYouOrNot, WhereTheLineIs } from './AboutVisuals.jsx'
import { ABOUT } from '../data/content.js'
import { Check } from './icons.jsx'

// Which visual goes under which section, keyed by the `visual` field in
// ABOUT.sections. A section without one simply renders as prose, so adding a
// picture to another block later is a one-word change in the data.
const VISUALS = {
  line: WhereTheLineIs,
  fit: SuitsYouOrNot,
}

/**
 * About page.
 *
 * Four sections rather than one long scroll of prose. The last two, "who this
 * is for" and "what we are not", are the ones that do the most work: telling
 * someone the product is not for them saves both sides a phone call.
 *
 * Two of the four carry a visual, because a page of nothing but paragraphs
 * reads as filler no matter how good the paragraphs are. They sit OUTSIDE the
 * .prose wrapper on purpose: .prose styles every p, h2 and ul inside it, so a
 * panel nested in there would inherit body-text spacing and colour and come
 * out looking like a paragraph with a border on it.
 */
export default function About() {
  return (
    <>
      <PageHero eyebrow={ABOUT.eyebrow} title={ABOUT.h1} lede={ABOUT.lede} />

      <section className="section">
        <div className="wrap">
          {ABOUT.sections.map((section) => {
            const Visual = section.visual ? VISUALS[section.visual] : null

            const body = (
              <div className="prose">
                <h2>{section.heading}</h2>
                {section.paras.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {section.list && (
                  <ul style={{ listStyle: 'none', padding: 0, gap: 12, display: 'grid' }}>
                    {section.list.map((item) => (
                      <li key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <Check size={18} style={{ flex: 'none', marginTop: 5, color: 'var(--mint-deep)' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )

            // A section with an image becomes a two-column split. The side is
            // set per section rather than alternating automatically, so moving
            // an image means editing the data, not counting from the top.
            if (section.image) {
              const reversed = section.image.side === 'left'
              return (
                <Reveal
                  key={section.id}
                  id={section.id}
                  className={`about-block split${reversed ? ' split--reverse' : ''}`}
                >
                  {body}
                  <div className="split__visual">
                    <img
                      className="section-figure section-figure--wide"
                      src={section.image.src}
                      width="900"
                      height="675"
                      alt={section.image.alt}
                    />
                  </div>
                </Reveal>
              )
            }

            return (
              <Reveal key={section.id} id={section.id} className="about-block">
                {body}
                {Visual && (
                  <div className="about-visual">
                    <Visual />
                  </div>
                )}
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="section section--surface section--tight">
        <div className="wrap">
          <Reveal className="centered-page__inner" style={{ maxWidth: 640 }}>
            <h2>{ABOUT.cta.heading}</h2>
            <p className="lede">{ABOUT.cta.body}</p>
            <div className="centered-page__actions">
              <a className="btn btn--primary" href={ABOUT.cta.primaryHref}>
                {ABOUT.cta.primaryCta}
              </a>
              <a className="btn btn--ghost" href={ABOUT.cta.secondaryHref} data-scroll="#register">
                {ABOUT.cta.secondaryCta}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
