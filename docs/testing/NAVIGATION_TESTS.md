# Tests d'Intégration — Navigation (HashLink)

Ce document décrit l'approche actuelle pour tester la navigation par ancres avec `react-router-hash-link` et les attributs ARIA.

## 🎯 Objectif
Garantir une navigation fluide et accessible vers les sections (ex: `#contact`) depuis la navbar desktop et le menu mobile.

## 🔧 Implémentation actuelle
- Navigation par liens `HashLink` avec offset via `scrollWithOffset` dans `Navbar.tsx`.
- App niveau routeur: `App.tsx` contient déjà un `Router`.
- Menu mobile contrôlé par `#mobile-menu` avec `aria-hidden` qui passe de `true` à `false` lorsque le menu est ouvert.
- Liens desktop possèdent un nom accessible de type: `aria-label="Aller à la section {Titre}"`.

## 🧪 Stratégie de tests
- Ne pas mocker `useNavigate`, `document.querySelector`, `window.scrollTo` ou `requestAnimationFrame`.
- Vérifier la présence des liens par rôle et nom accessible:
  - Desktop: `getByRole('link', { name: /Aller à la section Contact/i })`.
  - Logo: `getByRole('link', { name: /Elyes Allani/i })` (href `/#accueil`).
- Menu mobile: utiliser `within(menu)` pour éviter les doublons (desktop + mobile).
- Vérifier `aria-hidden` sur `#mobile-menu` lors de l'ouverture/fermeture.

## 📄 Exemples

Vérifier les href des liens desktop:
```ts
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
```

Ouvrir le menu mobile et le refermer après clic:
```ts
const toggle = screen.getByRole('button', { name: /ouvrir le menu/i })
fireEvent.click(toggle)
const menu = document.getElementById('mobile-menu')
expect(menu).toHaveAttribute('aria-hidden', 'false')

const contactMobile = within(menu as HTMLElement).getByRole('link', { name: /contact/i })
fireEvent.click(contactMobile)
expect(document.getElementById('mobile-menu')).toHaveAttribute('aria-hidden', 'true')
```

Gérer les doublons de texte (desktop + mobile):
```ts
const matches = screen.getAllByText('Contact')
expect(matches.length).toBeGreaterThan(0)
```

## 📦 Emplacement des tests
- Composants: `src/components/**/__tests__/*.test.tsx`
- Intégration App: `src/__tests__/*.integration.test.tsx`

## ✅ Résultats (actuels)
- Tous les tests de navigation passent (voir `npm run test:run`).

## 📝 Recommandations
- Ajouter des tests E2E (ex: Playwright) pour vérifier réellement le défilement visuel.
- Continuer d'utiliser des queries par rôle/nom pour la robustesse à long terme.
