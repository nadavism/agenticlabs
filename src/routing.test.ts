import { describe, expect, it } from 'vitest'
import { getIndustryFromSearch, parseIndustry, updateIndustrySearch } from './routing'

describe('industry URL state', () => {
  it('accepts only supported industries', () => {
    expect(parseIndustry('manufacturing')).toBe('manufacturing')
    expect(parseIndustry('retail')).toBe('retail')
    expect(parseIndustry('data-centers')).toBe('data-centers')
    expect(parseIndustry('unknown')).toBe('general')
    expect(parseIndustry(null)).toBe('general')
  })

  it('removes General while preserving unrelated parameters', () => {
    expect(updateIndustrySearch('?industry=retail&source=shared', 'general')).toBe('?source=shared')
  })

  it('updates the current industry without dropping unrelated parameters', () => {
    expect(updateIndustrySearch('?source=shared', 'manufacturing')).toBe(
      '?source=shared&industry=manufacturing',
    )
    expect(getIndustryFromSearch('?source=shared&industry=data-centers')).toBe('data-centers')
  })
})
