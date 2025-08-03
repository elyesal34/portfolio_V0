import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Navbar from '../Navbar'

// Mock simple pour react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/' }),
}))

describe('Navbar - Test basique', () => {
  it('devrait rendre la navbar avec le bouton Contact', () => {
    render(<Navbar />)
    
    // Vérifier que la navbar est rendue
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    
    // Vérifier que le bouton Contact existe
    const contactButton = screen.getByText('Contact')
    expect(contactButton).toBeInTheDocument()
  })

  it('devrait avoir tous les éléments de navigation', () => {
    render(<Navbar />)
    
    const expectedItems = ['Accueil', 'CV', 'Ateliers Pro', 'Stages', 'Veilles', 'Compétences', 'Productions', 'Contact']
    
    expectedItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })
}) 