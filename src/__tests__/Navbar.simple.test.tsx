import React from 'react';
import { render, screen, fireEvent, within, act } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'

import Navbar from '../components/layout/Navbar'

describe('Navbar - Test simple (HashLink)', () => {
  const renderNavbar = () => render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  )

  it('contient un lien Contact pointant vers /#contact', () => {
    renderNavbar()
    const links = screen.getAllByRole('link', { name: /Contact/i })
    expect(links.some(link => link.getAttribute('href') === '/#contact')).toBe(true)
  })

  it('ouvre le menu mobile au clic sur le bouton', () => {
    renderNavbar()
    const toggle = screen.getByRole('button', { name: /ouvrir le menu/i })
    const menu = document.getElementById('mobile-menu')
    
    // Vérifie que le menu est caché initialement
    expect(menu).toHaveClass('hidden')
    expect(menu).toHaveClass('md:hidden')
    
    // Ouvre le menu
    fireEvent.click(toggle)
    
    // Vérifie que le menu est maintenant visible
    expect(menu).toHaveClass('block')
    expect(menu).toHaveClass('md:hidden')
  })
  
  it('ferme le menu mobile après clic sur un lien', async () => {
    const { container } = renderNavbar()
    const toggle = screen.getByRole('button', { name: /ouvrir le menu/i })
    
    // Ouvre le menu
    fireEvent.click(toggle)
    
    // Vérifie que le menu est visible
    const menu = container.querySelector('#mobile-menu')
    expect(menu).toHaveClass('block')
    
    // Clique sur un élément du menu
    const contact = within(menu as HTMLElement).getByRole('link', { name: /Contact/i })
    fireEvent.click(contact);
    
    // Vérifie que le menu est maintenant caché
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    const updatedMenu = container.querySelector('#mobile-menu');
    expect(updatedMenu).toHaveClass('hidden');
    expect(updatedMenu).toHaveClass('md:hidden');
  })
})
