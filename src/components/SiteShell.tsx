import { useEffect, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IndustrySelect, industryLabels } from './IndustrySelect'
import { SolutionsMenu } from './SolutionsMenu'
import { getIndustryFromSearch, routeConfig, updateIndustrySearch } from '../routing'
import type { Industry, PageId } from '../types'

function buildHref(path: string, search: string, industry: Industry) {
  return `${path}${updateIndustrySearch(search, industry)}`
}

export function SiteShell({ activePage, children }: { activePage: PageId; children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const industry = getIndustryFromSearch(location.search)
  const overviewRoute = routeConfig[0]

  useEffect(() => {
    const rawIndustry = new URLSearchParams(location.search).get('industry')
    if (rawIndustry && industry === 'general') {
      navigate(
        {
          pathname: location.pathname,
          search: updateIndustrySearch(location.search, 'general'),
          hash: location.hash,
        },
        { replace: true, preventScrollReset: true },
      )
    }
  }, [industry, location.hash, location.pathname, location.search, navigate])

  const changeIndustry = (nextIndustry: Industry) => {
    navigate(
      {
        pathname: location.pathname,
        search: updateIndustrySearch(location.search, nextIndustry),
        hash: location.hash,
      },
      { preventScrollReset: true },
    )
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-container site-header__inner">
          <Link className="brand-lockup" to={buildHref('/', location.search, industry)}>
            <span className="order-wordmark" data-testid="order-wordmark">
              Order.co
            </span>
            <span className="brand-divider" aria-hidden="true" />
            <span className="agentic-label">Agentic Labs</span>
          </Link>
          <IndustrySelect industry={industry} onChange={changeIndustry} />
        </div>
      </header>
      <div className="context-bar">
        <div className="site-container context-bar__inner">
          <nav className="opportunity-nav" aria-label="Primary navigation">
            <Link
              aria-current={activePage === overviewRoute.id ? 'page' : undefined}
              className={activePage === overviewRoute.id ? 'is-active' : undefined}
              to={buildHref(overviewRoute.path, location.search, industry)}
            >
              {overviewRoute.label}
            </Link>
            <SolutionsMenu
              activePage={activePage}
              industry={industry}
              search={location.search}
            />
          </nav>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        Content shown for {industryLabels[industry]}
      </p>
      <main id="main-content">{children}</main>
    </div>
  )
}
