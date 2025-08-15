// Lightweight, one-time GA loader
let loaded = false;

function injectScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src^="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Failed to load GA'));
    document.head.appendChild(s);
  });
}

export async function initGA(measurementId = 'G-MJLQKQWB5R') {
  if (loaded || (window as any).gtag) return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).gtag = function gtag(){ (window as any).dataLayer.push(arguments); };
  await injectScript(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`);
  (window as any).gtag('js', new Date());
  (window as any).gtag('config', measurementId);
  loaded = true;
}

export function trackEvent(action: string, params: Record<string, any> = {}) {
  if ((window as any).gtag) {
    (window as any).gtag('event', action, params);
  }
}
