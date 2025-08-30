import { useState } from 'react';

import { Globe, Database, Smartphone, Code, Filter, ExternalLink } from '../../../icons/lucide';
import ProjectCard from '../../ProjectCard/ProjectCard';

const Productions: React.FC = () => {
  // Gestion des erreurs
  if (typeof window === 'undefined') {
    return null; // Ne rien rendre côté serveur
  }
    // État pour la gestion des filtres et de la sélection
  type ProjectType = 'Application Web' | 'Application Mobile' | 'Backend API' | 'Tous';
  const [activeFilter, setActiveFilter] = useState<ProjectType>('Tous');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // GA is initialized lazily globally from main.tsx

  const projets = [
    {
      titre: "GestionVisiteur_bd_distante",
      type: "Application Web",
      icon: <Globe className="w-6 h-6" />,
      description: "Application web complète de gestion des visiteurs avec base de données distante, développée dans le cadre d'un atelier professionnel BTS SIO.",
      technologies: ["PHP", "MySQL", "Android Studio", "Java", "HTML5", "CSS3", "JavaScript"],
      duree: "2 mois",
      contexte: "Projet d'atelier professionnel - BTS SIO SLAM",
      statut: "Terminé",
      github: "https://github.com/elyesal34/GestionVisiteur_bd_distante",
      demo: "#",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80&fm=webp",
      featured: true,
      date: "2024",
      article: {
        contexte: {
          titre: "Contexte du projet",
          description: "Ce projet a été développé dans le cadre des ateliers professionnels du BTS SIO option SLAM. L'objectif était de créer une solution complète de gestion des visiteurs pour une entreprise, en utilisant une architecture client-serveur avec base de données distante.",
          objectifs: [
            "Développer une application web responsive",
            "Implémenter une base de données relationnelle",
            "Créer une API REST pour la communication",
            "Assurer la sécurité des données",
            "Développer une version mobile Android"
          ],
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80&fm=webp"
        },
        technologies: {
          titre: "Stack technique utilisée",
          description: "Le projet utilise une architecture moderne avec séparation claire entre frontend, backend et base de données.",
          stack: [
            {
              nom: "Frontend Web",
              techs: ["HTML5", "CSS3", "JavaScript ES6+", "Bootstrap"],
              description: "Interface utilisateur responsive et moderne",
              image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80&fm=webp"
            },
            {
              nom: "Backend",
              techs: ["PHP 8", "MySQL", "Apache"],
              description: "Serveur robuste avec API REST sécurisée",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80&fm=webp"
            },
            {
              nom: "Mobile",
              techs: ["Android Studio", "Java", "SQLite"],
              description: "Application mobile native Android",
              image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80&fm=webp"
            }
          ]
        },
        fonctionnalites: {
          titre: "Fonctionnalités développées",
          description: "L'application offre un ensemble complet de fonctionnalités pour la gestion des visiteurs.",
          features: [
            {
              nom: "Authentification sécurisée",
              description: "Système de connexion avec hashage des mots de passe et gestion des sessions",
              taches: [
                "Implémentation du système de login/logout",
                "Hashage sécurisé des mots de passe (bcrypt)",
                "Gestion des sessions PHP",
                "Protection contre les attaques par force brute"
              ],
              image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80&fm=webp"
            },
            {
              nom: "Gestion des visiteurs",
              description: "CRUD complet pour la gestion des informations visiteurs",
              taches: [
                "Création de formulaires de saisie validés",
                "Implémentation des opérations CRUD",
                "Système de recherche et filtrage",
                "Export des données en CSV/PDF"
              ],
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80&fm=webp"
            },
            {
              nom: "Base de données distante",
              description: "Architecture avec base de données hébergée sur serveur distant",
              taches: [
                "Conception du modèle de données",
                "Création des tables et relations",
                "Optimisation des requêtes SQL",
                "Mise en place des sauvegardes automatiques"
              ],
              image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80&fm=webp"
            },
            {
              nom: "Interface responsive",
              description: "Design adaptatif pour tous les appareils",
              taches: [
                "Développement mobile-first",
                "Utilisation de Bootstrap pour la responsivité",
                "Optimisation des performances",
                "Tests sur différents navigateurs"
              ],
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80&fm=webp"
            }
          ]
        },
        resultats: {
          titre: "Résultats et apprentissages",
          description: "Ce projet a permis d'acquérir de nombreuses compétences techniques et méthodologiques.",
          achievements: [
            "Application fonctionnelle déployée en production",
            "Base de données optimisée avec plus de 1000 enregistrements de test",
            "Interface utilisateur intuitive et responsive",
            "Code documenté et versionné avec Git"
          ],
          apprentissages: [
            "Maîtrise de l'architecture MVC en PHP",
            "Gestion des bases de données relationnelles",
            "Développement d'API REST",
            "Sécurisation des applications web",
            "Méthodologie de développement agile"
          ],
          image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80&fm=webp"
        }
      }
    },
    {
      titre: "API REST E-commerce",
      type: "Backend API",
      icon: <Database className="w-6 h-6" />,
      description: "API REST complète pour plateforme e-commerce avec authentification JWT, gestion des commandes et intégration paiements.",
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "Stripe API", "Docker"],
      duree: "3 mois",
      contexte: "Projet personnel - Approfondissement des compétences backend",
      statut: "En cours",
      github: "#",
      demo: "#",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80&fm=webp",
      featured: false,
      date: "2024",
      article: {
        contexte: {
          titre: "Contexte du projet",
          description: "Développement d'une API REST moderne pour une plateforme e-commerce, dans le but d'approfondir les compétences en développement backend et architecture microservices.",
          objectifs: [
            "Créer une API REST scalable et performante",
            "Implémenter un système d'authentification robuste",
            "Intégrer des services de paiement",
            "Mettre en place une architecture microservices",
            "Assurer la documentation complète de l'API"
          ],
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80&fm=webp"
        },
        technologies: {
          titre: "Architecture technique",
          description: "API moderne basée sur Node.js avec une architecture microservices et base de données NoSQL.",
          stack: [
            {
              nom: "Runtime & Framework",
              techs: ["Node.js", "Express.js", "TypeScript"],
              description: "Serveur haute performance avec typage statique",
              image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80&fm=webp"
            },
            {
              nom: "Base de données",
              techs: ["MongoDB", "Mongoose", "Redis"],
              description: "Base NoSQL avec cache pour les performances",
              image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80&fm=webp"
            },
            {
              nom: "Sécurité & Auth",
              techs: ["JWT", "bcrypt", "Helmet", "CORS"],
              description: "Authentification sécurisée et protection des endpoints",
              image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80&fm=webp"
            }
          ]
        },
        fonctionnalites: {
          titre: "Modules développés",
          description: "API modulaire avec séparation claire des responsabilités.",
          features: [
            {
              nom: "Authentification JWT",
              description: "Système d'authentification stateless avec tokens JWT",
              taches: [
                "Implémentation de l'inscription/connexion",
                "Génération et validation des tokens JWT",
                "Middleware d'authentification",
                "Gestion du refresh token"
              ],
              image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80&fm=webp"
            },
            {
              nom: "Gestion des produits",
              description: "CRUD complet pour le catalogue produits",
              taches: [
                "Modélisation des données produits",
                "Endpoints CRUD avec validation",
                "Système de catégories et tags",
                "Gestion des images et médias"
              ],
              image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80&fm=webp"
            },
            {
              nom: "Système de commandes",
              description: "Gestion complète du processus de commande",
              taches: [
                "Création et suivi des commandes",
                "Gestion des stocks en temps réel",
                "Calcul automatique des prix et taxes",
                "Notifications par email"
              ],
              image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=800&q=80&fm=webp"
            },
            {
              nom: "Intégration Stripe",
              description: "Traitement sécurisé des paiements",
              taches: [
                "Configuration des webhooks Stripe",
                "Gestion des moyens de paiement",
                "Traitement des remboursements",
                "Conformité PCI DSS"
              ],
              image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80&fm=webp"
            }
          ]
        },
        resultats: {
          titre: "Performances et métriques",
          description: "API optimisée avec monitoring et documentation complète.",
          achievements: [
            "Temps de réponse moyen < 100ms",
            "Documentation Swagger complète",
            "Tests unitaires et d'intégration (95% coverage)",
            "Déploiement automatisé avec Docker"
          ],
          apprentissages: [
            "Architecture microservices",
            "Optimisation des performances Node.js",
            "Sécurisation des API REST",
            "Intégration de services tiers",
            "DevOps et déploiement continu"
          ],
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80&fm=webp"
        }
      }
    },
    {
      titre: "Application Mobile de Fitness",
      type: "Application Mobile",
      icon: <Smartphone className="w-6 h-6" />,
      description: "Application mobile de suivi d'activités sportives avec géolocalisation, statistiques personnalisées et défis communautaires.",
      technologies: ["React Native", "Firebase", "Google Maps API", "Chart.js", "Redux"],
      duree: "4 mois",
      contexte: "Projet de stage - Développement mobile",
      statut: "Terminé",
      github: "#",
      demo: "#",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80&fm=webp",
      featured: true,
      date: "2023",
      article: {
        contexte: {
          titre: "Contexte du projet",
          description: "Développement d'une application mobile de fitness dans le cadre d'un stage en entreprise, visant à créer une solution complète de suivi d'activités sportives.",
          objectifs: [
            "Créer une app mobile cross-platform",
            "Implémenter le suivi GPS des activités",
            "Développer un système de gamification",
            "Intégrer des fonctionnalités sociales",
            "Optimiser les performances et l'autonomie"
          ],
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80&fm=webp"
        },
        technologies: {
          titre: "Stack mobile moderne",
          description: "Application cross-platform avec backend Firebase et intégrations natives.",
          stack: [
            {
              nom: "Framework Mobile",
              techs: ["React Native", "Expo", "TypeScript"],
              description: "Développement cross-platform iOS/Android",
              image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80&fm=webp"
            },
            {
              nom: "Backend & Auth",
              techs: ["Firebase", "Firestore", "Firebase Auth"],
              description: "Backend as a Service avec authentification",
              image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80&fm=webp"
            },
            {
              nom: "APIs & Services",
              techs: ["Google Maps", "Health Kit", "Google Fit"],
              description: "Intégration avec les services natifs",
              image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80&fm=webp"
            }
          ]
        },
        fonctionnalites: {
          titre: "Fonctionnalités développées",
          description: "Application complète avec suivi GPS, statistiques et fonctionnalités sociales.",
          features: [
            {
              nom: "Suivi GPS des activités",
              description: "Enregistrement précis des parcours sportifs",
              taches: [
                "Intégration de l'API de géolocalisation",
                "Optimisation de la consommation batterie",
                "Calcul de distance, vitesse et dénivelé",
                "Sauvegarde des parcours en local"
              ],
              image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80&fm=webp"
            },
            {
              nom: "Statistiques personnalisées",
              description: "Tableaux de bord avec métriques détaillées",
              taches: [
                "Développement de graphiques interactifs",
                "Calcul des moyennes et progressions",
                "Comparaisons temporelles",
                "Export des données"
              ],
              image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80&fm=webp"
            },
            {
              nom: "Défis communautaires",
              description: "Système de gamification et compétition",
              taches: [
                "Création de défis personnalisés",
                "Système de points et badges",
                "Classements en temps réel",
                "Notifications push"
              ],
              image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80&fm=webp"
            },
            {
              nom: "Synchronisation cloud",
              description: "Sauvegarde et synchronisation des données",
              taches: [
                "Synchronisation automatique Firebase",
                "Mode hors ligne avec cache local",
                "Résolution des conflits de données",
                "Backup automatique"
              ],
              image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80&fm=webp"
            }
          ]
        },
        resultats: {
          titre: "Impact et retours utilisateurs",
          description: "Application déployée avec succès et retours positifs des utilisateurs.",
          achievements: [
            "Plus de 500 téléchargements en phase beta",
            "Note moyenne de 4.5/5 sur les stores",
            "Temps de chargement < 3 secondes",
            "Consommation batterie optimisée (-40%)"
          ],
          apprentissages: [
            "Développement mobile cross-platform",
            "Optimisation des performances mobiles",
            "Intégration d'APIs natives",
            "UX/UI design mobile",
            "Gestion des données hors ligne"
          ],
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80&fm=webp"
        }
      }
    },
    {
      titre: "Plateforme de Cours en Ligne",
      type: "Application Web",
      icon: <Code className="w-6 h-6" />,
      description: "Plateforme d'apprentissage en ligne complète avec système de cours, quiz interactifs et suivi de progression.",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Socket.io", "Docker"],
      duree: "5 mois",
      contexte: "Projet de fin d'études - Travail en équipe",
      statut: "En cours",
      github: "#",
      demo: "#",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80&fm=webp",
      featured: false,
      date: "2024",
      article: {
        contexte: {
          titre: "Contexte du projet",
          description: "Projet de fin d'études développé en équipe de 4 personnes, visant à créer une plateforme d'apprentissage en ligne moderne et interactive.",
          objectifs: [
            "Développer une plateforme e-learning complète",
            "Implémenter des fonctionnalités temps réel",
            "Créer un système de gestion de contenu",
            "Assurer la scalabilité de la solution",
            "Mettre en place un système de certification"
          ],
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80&fm=webp"
        },
        technologies: {
          titre: "Architecture full-stack",
          description: "Solution complète avec frontend React, backend Node.js et base de données PostgreSQL.",
          stack: [
            {
              nom: "Frontend",
              techs: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion"],
              description: "Interface utilisateur moderne et interactive",
              image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80&fm=webp"
            },
            {
              nom: "Backend",
              techs: ["Node.js", "Express", "Socket.io", "JWT"],
              description: "API REST avec fonctionnalités temps réel",
              image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80&fm=webp"
            },
            {
              nom: "Base de données",
              techs: ["PostgreSQL", "Prisma", "Redis"],
              description: "Base relationnelle avec ORM moderne",
              image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80&fm=webp"
            }
          ]
        },
        fonctionnalites: {
          titre: "Modules de la plateforme",
          description: "Plateforme complète avec gestion de cours, évaluations et communication.",
          features: [
            {
              nom: "Gestion des cours",
              description: "Système complet de création et gestion de contenu",
              taches: [
                "Éditeur de cours WYSIWYG",
                "Upload et gestion de médias",
                "Organisation en modules et chapitres",
                "Versioning du contenu"
              ],
              image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80&fm=webp"
            },
            {
              nom: "Quiz interactifs",
              description: "Système d'évaluation avec différents types de questions",
              taches: [
                "Créateur de quiz avec multiple choix",
                "Questions à réponse libre",
                "Correction automatique",
                "Feedback personnalisé"
              ],
              image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80&fm=webp"
            },
            {
              nom: "Chat temps réel",
              description: "Communication instantanée entre étudiants et formateurs",
              taches: [
                "Implémentation WebSocket avec Socket.io",
                "Salles de discussion par cours",
                "Partage de fichiers",
                "Modération automatique"
              ],
              image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=800&q=80&fm=webp"
            },
            {
              nom: "Suivi de progression",
              description: "Analytics détaillées pour étudiants et formateurs",
              taches: [
                "Tableaux de bord personnalisés",
                "Métriques de progression",
                "Rapports automatisés",
                "Recommandations IA"
              ],
              image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80&fm=webp"
            }
          ]
        },
        resultats: {
          titre: "Avancement et perspectives",
          description: "Projet en cours de développement avec premiers résultats prometteurs.",
          achievements: [
            "MVP fonctionnel avec 3 modules complets",
            "Interface utilisateur validée par 50 beta-testeurs",
            "Architecture scalable testée jusqu'à 1000 utilisateurs",
            "Documentation technique complète"
          ],
          apprentissages: [
            "Gestion de projet en équipe",
            "Architecture d'applications complexes",
            "Développement en temps réel",
            "Méthodologies agiles (Scrum)",
            "Tests automatisés et CI/CD"
          ],
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80&fm=webp"
        }
      }
    }
  ];

  const filters = ['Tous', 'Application Web', 'Application Mobile', 'Backend API'];
  
  const filteredProjets = activeFilter === 'Tous' 
    ? projets 
    : projets.filter(projet => projet.type === activeFilter);

  // Rendu du composant
  return (
    <section id="productions" className="min-h-screen pt-16 scroll-mt-16 bg-gray-50">
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
            <Filter className="w-5 h-5" aria-hidden="true" />
            <span className="font-medium">Filtrer par type :</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as ProjectType)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                }`}
                aria-label={`Filtrer les projets par ${filter}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Liste des projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjets.map((projet, index) => (
            <div key={index} onClick={() => setSelectedProject(index)}>
              <ProjectCard
                titre={projet.titre}
                description={projet.description}
                technologies={projet.technologies}
                github={projet.github}
                demo={projet.demo}
                image={projet.image}
                duree={projet.duree}
                contexte={projet.contexte}
                statut={projet.statut}
                date={projet.date || new Date().getFullYear().toString()}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal du projet sélectionné */}
      {selectedProject !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredProjets[selectedProject].titre}
              </h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Fermer</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Project details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900">Description</h3>
                <p className="mt-2 text-gray-600">{filteredProjets[selectedProject].description}</p>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-medium text-gray-900">Technologies</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {filteredProjets[selectedProject].technologies.map((tech: string, index: number) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Durée</h3>
                  <p className="mt-1 text-gray-600">{filteredProjets[selectedProject].duree}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Contexte</h3>
                  <p className="mt-1 text-gray-600">{filteredProjets[selectedProject].contexte}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Statut</h3>
                  <p className="mt-1 text-gray-600">{filteredProjets[selectedProject].statut}</p>
                </div>
                {filteredProjets[selectedProject].date && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Date</h3>
                    <p className="mt-1 text-gray-600">{filteredProjets[selectedProject].date}</p>
                  </div>
                )}
              </div>

              {/* Links */}
              <div className="flex space-x-4 pt-4">
                {filteredProjets[selectedProject].github && (
                  <a
                    href={filteredProjets[selectedProject].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Code className="-ml-1 mr-2 h-5 w-5" />
                    Code Source
                  </a>
                )}
                {filteredProjets[selectedProject].demo && (
                  <a
                    href={filteredProjets[selectedProject].demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <ExternalLink className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                    Voir la démo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Productions;