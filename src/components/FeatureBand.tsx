import type { Outcome } from '../types'

export function FeatureBand({ outcomes, label }: { outcomes: Outcome[]; label: string }) {
  return (
    <section className="feature-band-section" aria-label={label}>
      <div className="site-container feature-band">
        {outcomes.map((outcome) => (
          <article className="feature-highlight" key={outcome.id}>
            <h3>{outcome.heading}</h3>
            <p>{outcome.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
