import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'

import Navbar from '../components/layout/Navbar'

describe('Navbar - Test simple (HashLink)', () => {
  const renderNavbar = () => render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  )

  it('contient un lien Contact pointant vers /#contact', () => {
    renderNavbar()
    const link = screen.getByRole('link', { name: /Aller à la section Contact/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/#contact')
  })

  it('ouvre puis referme le menu mobile après clic sur un item', () => {
    renderNavbar()
    const toggle = screen.getByRole('button', { name: /ouvrir le menu/i })
    fireEvent.click(toggle)
    const menu = document.getElementById('mobile-menu')
    expect(menu).toHaveAttribute('aria-hidden', 'false')

    const contact = screen.getByRole('link', { name: /Aller à la section Contact/i })
    fireEvent.click(contact)
    expect(document.getElementById('mobile-menu')).toHaveAttribute('aria-hidden', 'true')
  })
})
