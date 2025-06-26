import React from 'react';

const MentionsLegales = () => (
  <section className="min-h-screen flex items-center justify-center bg-gray-50 py-16 px-2" aria-labelledby="mentions-legales-title">
    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <h1 id="mentions-legales-title" className="text-3xl md:text-4xl font-bold text-primary mb-8">Mentions légales</h1>
      <h2 className="text-lg font-semibold text-secondary mt-6 mb-2">Éditeur du site</h2>
      <address className="mb-4 not-italic">
        Elyes Allani<br />
        Email : <a href="mailto:allanielyes34@gmail.com" className="underline text-primary">allanielyes34@gmail.com</a><br />
        Adresse : Adresse communiquée sur demande
      </address>
      <h2 className="text-lg font-semibold text-secondary mt-6 mb-2">Hébergement</h2>
      <address className="mb-4 not-italic">
        Netlify, Inc.<br />
        2325 3rd Street, Suite 296, San Francisco, CA 94107, États-Unis<br />
        <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" className="underline text-primary">www.netlify.com</a>
      </address>
      <h2 className="text-lg font-semibold text-secondary mt-6 mb-2">Données personnelles</h2>
      <p className="mb-4">
        Les informations collectées via le formulaire de contact sont uniquement utilisées pour répondre à votre demande.<br />
        Conformément au RGPD, vous pouvez demander la suppression ou la modification de vos données en écrivant à <a href="mailto:allanielyes34@gmail.com" className="underline text-primary">allanielyes34@gmail.com</a>.<br />
        Aucune donnée n'est transmise à des tiers.
      </p>
      <h2 className="text-lg font-semibold text-secondary mt-6 mb-2">Cookies</h2>
      <p className="mb-4">
        Ce site n'utilise pas de cookies de suivi ou d'analyse.
      </p>
      <h2 className="text-lg font-semibold text-secondary mt-6 mb-2">Crédits</h2>
      <p className="mb-4">
        Photos : Unsplash<br />
        Icônes : Lucide React
      </p>
      <p className="mt-8 text-xs text-gray-400">Dernière mise à jour : juin 2024</p>
    </div>
  </section>
);

export default MentionsLegales; 