import { render, screen, fireEvent, within } from '@testing-library/react'
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
    const links = screen.getAllByRole('link', { name: /Contact/i })
    expect(links.length).toBeGreaterThan(0)
    expect(links.some(link => link.getAttribute('href') === '/#contact')).toBe(true)
  })

  it('ouvrir puis fermer le menu mobile après clic sur Contact', async () => {
    renderNavbar()
    const toggle = screen.getByRole('button', { name: /ouvrir le menu/i })
    let menu = document.getElementById('mobile-menu')

    // Vérifier que le menu est initialement caché
    expect(menu).toHaveClass('hidden')

    // Ouvrir le menu
    fireEvent.click(toggle)
    menu = screen.getByRole('navigation').querySelector('#mobile-menu')
    expect(menu).toHaveClass('block')
    expect(menu).toHaveClass('md:hidden')

    // Cliquer sur le lien Contact
    const link = within(menu as HTMLElement).getByRole('link', { name: /Contact/i })
    fireEvent.click(link)
    
    // Attendre que l'état soit mis à jour
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Vérifier que le menu est maintenant caché
    const updatedMenu = document.getElementById('mobile-menu')
    expect(updatedMenu).toHaveClass('hidden')
    expect(updatedMenu).toHaveClass('md:hidden')
  })

  it('la nav principale a un aria-label explicite', () => {
    renderNavbar()
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Navigation principale')
  })
})
