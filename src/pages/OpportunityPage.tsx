import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FeatureBand } from '../components/FeatureBand'
import { HeroMark } from '../components/HeroMark'
import { SiteShell } from '../components/SiteShell'
import { getHeroLede, resolveContent } from '../content'
import { getIndustryFromSearch } from '../routing'
import type { PageId } from '../types'

export function OpportunityPage({ pageId }: { pageId: Exclude<PageId, 'home'> }) {
  const location = useLocation()
  const industry = getIndustryFromSearch(location.search)
  const content = resolveContent(pageId, industry)
  const lede = getHeroLede(pageId, industry)

  useEffect(() => {
    document.title = `${content.title} | Order.co Agentic Labs`
    const canonicalPath = `/${pageId}`
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.append(canonical)
    }
    canonical.href = canonicalPath
  }, [content.title, pageId])

  return (
    <SiteShell activePage={pageId}>
      <section className={`page-hero page-hero--${pageId}`}>
        <div className="site-container page-hero__grid content-swap" key={industry}>
          <div className="page-hero__copy">
            <h1>{content.title}</h1>
            <h2>{content.headline}</h2>
            <p className="page-hero__lede">{lede}</p>
          </div>
          <HeroMark pageId={pageId} />
        </div>
      </section>
      <FeatureBand outcomes={content.outcomes} label={`${content.title} outcomes`} />
    </SiteShell>
  )
}
