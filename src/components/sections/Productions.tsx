import { Github, Code, Database, Smartphone, Globe, Filter, Star, Calendar, User, ArrowRight, CheckCircle, Target, Layers, Zap, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';

// Chargement dynamique Google Analytics
const loadGoogleAnalytics = () => {
  if ((window as any).gtag) return;
  const script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-MJLQKQWB5R';
  script.async = true;
  document.head.appendChild(script);

  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(){(window as any).dataLayer.push(arguments);}
  (window as any).gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-MJLQKQWB5R');
};

// Chargement dynamique reCAPTCHA (à appeler uniquement si besoin d'un formulaire)
const loadRecaptcha = () => {
  if (document.getElementById('recaptcha-script')) return;
  const script = document.createElement('script');
  script.id = 'recaptcha-script';
  script.src = 'https://www.gstatic.com/recaptcha/api2/v1554100419869/recaptcha__en.js';
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
};

const Productions = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  // Charge Google Analytics uniquement sur cette page
  useEffect(() => {
    loadGoogleAnalytics();
    // Décommente si tu utilises reCAPTCHA sur cette page :
    // loadRecaptcha();
  }, []);

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

  const ProjectModal = ({ project, onClose }: { project: typeof projets[0], onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{project.titre}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            aria-label="Fermer l'article"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 space-y-12">
          {/* Contexte */}
          <section>
            <div className="flex items-center mb-6">
              <Target className="w-6 h-6 text-blue-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">{project.article.contexte.titre}</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-6 leading-relaxed">{project.article.contexte.description}</p>
                <h4 className="font-semibold text-gray-800 mb-4">Objectifs du projet :</h4>
                <ul className="space-y-2">
                  {project.article.contexte.objectifs.map((objectif, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{objectif}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <img
                  src={project.article.contexte.image}
                  alt="Contexte du projet"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          {/* Technologies */}
          <section>
            <div className="flex items-center mb-6">
              <Layers className="w-6 h-6 text-purple-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">{project.article.technologies.titre}</h3>
            </div>
            <p className="text-gray-600 mb-8">{project.article.technologies.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.article.technologies.stack.map((tech, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <img
                    src={tech.image}
                    alt={tech.nom}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                    loading="lazy"
                  />
                  <h4 className="font-bold text-gray-900 mb-2">{tech.nom}</h4>
                  <p className="text-gray-600 text-sm mb-3">{tech.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {tech.techs.map((t, tIndex) => (
                      <span key={tIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Fonctionnalités */}
          <section>
            <div className="flex items-center mb-6">
              <Zap className="w-6 h-6 text-yellow-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">{project.article.fonctionnalites.titre}</h3>
            </div>
            <p className="text-gray-600 mb-8">{project.article.fonctionnalites.description}</p>
            <div className="space-y-8">
              {project.article.fonctionnalites.features.map((feature, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.nom}</h4>
                      <p className="text-gray-600 mb-4">{feature.description}</p>
                      <h5 className="font-semibold text-gray-800 mb-3">Tâches réalisées :</h5>
                      <ul className="space-y-2">
                        {feature.taches.map((tache, tIndex) => (
                          <li key={tIndex} className="flex items-start space-x-2">
                            <ArrowRight className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">{tache}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <img
                        src={feature.image}
                        alt={feature.nom}
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Résultats */}
          <section>
            <div className="flex items-center mb-6">
              <Star className="w-6 h-6 text-green-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">{project.article.resultats.titre}</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-6">{project.article.resultats.description}</p>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Résultats obtenus :</h4>
                  <ul className="space-y-2">
                    {project.article.resultats.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Compétences acquises :</h4>
                  <ul className="space-y-2">
                    {project.article.resultats.apprentissages.map((apprentissage, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{apprentissage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <img
                  src={project.article.resultats.image}
                  alt="Résultats du projet"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  // Pagination sur les projets filtrés
  const visibleProjects = filteredProjets.slice(0, visibleCount);

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
            <Filter className="w-5 h-5" aria-hidden="true" />
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
                aria-label={`Filtrer les projets par ${filter}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16 px-2 sm:px-0">
          {/* Projet Node.js PHP → Node.js */}
          <div className="lg:col-span-2">
            <ProjectCard />
          </div>
          
          {visibleProjects.map((projet, index) => (
            <article 
              key={index} 
              className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 focus-within:ring-4 focus-within:ring-blue-300 active:scale-95 ${
                projet.featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
              }`}
              tabIndex={0}
            >
              {/* Image du projet */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={projet.image}
                  alt={`Aperçu du projet ${projet.titre}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  width="800"
                  height="400"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                {projet.featured && (
                  <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4" aria-hidden="true" />
                    <span>Projet phare</span>
                  </div>
                )}
                <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-white text-sm">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>{projet.date}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-500">{projet.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {projet.titre}
                      </h3>
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
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center space-x-1">
                    <Code className="w-4 h-4" aria-hidden="true" />
                    <span>Technologies utilisées :</span>
                  </h4>
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

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" aria-hidden="true" />
                    <span>Durée: {projet.duree}</span>
                  </div>
                  <span>Contexte: {projet.contexte}</span>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedProject(index)}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors space-x-2 flex-1 justify-center"
                    aria-label={`Lire l'article détaillé du projet ${projet.titre}`}
                  >
                    <BookOpen className="w-4 h-4" aria-hidden="true" />
                    <span>Lire l'article</span>
                  </button>
                  <a
                    href={projet.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors space-x-2"
                    aria-label={`Voir le code source du projet ${projet.titre} sur GitHub`}
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bouton Voir plus */}
        {visibleCount < filteredProjets.length && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setVisibleCount(visibleCount + 4)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Voir plus de projets
            </button>
          </div>
        )}

        {/* Modal d'article */}
        {selectedProject !== null && (
          <ProjectModal 
            project={projets[selectedProject]} 
            onClose={() => setSelectedProject(null)} 
          />
        )}

        {/* Statistiques */}
        {/*
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
        */}
      </div>
    </section>
  );
};

export default Productions;