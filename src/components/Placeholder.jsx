/**
 * Placeholder - a value the business has not set yet.
 *
 * Rendered in the same bracketed form the data files use inline, so one grep
 * finds every one of them and the build can count how many are still
 * unresolved:
 *
 *   [PLACEHOLDER: registered entity name]
 *
 * The bracket and the word both stay, and the label is uppercased, because
 * this is meant to be unmissable. A token that reads as finished gets shipped;
 * a loud one gets replaced.
 *
 * The label is exposed to assistive technology as written, so the gap is
 * audible and not only visible.
 */
export default function Placeholder({ label = 'to be confirmed' }) {
  return (
    <span className="ph">
      [PLACEHOLDER: <span className="sr-only">{label}</span>
      <span aria-hidden="true">{label.toUpperCase()}</span>]
    </span>
  )
}
