import { render, screen } from '@testing-library/react';
import type { ComponentType } from 'react';
import { MemoryRouter } from 'react-router-dom';

import Competences from '../components/sections/about/Competences';
import CV from '../components/sections/about/CV';
import Contact from '../components/sections/contact/Contact';
import Veilles from '../components/sections/content/Veilles';
import Accueil from '../components/sections/home/Accueil';
import MentionsLegales from '../components/sections/legal/MentionsLegales';
import AteliersPro from '../components/sections/projects/AteliersPro';
import Productions from '../components/sections/projects/Productions';
import Stages from '../components/sections/projects/Stages';

// Basic functional checks: each section renders and exposes the expected anchor id.
// We avoid brittle text assertions and focus on structural anchors used by HashLink navigation.

type Case = { name: string; Component: ComponentType; id?: string };

const cases: Case[] = [
  { name: 'Accueil', Component: Accueil, id: 'accueil' },
  { name: 'CV', Component: CV, id: 'cv' },
  { name: 'Compétences', Component: Competences, id: 'competences' },
  { name: 'Ateliers Pro', Component: AteliersPro, id: 'ateliers' },
  { name: 'Stages', Component: Stages, id: 'stages' },
  { name: 'Productions', Component: Productions, id: 'productions' },
  { name: 'Veilles', Component: Veilles, id: 'veilles' },
  { name: 'Contact', Component: Contact, id: 'contact' },
  // Mentions légales is not a navigable anchor from Navbar and intentionally has no section id
  { name: 'Mentions Légales', Component: MentionsLegales },
];

describe('Section anchors', () => {
  test.each(cases)('%s renders its section and expected anchor id (if any)', ({ Component, id }: Case) => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Component />
      </MemoryRouter>
    );

    // Sanity: a <section> exists
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();

    if (id) {
      // Anchor id present on the section root
      const anchored = container.querySelector(`section#${CSS.escape(id)}`);
      expect(anchored).toBeInTheDocument();

      // For Contact, also assert the testing hook when present
      if (id === 'contact') {
        expect(screen.getByTestId('contact-section')).toBeInTheDocument();
      }
    } else {
      // Sections without an anchor should not accidentally expose one
      expect(section?.getAttribute('id')).toBeNull();
    }
  });
});
