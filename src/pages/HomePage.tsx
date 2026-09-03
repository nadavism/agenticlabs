import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { resolveContent } from '../content'
import { ArrowDownRight, pageIcons } from '../components/Icons'
import { FeatureBand } from '../components/FeatureBand'
import { HeroMark } from '../components/HeroMark'
import { SiteShell } from '../components/SiteShell'
import { getIndustryFromSearch, routeConfig, updateIndustrySearch } from '../routing'

export function HomePage() {
  const location = useLocation()
  const industry = getIndustryFromSearch(location.search)
  const content = resolveContent('home', industry)

  useEffect(() => {
    document.title = 'Agentic Labs | Order.co'
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.append(canonical)
    }
    canonical.href = '/'
  }, [])

  return (
    <SiteShell activePage="home">
      <section className="page-hero page-hero--home">
        <div className="site-container page-hero__grid content-swap" key={industry}>
          <div className="page-hero__copy">
            <h1>{content.title}</h1>
            <h2>{content.headline}</h2>
            <p className="page-hero__lede">{content.introduction}</p>
          </div>
          <HeroMark pageId="home" />
        </div>
      </section>
      <FeatureBand outcomes={content.outcomes} label={`${content.title} outcomes`} />
      <section className="opportunity-index" aria-label="Agentic Labs pages">
        <div className="site-container opportunity-grid">
          {routeConfig.slice(1).map((route) => {
            const page = resolveContent(route.id, industry)
            const Icon = pageIcons[route.id]
            return (
              <Link
                className="opportunity-card"
                key={route.id}
                to={`${route.path}${updateIndustrySearch(location.search, industry)}`}
              >
                <div className="opportunity-card__top">
                  <Icon aria-hidden="true" />
                  <ArrowDownRight aria-hidden="true" />
                </div>
                <h2>{page.title}</h2>
                <p>{page.headline}</p>
              </Link>
            )
          })}
        </div>
      </section>
    </SiteShell>
  )
}
