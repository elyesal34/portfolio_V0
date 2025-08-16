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

  it('rend les liens avec les bons href (aria-label)', () => {
    renderNavbar()

    const expected = [
      { name: 'Accueil', hash: '/#accueil' },
      { name: 'CV', hash: '/#cv' },
      { name: 'Ateliers Pro', hash: '/#ateliers' },
      { name: 'Stages', hash: '/#stages' },
      { name: 'Compétences', hash: '/#competences' },
      { name: 'Productions', hash: '/#productions' },
      { name: 'Veilles', hash: '/#veilles' },
      { name: 'Contact', hash: '/#contact' },
    ]

    for (const item of expected) {
      const link = screen.getByRole('link', { name: new RegExp(`Aller à la section ${item.name}`, 'i') })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', item.hash)
    }
  })

  it('ouvre et ferme le menu mobile (aria-hidden)', () => {
    renderNavbar()

    const button = screen.getByRole('button', { name: /ouvrir le menu/i })
    fireEvent.click(button)

    const mobileMenu = screen.getByLabelText('Navigation mobile', { selector: 'nav' }).closest('#mobile-menu')
    expect(mobileMenu).not.toHaveAttribute('aria-hidden', 'true')

    // Cliquer sur un item ferme le menu
    const contactLinkMobile = within(mobileMenu as HTMLElement).getByRole('link', { name: /contact/i })
    fireEvent.click(contactLinkMobile)

    // aria-hidden repasse à true
    const closedMenu = document.getElementById('mobile-menu')
    expect(closedMenu).toHaveAttribute('aria-hidden', 'true')
  })

  it('le logo renvoie vers /#accueil', () => {
    renderNavbar()
    const logo = screen.getByRole('link', { name: /Elyes Allani/i })
    expect(logo).toHaveAttribute('href', '/#accueil')
  })

  it('la nav principale a un aria-label explicite', () => {
    renderNavbar()
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Navigation principale')
  })
})
