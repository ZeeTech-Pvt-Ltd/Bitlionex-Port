import { CheckCircle, Close, Compass, User } from './icons.jsx'

/**
 * Visuals for the About page.
 *
 * Built from the site's own copy rather than from data, because About has no
 * data to plot - it is four prose sections about what the service is. What it
 * does have is two claims that are easier to read as a picture than as
 * paragraphs: who does what, and who this is for.
 *
 * Neither carries a number. That is deliberate. Every figure on the site has
 * to be sourced, and the honest way to be visual without one is to show
 * structure - two columns, a divider, a tick and a cross.
 *
 * Both use the same two-column panel, so they read as a pair on one page
 * rather than as two things that happen to be similar.
 */

/** The responsibility boundary. The claim the whole product rests on. */
export function WhereTheLineIs() {
  const sides = [
    {
      icon: User,
      who: 'You',
      lines: [
        'Choose what to buy',
        'Hold the coins yourself',
        'Decide when to sell',
        'Keep your own keys',
      ],
    },
    {
      icon: Compass,
      who: 'Us',
      tone: 'us',
      lines: [
        'Read the market data',
        'Score every position',
        'Show you the whole picture',
        'Flag what changed since you last looked',
      ],
    },
  ]

  return (
    <div className="panel about-panel">
      <div className="panel__head">
        <div>
          <p className="panel__title">Where The Line Is</p>
          <p className="panel__sub">What you decide, and what we do</p>
        </div>
        <span className="panel__tag">No trades placed</span>
      </div>

      <div className="duty">
        {sides.map((side) => {
          const Icon = side.icon
          return (
            <div className={`duty__col${side.tone === 'us' ? ' duty__col--us' : ''}`} key={side.who}>
              <p className="duty__who">
                <Icon size={17} />
                {side.who}
              </p>
              <ul>
                {side.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <p className="about-panel__foot">
        Nothing crosses this line. Your coins never move because you signed up here.
      </p>
    </div>
  )
}

/** Who the service is for, said plainly enough that the wrong person leaves. */
export function SuitsYouOrNot() {
  const sides = [
    {
      mark: 'yes',
      who: 'It fits if',
      lines: [
        'You already hold a few coins',
        'You have been at this a while',
        'You want the whole picture in one place',
        'You make your own decisions',
      ],
    },
    {
      mark: 'no',
      who: 'It does not fit if',
      lines: [
        'You want signals to copy',
        'You want someone trading for you',
        'You want a promise about returns',
        'You want personal financial advice',
      ],
    },
  ]

  return (
    <div className="panel about-panel">
      <div className="panel__head">
        <div>
          <p className="panel__title">Suits You, Or It Does Not</p>
          <p className="panel__sub">Both answers are useful</p>
        </div>
      </div>

      <div className="duty">
        {sides.map((side) => {
          const Mark = side.mark === 'yes' ? CheckCircle : Close
          return (
            <div className={`duty__col duty__col--${side.mark}`} key={side.who}>
              <p className="duty__who">{side.who}</p>
              <ul>
                {side.lines.map((line) => (
                  <li key={line}>
                    <Mark size={15} />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <p className="about-panel__foot">
        If the second column is you, that is a genuinely useful thing to know before you sign up.
      </p>
    </div>
  )
}
