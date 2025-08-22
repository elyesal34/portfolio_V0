// Fonction utilitaire pour les tests unitaires
export function testableScrollToHash(hash: string): boolean {
  const el = typeof document !== 'undefined' ? document.querySelector(hash) : null;
  if (!el) return false;
  let offset = -64;
  if (hash === '#contact') offset = -160;
  const y = el.getBoundingClientRect().top + window.pageYOffset + offset;
  window.scrollTo({ top: y, behavior: 'auto' });
  return true;
}
