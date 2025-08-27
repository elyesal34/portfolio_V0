// Fichier de déclaration de types pour ignorer les erreurs de Workbox
// @ts-nocheck

// Ignorer les erreurs de type pour les modules Workbox
declare module 'workbox-*' {
  // Type vide pour ignorer les erreurs
  const noTypesYet: any;
  export = noTypesYet;
}

// Ignorer les erreurs de type pour les fichiers spécifiques
// @ts-ignore
declare module 'workbox-background-sync';
// @ts-ignore
declare module 'workbox-broadcast-update';
// @ts-ignore
declare module 'workbox-cacheable-response';
// @ts-ignore
declare module 'workbox-core';
// @ts-ignore
declare module 'workbox-expiration';
// @ts-ignore
declare module 'workbox-google-analytics';
// @ts-ignore
declare module 'workbox-precaching';
// @ts-ignore
declare module 'workbox-routing';
// @ts-ignore
declare module 'workbox-strategies';
// @ts-ignore
declare module 'workbox-window';
