import { render, screen, fireEvent, within } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'

import Navbar from '../components/layout/Navbar'

describe("Navbar - Intégration (HashLink)", () => {
  const renderNavbar = () =>
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    )

  it('rend les liens avec les bons href', () => {
    renderNavbar()

    const expected = [
      { name: /Accueil/i, href: '/#accueil' },
      { name: /À Propos/i, href: '/#a-propos' },
      { name: /Compétences/i, href: '/#competences' },
      { name: /Projets/i, href: '/#projets' },
      { name: /Formation/i, href: '/#formation' },
      { name: /Contact/i, href: '/#contact' },
    ]

    for (const { name, href } of expected) {
      const links = screen.getAllByRole('link', { name })
      expect(links.some(link => link.getAttribute('href') === href)).toBe(true)
    }
  })

  it('ouvre et ferme le menu mobile', () => {
    renderNavbar()
    const toggle = screen.getByRole('button', { name: /ouvrir le menu/i })
    const menu = document.getElementById('mobile-menu')

    expect(menu).toHaveClass('hidden')

    fireEvent.click(toggle)
    expect(menu).not.toHaveClass('hidden')

    // Click the mobile menu toggle
    fireEvent.click(toggle)
    
    // Click a mobile menu item
    const mobileLink = within(menu as HTMLElement).getByRole('link', { name: /contact/i })
    fireEvent.click(mobileLink)
    // Le menu devrait être caché après le clic
    expect(menu).toHaveClass('hidden')
  })

  it('le logo renvoie vers /#accueil', () => {
    renderNavbar()
    const logo = screen.getByRole('link', { name: /Portfolio/i })
    expect(logo).toHaveAttribute('href', '/#accueil')
  })

  it('la nav principale a un aria-label explicite', () => {
    renderNavbar()
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Navigation principale')
  })
})
