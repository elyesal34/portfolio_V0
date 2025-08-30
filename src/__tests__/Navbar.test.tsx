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
      // Check that at least one link (desktop or mobile) has the correct href
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

    fireEvent.click(toggle) // Click again to close
    expect(menu).toHaveClass('hidden')
  })

  it('le logo pointe vers /#accueil', () => {
    renderNavbar()
    const logo = screen.getByRole('link', { name: /Portfolio/i })
    expect(logo).toHaveAttribute('href', '/#accueil')
  })

  it('nav principale a aria-label explicite', () => {
    renderNavbar()
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Navigation principale')
  })
})
