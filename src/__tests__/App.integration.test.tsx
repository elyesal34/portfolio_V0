import { render, screen, fireEvent, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import App from '../app/App'

describe('App - Intégration (HashLink)', () => {
  const renderApp = () => render(<App />)

  it('la navbar expose des liens HashLink corrects', () => {
    renderApp()
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

  it('menu mobile: la classe hidden est basculée après clic sur un lien', () => {
    renderApp()
    const toggle = screen.getByRole('button', { name: /ouvrir le menu/i })
    const menu = document.getElementById('mobile-menu')

    expect(menu).toHaveClass('hidden')

    fireEvent.click(toggle)
    expect(menu).not.toHaveClass('hidden')

    const contactMobile = within(menu as HTMLElement).getByRole('link', { name: /contact/i })
    fireEvent.click(contactMobile)
    expect(menu).toHaveClass('hidden')
  })
})