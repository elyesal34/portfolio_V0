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

// Mock pour document.querySelector
const mockQuerySelector = vi.fn()
Object.defineProperty(document, 'querySelector', {
  value: mockQuerySelector,
  writable: true,
})

// Mock pour Element.offsetTop
const mockOffsetTop = 1000

describe('Navbar - Tests d\'intégration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockQuerySelector.mockReturnValue({
      offsetTop: mockOffsetTop,
    })
  })

  const renderNavbar = () => {
    return render(<Navbar />)
  }

  describe('Navigation vers Contact', () => {
    it('devrait naviguer vers la section contact en un seul clic', async () => {
      renderNavbar()
      
      // Trouver le bouton Contact
      const contactButton = screen.getByRole('button', { name: /aller à la section contact/i })
      expect(contactButton).toBeInTheDocument()

      // Simuler un clic sur le bouton Contact
      fireEvent.click(contactButton)

      // Vérifier que querySelector a été appelé avec le bon hash
      await waitFor(() => {
        expect(mockQuerySelector).toHaveBeenCalledWith('#contact')
      })

      // Vérifier que scrollTo a été appelé avec les bons paramètres
      await waitFor(() => {
        expect(window.scrollTo).toHaveBeenCalledWith({
          top: Math.max(0, mockOffsetTop - 160), // Offset spécial pour contact
          behavior: 'smooth'
        })
      })
    })

    it('devrait utiliser requestAnimationFrame pour le timing', async () => {
      const mockRequestAnimationFrame = vi.spyOn(window, 'requestAnimationFrame')
      renderNavbar()
      
      const contactButton = screen.getByRole('button', { name: /aller à la section contact/i })
      fireEvent.click(contactButton)

      await waitFor(() => {
        expect(mockRequestAnimationFrame).toHaveBeenCalled()
      })
    })

    it('devrait avoir un fallback si l\'élément n\'est pas trouvé immédiatement', async () => {
      // Simuler que l'élément n'est pas trouvé au premier essai
      mockQuerySelector
        .mockReturnValueOnce(null) // Premier appel retourne null
        .mockReturnValueOnce({ offsetTop: mockOffsetTop }) // Deuxième appel retourne l'élément

      renderNavbar()
      
      const contactButton = screen.getByRole('button', { name: /aller à la section contact/i })
      fireEvent.click(contactButton)

      // Vérifier que querySelector a été appelé deux fois
      await waitFor(() => {
        expect(mockQuerySelector).toHaveBeenCalledTimes(2)
      })

      // Vérifier que scrollTo a finalement été appelé
      await waitFor(() => {
        expect(window.scrollTo).toHaveBeenCalledWith({
          top: Math.max(0, mockOffsetTop - 160),
          behavior: 'smooth'
        })
      })
    })
  })

  describe('Navigation vers autres sections', () => {
    it('devrait naviguer vers les autres sections avec l\'offset standard', async () => {
      renderNavbar()
      
      const accueilButton = screen.getByRole('button', { name: /aller à la section accueil/i })
      fireEvent.click(accueilButton)

      await waitFor(() => {
        expect(mockQuerySelector).toHaveBeenCalledWith('#accueil')
      })

      await waitFor(() => {
        expect(window.scrollTo).toHaveBeenCalledWith({
          top: Math.max(0, mockOffsetTop - 80), // Offset standard
          behavior: 'smooth'
        })
      })
    })
  })

  describe('Menu mobile', () => {
    it('devrait fermer le menu mobile après un clic sur Contact', async () => {
      renderNavbar()
      
      // Ouvrir le menu mobile
      const menuButton = screen.getByRole('button', { name: /ouvrir le menu/i })
      fireEvent.click(menuButton)

      // Vérifier que le menu est ouvert
      expect(screen.getByRole('menu')).toBeInTheDocument()

      // Cliquer sur Contact dans le menu mobile
      const contactButton = screen.getByRole('menuitem', { name: /contact/i })
      fireEvent.click(contactButton)

      // Vérifier que le menu se ferme
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
      })

      // Vérifier que la navigation fonctionne toujours
      await waitFor(() => {
        expect(window.scrollTo).toHaveBeenCalled()
      })
    })
  })

  describe('Navigation depuis une autre page', () => {
    it('devrait naviguer vers la page d\'accueil avec hash si pas sur la page principale', async () => {
      // Changer le pathname pour simuler une autre page
      mockLocation.pathname = '/autre-page'
      
      renderNavbar()
      
      const contactButton = screen.getByRole('button', { name: /aller à la section contact/i })
      fireEvent.click(contactButton)

      // Vérifier que navigate a été appelé avec le bon chemin
      expect(mockNavigate).toHaveBeenCalledWith('/#contact')
    })
  })

  describe('Accessibilité', () => {
    it('devrait avoir les bons attributs ARIA pour l\'accessibilité', () => {
      renderNavbar()
      
      // Vérifier les labels ARIA
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Navigation principale')
      expect(screen.getByRole('button', { name: /aller à la section contact/i })).toHaveAttribute('aria-label', 'Aller à la section Contact')
    })
  })
}) 