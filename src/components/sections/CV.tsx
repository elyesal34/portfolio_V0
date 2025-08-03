import { FileText, Mail, Phone, MapPin, Calendar, GraduationCap, Briefcase, Award, Code } from 'lucide-react';

const CV = () => {
  // Formations
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

  // Expériences professionnelles
  const experiences = [
    {
      poste: "Manutentionnaire BTP",
      entreprise: "Brault",
      periode: "Juillet 2022",
      type: "Interim",
      missions: [
        "Manoeauvre sur les chantiers de construction",
        "Aide à la préparation des matériaux et outils",
        "Respect des normes de sécurité sur les chantiers"
      ],
      technologies: []
    },
    {
      poste: "Employé Grandes Surfaces",
      entreprise: "Intermarché",
      periode: "Juin 2022",
      type: "Emploi saisonnier",
      missions: [
        "Réception et mise en rayon des produits",
        "Gestion des stocks et inventaires",
        "Accueil et conseil client"
      ],
      technologies: []
    }
  ];

  // Compétences techniques regroupées par catégories
  const competencesTechniques = [
    {
      categorie: "Langages",
      items: ["Java", "PHP", "JavaScript/TypeScript", "Python", "React", "SQL"]
    },
    {
      categorie: "Frameworks & Bibliothèques",
      items: ["React", "Laravel", "Node.js", "Bootstrap", "Tailwind CSS", "Angular", "AndroidStudio"]
    },
    {
      categorie: "Bases de données",
      items: ["MySQL", "PostgreSQL", "MongoDB"]
    },
    {
      categorie: "Outils & Technologies",
      items: ["Git", "Docker", "Linux", "Apache", "Nginx", "REST API"]
    }
  ];

  // Langues
  const langues = [
    { langue: "Français", niveau: "Natif" },
    { langue: "Anglais", niveau: "B2 - Intermédiaire avancé" },
    { langue: "Allemand", niveau: "A1 - Notions" }
  ];

  return (
    <section id="cv" className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Curriculum Vitae</h2>
          <p className="text-xl font-medium text-gray-700">
            Allani Elyes - Étudiant en BTS SIO option SLAM, passionné par le développement logiciel
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* En-tête du CV */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:w-32 md:h-32 w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                <img src="/Photo_face.webp" alt="Allani Elyes" className="w-32 h-32 object-cover rounded-full" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold mb-2 text-white">Allani Elyes</h3>
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
            <div className="mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-blue-600" />
                Profil
              </h4>
              <p className="text-gray-800 leading-relaxed">
                Étudiant en 2ème année de BTS SIO option SLAM, passionné par le développement logiciel 
                et les nouvelles technologies. Expérience pratique acquise à travers des stages en entreprise 
                et des projets personnels. Recherche un stage de fin d'études pour approfondir mes compétences 
                en développement full-stack et contribuer à des projets innovants.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Formation */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-green-600" />
                  Formation
                </h4>
                <div className="space-y-6">
                  {formations.map((formation, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4 bg-green-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Calendar className="w-4 h-4 mr-2 text-green-700" />
                        <span className="text-sm text-green-700 font-medium">{formation.periode}</span>
                      </div>
                      <h5 className="font-bold text-gray-900">{formation.diplome}</h5>
                      <p className="text-gray-800 mb-2 font-medium">{formation.etablissement}</p>
                      <p className="text-gray-700 text-sm mb-2">{formation.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {formation.competences.map((comp, compIndex) => (
                          <span key={compIndex} className="bg-green-200 text-green-900 px-2 py-1 rounded text-xs font-medium border border-green-300">
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expérience */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
                  Expérience Professionnelle
                </h4>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <div key={index} className="border-l-4 border-purple-500 pl-4 bg-purple-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-purple-700" />
                          <span className="text-sm text-purple-700 font-medium">{exp.periode}</span>
                        </div>
                        <span className="bg-purple-200 text-purple-900 px-2 py-1 rounded text-xs font-medium">
                          {exp.type}
                        </span>
                      </div>
                      <h5 className="font-bold text-gray-900">{exp.poste}</h5>
                      <p className="text-gray-800 mb-3 font-medium">{exp.entreprise}</p>
                      <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-3">
                        {exp.missions.map((mission, missionIndex) => (
                          <li key={missionIndex}>{mission}</li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1">
                        {exp.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="bg-purple-200 text-purple-900 px-2 py-1 rounded text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Compétences techniques */}
            <div className="mt-8">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Code className="w-5 h-5 mr-2 text-blue-600" />
                Compétences Techniques
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {competencesTechniques.map((categorie, index) => (
                  <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-3">{categorie.categorie}</h5>
                    <div className="space-y-2">
                      {categorie.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="text-sm text-gray-800 font-medium">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Langues */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Langues</h4>
                <div className="space-y-3">
                  {langues.map((langue, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-100 border border-gray-300 rounded-lg">
                      <span className="font-medium text-gray-900">{langue.langue}</span>
                      <span className="text-sm text-gray-800 font-medium">{langue.niveau}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton de téléchargement */}
        <div className="text-center mt-8">
          <a
             href="/cv-elyes-allani.pdf"
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg min-h-[48px] min-w-[48px] hover:bg-blue-700 focus:bg-blue-800 focus:ring-4 focus:ring-blue-300 transition-all font-medium shadow-lg btn-animate"
          > 
            <FileText className="w-5 h-5" />
            <span>Voir le CV (PDF)</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CV;