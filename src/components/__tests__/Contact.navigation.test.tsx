import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
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

describe('Navigation vers Contact - Test Spécialisé', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock pour document.querySelector avec simulation de la section Contact
    const mockContactElement = {
      offsetTop: 2000, // Position simulée de la section Contact
      getBoundingClientRect: () => ({ top: 2000 }),
      id: 'contact',
    }
    
    Object.defineProperty(document, 'querySelector', {
      value: vi.fn().mockImplementation((selector) => {
        if (selector === '#contact') {
          return mockContactElement
        }
        return null
      }),
      writable: true,
    })
    
    // Mock pour window.scrollTo
    Object.defineProperty(window, 'scrollTo', {
      value: vi.fn(),
      writable: true,
    })
    
    // Mock pour requestAnimationFrame
    Object.defineProperty(window, 'requestAnimationFrame', {
      value: vi.fn((callback) => {
        setTimeout(callback, 0)
        return 1
      }),
      writable: true,
    })
  })

  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    )
  }

  describe('Navigation vers Contact', () => {
    it('devrait naviguer vers Contact avec l\'offset correct de 160px', async () => {
      renderNavbar()
      
      // Trouver le bouton Contact
      const contactButton = screen.getByRole('button', { name: /contact/i })
      expect(contactButton).toBeInTheDocument()

      // Simuler un clic sur le bouton Contact
      fireEvent.click(contactButton)

      // Vérifier que querySelector a été appelé avec #contact
      await waitFor(() => {
        expect(document.querySelector).toHaveBeenCalledWith('#contact')
      })

      // Vérifier que scrollTo a été appelé avec l'offset spécial pour Contact
      await waitFor(() => {
        expect(window.scrollTo).toHaveBeenCalledWith({
          top: Math.max(0, 2000 - 160), // 2000 - 160 = 1840px
          behavior: 'smooth'
        })
      })
    })

    it('devrait utiliser requestAnimationFrame pour le timing', async () => {
      renderNavbar()
      
      const contactButton = screen.getByRole('button', { name: /contact/i })
      fireEvent.click(contactButton)

      await waitFor(() => {
        expect(window.requestAnimationFrame).toHaveBeenCalled()
      })
    })

    it('devrait gérer le cas où l\'élément Contact n\'est pas trouvé immédiatement', async () => {
      // Simuler que l'élément n'est pas trouvé au premier essai
      let callCount = 0
      Object.defineProperty(document, 'querySelector', {
        value: vi.fn().mockImplementation((selector) => {
          callCount++
          if (selector === '#contact' && callCount > 1) {
            return { offsetTop: 2000 }
          }
          return null
        }),
        writable: true,
      })

      renderNavbar()
      
      const contactButton = screen.getByRole('button', { name: /contact/i })
      fireEvent.click(contactButton)

      // Vérifier que querySelector a été appelé plusieurs fois
      await waitFor(() => {
        expect(document.querySelector).toHaveBeenCalledTimes(2)
      })

      // Vérifier que scrollTo a finalement été appelé
      await waitFor(() => {
        expect(window.scrollTo).toHaveBeenCalled()
      })
    })
  })

  describe('Comparaison avec autres sections', () => {
    it('devrait utiliser un offset différent pour Contact vs autres sections', async () => {
      // Mock pour simuler différentes sections
      const mockElements = {
        '#accueil': { offsetTop: 1000 },
        '#contact': { offsetTop: 2000 },
      }
      
      Object.defineProperty(document, 'querySelector', {
        value: vi.fn().mockImplementation((selector) => mockElements[selector as keyof typeof mockElements] || null),
        writable: true,
      })

      renderNavbar()
      
      // Test navigation vers Accueil (offset standard: 80px)
      const accueilButton = screen.getByRole('button', { name: /accueil/i })
      fireEvent.click(accueilButton)

      await waitFor(() => {
        expect(window.scrollTo).toHaveBeenCalledWith({
          top: Math.max(0, 1000 - 80), // Offset standard
          behavior: 'smooth'
        })
      })

      // Reset mocks
      vi.clearAllMocks()

      // Test navigation vers Contact (offset spécial: 160px)
      const contactButton = screen.getByRole('button', { name: /contact/i })
      fireEvent.click(contactButton)

      await waitFor(() => {
        expect(window.scrollTo).toHaveBeenCalledWith({
          top: Math.max(0, 2000 - 160), // Offset spécial pour Contact
          behavior: 'smooth'
        })
      })
    })
  })

  describe('Accessibilité', () => {
    it('devrait avoir les bons attributs ARIA pour le bouton Contact', () => {
      renderNavbar()
      
      const contactButton = screen.getByRole('button', { name: /contact/i })
      expect(contactButton).toHaveAttribute('aria-label', 'Aller à la section Contact')
    })
  })
}) 