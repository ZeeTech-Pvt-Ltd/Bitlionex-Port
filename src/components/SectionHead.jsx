/**
 * SectionHead - the eyebrow, heading and lede that open most sections.
 *
 * One component so the vertical rhythm above every section is identical. The
 * repeated gaps are the thing that drifts first when each section lays out its
 * own heading.
 */
export default function SectionHead({ eyebrow, title, lede, center = false, as: Tag = 'h2', id }) {
  return (
    <div className={`section-head${center ? ' section-head--center' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag id={id}>{title}</Tag>
      {lede && <p className="lede">{lede}</p>}
    </div>
  )
}
