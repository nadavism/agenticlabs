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
    screen.getAllByRole('link', { name: 'Revenue Preservation' }).forEach((link) =>
      expect(link).toHaveAttribute(
        'href',
        '/revenue-preservation?source=shared&industry=data-centers',
      ),
    )
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
