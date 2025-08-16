// Lightweight, one-time GA loader
let loaded = false;

type GtagCommand =
  | ['js', Date]
  | ['config', string, Record<string, unknown>?]
  | ['event', string, Record<string, unknown>?];

type GtagFn = (...args: GtagCommand) => void;

type GAWindow = Window & {
  dataLayer?: unknown[];
  gtag?: GtagFn;
};

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
  const w = window as GAWindow;
  if (loaded || w.gtag) return;
  w.dataLayer = w.dataLayer || [];
  w.gtag = (...args: GtagCommand) => {
    w.dataLayer!.push(args);
  };
  await injectScript(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`);
  w.gtag('js', new Date());
  w.gtag('config', measurementId);
  loaded = true;
}

export function trackEvent(action: string, params: Record<string, unknown> = {}) {
  const w = window as GAWindow;
  if (w.gtag) {
    w.gtag('event', action, params);
  }
}
