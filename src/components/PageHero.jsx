/**
 * PageHero - the band at the top of every inner page.
 *
 * The two discs are the same mint and sand as the homepage hero, at a lower
 * opacity, so an inner page is recognisably the same site without repeating
 * the homepage's composition.
 *
 * There is no breadcrumb trail here. One was built and then removed at the
 * operator's request, and the BreadcrumbList structured data came out with it:
 * markup describing a trail that is not on the page is against Google's
 * structured-data guidelines, so the two had to go together. The header nav
 * still carries the link home. If the trail is ever wanted back, it has to be
 * restored in both places at once.
 */
export default function PageHero({ eyebrow, title, lede, children }) {
  return (
    <section className="page-hero">
      <div className="page-hero__blob page-hero__blob--mint" aria-hidden="true" />
      <div className="page-hero__blob page-hero__blob--sand" aria-hidden="true" />

      <div className="wrap page-hero__inner">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {children}
      </div>
    </section>
  )
}
