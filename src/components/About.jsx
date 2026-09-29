import PageHero from './PageHero.jsx'
import Reveal from './Reveal.jsx'
import { ABOUT } from '../data/content.js'
import { Check } from './icons.jsx'

/**
 * About page.
 *
 * Four sections rather than one long scroll of prose. The last two, "who this
 * is for" and "what we are not", are the ones that do the most work: telling
 * someone the product is not for them saves both sides a phone call.
 *
 * Three of the four carry an image in a two-column split, alternating right,
 * left, right down the page. The side is set per section in the data rather
 * than derived from its position, so moving an image means editing one word
 * instead of counting from the top.
 *
 * The prose sits in its own .prose wrapper and the image outside it, because
 * .prose styles every p, h2 and ul inside it - which is right for body text
 * and wrong for anything else that happens to land in the same div.
 */
export default function About() {
  return (
    <>
      <PageHero eyebrow={ABOUT.eyebrow} title={ABOUT.h1} lede={ABOUT.lede} />

      <section className="section">
        <div className="wrap">
          {ABOUT.sections.map((section) => {
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
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* The same closing band the homepage uses, rather than a lighter
          variation of it. A page that ends on the same note reads as one site;
          the earlier version here was a plain tinted strip with centred text
          and nothing else in it, which looked unfinished next to four sections
          that all carry an image. */}
      <section className="section section--tight">
        <div className="wrap">
          <Reveal className="cta">
            <div className="cta__blob cta__blob--a" aria-hidden="true" />
            <div className="cta__blob cta__blob--b" aria-hidden="true" />
            <h2>{ABOUT.cta.heading}</h2>
            <p>{ABOUT.cta.body}</p>
            <div className="cta__actions">
              <a className="btn btn--on-deep" href={ABOUT.cta.primaryHref}>
                {ABOUT.cta.primaryCta}
              </a>
              <a
                className="btn btn--ghost"
                href={ABOUT.cta.secondaryHref}
                data-scroll="#register"
                style={{ color: '#fff', borderColor: 'rgba(255, 255, 255, 0.45)' }}
              >
                {ABOUT.cta.secondaryCta}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
