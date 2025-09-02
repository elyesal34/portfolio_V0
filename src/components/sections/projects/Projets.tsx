import { Globe, Database, Smartphone, Code, Filter, ExternalLink, Github, Calendar, Users, Award } from 'lucide-react';
import { useState } from 'react';

const Projets = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');

  const projets = [
    {
      titre: "GestionVisiteur_bd_distante",
      type: "Application Web",
      icon: <Globe className="w-6 h-6" />,
      description: "Application web complète de gestion des visiteurs avec base de données distante, développée dans le cadre d'un atelier professionnel BTS SIO. Système complet avec authentification, gestion des droits et interface responsive.",
      technologies: ["PHP", "MySQL", "Android Studio", "Java", "HTML5", "CSS3", "JavaScript", "Bootstrap"],
      duree: "2 mois",
      contexte: "Projet d'atelier professionnel - BTS SIO SLAM",
      statut: "Terminé",
      github: "https://github.com/elyesal34/GestionVisiteur_bd_distante",
      demo: "#",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80&fm=webp",
      featured: true,
      date: "2024",
      equipe: "Projet individuel",
      resultats: [
        "Interface web responsive et intuitive",
        "Base de données optimisée avec plus de 1000 enregistrements",
        "Système d'authentification sécurisé",
        "Application mobile complémentaire"
      ]
    },
    {
      titre: "API REST Coach Internet",
      type: "Backend API",
      icon: <Database className="w-6 h-6" />,
      description: "API REST développée pour récupérer automatiquement les informations d'entreprises via l'API Google Maps. Utilisation d'Apify pour le scraping et génération de fichiers CSV structurés.",
      technologies: ["Python", "API Google Maps", "Apify", "REST API", "Sequelize", "CSV", "Git"],
      duree: "6 semaines",
      contexte: "Stage - Coach Internet (Pau)",
      statut: "Terminé",
      github: "#",
      demo: "#",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80&fm=webp",
      featured: true,
      date: "2025",
      equipe: "Stage individuel",
      resultats: [
        "API fonctionnelle avec plus de 5000 entreprises référencées",
        "Automatisation complète du processus de collecte",
        "Fichiers CSV structurés et exploitables",
        "Documentation technique complète"
      ]
    },
    {
      titre: "Application Temps d'Attente Soins",
      type: "Application Web",
      icon: <Smartphone className="w-6 h-6" />,
      description: "Application web React pour afficher les temps d'attente des établissements de soins. Interface de recherche avancée et géolocalisation pour améliorer l'expérience patient.",
      technologies: ["React", "JavaScript", "HTML5", "CSS3", "API REST", "Geolocation API", "Git"],
      duree: "5 semaines",
      contexte: "Stage - Cyriaque Mazères (Pau)",
      statut: "Terminé",
      github: "#",
      demo: "#",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80&fm=webp",
      featured: true,
      date: "2024",
      equipe: "Stage individuel",
      resultats: [
        "Réduction potentielle des temps d'attente",
        "Interface utilisateur intuitive",
        "Géolocalisation des établissements",
        "Première expérience React réussie"
      ]
    },
    {
      titre: "Portfolio Personnel",
      type: "Application Web",
      icon: <Code className="w-6 h-6" />,
      description: "Portfolio personnel développé avec React, TypeScript et Tailwind CSS. Design moderne, responsive et optimisé pour les performances avec PWA et service worker.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "PWA", "Service Worker", "Netlify"],
      duree: "3 mois",
      contexte: "Projet personnel - Vitrine professionnelle",
      statut: "En cours",
      github: "https://github.com/elyesal34/portfolio_V0",
      demo: "https://elyes-allani.netlify.app",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80&fm=webp",
      featured: false,
      date: "2024",
      equipe: "Projet individuel",
      resultats: [
        "Site web performant et accessible",
        "Score Lighthouse > 90 sur tous les critères",
        "Design responsive et moderne",
        "Déploiement automatisé"
      ]
    },
    {
      titre: "Système de Gestion Bibliothèque",
      type: "Application Web",
      icon: <Database className="w-6 h-6" />,
      description: "Application complète de gestion de bibliothèque avec système de prêts, gestion des utilisateurs et catalogue numérique. Développée en PHP avec Laravel.",
      technologies: ["PHP", "Laravel", "MySQL", "Bootstrap", "JavaScript", "Blade", "Eloquent ORM"],
      duree: "4 mois",
      contexte: "Projet d'atelier professionnel - BTS SIO",
      statut: "Terminé",
      github: "#",
      demo: "#",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80&fm=webp",
      featured: false,
      date: "2023",
      equipe: "Équipe de 3 personnes",
      resultats: [
        "Gestion complète des prêts et retours",
        "Interface administrateur avancée",
        "Système de notifications automatiques",
        "Base de données optimisée"
      ]
    },
    {
      titre: "Application Mobile Fitness",
      type: "Application Mobile",
      icon: <Smartphone className="w-6 h-6" />,
      description: "Application mobile de suivi d'activités sportives avec géolocalisation, statistiques personnalisées et défis communautaires. Développée avec React Native.",
      technologies: ["React Native", "Firebase", "Google Maps API", "Chart.js", "Redux", "Expo"],
      duree: "4 mois",
      contexte: "Projet personnel - Apprentissage mobile",
      statut: "En cours",
      github: "#",
      demo: "#",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80&fm=webp",
      featured: false,
      date: "2024",
      equipe: "Projet individuel",
      resultats: [
        "Suivi GPS des activités",
        "Statistiques détaillées",
        "Interface native performante",
        "Synchronisation cloud"
      ]
    }
  ];

  const filters = ['Tous', 'Application Web', 'Application Mobile', 'Backend API'];
  
  const filteredProjets = activeFilter === 'Tous' 
    ? projets 
    : projets.filter(projet => projet.type === activeFilter);

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Terminé': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700';
      case 'En cours': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700';
      case 'Planifié': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    }
  };

  return (
    <section id="projets" className="min-h-screen pt-16 scroll-mt-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Mes Projets
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Découvrez mes réalisations développées durant ma formation BTS SIO et mes stages, 
            allant des applications web aux solutions mobiles, en passant par les APIs.
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-4">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filtrer par type :</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg transform scale-105'
                    : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Liste des projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjets.map((projet, index) => (
            <article 
              key={index}
              className={`group bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 ${
                projet.featured ? 'ring-2 ring-blue-500 dark:ring-blue-400 ring-opacity-50' : ''
              }`}
            >
              {/* Image du projet */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={projet.image}
                  alt={`Aperçu du projet ${projet.titre}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                {projet.featured && (
                  <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <span>⭐</span>
                    <span>Projet phare</span>
                  </div>
                )}
                <div className="absolute bottom-4 right-4 text-white text-sm">
                  <span className="bg-black/50 px-2 py-1 rounded">{projet.date}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-blue-500 dark:text-blue-400 mt-0.5">{projet.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {projet.titre}
                      </h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span>{projet.contexte}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium border ${getStatutColor(projet.statut)}`}>
                    {projet.statut}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {projet.description}
                </p>

                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="font-medium">Durée: {projet.duree}</span>
                    <Users className="w-4 h-4 ml-4 mr-1" />
                    <span className="font-medium">{projet.equipe}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-medium">Technologies :</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {projet.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700"
                      >
                        {tech}
                      </span>
                    ))}
                    {projet.technologies.length > 4 && (
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-sm border border-gray-200 dark:border-gray-600">
                        +{projet.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    Résultats obtenus :
                  </h4>
                  <ul className="space-y-1">
                    {projet.resultats.slice(0, 2).map((resultat, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span>{resultat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-3">
                  <button
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors space-x-2"
                    onClick={() => window.open(projet.demo, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Voir le projet</span>
                  </button>
                  {projet.github && projet.github !== '#' && (
                    <button
                      className="flex items-center px-3 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors space-x-2"
                      onClick={() => window.open(projet.github, '_blank')}
                    >
                      <Github className="w-4 h-4" />
                      <span className="hidden sm:inline">Code</span>
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProjets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">Aucun projet trouvé pour ce filtre.</p>
          </div>
        )}

        {/* Section compétences développées */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6">Compétences Développées</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Frontend</h4>
              <ul className="space-y-1 text-blue-100 dark:text-blue-200">
                <li>• React & TypeScript</li>
                <li>• Responsive Design</li>
                <li>• Optimisation des performances</li>
                <li>• Accessibilité web</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Backend</h4>
              <ul className="space-y-1 text-blue-100 dark:text-blue-200">
                <li>• APIs REST</li>
                <li>• Bases de données</li>
                <li>• Authentification sécurisée</li>
                <li>• Architecture logicielle</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">DevOps</h4>
              <ul className="space-y-1 text-blue-100 dark:text-blue-200">
                <li>• Git & GitHub</li>
                <li>• Déploiement automatisé</li>
                <li>• Tests automatisés</li>
                <li>• Monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projets;