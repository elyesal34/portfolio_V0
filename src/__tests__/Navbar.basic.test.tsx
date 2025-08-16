import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'

import Navbar from '../components/layout/Navbar'

describe('Navbar - Test basique', () => {
  const renderNavbar = () => render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  )

  it('rend la navigation et le lien Contact', () => {
    renderNavbar()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    const contacts = screen.getAllByText('Contact')
    expect(contacts.length).toBeGreaterThan(0)
  })

  it('contient tous les éléments de navigation', () => {
    renderNavbar()
    const expectedItems = ['Accueil', 'CV', 'Ateliers Pro', 'Stages', 'Veilles', 'Compétences', 'Productions', 'Contact']
    expectedItems.forEach(item => {
      const matches = screen.getAllByText(item)
      expect(matches.length).toBeGreaterThan(0)
    })
  })
})
