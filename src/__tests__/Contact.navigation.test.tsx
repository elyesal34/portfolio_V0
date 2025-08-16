import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'

import Navbar from '../components/layout/Navbar'

describe('Navigation vers Contact - HashLink', () => {
  const renderNavbar = () => render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  )

  it("le lien Contact existe et pointe vers /#contact", () => {
    renderNavbar()
    const link = screen.getByRole('link', { name: /Aller à la section Contact/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/#contact')
  })

  it('ouvrir puis fermer le menu mobile après clic sur Contact', () => {
    renderNavbar()
    const toggle = screen.getByRole('button', { name: /ouvrir le menu/i })
    fireEvent.click(toggle)
    const menu = document.getElementById('mobile-menu')
    expect(menu).toHaveAttribute('aria-hidden', 'false')

    const link = screen.getByRole('link', { name: /Aller à la section Contact/i })
    fireEvent.click(link)
    expect(document.getElementById('mobile-menu')).toHaveAttribute('aria-hidden', 'true')
  })

  it('la nav principale a un aria-label explicite', () => {
    renderNavbar()
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Navigation principale')
  })
})
