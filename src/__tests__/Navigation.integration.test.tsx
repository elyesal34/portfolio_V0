import React from 'react';
import { render, screen, fireEvent, within, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { HashRouter } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'

describe("Intégration - Navigation (HashLink)", () => {
  const renderNavbar = () => {
    return render(
      <HashRouter>
        <Navbar />
      </HashRouter>
    )
  }

  it('navbar rend des liens avec href corrects', () => {
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
      const nav = screen.getByRole('navigation', { name: 'Navigation principale' })
      const links = within(nav).getAllByRole('link', { name })
      expect(links.length).toBeGreaterThan(0)
      expect(links.some(link => link.getAttribute('href') === href)).toBe(true)
    }
  })

  it("menu mobile s'ouvre et se ferme en basculant les classes 'block' et 'hidden'", async () => {
    const { container } = renderNavbar()
    
    // Vérifier que le menu est initialement caché
    const menu = container.querySelector('#mobile-menu')
    expect(menu).toHaveClass('hidden')
    expect(menu).toHaveClass('md:hidden')

    // Trouver et cliquer sur le bouton du menu mobile
    const menuButton = screen.getByRole('button', { name: /ouvrir le menu/i })
    fireEvent.click(menuButton)
    
    // Vérifier que le menu est maintenant visible
    expect(menu).toHaveClass('block')
    expect(menu).toHaveClass('md:hidden')

    // Simuler le clic sur un lien du menu
    const contactLink = within(menu as HTMLElement).getByRole('link', { name: /contact/i })
    fireEvent.click(contactLink);
    
    // Attendre la mise à jour de l'état
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Vérifier que le menu est maintenant caché
    const updatedMenu = container.querySelector('#mobile-menu');
    expect(updatedMenu).toHaveClass('hidden');
    expect(updatedMenu).toHaveClass('md:hidden');
  })
})
