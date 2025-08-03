import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../../App'

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

describe('Tests d\'intégration - Navigation Contact', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Console spy pour capturer les logs
    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const renderApp = () => {
    return render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
  }

  describe('Navigation vers Contact', () => {
    it('devrait naviguer vers Contact en un seul clic', async () => {
      // Simuler que la section Contact existe
      const mockContactElement = {
        offsetTop: 2000,
        getBoundingClientRect: () => ({ top: 2000 }),
      }
      
      mockQuerySelector.mockImplementation((selector) => {
        if (selector === '#contact') {
          return mockContactElement
        }
        return null
      })

      renderApp()
      
      // Attendre que l'application soit chargée
      await waitFor(() => {
        expect(screen.getByRole('navigation')).toBeInTheDocument()
      })

      // Trouver et cliquer sur le bouton Contact
      const contactButton = screen.getByRole('button', { name: /aller à la section contact/i })
      expect(contactButton).toBeInTheDocument()

      fireEvent.click(contactButton)

      // Vérifier que la navigation a été tentée
      await waitFor(() => {
        expect(mockQuerySelector).toHaveBeenCalledWith('#contact')
      })

      // Vérifier que le scroll a été effectué avec l'offset spécial pour Contact (160px)
      await waitFor(() => {
        expect(mockScrollTo).toHaveBeenCalledWith({
          top: Math.max(0, 2000 - 160), // 1840px
          behavior: 'smooth'
        })
      })

      // Vérifier les logs de debug
      expect(console.log).toHaveBeenCalledWith('🚀 Navigation vers #contact')
      expect(console.log).toHaveBeenCalledWith('💬 Contact - Position calculée: 1840px (offsetTop: 2000px - 160px)')
    })

    it('devrait utiliser le système de retry si l\'élément n\'est pas trouvé immédiatement', async () => {
      // Simuler que l'élément n'est pas trouvé au premier essai
      let callCount = 0
      mockQuerySelector.mockImplementation((selector) => {
        callCount++
        if (selector === '#contact' && callCount > 1) {
          return { offsetTop: 2000 }
        }
        return null
      })

      renderApp()
      
      await waitFor(() => {
        expect(screen.getByRole('navigation')).toBeInTheDocument()
      })

      const contactButton = screen.getByRole('button', { name: /aller à la section contact/i })
      fireEvent.click(contactButton)

      // Vérifier que querySelector a été appelé plusieurs fois (retry)
      await waitFor(() => {
        expect(mockQuerySelector).toHaveBeenCalledTimes(2)
      }, { timeout: 2000 })

      // Vérifier que scrollTo a finalement été appelé
      await waitFor(() => {
        expect(mockScrollTo).toHaveBeenCalled()
      })
    })

    it('devrait utiliser requestAnimationFrame pour le timing', async () => {
      mockQuerySelector.mockReturnValue({ offsetTop: 2000 })

      renderApp()
      
      await waitFor(() => {
        expect(screen.getByRole('navigation')).toBeInTheDocument()
      })

      const contactButton = screen.getByRole('button', { name: /aller à la section contact/i })
      fireEvent.click(contactButton)

      await waitFor(() => {
        expect(mockRequestAnimationFrame).toHaveBeenCalled()
      })
    })
  })

  describe('Navigation vers autres sections', () => {
    it('devrait naviguer vers les autres sections avec l\'offset standard (80px)', async () => {
      const mockElement = { offsetTop: 1500 }
      mockQuerySelector.mockReturnValue(mockElement)

      renderApp()
      
      await waitFor(() => {
        expect(screen.getByRole('navigation')).toBeInTheDocument()
      })

      // Test avec la section CV
      const cvButton = screen.getByRole('button', { name: /aller à la section cv/i })
      fireEvent.click(cvButton)

      await waitFor(() => {
        expect(mockQuerySelector).toHaveBeenCalledWith('#cv')
      })

      await waitFor(() => {
        expect(mockScrollTo).toHaveBeenCalledWith({
          top: Math.max(0, 1500 - 80), // 1420px - offset standard
          behavior: 'smooth'
        })
      })
    })
  })

  describe('Menu mobile', () => {
    it('devrait fermer le menu mobile après navigation vers Contact', async () => {
      mockQuerySelector.mockReturnValue({ offsetTop: 2000 })

      renderApp()
      
      await waitFor(() => {
        expect(screen.getByRole('navigation')).toBeInTheDocument()
      })

      // Ouvrir le menu mobile
      const menuButton = screen.getByRole('button', { name: /ouvrir le menu/i })
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

  describe('Performance et robustesse', () => {
    it('devrait gérer les erreurs de navigation gracieusement', async () => {
      // Simuler une erreur dans querySelector
      mockQuerySelector.mockImplementation(() => {
        throw new Error('DOM error')
      })

      renderApp()
      
      await waitFor(() => {
        expect(screen.getByRole('navigation')).toBeInTheDocument()
      })

      const contactButton = screen.getByRole('button', { name: /aller à la section contact/i })
      
      // Ne devrait pas planter l'application
      expect(() => fireEvent.click(contactButton)).not.toThrow()
    })

    it('devrait effectuer la navigation rapidement', async () => {
      mockQuerySelector.mockReturnValue({ offsetTop: 2000 })

      const startTime = Date.now()
      
      renderApp()
      
      await waitFor(() => {
        expect(screen.getByRole('navigation')).toBeInTheDocument()
      })

      const contactButton = screen.getByRole('button', { name: /aller à la section contact/i })
      fireEvent.click(contactButton)

      await waitFor(() => {
        expect(mockScrollTo).toHaveBeenCalled()
      })

      const endTime = Date.now()
      const duration = endTime - startTime

      // La navigation devrait être rapide (moins de 200ms)
      expect(duration).toBeLessThan(200)
    })
  })
})