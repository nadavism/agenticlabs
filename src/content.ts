import type { Industry, IndustryOverrides, PageContent, PageId } from './types'

const roiStatements: Partial<Record<PageId, string>> = {
  'spend-intelligence': 'Customers generate an average 25× ROI.',
  'vendor-discovery': 'Customers generate an average 9× ROI.',
  'revenue-preservation': 'Customers generate an average 16× ROI.',
  'additional-revenue-capture': 'Customers generate an average 30× ROI.',
}

export const generalContent: Record<PageId, PageContent> = {
  home: {
    title: 'Transform Your Business with Agentic Labs',
    headline: 'Turn your highest-value business challenges into measurable results',
    introduction:
      'Agentic Labs identifies where AI can create the greatest economic impact, connects the data those opportunities depend on, and builds the intelligent workflows and foundational systems that prepare your business for accelerating into the agentic future.',
    outcomes: [
      {
        id: 'find-impact',
        heading: 'Find where AI will matter most',
        body: 'Diagnose your goals, workflows, systems, and data to identify the highest-value opportunities for AI.',
      },
      {
        id: 'grow-revenue',
        heading: 'Grow profitable revenue',
        body: 'Increase your ability to pursue, win, and deliver profitable business—faster.',
      },
      {
        id: 'protect-revenue',
        heading: 'Protect revenue and margin',
        body: 'Surface risks earlier, prevent margin leakage, and keep committed work moving.',
      },
      {
        id: 'lower-cost',
        heading: 'Lower the cost to operate',
        body: 'Automate repetitive work so your team can accomplish more without adding overhead.',
      },
      {
        id: 'visibility',
        heading: 'Gain end-to-end visibility',
        body: 'Unify fragmented systems, data, and institutional knowledge so AI can work across your business.',
      },
    ],
  },
  'spend-intelligence': {
    title: 'Spend Intelligence',
    headline: 'See every dollar sooner—and turn visibility into savings, control, and action',
    introduction:
      'Gain visibility and control across spend wherever it begins—from project requests and quotes through invoices and payments.',
    roiStatement: roiStatements['spend-intelligence'],
    outcomes: [
      {
        id: 'first-signal',
        heading: 'See spend from the first signal',
        body: 'Surface purchases across emails, invoices, quotes, contracts, requests, and other sources before they become payments or accounting entries.',
      },
      {
        id: 'buy-better',
        heading: 'Buy better',
        body: 'Identify supplier-consolidation, pricing, renewal, and demand opportunities—and turn fragmented purchasing data into captured savings.',
      },
      {
        id: 'pay-correctly',
        heading: 'Pay correctly',
        body: 'Detect duplicate payments, overbilling, invoice discrepancies, and PO mismatches before money leaves the business.',
      },
      {
        id: 'payment-economics',
        heading: 'Improve payment economics',
        body: 'Capture available discounts, avoid preventable late fees, and make more informed decisions about when and how suppliers are paid.',
      },
      {
        id: 'govern-automate',
        heading: 'Govern and automate spend',
        body: 'Apply policies and approvals earlier while automating extraction, matching, routing, follow-ups, and exception handling across the purchasing lifecycle.',
      },
    ],
  },
  'vendor-discovery': {
    title: 'Vendor Discovery',
    headline: 'Find the right vendors, create real competition, and award with confidence',
    introduction:
      'Transform vendor sourcing from a slow, manual search into an intelligent, competitive process spanning local, regional, and national markets.',
    roiStatement: roiStatements['vendor-discovery'],
    outcomes: [
      {
        id: 'supplier-universe',
        heading: 'Expand your supplier universe',
        body: 'Discover qualified vendors beyond incumbents and static directories using real market and economic activity.',
      },
      {
        id: 'geographic-fit',
        heading: 'Find the right geographic fit',
        body: 'Compare capable local, regional, and national suppliers based on the needs of each project or purchase.',
      },
      {
        id: 'qualify-faster',
        heading: 'Qualify vendors faster',
        body: 'Verify capabilities, coverage, compliance, and business requirements with significantly less manual research and diligence.',
      },
      {
        id: 'automate-rfq',
        heading: 'Automate the RFQ process',
        body: 'Automate supplier outreach, follow-ups, response collection, and bid normalization to reduce sourcing time and effort.',
      },
      {
        id: 'better-awards',
        heading: 'Make better awards, faster',
        body: 'Generate comparable bids, create genuine supplier competition, and move from an identified need to a confident award decision sooner.',
      },
    ],
  },
  'revenue-preservation': {
    title: 'Revenue Preservation',
    headline: 'Protect the revenue you have already won—and the margin you planned to earn',
    introduction:
      'Improve quoting accuracy and stay ahead of execution risk so committed work reaches delivery, billing, and revenue recognition on schedule.',
    roiStatement: roiStatements['revenue-preservation'],
    outcomes: [
      {
        id: 'quote-accurately',
        heading: 'Quote accurately',
        body: 'Ground material, labor, and pricing assumptions in comparable historical work to reduce costly estimate variance.',
      },
      {
        id: 'price-profitably',
        heading: 'Price to win profitably',
        body: 'Avoid underpricing that erodes margin and unnecessary overpricing that costs your business winnable work.',
      },
      {
        id: 'supplier-communication',
        heading: 'Automate supplier communication',
        body: 'Eliminate repetitive chasing while collecting faster, more current information on orders, commitments, and delivery status.',
      },
      {
        id: 'execution-risk',
        heading: 'Stay ahead of execution risk',
        body: 'Track acknowledgments, milestones, and exceptions so your team can intervene before supplier issues affect a project or customer.',
      },
      {
        id: 'revenue-schedule',
        heading: 'Keep revenue on schedule',
        body: 'Prevent operational delays from pushing out delivery, customer acceptance, billing, and revenue recognition.',
      },
    ],
  },
  'additional-revenue-capture': {
    title: 'Additional Revenue Capture',
    headline: 'Turn more qualified opportunities into profitable revenue—without growing your estimating team',
    introduction:
      'Use AI to accelerate estimation, increase quoting capacity, and improve the speed and confidence with which your business pursues new work.',
    roiStatement: roiStatements['additional-revenue-capture'],
    outcomes: [
      {
        id: 'respond-faster',
        heading: 'Respond to opportunities faster',
        body: 'Extract requirements from specifications and retrieve relevant historical work automatically, dramatically reducing quote turnaround time.',
      },
      {
        id: 'quote-capacity',
        heading: 'Increase quoting capacity',
        body: 'Enable your existing team to evaluate and respond to more qualified opportunities without adding estimating headcount.',
      },
      {
        id: 'win-more',
        heading: 'Win more work',
        body: 'Produce faster, better-informed quotes while reducing avoidable overpricing that causes competitive opportunities to be lost.',
      },
      {
        id: 'protect-new-margin',
        heading: 'Protect margin on new revenue',
        body: 'Reduce underpricing by identifying incomplete material, labor, and project assumptions before a quote is submitted.',
      },
      {
        id: 'institutional-knowledge',
        heading: 'Put institutional knowledge to work',
        body: 'Make prior designs, projects, costs, and outcomes immediately available during estimation—improving both speed and accuracy.',
      },
    ],
  },
  'ai-diagnostic': {
    title: 'AI Diagnostic',
    headline: 'Not sure where to begin with AI? We find the opportunities worth pursuing.',
    introduction:
      'Agentic Labs works inside your business to understand how work gets done, where value is being lost, and which AI opportunities can deliver the greatest measurable impact.',
    outcomes: [
      {
        id: 'discover-impact',
        heading: 'Discover high-impact opportunities',
        body: 'Identify where AI can grow revenue, protect margin, reduce operating costs, improve visibility, or remove critical constraints.',
      },
      {
        id: 'diagnose-work',
        heading: 'Diagnose how work actually happens',
        body: 'Map the workflows, handoffs, decisions, and information flows behind your most important business processes.',
      },
      {
        id: 'hidden-friction',
        heading: 'Find the hidden friction',
        body: 'Surface repetitive work, bottlenecks, data gaps, delayed decisions, and risks that are difficult to see from the executive level.',
      },
      {
        id: 'connect-data',
        heading: 'Connect your tools and data',
        body: 'Integrate the systems, applications, and information your business already relies on so AI can work across your operations.',
      },
      {
        id: 'build-systems',
        heading: 'Build the systems to automate',
        body: 'Design and implement intelligent workflows that connect tools, move information, and automate repetitive work from end to end.',
      },
    ],
  },
}

