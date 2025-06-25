import { Github, ExternalLink, Code, Database, Smartphone, Globe, Filter, Star, Calendar, User } from 'lucide-react';
import { useState } from 'react';

const Productions = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');

  const projets = [
    {
      titre: "GestionVisiteur_bd_distante",
      type: "Application Web",
      icon: <Globe className="w-6 h-6" />,
      description: "Application web permettant la gestion des visiteurs avec une base de données distante. Authentification, ajout, modification et suppression de visiteurs.",
      technologies: ["PHP", "MySQL", "Android Studio", "Java"],
      fonctionnalites: [
        "Connexion sécurisée",
        "Ajout/modification/suppression de visiteurs",
        "Recherche de visiteurs",
        "Gestion distante de la base de données",
        "Interface utilisateur responsive"
      ],
      duree: "2 mois",
      contexte: "Projet d'atelier professionnel",
      statut: "Terminé",
      github: "https://github.com/elyesal34/GestionVisiteur_bd_distante",
      demo: "#",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      featured: true,
      date: "2024"
    },
    {
      titre: "API REST E-commerce",
      type: "Backend API",
      icon: <Database className="w-6 h-6" />,
      description: "API REST complète pour une plateforme e-commerce avec authentification JWT, gestion des commandes et paiements.",
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "Stripe API"],
      fonctionnalites: [
        "Authentification sécurisée",
        "Gestion des produits et catégories",
        "Panier et commandes",
        "Intégration paiement Stripe",
        "Documentation Swagger"
      ],
      duree: "2 mois",
      contexte: "Projet personnel",
      statut: "En cours",
      github: "#",
      demo: "#",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
      featured: false,
      date: "2024"
    },
    {
      titre: "Application Mobile de Fitness",
      type: "Application Mobile",
      icon: <Smartphone className="w-6 h-6" />,
      description: "Application mobile de suivi d'activités sportives avec géolocalisation, statistiques et défis communautaires.",
      technologies: ["React Native", "Firebase", "Google Maps API", "Chart.js"],
      fonctionnalites: [
        "Suivi GPS des activités",
        "Statistiques personnalisées",
        "Défis entre amis",
        "Synchronisation cloud",
        "Notifications push"
      ],
      duree: "4 mois",
      contexte: "Projet de stage",
      statut: "Terminé",
      github: "#",
      demo: "#",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
      featured: true,
      date: "2023"
    },
    {
      titre: "Plateforme de Cours en Ligne",
      type: "Application Web",
      icon: <Code className="w-6 h-6" />,
      description: "Plateforme d'apprentissage en ligne avec système de cours, quiz interactifs et suivi de progression.",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Socket.io"],
      fonctionnalites: [
        "Gestion des cours et modules",
        "Quiz interactifs",
        "Chat en temps réel",
        "Suivi de progression",
        "Certificats de completion"
      ],
      duree: "5 mois",
      contexte: "Projet de fin d'études",
      statut: "En cours",
      github: "#",
      demo: "#",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      featured: false,
      date: "2024"
    }
  ];

  const filters = ['Tous', 'Application Web', 'Application Mobile', 'Backend API'];

  const filteredProjets = activeFilter === 'Tous' 
    ? projets 
    : projets.filter(projet => projet.type === activeFilter);

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Terminé': return 'bg-green-100 text-green-800 border-green-200';
      case 'En cours': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Planifié': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Application Web': return <Globe className="w-4 h-4" />;
      case 'Application Mobile': return <Smartphone className="w-4 h-4" />;
      case 'Backend API': return <Database className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  return (
    <section id="productions" className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Productions & Réalisations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez mes projets et réalisations développés durant ma formation BTS SIO, 
            allant des applications web aux solutions mobiles, en passant par les APIs et 
            les contributions open source.
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div className="flex items-center space-x-2 text-gray-600 mb-4">
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
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredProjets.map((projet, index) => (
            <div 
              key={index} 
              className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                projet.featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
              }`}
            >
              {/* Image du projet */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={projet.image}
                  alt={`Aperçu du projet ${projet.titre}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                {projet.featured && (
                  <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Projet phare</span>
                  </div>
                )}
                <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-white text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{projet.date}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-500">{projet.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {projet.titre}
                      </h4>
                      <div className="flex items-center text-sm text-gray-500 space-x-1">
                        {getTypeIcon(projet.type)}
                        <span>{projet.type}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatutColor(projet.statut)}`}>
                    {projet.statut}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">{projet.description}</p>

                <div className="mb-4">
                  <h5 className="font-semibold text-gray-800 mb-2 flex items-center space-x-1">
                    <Code className="w-4 h-4" />
                    <span>Technologies utilisées :</span>
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {projet.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-2">Fonctionnalités principales :</h5>
                  <ul className="space-y-1">
                    {projet.fonctionnalites.slice(0, 3).map((fonc, foncIndex) => (
                      <li key={foncIndex} className="flex items-start space-x-2 text-gray-600 text-sm">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{fonc}</span>
                      </li>
                    ))}
                    {projet.fonctionnalites.length > 3 && (
                      <li className="text-gray-500 text-sm italic">
                        + {projet.fonctionnalites.length - 3} autres fonctionnalités
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>Durée: {projet.duree}</span>
                  </div>
                  <span>Contexte: {projet.contexte}</span>
                </div>

                <div className="flex space-x-3">
                  <a
                    href={projet.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors space-x-2 flex-1 justify-center"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                  <a
                    href={projet.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors space-x-2 flex-1 justify-center"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Démo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistiques */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">Statistiques de Production</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">12+</div>
              <div className="text-blue-100">Projets réalisés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">8</div>
              <div className="text-blue-100">Technologies maîtrisées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Commits GitHub</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Contributions open source</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Productions;