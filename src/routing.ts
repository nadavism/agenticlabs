import type { Industry, PageId } from './types'
import { industries } from './types'

export const routeConfig: Array<{ id: PageId; path: string; label: string }> = [
  { id: 'home', path: '/', label: 'Overview' },
  { id: 'spend-intelligence', path: '/spend-intelligence', label: 'Spend Intelligence' },
  { id: 'vendor-discovery', path: '/vendor-discovery', label: 'Vendor Discovery' },
  { id: 'revenue-preservation', path: '/revenue-preservation', label: 'Revenue Preservation' },
  {
    id: 'additional-revenue-capture',
    path: '/additional-revenue-capture',
    label: 'Additional Revenue Capture',
  },
  { id: 'ai-diagnostic', path: '/ai-diagnostic', label: 'AI Diagnostic' },
]

const industrySet = new Set<string>(industries)

export function parseIndustry(value: string | null): Industry {
  return value && industrySet.has(value) ? (value as Industry) : 'general'
}

export function getIndustryFromSearch(search: string): Industry {
  return parseIndustry(new URLSearchParams(search).get('industry'))
}

export function updateIndustrySearch(search: string, industry: Industry): string {
  const params = new URLSearchParams(search)
  if (industry === 'general') {
    params.delete('industry')
  } else {
    params.set('industry', industry)
  }
  const value = params.toString()
  return value ? `?${value}` : ''
}

export function getPageId(pathname: string): PageId | null {
  return routeConfig.find((route) => route.path === pathname)?.id ?? null
}
