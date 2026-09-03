import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from './App'
import { industries } from './types'
import { routeConfig } from './routing'

const industryQuery = {
  general: '',
  manufacturing: '?industry=manufacturing',
  retail: '?industry=retail',
  'data-centers': '?industry=data-centers',
}

describe('application route matrix', () => {
  it.each(
    routeConfig.flatMap((route) =>
      industries.map((industry) => [route.path, industry, industryQuery[industry]] as const),
    ),
  )('renders %s for %s', (path, industry, query) => {
    const { unmount } = render(
      <MemoryRouter initialEntries={[`${path}${query}`]}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('combobox', { name: /industry/i })).toHaveValue(industry)
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(5)
    unmount()
  })

  it('renders one header wordmark with no separate mark or Agentic Labs logo', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    const header = screen.getByRole('banner')
    expect(within(header).getAllByTestId('order-wordmark')).toHaveLength(1)
    expect(header.querySelector('.order-mark__symbol')).not.toBeInTheDocument()
    expect(header.querySelector('[data-agentic-labs-logo]')).not.toBeInTheDocument()
  })

  it('keeps homepage highlights static and makes only the five lower cards links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    const band = screen.getByRole('region', { name: /outcomes/i })
    expect(within(band).queryAllByRole('link')).toHaveLength(0)
    expect(within(band).queryAllByRole('button')).toHaveLength(0)
    expect(within(band).queryAllByRole('img', { hidden: true })).toHaveLength(0)
    expect(band.querySelectorAll('svg')).toHaveLength(0)
    const index = screen.getByRole('region', { name: 'Agentic Labs pages' })
    expect(within(index).getAllByRole('link')).toHaveLength(5)
    expect(screen.getAllByRole('navigation')).toHaveLength(1)
  })

  it('does not visibly render banned copy or raw route slugs', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(container).not.toHaveTextContent('AI transformation, grounded in operations.')
    expect(container).not.toHaveTextContent('/additional-revenue-capture')
  })

  it('keeps ROI out of the homepage and AI Diagnostic', () => {
    const { unmount } = render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    expect(screen.queryByText(/\d+× ROI/)).not.toBeInTheDocument()
    unmount()

    render(
      <MemoryRouter initialEntries={['/ai-diagnostic?industry=manufacturing']}>
        <AppRoutes />
      </MemoryRouter>,
    )
    expect(screen.queryByText(/\d+× ROI/)).not.toBeInTheDocument()
  })

  it('updates industry in place and preserves it across opportunity links', async () => {
    function LocationProbe() {
      const location = useLocation()
      return <output data-testid="location">{`${location.pathname}${location.search}`}</output>
    }

    render(
      <MemoryRouter initialEntries={['/vendor-discovery?source=shared']}>
        <AppRoutes />
        <LocationProbe />
      </MemoryRouter>,
    )

    const select = screen.getByRole('combobox', { name: /industry/i })
    select.focus()
    fireEvent.change(select, { target: { value: 'data-centers' } })

    await waitFor(() =>
      expect(screen.getByTestId('location')).toHaveTextContent(
        '/vendor-discovery?source=shared&industry=data-centers',
      ),
    )
    expect(select).toHaveFocus()
    fireEvent.click(screen.getByRole('button', { name: /open solutions menu/i }))
    expect(
      within(screen.getByRole('list')).getByRole('link', { name: /^Revenue Preservation/ }),
    ).toHaveAttribute(
      'href',
      '/revenue-preservation?source=shared&industry=data-centers',
    )
  })

  it('shows only Overview and Solutions at the top level and preserves solution order', () => {
    render(
      <MemoryRouter initialEntries={['/?industry=retail&source=shared']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' })
    expect(within(navigation).getAllByRole('link')).toHaveLength(1)
    expect(within(navigation).getByRole('link', { name: 'Overview' })).toHaveAttribute(
      'href',
      '/?industry=retail&source=shared',
    )

    const trigger = within(navigation).getByRole('button', { name: /open solutions menu/i })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    const links = within(screen.getByRole('list')).getAllByRole('link')
    expect(links.map((link) => link.querySelector('.solutions-menu__title')?.textContent)).toEqual([
      'Spend Intelligence',
      'Vendor Discovery',
      'Revenue Preservation',
      'Additional Revenue Capture',
      'AI Diagnostic',
    ])
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/spend-intelligence?industry=retail&source=shared',
      '/vendor-discovery?industry=retail&source=shared',
      '/revenue-preservation?industry=retail&source=shared',
      '/additional-revenue-capture?industry=retail&source=shared',
      '/ai-diagnostic?industry=retail&source=shared',
    ])
  })

  it.each(routeConfig)('opens the Solutions menu from $path', (route) => {
    const { unmount } = render(
      <MemoryRouter initialEntries={[route.path]}>
        <AppRoutes />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: /open solutions menu/i }))
    expect(within(screen.getByRole('list')).getAllByRole('link')).toHaveLength(5)
    unmount()
  })

  it('marks the active solution and closes after a destination is selected', async () => {
    function LocationProbe() {
      const location = useLocation()
      return <output data-testid="location">{`${location.pathname}${location.search}`}</output>
    }

    render(
      <MemoryRouter initialEntries={['/revenue-preservation']}>
        <AppRoutes />
        <LocationProbe />
      </MemoryRouter>,
    )

    const trigger = screen.getByRole('button', { name: /open solutions menu, current section/i })
    expect(trigger).toHaveClass('is-active')
    fireEvent.click(trigger)
    expect(
      within(screen.getByRole('list')).getByRole('link', { name: /^Revenue Preservation/ }),
    ).toHaveAttribute('aria-current', 'page')

    fireEvent.click(within(screen.getByRole('list')).getByRole('link', { name: /^AI Diagnostic/ }))
    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('/ai-diagnostic'))
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /open solutions menu/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })

  it('closes on outside pointer input', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: /open solutions menu/i }))
    expect(screen.getByRole('list')).toBeInTheDocument()
    fireEvent.pointerDown(document.body)
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('supports arrow-key entry, link navigation, and Escape focus restoration', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    const trigger = screen.getByRole('button', { name: /open solutions menu/i })
    trigger.focus()
    fireEvent.keyDown(trigger, { key: 'ArrowDown' })

    const links = within(await screen.findByRole('list')).getAllByRole('link')
    await waitFor(() => expect(links[0]).toHaveFocus())
    fireEvent.keyDown(links[0], { key: 'ArrowDown' })
    expect(links[1]).toHaveFocus()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('labels the general content state as Overview without changing its value', () => {
    render(
      <MemoryRouter initialEntries={['/spend-intelligence']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    const select = screen.getByRole('combobox', { name: /industry/i })
    expect(select).toHaveValue('general')
    expect(within(select).getAllByRole('option').map((option) => option.textContent)).toEqual([
      'Overview',
      'Manufacturing',
      'Retail',
      'Data Centers',
    ])
    expect(screen.getByText('Content shown for Overview')).toBeInTheDocument()
  })

  it('normalizes an explicit General industry to the base route', async () => {
    function LocationProbe() {
      const location = useLocation()
      return <output data-testid="location">{`${location.pathname}${location.search}`}</output>
    }

    render(
      <MemoryRouter initialEntries={['/spend-intelligence?industry=general&source=shared']}>
        <AppRoutes />
        <LocationProbe />
      </MemoryRouter>,
    )

    await waitFor(() =>
      expect(screen.getByTestId('location')).toHaveTextContent('/spend-intelligence?source=shared'),
    )
  })

  it('restores page and industry state with browser back and forward navigation', async () => {
    function HistoryControls() {
      const location = useLocation()
      const navigate = useNavigate()
      return (
        <>
          <output data-testid="location">{`${location.pathname}${location.search}`}</output>
          <button onClick={() => navigate(-1)}>Back</button>
          <button onClick={() => navigate(1)}>Forward</button>
        </>
      )
    }

    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
        <HistoryControls />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByRole('combobox', { name: /industry/i }), {
      target: { value: 'retail' },
    })
    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('/?industry=retail'))

    fireEvent.click(screen.getAllByRole('link', { name: /Vendor Discovery/ })[0])
    await waitFor(() =>
      expect(screen.getByTestId('location')).toHaveTextContent(
        '/vendor-discovery?industry=retail',
      ),
    )

    fireEvent.click(screen.getByRole('button', { name: 'Back' }))
    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('/?industry=retail'))

    fireEvent.click(screen.getByRole('button', { name: 'Back' }))
    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent(/^\/$/))

    fireEvent.click(screen.getByRole('button', { name: 'Forward' }))
    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('/?industry=retail'))

    fireEvent.click(screen.getByRole('button', { name: 'Forward' }))
    await waitFor(() =>
      expect(screen.getByTestId('location')).toHaveTextContent(
        '/vendor-discovery?industry=retail',
      ),
    )
  })

  it.each([
    ['/', 'Agentic Labs | Order.co'],
    ['/spend-intelligence', 'Spend Intelligence | Order.co Agentic Labs'],
    ['/vendor-discovery', 'Vendor Discovery | Order.co Agentic Labs'],
    ['/revenue-preservation', 'Revenue Preservation | Order.co Agentic Labs'],
    [
      '/additional-revenue-capture',
      'Additional Revenue Capture | Order.co Agentic Labs',
    ],
    ['/ai-diagnostic', 'AI Diagnostic | Order.co Agentic Labs'],
  ])('sets the document title for %s', async (path, expectedTitle) => {
    const { unmount } = render(
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>,
    )

    await waitFor(() => expect(document.title).toBe(expectedTitle))
    unmount()
  })
})
