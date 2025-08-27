import React, { useState, useEffect } from 'react';

// Importer les icônes avec gestion d'erreur
const Icon: React.FC<{ name: string; className?: string }> = ({ name, className = '' }) => {
  const [IconComponent, setIconComponent] = useState<React.ComponentType<{ className: string }> | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        // Importer dynamiquement l'icône depuis lucide-react
        const module = await import('lucide-react');
        if (module && module[name as keyof typeof module]) {
          setIconComponent(() => module[name as keyof typeof module] as React.ComponentType<{ className: string }>);
        } else {
          console.warn(`Icône non trouvée: ${name}`);
          setError(true);
        }
      } catch (err) {
        console.error(`Erreur lors du chargement de l'icône ${name}:`, err);
        setError(true);
      }
    };

    loadIcon();
  }, [name]);

  if (error) {
    return <span className={`inline-block w-6 h-6 bg-gray-200 rounded ${className}`} aria-hidden="true" />;
  }

  return IconComponent ? (
    <IconComponent className={className} />
  ) : (
    <span className={`inline-block w-6 h-6 bg-gray-100 animate-pulse rounded ${className}`} aria-hidden="true" />
  );
};

const AteliersPro: React.FC = () => {
  const ateliers = [
    {
      title: "Développement d'applications web",
      icon: <Icon name="Globe" className="w-8 h-8 text-blue-500" />,
      description: "Création d'applications web modernes avec React, PHP et bases de données",
      technologies: ["React", "PHP", "MySQL", "JavaScript"],
      projets: [
        "Application de gestion de bibliothèque",
        "Site e-commerce avec panier",
        "Plateforme de réservation en ligne"
      ]
    },
    {
      title: "Programmation orientée objet",
      icon: <Icon name="Code2" className="w-8 h-8 text-green-500" />,
      description: "Maîtrise des concepts POO avec Java et C#",
      technologies: ["Java", "C#", "UML", "Design Patterns"],
      projets: [
        "Système de gestion d'inventaire",
        "Jeu de stratégie en Java",
        "Application desktop avec interface graphique"
      ]
    },
    {
      title: "Base de données",
      icon: <Icon name="Database" className="w-8 h-8 text-purple-500" />,
      description: "Conception et administration de bases de données relationnelles",
      technologies: ["MySQL", "PostgreSQL", "SQL Server", "MongoDB"],
      projets: [
        "Modélisation d'une base de données complexe",
        "Optimisation de requêtes SQL",
        "Migration de données"
      ]
    },
    {
      title: "Développement mobile",
      icon: <Icon name="Smartphone" className="w-8 h-8 text-orange-500" />,
      description: "Création d'applications mobiles natives et hybrides",
      technologies: ["React Native", "Flutter", "Android Studio"],
      projets: [
        "Application de suivi de fitness",
        "App de géolocalisation",
        "Jeu mobile interactif"
      ]
    },
    {
      title: "Cybersécurité",
      icon: <Icon name="Shield" className="w-8 h-8 text-red-500" />,
      description: "Sécurisation des applications et protection des données",
      technologies: ["HTTPS", "JWT", "Cryptographie", "OWASP"],
      projets: [
        "Audit de sécurité d'application web",
        "Implémentation d'authentification sécurisée",
        "Tests de pénétration"
      ]
    },
    {
      title: "Travail collaboratif",
      icon: <Icon name="Users" className="w-8 h-8 text-indigo-500" />,
      description: "Gestion de projets en équipe avec méthodologies agiles",
      technologies: ["Git", "GitHub", "Scrum", "Jira"],
      projets: [
        "Projet en équipe de 5 personnes",
        "Gestion de versions avec Git",
        "Méthodologie Scrum appliquée"
      ]
    }
  ];

  // Pagination : afficher 3 ateliers au départ
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  
  const visibleAteliers = ateliers.slice(0, visibleCount);
  
  const loadMore = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    // Simuler un chargement asynchrone
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 3, ateliers.length));
      setIsLoading(false);
    }, 300);
  };

  return (
    <section id="ateliers" className="min-h-screen pt-16 scroll-mt-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ateliers Professionnels</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Les ateliers professionnels constituent le cœur de la formation BTS SIO. 
            Ils permettent de développer des compétences techniques et méthodologiques 
            à travers des projets concrets et variés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleAteliers.map((atelier) => (
            <article key={atelier.title} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div aria-hidden="true">{atelier.icon}</div>
                <h3 className="text-xl font-bold ml-3">{atelier.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-4">{atelier.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Technologies utilisées :</h4>
                <div className="flex flex-wrap gap-2">
                  {atelier.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Projets réalisés :</h4>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  {atelier.projets.map((projet, projetIndex) => (
                    <li key={projetIndex}>{projet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Bouton Voir plus */}
        {visibleCount < ateliers.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className={`px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              {isLoading ? 'Chargement...' : 'Voir plus d\'ateliers'}
            </button>
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Compétences développées</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Compétences techniques :</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Développement d'applications web et mobiles</li>
                <li>Conception et administration de bases de données</li>
                <li>Programmation orientée objet</li>
                <li>Sécurisation des applications</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Compétences transversales :</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Gestion de projet</li>
                <li>Travail en équipe</li>
                <li>Documentation technique</li>
                <li>Présentation de solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(AteliersPro);