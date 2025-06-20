import React from 'react';
import { Github, ExternalLink, Code, Database, Smartphone, Globe, Award, Calendar } from 'lucide-react';

const Productions = () => {
  const projets = [
    {
      titre: "Application de Gestion de Bibliothèque",
      type: "Application Web",
      icon: <Globe className="w-6 h-6" />,
      description: "Système complet de gestion de bibliothèque avec interface administrateur et utilisateur, gestion des emprunts et réservations.",
      technologies: ["PHP", "Laravel", "MySQL", "Bootstrap", "JavaScript"],
      fonctionnalites: [
        "Gestion des livres et auteurs",
        "Système d'emprunt et de réservation",
        "Interface administrateur",
        "Recherche avancée",
        "Génération de rapports"
      ],
      duree: "3 mois",
      contexte: "Projet d'atelier professionnel",
      statut: "Terminé",
      github: "#",
      demo: "#"
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
      demo: "#"
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
      demo: "#"
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
      demo: "#"
    }
  ];

  const realisations = [
    {
      titre: "Participation au Hackathon Regional",
      date: "Mars 2024",
      description: "2ème place au hackathon régional avec une solution IoT pour la smart city",
      prix: "Prix de l'Innovation"
    },
    {
      titre: "Contribution Open Source",
      date: "2023-2024",
      description: "Contributions régulières à des projets open source sur GitHub",
      prix: "15+ Pull Requests acceptées"
    },
    {
      titre: "Présentation Technique",
      date: "Janvier 2024",
      description: "Présentation sur les Progressive Web Apps lors des journées techniques",
      prix: "Meilleure présentation étudiante"
    }
  ];

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Terminé': return 'bg-green-100 text-green-800';
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'Planifié': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Application Web': return <Globe className="w-5 h-5" />;
      case 'Application Mobile': return <Smartphone className="w-5 h-5" />;
      case 'Backend API': return <Database className="w-5 h-5" />;
      default: return <Code className="w-5 h-5" />;
    }
  };

  return (
    <section id="productions" className="min-h-screen pt-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Productions & Réalisations</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez mes projets et réalisations développés durant ma formation BTS SIO, 
            allant des applications web aux solutions mobiles, en passant par les APIs et 
            les contributions open source.
          </p>
        </div>

        {/* Projets principaux */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Projets Développés</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projets.map((projet, index) => (
              <div key={index} className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-blue-500 mr-3">{projet.icon}</div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">{projet.titre}</h4>
                        <div className="flex items-center text-sm text-gray-500">
                          {getTypeIcon(projet.type)}
                          <span className="ml-1">{projet.type}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatutColor(projet.statut)}`}>
                      {projet.statut}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{projet.description}</p>

                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-800 mb-2">Technologies utilisées :</h5>
                    <div className="flex flex-wrap gap-2">
                      {projet.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-800 mb-2">Fonctionnalités principales :</h5>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                      {projet.fonctionnalites.slice(0, 3).map((fonc, foncIndex) => (
                        <li key={foncIndex}>{fonc}</li>
                      ))}
                      {projet.fonctionnalites.length > 3 && (
                        <li className="text-gray-500">+ {projet.fonctionnalites.length - 3} autres fonctionnalités</li>
                      )}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>Durée: {projet.duree}</span>
                    <span>Contexte: {projet.contexte}</span>
                  </div>

                  <div className="flex space-x-3">
                    <a
                      href={projet.github}
                      className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                    <a
                      href={projet.demo}
                      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Démo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Autres réalisations */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Autres Réalisations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {realisations.map((real, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-3">
                  <Award className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="text-sm text-gray-500">{real.date}</span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{real.titre}</h4>
                <p className="text-gray-600 mb-3">{real.description}</p>
                <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
                  {real.prix}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Statistiques */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
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

        {/* Compétences développées */}
        <div className="mt-16 bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Compétences Développées</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Compétences techniques</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Développement full-stack (frontend + backend)</li>
                <li>• Conception et modélisation de bases de données</li>
                <li>• Développement d'APIs REST et GraphQL</li>
                <li>• Développement mobile cross-platform</li>
                <li>• Tests unitaires et intégration continue</li>
                <li>• Déploiement et DevOps</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Compétences transversales</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Gestion de projet et planification</li>
                <li>• Travail en équipe et communication</li>
                <li>• Résolution de problèmes complexes</li>
                <li>• Documentation technique</li>
                <li>• Présentation de solutions</li>
                <li>• Veille technologique et auto-formation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Productions;