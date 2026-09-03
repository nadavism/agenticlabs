import { describe, expect, it } from 'vitest'
import { generalContent, getHeroLede, industryOverrides, resolveContent } from './content'
import { industries, pageIds, type Industry, type PageId } from './types'

const roiExpectations: Partial<Record<PageId, string>> = {
  'spend-intelligence': 'Customers generate an average 25× ROI.',
  'vendor-discovery': 'Customers generate an average 9× ROI.',
  'revenue-preservation': 'Customers generate an average 16× ROI.',
  'additional-revenue-capture': 'Customers generate an average 30× ROI.',
}

describe('content registry', () => {
  it.each(
    industries.flatMap((industry) => pageIds.map((pageId) => [industry, pageId] as const)),
  )('resolves complete %s content for %s', (industry, pageId) => {
    const page = resolveContent(pageId, industry)
    expect(page.title).toBeTruthy()
    expect(page.headline).toBeTruthy()
    expect(page.introduction).toBeTruthy()
    expect(page.outcomes).toHaveLength(5)
    expect(page.outcomes.every((outcome) => outcome.heading && outcome.body)).toBe(true)
    expect(new Set(page.outcomes.map((outcome) => outcome.id)).size).toBe(5)
  })

  it.each(
    industries.flatMap((industry) =>
      Object.entries(roiExpectations).map(([pageId, statement]) => [industry, pageId, statement] as const),
    ),
  )('locks the exact ROI for %s %s', (industry, pageId, statement) => {
    const page = resolveContent(pageId as PageId, industry as Industry)
    expect(page.roiStatement).toBe(statement)
    expect(getHeroLede(pageId as PageId, industry as Industry)).toBe(
      `${page.introduction} ${statement}`,
    )
  })

  it.each(industries)('keeps ROI off the homepage and AI Diagnostic for %s', (industry) => {
    expect(getHeroLede('home', industry)).not.toMatch(/\d+× ROI/)
    expect(getHeroLede('ai-diagnostic', industry)).not.toMatch(/\d+× ROI/)
  })

  it('contains no prohibited ROI qualifier', () => {
    const rendered = industries
      .flatMap((industry) => pageIds.map((pageId) => getHeroLede(pageId, industry)))
      .join(' ')
    expect(rendered).not.toMatch(/up to|as much as|projected ROI|ROI range/i)
  })

  it('contains no prohibited conversion or scheduling language', () => {
    const rendered = industries
      .flatMap((industry) =>
        pageIds.flatMap((pageId) => {
          const page = resolveContent(pageId, industry)
          return [
            page.title,
            page.headline,
            page.introduction,
            ...page.outcomes.flatMap((outcome) => [outcome.heading, outcome.body]),
          ]
        }),
      )
      .join(' ')
    expect(rendered).not.toMatch(
      /\b(book a|request a demo|schedule (?:a|your)|sign[ -]?up|contact us|get started|learn more)\b/i,
    )
  })

  it('uses only valid General outcome IDs in industry overrides', () => {
    Object.values(industryOverrides).forEach((overrides) => {
      Object.entries(overrides).forEach(([pageId, pageOverride]) => {
        const ids = new Set(generalContent[pageId as PageId].outcomes.map((outcome) => outcome.id))
        Object.keys(pageOverride?.outcomes ?? {}).forEach((id) => expect(ids.has(id)).toBe(true))
      })
    })
  })
})
