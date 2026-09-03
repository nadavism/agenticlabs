export const industries = ['general', 'manufacturing', 'retail', 'data-centers'] as const

export type Industry = (typeof industries)[number]

export const pageIds = [
  'home',
  'spend-intelligence',
  'vendor-discovery',
  'revenue-preservation',
  'additional-revenue-capture',
  'ai-diagnostic',
] as const

export type PageId = (typeof pageIds)[number]

export type Outcome = {
  id: string
  heading: string
  body: string
}

export type PageContent = {
  title: string
  headline: string
  introduction: string
  roiStatement?: string
  outcomes: Outcome[]
}

export type OutcomeOverride = Partial<Pick<Outcome, 'heading' | 'body'>>

export type PageOverride = Partial<Pick<PageContent, 'title' | 'headline' | 'introduction'>> & {
  outcomes?: Record<string, OutcomeOverride>
}

export type IndustryOverrides = Partial<Record<PageId, PageOverride>>
