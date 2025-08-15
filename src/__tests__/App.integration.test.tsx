import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from '../app/App'

// Mock pour window.scrollTo
const mockScrollTo = vi.fn()
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
})

// Mock pour document.querySelector
const mockQuerySelector = vi.fn()
Object.defineProperty(document, 'querySelector', {
  value: mockQuerySelector,
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

describe('App - Tests d\'intégration complets', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Simuler que toutes les sections existent
    mockQuerySelector.mockImplementation(() => {
      const mockElement = {
        offsetTop: 1000,
        getBoundingClientRect: () => ({ top: 1000 }),
      }
      return mockElement
    })
  })

  const renderApp = () => {
    return render(<App />)
  }

  describe('Navigation complète', () => {
    it('devrait naviguer vers Contact depuis la navbar principale', async () => {
      renderApp()
      
      // Attendre que l'application soit chargée
      await waitFor(() => {
        expect(screen.getByRole('navigation')).toBeInTheDocument()
      })

      // Trouver et cliquer sur le bouton Contact
      const contactButton = screen.getByRole('button', { name: /aller à la section contact/i })
      fireEvent.click(contactButton)

      // Vérifier que la navigation a été tentée
      await waitFor(() => {
        expect(mockQuerySelector).toHaveBeenCalledWith('#contact')
      })

      // Vérifier que le scroll a été effectué avec le bon offset
      await waitFor(() => {
        expect(mockScrollTo).toHaveBeenCalledWith({
          top: Math.max(0, 1000 - 160), // Offset spécial pour contact
          behavior: 'smooth'
        })
      })
    })

    it('devrait naviguer vers toutes les sections depuis la navbar', async () => {
      renderApp()
      
      const sections = [
        { name: 'Accueil', hash: '#accueil', offset: 80 },
        { name: 'CV', hash: '#cv', offset: 80 },
        { name: 'Ateliers Pro', hash: '#ateliers', offset: 80 },
        { name: 'Stages', hash: '#stages', offset: 80 },
        { name: 'Veilles', hash: '#veilles', offset: 80 },
        { name: 'Compétences', hash: '#competences', offset: 80 },
        { name: 'Productions', hash: '#productions', offset: 80 },
        { name: 'Contact', hash: '#contact', offset: 160 },
      ]

      for (const section of sections) {
        vi.clearAllMocks()
        
        const button = screen.getByRole('button', { name: new RegExp(`aller à la section ${section.name.toLowerCase()}`, 'i') })
        fireEvent.click(button)

        await waitFor(() => {
          expect(mockQuerySelector).toHaveBeenCalledWith(section.hash)
        })

        await waitFor(() => {
          expect(mockScrollTo).toHaveBeenCalledWith({
            top: Math.max(0, 1000 - section.offset),
            behavior: 'smooth'
          })
        })
      }
    })
  })

  describe('Menu mobile', () => {
    it('devrait ouvrir et fermer le menu mobile correctement', async () => {
      renderApp()
      
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

      // Vérifier que la navigation fonctionne
      await waitFor(() => {
        expect(mockScrollTo).toHaveBeenCalled()
      })
    })
  })

  describe('Gestion des erreurs', () => {
    it('devrait gérer le cas où une section n\'existe pas', async () => {
      // Simuler qu'une section n'existe pas
      mockQuerySelector.mockReturnValue(null)
      
      renderApp()
      
      const contactButton = screen.getByRole('button', { name: /aller à la section contact/i })
      fireEvent.click(contactButton)

      // Vérifier que le fallback est utilisé
      await waitFor(() => {
        expect(mockQuerySelector).toHaveBeenCalledWith('#contact')
      })

      // Le fallback devrait utiliser window.location.hash
      // (cela ne peut pas être testé directement en raison des mocks)
    })

    it('devrait utiliser requestAnimationFrame pour le timing', async () => {
      renderApp()
      
      const contactButton = screen.getByRole('button', { name: /aller à la section contact/i })
      fireEvent.click(contactButton)

      await waitFor(() => {
        expect(mockRequestAnimationFrame).toHaveBeenCalled()
      })
    })
  })

  describe('Performance', () => {
    it('devrait effectuer la navigation rapidement', async () => {
      const startTime = Date.now()
      
      renderApp()
      
      const contactButton = screen.getByRole('button', { name: /aller à la section contact/i })
      fireEvent.click(contactButton)

      await waitFor(() => {
        expect(mockScrollTo).toHaveBeenCalled()
      })

      const endTime = Date.now()
      const duration = endTime - startTime

      // La navigation devrait être rapide (moins de 100ms)
      expect(duration).toBeLessThan(100)
    })
  })
}) 