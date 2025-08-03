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

describe('Navbar - Test d\'intégration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock pour document.querySelector
    const mockElement = {
      offsetTop: 1000,
      getBoundingClientRect: () => ({ top: 1000 }),
    }
    
    Object.defineProperty(document, 'querySelector', {
      value: vi.fn().mockReturnValue(mockElement),
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
    it('devrait naviguer vers Contact en un seul clic', async () => {
      renderNavbar()
      
      // Trouver le bouton Contact
      const contactButton = screen.getByRole('button', { name: /contact/i })
      expect(contactButton).toBeInTheDocument()

      // Simuler un clic sur le bouton Contact
      fireEvent.click(contactButton)

      // Vérifier que la navigation a été tentée
      await waitFor(() => {
        expect(document.querySelector).toHaveBeenCalledWith('#contact')
      })

      // Vérifier que scrollTo a été appelé
      await waitFor(() => {
        expect(window.scrollTo).toHaveBeenCalled()
      })
    })

    it('devrait utiliser l\'offset spécial pour Contact', async () => {
      renderNavbar()
      
      const contactButton = screen.getByRole('button', { name: /contact/i })
      fireEvent.click(contactButton)

      await waitFor(() => {
        expect(window.scrollTo).toHaveBeenCalledWith({
          top: Math.max(0, 1000 - 160), // Offset spécial pour contact
          behavior: 'smooth'
        })
      })
    })
  })

  describe('Menu mobile', () => {
    it('devrait ouvrir et fermer le menu mobile', async () => {
      renderNavbar()
      
      // Trouver le bouton du menu mobile
      const menuButton = screen.getByRole('button', { name: /ouvrir le menu/i })
      
      // Ouvrir le menu
      fireEvent.click(menuButton)
      
      // Vérifier que le menu est ouvert
      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument()
      })

      // Cliquer sur Contact dans le menu mobile
      const contactButton = screen.getByRole('menuitem', { name: /contact/i })
      fireEvent.click(contactButton)

      // Vérifier que le menu se ferme
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
      })
    })
  })

  describe('Accessibilité', () => {
    it('devrait avoir les bons attributs ARIA', () => {
      renderNavbar()
      
      // Vérifier les labels ARIA
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Navigation principale')
      
      // Vérifier que tous les boutons ont des aria-label
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        if (button.textContent?.includes('Contact')) {
          expect(button).toHaveAttribute('aria-label')
        }
      })
    })
  })
}) 