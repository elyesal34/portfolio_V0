import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'

import Navbar from '../components/layout/Navbar'

describe('Navbar - HashLink navigation', () => {
  const renderNavbar = () => render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  )

  it('affiche tous les liens avec les bons href', () => {
    renderNavbar()

    // Via aria-labels "Aller à la section X"
    const expected = [
      { name: 'Accueil', href: '/#accueil' },
      { name: 'CV', href: '/#cv' },
      { name: 'Ateliers Pro', href: '/#ateliers' },
      { name: 'Stages', href: '/#stages' },
      { name: 'Compétences', href: '/#competences' },
      { name: 'Productions', href: '/#productions' },
      { name: 'Veilles', href: '/#veilles' },
      { name: 'Contact', href: '/#contact' },
    ]

    for (const { name, href } of expected) {
      const link = screen.getByRole('link', { name: new RegExp(`Aller à la section ${name}`, 'i') })
      expect(link).toHaveAttribute('href', href)
    }
  })

  it('ouvre et ferme le menu mobile', () => {
    renderNavbar()
    const toggle = screen.getByRole('button', { name: /ouvrir le menu/i })
    fireEvent.click(toggle)
    const menu = document.getElementById('mobile-menu')
    expect(menu).toHaveAttribute('aria-hidden', 'false')

    const contactLink = screen.getByRole('link', { name: /Aller à la section Contact/i })
    fireEvent.click(contactLink)
    expect(document.getElementById('mobile-menu')).toHaveAttribute('aria-hidden', 'true')
  })

  it('le logo pointe vers /#accueil', () => {
    renderNavbar()
    const logo = screen.getByRole('link', { name: /Elyes Allani/i })
    expect(logo).toHaveAttribute('href', '/#accueil')
  })

  it('nav principale a aria-label explicite', () => {
    renderNavbar()
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Navigation principale')
  })
})