export const industryOverrides: Record<Exclude<Industry, 'general'>, IndustryOverrides> = {
  manufacturing: {
    home: {
      headline: 'Turn your highest-value manufacturing challenges into measurable results',
      introduction:
        'Agentic Labs identifies where AI can create the greatest economic impact across your operations, connects the data those opportunities depend on, and builds intelligent workflows around how your manufacturing business actually runs.',
      outcomes: {
        'protect-revenue': {
          body: 'Surface supply and execution risks earlier, prevent margin leakage, and keep committed production moving.',
        },
        visibility: {
          body: 'Unify fragmented systems, operating data, and institutional knowledge so AI can work across your business.',
        },
      },
    },
    'spend-intelligence': {
      introduction:
        'Gain visibility and control across direct and indirect spend wherever it begins—not only after it reaches an accounting or payment system.',
      outcomes: {
        'first-signal': {
          body: 'Surface purchases across requisitions, emails, invoices, quotes, contracts, and other sources before they become payments or accounting entries.',
        },
        'buy-better': {
          body: 'Identify supplier-consolidation, pricing, renewal, and demand opportunities across plants and teams—and turn fragmented purchasing data into captured savings.',
        },
      },
    },
    'vendor-discovery': {
      headline: 'Find the right suppliers, create real competition, and award with confidence',
      introduction:
        'Transform supplier sourcing from a slow, manual search into an intelligent, competitive process spanning local, regional, and national markets.',
      outcomes: {
        'geographic-fit': {
          body: 'Compare capable local, regional, and national suppliers against each plant, project, or purchase requirement.',
        },
        'qualify-faster': {
          body: 'Verify capabilities, coverage, compliance, capacity, and business requirements with significantly less manual research and diligence.',
        },
      },
    },
    'revenue-preservation': {
      headline: 'Protect the revenue behind every committed order—and the margin you planned to earn',
      introduction:
        'Improve quoting accuracy and stay ahead of supply and execution risk so committed work reaches production, delivery, billing, and revenue recognition on schedule.',
      outcomes: {
        'execution-risk': {
          body: 'Track acknowledgments, material commitments, milestones, and exceptions so your team can intervene before supplier issues affect production or a customer.',
        },
        'revenue-schedule': {
          body: 'Prevent operational delays from pushing out production, delivery, customer acceptance, billing, and revenue recognition.',
        },
      },
    },
    'additional-revenue-capture': {
      headline: 'Turn more qualified RFQs into profitable orders—without growing your estimating team',
      introduction:
        'Use AI to accelerate estimation, increase quoting capacity, and improve the speed and confidence with which your team pursues new work.',
      outcomes: {
        'respond-faster': {
          body: 'Extract requirements from drawings and specifications and retrieve relevant historical work automatically, dramatically reducing quote turnaround time.',
        },
        'institutional-knowledge': {
          body: 'Make prior designs, jobs, material costs, labor assumptions, and outcomes immediately available during estimation—improving both speed and accuracy.',
        },
      },
    },
    'ai-diagnostic': {
      introduction:
        'Agentic Labs works inside your manufacturing business to understand how work gets done, where value is being lost, and which AI opportunities can deliver the greatest measurable impact.',
      outcomes: {
        'diagnose-work': {
          body: 'Map the workflows, handoffs, decisions, and information flows behind your most important production and business processes.',
        },
      },
    },
  },
  retail: {
    home: {
      headline: 'Turn your highest-value retail challenges into measurable results',
      introduction:
        'Agentic Labs identifies where AI can create the greatest economic impact across your retail operations, connects the data those opportunities depend on, and builds intelligent workflows around how your business actually runs.',
      outcomes: {
        visibility: {
          body: 'Unify fragmented systems, location-level data, and institutional knowledge so AI can work across your business.',
        },
      },
    },
    'spend-intelligence': {
      headline: 'See every dollar across every location—and turn visibility into savings, control, and action',
      introduction:
        'Gain visibility and control across spend wherever it begins, including activity distributed across locations, teams, and purchasing channels.',
      outcomes: {
        'first-signal': {
          body: 'Surface purchases across locations, emails, invoices, quotes, contracts, requests, and other sources before they become payments or accounting entries.',
        },
        'govern-automate': {
          body: 'Apply policies and approvals consistently while automating extraction, matching, routing, follow-ups, and exception handling across the purchasing lifecycle.',
        },
      },
    },
    'vendor-discovery': {
      headline: 'Find the right vendors for every category and market—and award with confidence',
      outcomes: {
        'geographic-fit': {
          body: 'Compare capable local, regional, and national vendors based on the needs of each location, project, or purchase.',
        },
      },
    },
    'revenue-preservation': {
      headline: 'Protect the revenue already in motion—and the margin you planned to earn',
      introduction:
        'Stay ahead of supplier and operating risk so availability, fulfillment, and customer demand are not disrupted.',
      outcomes: {
        'quote-accurately': {
          heading: 'Plan with better cost visibility',
          body: 'Bring current and historical cost information together to reduce avoidable margin surprises.',
        },
        'price-profitably': {
          heading: 'Protect pricing and margin',
          body: 'Make better-informed pricing decisions without losing sight of the underlying cost and margin floor.',
        },
        'execution-risk': {
          body: 'Track commitments, milestones, and exceptions so your team can intervene before supplier issues affect availability, fulfillment, or customers.',
        },
        'revenue-schedule': {
          heading: 'Keep revenue moving',
          body: 'Prevent operating delays from disrupting availability, fulfillment, and revenue capture.',
        },
      },
    },
    'additional-revenue-capture': {
      headline: 'Turn more demand into profitable revenue—without adding operating overhead',
      introduction:
        'Use AI to increase team capacity, accelerate decisions, and improve how quickly your business acts on qualified revenue opportunities.',
      outcomes: {
        'respond-faster': {
          body: 'Bring together the information required to evaluate and act on revenue opportunities sooner.',
        },
        'quote-capacity': {
          heading: 'Increase team capacity',
          body: 'Enable your existing team to evaluate and act on more qualified opportunities without adding overhead.',
        },
        'win-more': {
          heading: 'Capture more demand',
          body: 'Act on revenue opportunities sooner with better-informed decisions and fewer manual handoffs.',
        },
        'protect-new-margin': {
          body: 'Identify incomplete cost, pricing, and operating assumptions before they erode expected margin.',
        },
        'institutional-knowledge': {
          body: 'Make prior products, programs, decisions, costs, and outcomes available when new opportunities are evaluated.',
        },
      },
    },
    'ai-diagnostic': {
      introduction:
        'Agentic Labs works inside your retail business to understand how work gets done across teams and locations, where value is being lost, and which AI opportunities can deliver the greatest measurable impact.',
    },
  },
  'data-centers': {
    home: {
      headline: 'Turn your highest-value data center challenges into measurable results',
      introduction:
        'Agentic Labs identifies where AI can create the greatest economic impact across data center development and operations, connects the data those opportunities depend on, and builds intelligent workflows around how your business actually runs.',
      outcomes: {
        'protect-revenue': {
          body: 'Surface execution risks earlier, prevent margin leakage, and keep committed projects and revenue moving.',
        },
        visibility: {
          body: 'Unify fragmented project, procurement, supplier, and operating data so AI can work across your business.',
        },
      },
    },
    'spend-intelligence': {
      headline: 'See every dollar sooner—and turn project spend into savings, control, and action',
      introduction:
        'Gain visibility and control across spend wherever it begins, from project requests and quotes through invoices and payments.',
      outcomes: {
        'first-signal': {
          body: 'Surface purchases across project requests, emails, invoices, quotes, contracts, and other sources before they become payments or accounting entries.',
        },
        'buy-better': {
          body: 'Identify supplier-consolidation, pricing, renewal, and demand opportunities across projects and sites—and turn fragmented purchasing data into captured savings.',
        },
      },
    },
    'vendor-discovery': {
      headline: 'Find qualified vendors wherever projects demand them—and award with confidence',
      introduction:
        'Use real economic activity to discover, vet, and run a competitive process across qualified local, regional, and national vendors.',
      outcomes: {
        'supplier-universe': {
          body: 'Discover qualified vendors beyond incumbents and static directories using real economic activity and market signals.',
        },
        'geographic-fit': {
          body: 'Compare capable local, regional, and national vendors against the needs of each site, project, or purchase.',
        },
        'qualify-faster': {
          body: 'Verify capabilities, coverage, compliance, and project requirements with significantly less manual research and diligence.',
        },
      },
    },
    'revenue-preservation': {
      headline: 'Protect committed revenue and margin by keeping work moving',
      introduction:
        'Stay ahead of supplier and execution risk so committed projects reach delivery, acceptance, billing, and revenue recognition on schedule.',
      outcomes: {
        'supplier-communication': {
          body: 'Automate supplier follow-ups while collecting PO acknowledgments, commitments, delivery status, and current information faster.',
        },
        'execution-risk': {
          body: 'Track commitments, milestones, and exceptions so your team can intervene before a supplier issue affects a site, project, or customer.',
        },
        'revenue-schedule': {
          body: 'Prevent operational delays from pushing out project delivery, customer acceptance, billing, and revenue recognition.',
        },
      },
    },
    'additional-revenue-capture': {
      introduction:
        'Use AI to accelerate estimation, increase quoting capacity, and improve the speed and confidence with which your business pursues new projects.',
      outcomes: {
        'respond-faster': {
          body: 'Extract requirements from project specifications and retrieve relevant historical work automatically, dramatically reducing quote turnaround time.',
        },
        'institutional-knowledge': {
          body: 'Make prior designs, projects, material costs, labor assumptions, and outcomes immediately available during estimation—improving both speed and accuracy.',
        },
      },
    },
    'ai-diagnostic': {
      introduction:
        'Agentic Labs works inside your business to understand how data center work gets done, where value is being lost, and which AI opportunities can deliver the greatest measurable impact.',
      outcomes: {
        'diagnose-work': {
          body: 'Map the workflows, handoffs, decisions, and information flows behind your most important development, procurement, and operating processes.',
        },
        'hidden-friction': {
          body: 'Surface repetitive work, supplier bottlenecks, data gaps, delayed decisions, and project risks that are difficult to see from the executive level.',
        },
      },
    },
  },
}

export function resolveContent(pageId: PageId, industry: Industry): PageContent {
  const base = generalContent[pageId]
  const override = industry === 'general' ? undefined : industryOverrides[industry][pageId]

  return {
    ...base,
    ...override,
    roiStatement: base.roiStatement,
    outcomes: base.outcomes.map((outcome) => ({
      ...outcome,
      ...(override?.outcomes?.[outcome.id] ?? {}),
    })),
  }
}

export function getHeroLede(pageId: PageId, industry: Industry): string {
  const content = resolveContent(pageId, industry)
  return [content.introduction, content.roiStatement].filter(Boolean).join(' ')
}
