import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Navbar from '../Navbar'

// Mock pour react-router-dom
const mockNavigate = vi.fn()
const mockLocation = { pathname: '/' }

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  }
})

// Mock pour document.querySelector
const mockQuerySelector = vi.fn()
Object.defineProperty(document, 'querySelector', {
  value: mockQuerySelector,
  writable: true,
})

// Mock pour window.scrollTo
const mockScrollTo = vi.fn()
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
})

// Mock pour requestAnimationFrame
const mockRequestAnimationFrame = vi.fn((callback) => {
  setTimeout(callback, 0)
  return 1
})
Object.defineProperty(window, 'requestAnimationFrame', {
  value: mockRequestAnimationFrame,
  writable: true,
})

describe('Navbar - Test simple de navigation Contact', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockQuerySelector.mockReturnValue({
      offsetTop: 1000,
    })
  })

  it('devrait naviguer vers Contact en un seul clic', async () => {
    render(<Navbar />)
    
    // Trouver le bouton Contact
    const contactButton = screen.getByRole('button', { name: /contact/i })
    expect(contactButton).toBeInTheDocument()

    // Simuler un clic sur le bouton Contact
    fireEvent.click(contactButton)

    // Vérifier que querySelector a été appelé avec le bon hash
    await waitFor(() => {
      expect(mockQuerySelector).toHaveBeenCalledWith('#contact')
    })

    // Vérifier que scrollTo a été appelé avec les bons paramètres
    await waitFor(() => {
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: Math.max(0, 1000 - 160), // Offset spécial pour contact
        behavior: 'smooth'
      })
    })
  })

  it('devrait utiliser requestAnimationFrame pour le timing', async () => {
    render(<Navbar />)
    
    const contactButton = screen.getByRole('button', { name: /contact/i })
    fireEvent.click(contactButton)

    await waitFor(() => {
      expect(mockRequestAnimationFrame).toHaveBeenCalled()
    })
  })
}) 