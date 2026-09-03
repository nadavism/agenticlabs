import { pageIcons } from './Icons'
import type { PageId } from '../types'

export function HeroMark({ pageId }: { pageId: PageId }) {
  const Icon = pageIcons[pageId]
  return (
    <div className="hero-mark" aria-hidden="true">
      <span className="hero-mark__ring hero-mark__ring--outer" />
      <span className="hero-mark__ring hero-mark__ring--middle" />
      <span className="hero-mark__ring hero-mark__ring--inner" />
      <span className="hero-mark__dot hero-mark__dot--one" />
      <span className="hero-mark__dot hero-mark__dot--two" />
      <span className="hero-mark__dot hero-mark__dot--three" />
      <Icon />
    </div>
  )
}
