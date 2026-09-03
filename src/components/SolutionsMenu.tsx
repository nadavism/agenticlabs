import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { resolveContent } from '../content'
import { solutionRoutes, updateIndustrySearch } from '../routing'
import type { Industry, PageId } from '../types'
import { pageIcons } from './Icons'

export function SolutionsMenu({
  activePage,
  industry,
  search,
}: {
  activePage: PageId
  industry: Industry
  search: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerId = useId()
  const panelId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const pendingFocusRef = useRef<number | null>(null)
  const isSolutionActive = activePage !== 'home'

  useEffect(() => {
    if (isOpen && pendingFocusRef.current !== null) {
      linkRefs.current[pendingFocusRef.current]?.focus()
      pendingFocusRef.current = null
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleOutsidePointer = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handleOutsidePointer)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('pointerdown', handleOutsidePointer)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const closeMenu = (restoreFocus = false) => {
    setIsOpen(false)
    if (restoreFocus) {
      triggerRef.current?.focus()
    }
  }

  const openAndFocus = (index: number) => {
    if (isOpen) {
      linkRefs.current[index]?.focus()
      return
    }
    pendingFocusRef.current = index
    setIsOpen(true)
  }

  const handleTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      openAndFocus(0)
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      openAndFocus(solutionRoutes.length - 1)
    }
  }

  const handleLinkKeyDown = (event: ReactKeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      linkRefs.current[(index + 1) % solutionRoutes.length]?.focus()
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      linkRefs.current[(index - 1 + solutionRoutes.length) % solutionRoutes.length]?.focus()
    }
    if (event.key === 'Home') {
      event.preventDefault()
      linkRefs.current[0]?.focus()
    }
    if (event.key === 'End') {
      event.preventDefault()
      linkRefs.current[solutionRoutes.length - 1]?.focus()
    }
    if (event.key === 'Escape') {
      event.preventDefault()
      closeMenu(true)
    }
  }

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      closeMenu()
    }
  }

  return (
    <div
      className="solutions-menu"
      onBlur={handleBlur}
      ref={containerRef}
    >
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        aria-label={`${isOpen ? 'Close' : 'Open'} Solutions menu${isSolutionActive ? ', current section' : ''}`}
        className={`solutions-menu__trigger${isSolutionActive ? ' is-active' : ''}`}
        id={triggerId}
        onClick={() => setIsOpen((current) => !current)}
        onKeyDown={handleTriggerKeyDown}
        ref={triggerRef}
        type="button"
      >
        <span>Solutions</span>
        <ChevronDown aria-hidden="true" className="solutions-menu__chevron" />
      </button>
      {isOpen ? (
        <div
          aria-labelledby={triggerId}
          className="solutions-menu__panel"
          id={panelId}
        >
          <div className="site-container solutions-menu__surface">
            <ul className="solutions-menu__grid">
              {solutionRoutes.map((route, index) => {
                const Icon = pageIcons[route.id]
                const summary = resolveContent(route.id, industry).headline
                const isActive = activePage === route.id

                return (
                  <li key={route.id}>
                    <Link
                      aria-current={isActive ? 'page' : undefined}
                      className={`solutions-menu__link${isActive ? ' is-active' : ''}`}
                      onClick={() => closeMenu()}
                      onKeyDown={(event) => handleLinkKeyDown(event, index)}
                      ref={(node) => {
                        linkRefs.current[index] = node
                      }}
                      to={`${route.path}${updateIndustrySearch(search, industry)}`}
                    >
                      <span className="solutions-menu__icon" aria-hidden="true">
                        <Icon />
                      </span>
                      <span className="solutions-menu__copy">
                        <span className="solutions-menu__title">{route.label}</span>
                        <span className="solutions-menu__description">{summary}</span>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  )
}
