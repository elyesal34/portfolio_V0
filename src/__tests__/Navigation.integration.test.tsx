import { render, screen, fireEvent, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import App from '../app/App'

describe("Intégration - Navigation (HashLink)", () => {
  const renderApp = () => render(<App />)

  it('navbar rend des liens avec href corrects', () => {
    renderApp()
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

  it("menu mobile s'ouvre et se ferme via aria-hidden", () => {
    renderApp()
    const toggle = screen.getByRole('button', { name: /ouvrir le menu/i })
    fireEvent.click(toggle)
    const menu = document.getElementById('mobile-menu')
    expect(menu).toHaveAttribute('aria-hidden', 'false')

    const contactMobile = within(menu as HTMLElement).getByRole('link', { name: /contact/i })
    fireEvent.click(contactMobile)
    expect(document.getElementById('mobile-menu')).toHaveAttribute('aria-hidden', 'true')
  })
})
