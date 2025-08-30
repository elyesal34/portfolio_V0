import { BookOpen, TrendingUp, Lightbulb, ExternalLink, Calendar, Tag } from 'lucide-react';
import { useState } from 'react';

const Veilles = () => {
  const articles = [
    {
      titre: "L'Intelligence Artificielle dans le développement web",
      date: "15 Janvier 2024",
      categorie: "IA & Développement",
      resume: "Exploration des outils d'IA qui révolutionnent le développement web, de GitHub Copilot aux générateurs de code automatisés.",
      contenu: [
        "GitHub Copilot et l'assistance au codage",
        "Génération automatique de tests unitaires",
        "Optimisation du code avec l'IA",
        "Impact sur la productivité des développeurs"
      ],
      sources: ["GitHub Blog", "Stack Overflow Developer Survey", "MIT Technology Review"],
      tags: ["IA", "Développement", "Productivité", "Outils"]
    },
    {
      titre: "Les frameworks JavaScript en 2024",
      date: "28 Décembre 2023",
      categorie: "Développement Frontend",
      resume: "Analyse comparative des frameworks JavaScript populaires et émergents, leurs avantages et cas d'usage.",
      contenu: [
        "React 18 et les nouvelles fonctionnalités",
        "Vue.js 3 et la Composition API",
        "Svelte et SvelteKit : simplicité et performance",
        "Next.js 14 et le rendu hybride"
      ],
      sources: ["State of JS 2023", "React Documentation", "Vue.js Official Blog"],
      tags: ["JavaScript", "React", "Vue.js", "Svelte", "Frontend"]
    },
    {
      titre: "Cybersécurité : les menaces de 2024",
      date: "10 Janvier 2024",
      categorie: "Sécurité",
      resume: "Panorama des nouvelles menaces cybersécuritaires et des bonnes pratiques pour s'en protéger.",
      contenu: [
        "Attaques par ransomware ciblées",
        "Vulnérabilités des applications web",
        "Sécurité des API REST",
        "Authentification multi-facteurs"
      ],
      sources: ["ANSSI", "OWASP Top 10", "Cybersecurity & Infrastructure Security Agency"],
      tags: ["Sécurité", "OWASP", "API", "Authentification"]
    },
    {
      titre: "DevOps et CI/CD : automatisation avancée",
      date: "22 Décembre 2023",
      categorie: "DevOps",
      resume: "Les dernières tendances en matière d'intégration et déploiement continus, avec focus sur Docker et Kubernetes.",
      contenu: [
        "Containerisation avec Docker",
        "Orchestration avec Kubernetes",
        "Pipelines CI/CD avec GitHub Actions",
        "Monitoring et observabilité"
      ],
      sources: ["Docker Documentation", "Kubernetes Blog", "GitHub Actions Docs"],
      tags: ["DevOps", "Docker", "Kubernetes", "CI/CD", "Automatisation"]
    }
  ];

  const sources = [
    { nom: "MDN Web Docs", url: "https://developer.mozilla.org", description: "Documentation de référence pour les technologies web" },
    { nom: "Stack Overflow", url: "https://stackoverflow.com", description: "Communauté de développeurs pour résoudre les problèmes techniques" },
    { nom: "GitHub Blog", url: "https://github.blog", description: "Actualités et tendances du développement logiciel" },
    { nom: "Dev.to", url: "https://dev.to", description: "Plateforme de partage d'articles techniques" },
    { nom: "CSS-Tricks", url: "https://css-tricks.com", description: "Ressources et tutoriels CSS avancés" },
    { nom: "JavaScript Weekly", url: "https://javascriptweekly.com", description: "Newsletter hebdomadaire sur JavaScript" }
  ];

  const [visibleCount, setVisibleCount] = useState(2);
  const visibleArticles = articles.slice(0, visibleCount);

  return (
    <section id="veilles" className="min-h-screen pt-16 scroll-mt-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Veille Technologique</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            La veille technologique est essentielle dans le domaine informatique. 
            Elle permet de rester à jour sur les évolutions technologiques, 
            les nouvelles pratiques et les tendances du marché.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
              Articles de veille
            </h3>
            
            <div className="space-y-8">
              {visibleArticles.map((article, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{article.titre}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Tag className="w-4 h-4 mr-1" />
                          <span>{article.categorie}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{article.resume}</p>
                  
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-800 mb-2">Points clés abordés :</h5>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {article.contenu.map((point, pointIndex) => (
                        <li key={pointIndex}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-800 mb-2">Sources consultées :</h5>
                    <div className="flex flex-wrap gap-2">
                      {article.sources.map((source, sourceIndex) => (
                        <span key={sourceIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < articles.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setVisibleCount(visibleCount + 2)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Voir plus d'articles
                </button>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-green-500" />
              Sources de veille
            </h3>
            
            <div className="space-y-4">
              {sources.map((source, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{source.nom}</h4>
                      <p className="text-sm text-gray-600 mb-2">{source.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                Méthodologie de veille
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Consultation quotidienne des sources fiables</li>
                <li>• Abonnement aux newsletters spécialisées</li>
                <li>• Participation aux communautés de développeurs</li>
                <li>• Suivi des leaders d'opinion sur les réseaux</li>
                <li>• Test et expérimentation des nouvelles technologies</li>
                <li>• Synthèse et partage des découvertes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Importance de la veille technologique</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Rester compétitif</h4>
              <p className="text-blue-100">Se tenir au courant des dernières innovations pour maintenir ses compétences à jour.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Anticiper les évolutions</h4>
              <p className="text-blue-100">Identifier les tendances émergentes pour s'adapter aux besoins futurs du marché.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Améliorer ses pratiques</h4>
              <p className="text-blue-100">Découvrir de nouveaux outils et méthodes pour optimiser son travail.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Veilles;