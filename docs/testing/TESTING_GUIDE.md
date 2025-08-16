# Testing Guide

## Goals
- Ensure navigation and anchor scrolling work reliably via HashLink across the app.
- Keep tests accessible, deterministic, and fast.

## Test Types and Locations
- Component tests (colocated):
  - `src/components/**/__tests__/*.test.tsx`
  - Example: `src/components/__tests__/Navbar.test.tsx`
- App/integration tests:
  - `src/__tests__/*.integration.test.tsx`
  - Examples: `src/__tests__/App.integration.test.tsx`

## Naming Conventions
- Unit/component tests: `*.test.tsx`
- Integration tests: `*.integration.test.tsx`
- Keep file names descriptive (e.g., `Navbar.integration.test.tsx`).

## How to Run
- All tests: `npm run test:run`
- Watch mode: `npm run test:watch`
- UI mode: `npm run test:ui`
- Integration-only: `npm run test:integration`

## Environment
- Vitest + React Testing Library + JSDOM.
- Config: `vitest.config.ts`
  - JSDOM environment
  - Setup file: `src/test/setup.ts`
  - Jest-DOM included via `test.deps.optimizer.web.include` to avoid deprecation.

## Key Patterns (Navigation + Accessibility)
- Use `HashLink` for anchors with offset scrolling.
  - Offset handled in components (e.g., `scrollWithOffset` in `Navbar.tsx`).
- Do not mock `useNavigate`, `document.querySelector`, `window.scrollTo`, or `requestAnimationFrame` unless absolutely required.
- Query links by role and accessible name:
  - Desktop: `screen.getByRole('link', { name: /Aller à la section Contact/i })`
  - Logo: `screen.getByRole('link', { name: /Elyes Allani/i })`
- Mobile menu testing:
  - Toggle via the button labelled `Ouvrir le menu`/`Fermer le menu`.
  - Open state: `#mobile-menu[aria-hidden="false"]`
  - Close state after clicking a link: `#mobile-menu[aria-hidden="true"]`
  - Scope queries to the menu to avoid duplicates: `within(menu).getByRole('link', { name: /contact/i })`
- Duplicate texts (desktop + mobile):
  - Prefer role + name queries; if using text queries, use `getAllByText` and assert `length > 0`.
- App-level Router:
  - `App.tsx` already includes a `Router`. Do NOT wrap `<App />` with `BrowserRouter` in tests to avoid the error “You cannot render a <Router> inside another <Router>”.

## Examples
- Assert navbar links:
```ts
const link = screen.getByRole('link', { name: /Aller à la section Contact/i })
expect(link).toHaveAttribute('href', '/#contact')
```

- Mobile menu open/close:
```ts
const toggle = screen.getByRole('button', { name: /ouvrir le menu/i })
fireEvent.click(toggle)
const menu = document.getElementById('mobile-menu')
expect(menu).toHaveAttribute('aria-hidden', 'false')

const contactMobile = within(menu as HTMLElement).getByRole('link', { name: /contact/i })
fireEvent.click(contactMobile)
expect(document.getElementById('mobile-menu')).toHaveAttribute('aria-hidden', 'true')
```

## Linting & Stability
- Prefer role/name queries over text when possible.
- Avoid implementation-detail assertions (e.g., internal state, exact class names).
- Keep tests resilient to styling changes.

## Adding New Tests
- Co-locate with component or add to `src/__tests__/` for app-wide behavior.
- Follow naming and patterns above.
- Ensure imports point to the correct component paths (e.g., `components/layout/Navbar`).
