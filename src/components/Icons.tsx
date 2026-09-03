import {
  ArrowDownRight,
  CircleDollarSign,
  Network,
  Radar,
  ScanSearch,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import type { PageId } from '../types'

export const pageIcons = {
  home: Sparkles,
  'spend-intelligence': Radar,
  'vendor-discovery': Network,
  'revenue-preservation': ShieldCheck,
  'additional-revenue-capture': CircleDollarSign,
  'ai-diagnostic': ScanSearch,
} satisfies Record<PageId, typeof Sparkles>

export { ArrowDownRight }
