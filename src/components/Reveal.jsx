/**
 * Reveal - fades a block in as it scrolls into view.
 *
 * The hiding is done entirely in CSS and is gated on the `js` class that
 * index.html adds inline. A browser without JS therefore keeps every section
 * visible, and so does the prerendered HTML a crawler reads, which never runs
 * the observer at all.
 *
 * useReveal (src/hooks/useReveal.js) watches every `.reveal` element on the
 * page, so this component only has to add the class.
 */
export default function Reveal({ children, as: Tag = 'div', className = '', ...rest }) {
  return (
    <Tag className={`reveal ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}
