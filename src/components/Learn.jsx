import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import { LEARN } from '../data/content.js'

/**
 * Learn - the paragraph from the content document about learning while you
 * trade, beside the dashboard illustration.
 *
 * The image sits on the left so this section does not repeat the What Is
 * layout immediately above it. The illustration is the operator's own asset,
 * not stock photography.
 */
export default function Learn() {
  return (
    <section className="section section--paper" id="learn">
      <div className="wrap">
        <div className="split split--reverse">
          <Reveal>
            <SectionHead title={LEARN.h2} />
            <p style={{ color: 'var(--muted)', lineHeight: 1.72 }}>{LEARN.body}</p>
          </Reveal>

          <Reveal className="split__visual">
            <img
              className="section-figure"
              src={LEARN.image.src}
              srcSet={LEARN.image.srcSet}
              sizes="(max-width: 560px) calc(100vw - 40px), 520px"
              width="1000"
              height="1000"
              loading="lazy"
              decoding="async"
              alt={LEARN.image.alt}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
