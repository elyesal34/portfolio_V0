import { FileText, Mail, Phone, MapPin, Calendar, GraduationCap, Briefcase, Award, Code } from 'lucide-react';

const CV = () => {
  // Fix pour les icônes Lucide
  const iconProps = { width: 20, height: 20, className: 'inline mr-2' };
  const formations = [
    {
      diplome: "BTS SIO option SLAM",
      etablissement: "Lycée Saint-John Perse",
      periode: "2022 - 2024",
      description: "Services Informatiques aux Organisations - Solutions Logicielles et Applications Métiers",
      competences: ["Développement d'applications", "Bases de données", "Gestion de projet", "Cybersécurité"]
    },
    {
      diplome: "BTS MCO",
      etablissement: "Lycée Albert Camus",
      periode: "2020 - 2022",
      description: "Management Commercial Opérationnel",
      competences: ["Vente et relation client", "Animation de l'offre commerciale", "Gestion opérationnelle", "Management d'équipe"]
    },
    {
      diplome: "Baccalauréat STI2D",
      etablissement: "Lycée Technique",
      periode: "2020",
      description: "Sciences et Technologies de l'Industrie et du Développement Durable",
      competences: ["Mathématiques", "Physique appliquée", "Systèmes d'information", "Innovation technologique"]
    }
  ];

  const experiences = [
    {
      poste: "Développeur Web Junior",
      entreprise: "Coach Internet",
      periode: "Janvier - Février 2025",
      type: "Stage",
      missions: [
        "Développement d'un programme en Python pour récupérer les informations des entreprises",
        "Conception et implémentation d'une API REST",
        "Tests unitaires et intégration continue",
        "Utilisation d'Apify pour configurer les filtres"
      ],
      technologies: ["Python", "API Google Maps", "Apify", "Git", "REST API"]
    },
    {
      poste: "Développeur Full Stack Junior",
      entreprise: "Cyriaque Mazères",
      periode: "Mai - Juin 2024",
      type: "Stage",
      missions: [
        "Réalisation d'une application web avec React",
        "Développement d'une interface utilisateur",
        "Fonctionnalité de recherche des établissements de soins"
      ],
      technologies: ["React", "HTML/CSS", "JavaScript", "Git"]
    }
  ];

  const competencesTechniques = [
    {
      categorie: "Langages",
      items: ["Java", "PHP", "JavaScript/TypeScript", "Python", "React", "SQL"]
    },
    {
      categorie: "Frameworks",
      items: ["React", "Laravel", "Node.js", "Bootstrap", "Tailwind CSS"]
    },
    {
      categorie: "Bases de données",
      items: ["MySQL", "PostgreSQL", "MongoDB"]
    },
    {
      categorie: "Outils",
      items: ["Git", "Docker", "Linux", "Apache", "REST API"]
    }
  ];

  return (
    <section id="cv" className="py-16 bg-white dark:bg-dark-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Mon Parcours Professionnel
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Formation et expériences professionnelles
          </p>
        </div>
        
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-dark-700 transition-all duration-300">
          {/* En-tête du CV */}
          <div className="bg-gradient-to-r from-primary-700 to-primary-800 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:w-32 md:h-32 w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                <img 
                  src="/Photo_face.webp" 
                  alt="Allani Elyes" 
                  className="w-32 h-32 object-cover rounded-full" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80&fm=webp";
                  }}
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold mb-2">Allani Elyes</h3>
                <p className="text-xl text-blue-100 mb-4">Étudiant BTS SIO SLAM - Développeur Full-Stack</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-100">
                  <div className="flex items-center justify-center md:justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>allanielyes34@gmail.com</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>06 52 80 97 98</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Montpellier, France</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Profil */}
            <div className="mb-10 bg-gray-50 dark:bg-dark-800 p-6 rounded-xl border border-gray-100 dark:border-dark-700">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Award width={20} height={20} className="mr-2 text-primary-600 dark:text-primary-400" />
                <span className="relative">
                  Profil
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-200 dark:bg-primary-900"></span>
                </span>
              </h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                Étudiant en 2ème année de BTS SIO option SLAM, passionné par le développement logiciel 
                et les nouvelles technologies. Expérience pratique acquise à travers des stages en entreprise 
                et des projets personnels. Recherche un stage de fin d'études pour approfondir mes compétences 
                en développement full-stack.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Formation */}
              <div className="bg-white dark:bg-dark-850 p-6 rounded-xl border border-gray-100 dark:border-dark-700 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center mb-6 pb-4 border-b border-gray-100 dark:border-dark-700">
                  <div className="p-2.5 bg-primary-50 dark:bg-primary-900/20 rounded-lg mr-4 shadow-inner">
                    <GraduationCap width={22} height={22} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Formations</h3>
                </div>
                <div className="space-y-5">
                  {formations.map((formation, index) => (
                    <div key={index} className="relative pl-5 border-l-2 border-primary-200 dark:border-primary-900/50 hover:border-primary-400 transition-colors duration-300 group">
                      <div className="absolute -left-1.5 top-0 w-2.5 h-2.5 rounded-full bg-primary-500 group-hover:bg-primary-400 transition-colors duration-300"></div>
                      <div className="bg-gray-50 dark:bg-dark-800 p-4 rounded-lg hover:shadow-sm transition-all duration-300">
                        <div className="flex items-center text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">
                          <Calendar width={14} height={14} className="mr-1.5" />
                          {formation.periode}
                        </div>
                        <h5 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{formation.diplome}</h5>
                        <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">{formation.etablissement}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">{formation.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {formation.competences.map((comp, compIndex) => (
                            <span 
                              key={compIndex} 
                              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-100 dark:border-primary-900/30"
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expérience */}
              <div className="bg-white dark:bg-dark-850 p-6 rounded-xl border border-gray-100 dark:border-dark-700 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center mb-6 pb-4 border-b border-gray-100 dark:border-dark-700">
                  <div className="p-2.5 bg-green-50 dark:bg-green-900/20 rounded-lg mr-4 shadow-inner">
                    <Briefcase width={22} height={22} className="text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Expériences Professionnelles</h3>
                </div>
                <div className="space-y-5">
                  {experiences.map((exp, index) => (
                    <div key={index} className="relative pl-5 border-l-2 border-green-200 dark:border-green-900/50 hover:border-green-400 transition-colors duration-300 group">
                      <div className="absolute -left-1.5 top-0 w-2.5 h-2.5 rounded-full bg-green-500 group-hover:bg-green-400 transition-colors duration-300"></div>
                      <div className="bg-gray-50 dark:bg-dark-800 p-4 rounded-lg hover:shadow-sm transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center text-sm text-green-600 dark:text-green-400 font-medium">
                            <Calendar width={14} height={14} className="mr-1.5" />
                            {exp.periode}
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                            {exp.type}
                          </span>
                        </div>
                        <h5 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{exp.poste}</h5>
                        <p className="text-gray-700 dark:text-gray-300 font-medium mb-3">{exp.entreprise}</p>
                        <ul className="space-y-2 mb-4">
                          {exp.missions.map((mission, missionIndex) => (
                            <li key={missionIndex} className="flex items-start text-gray-600 dark:text-gray-400 text-sm">
                              <span className="inline-flex items-center justify-center w-1.5 h-1.5 mt-2 mr-2 bg-green-400 rounded-full flex-shrink-0"></span>
                              <span className="leading-relaxed">{mission}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex} 
                              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-100 dark:border-green-900/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Compétences techniques */}
            <div className="mt-10 bg-gray-50 dark:bg-dark-800 p-6 rounded-xl border border-gray-100 dark:border-dark-700">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg mr-4 shadow-inner">
                  <Code width={20} height={20} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="relative">
                  Compétences Techniques
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-200 dark:bg-indigo-900"></span>
                </span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {competencesTechniques.map((categorie, index) => (
                  <div key={index} className="bg-white dark:bg-dark-850 p-5 rounded-lg border border-gray-100 dark:border-dark-700 hover:shadow-sm transition-all duration-300">
                    <h5 className="font-semibold text-gray-900 dark:text-white text-lg mb-3 pb-2 border-b border-gray-100 dark:border-dark-700">
                      {categorie.categorie}
                    </h5>
                    <ul className="space-y-2.5">
                      {categorie.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2.5 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bouton de téléchargement */}
        <div className="text-center mt-12">
            <a
              href="/cv-elyes-allani.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-3.5 rounded-lg transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-dark-900"
            >
              <FileText width={18} height={18} className="text-white/90 group-hover:text-white transition-colors" />
              <span className="relative">
                Télécharger le CV (PDF)
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/70 group-hover:w-full transition-all duration-300"></span>
              </span>
            </a>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Format PDF optimisé pour l'impression</p>
        </div>
      </div>
    </section>
  );
};

export default CV;