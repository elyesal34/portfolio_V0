import { Globe, Database, Smartphone, Code, Filter, ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';

const Productions = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');

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
      date: "2024"
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
      date: "2024"
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
      date: "2023"
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

  return (
    <section id="productions" className="min-h-screen pt-16 scroll-mt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Productions & Réalisations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez mes projets et réalisations développés durant ma formation BTS SIO, 
            allant des applications web aux solutions mobiles, en passant par les APIs.
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

        {/* Liste des projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjets.map((projet, index) => (
            <article 
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
                    <div className="text-blue-500 mt-0.5">{projet.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {projet.titre}
                      </h3>
                      <div className="text-sm text-gray-500 mt-1">
                        <span>{projet.contexte}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium border ${getStatutColor(projet.statut)}`}>
                    {projet.statut}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {projet.description}
                </p>

                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-700 mb-2">
                    <span className="font-medium">Technologies :</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {projet.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {projet.technologies.length > 4 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                        +{projet.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>⏱️ {projet.duree}</span>
                </div>

                <div className="flex space-x-3">
                  <a
                    href={projet.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors space-x-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Voir le projet</span>
                  </a>
                  {projet.github && projet.github !== '#' && (
                    <a
                      href={projet.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors space-x-2"
                    >
                      <Github className="w-4 h-4" />
                      <span className="hidden sm:inline">Code</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProjets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun projet trouvé pour ce filtre.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Productions;