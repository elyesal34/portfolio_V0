import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Naviguer vers la page d'accueil avant chaque test
    await page.goto('http://localhost:3000');
    // Attendre que la page soit complètement chargée
    await page.waitForLoadState('networkidle');
  });

  const sections = [
    { id: 'accueil', name: 'Accueil' },
    { id: 'cv', name: 'CV' },
    { id: 'ateliers', name: 'Ateliers Pro' },
    { id: 'stages', name: 'Stages' },
    { id: 'competences', name: 'Compétences' },
    { id: 'productions', name: 'Productions' },
    { id: 'veilles', name: 'Veilles' },
    { id: 'contact', name: 'Contact' }
  ];

  // Tester la navigation depuis la barre de navigation
  test('should navigate to each section from the navbar', async ({ page }) => {
    // Ouvrir le menu sur mobile si nécessaire
    const menuButton = page.locator('button[aria-label="Menu"]');
    if (await menuButton.isVisible()) {
      await menuButton.click();
    }

    for (const section of sections) {
      // Cliquer sur le lien de la section dans la navbar
      const link = page.locator(`a[href="/#${section.id}"]`).first();
      await link.click();
      
      // Vérifier que l'URL contient le bon hash
      await expect(page).toHaveURL(`http://localhost:3000/#${section.id}`);
      
      // Vérifier que la section est visible dans le viewport
      const sectionElement = page.locator(`#${section.id}`).first();
      await expect(sectionElement).toBeInViewport();
      
      // Vérifier que la section a le focus (pour l'accessibilité)
      await expect(sectionElement).toBeFocused();
    }
  });

  // Tester la navigation via les liens d'ancrage dans le contenu
  test('should navigate to sections from content links', async ({ page }) => {
    // Exemple: tester un lien vers la section contact depuis la section d'accueil
    const contactLink = page.locator('a[href="/#contact"]').first();
    await contactLink.click();
    
    // Vérifier que nous sommes bien sur la section contact
    await expect(page).toHaveURL('http://localhost:3000/#contact');
    const contactSection = page.locator('#contact').first();
    await expect(contactSection).toBeInViewport();
  });

  // Tester la navigation au clavier
  test('should navigate using keyboard', async ({ page }) => {
    // Donner le focus à la page
    await page.keyboard.press('Tab');
    
    // Naviguer vers le menu
    const menuButton = page.locator('button[aria-label="Menu"]');
    if (await menuButton.isVisible()) {
      await menuButton.press('Enter');
    }
    
    // Sélectionner la première section avec la touche Tab
    await page.keyboard.press('Tab');
    
    // Naviguer à travers les liens avec la touche Entrée
    for (const section of sections) {
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(`http://localhost:3000/#${section.id}`);
      await page.keyboard.press('Tab');
    }
  });

  // Tester le bouton de retour en haut de page
  test('should scroll to top when clicking back to top button', async ({ page }) => {
    // Aller en bas de page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Attendre que le bouton soit visible
    const backToTopButton = page.locator('a[href="/#accueil"]').last();
    await backToTopButton.click();
    
    // Vérifier que nous sommes remontés en haut de page
    await expect(page).toHaveURL('http://localhost:3000/#accueil');
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100); // Moins de 100px du haut
  });
});
