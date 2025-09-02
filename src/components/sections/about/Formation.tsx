import { GraduationCap, Calendar, MapPin, Award, BookOpen, Target } from 'lucide-react';

const Formation = () => {
  const formations = [
    {
      diplome: "BTS SIO option SLAM",
      etablissement: "Lycée Saint-John Perse",
      periode: "2022 - 2024",
      lieu: "Montpellier",
      description: "Services Informatiques aux Organisations - Solutions Logicielles et Applications Métiers",
      competences: [
        "Développement d'applications web et mobiles",
        "Conception et administration de bases de données",
        "Gestion de projet informatique",
        "Cybersécurité et protection des données",
        "Maintenance et évolution des applications"
      ],
      modules: [
        "Conception et développement d'applications",
        "Administration des systèmes et réseaux",
        "Cybersécurité des services informatiques",
        "Mathématiques pour l'informatique",
        "Algorithmique appliquée",
        "Économie, management et droit du numérique"
      ],
      projets: [
        "Application de gestion des visiteurs",
        "Site web responsive avec base de données",
        "Application mobile native",
        "API REST sécurisée"
      ],
      statut: "En cours - 2ème année"
    },
    {
      diplome: "BTS MCO",
      etablissement: "Lycée Albert Camus",
      periode: "2020 - 2022",
      lieu: "Montpellier",
      description: "Management Commercial Opérationnel",
      competences: [
        "Vente et relation client",
        "Animation de l'offre commerciale",
        "Gestion opérationnelle d'une unité commerciale",
        "Management d'équipe",
        "Analyse des performances commerciales"
      ],
      modules: [
        "Développer la relation client et vente conseil",
        "Animer et dynamiser l'offre commerciale",
        "Assurer la gestion opérationnelle",
        "Manager l'équipe commerciale",
        "Culture générale et expression",
        "Anglais commercial"
      ],
      projets: [
        "Projet de développement commercial",
        "Analyse de la performance d'une unité commerciale",
        "Plan d'animation commerciale",
        "Étude de marché sectorielle"
      ],
      statut: "Diplômé"
    },
    {
      diplome: "Baccalauréat STI2D",
      etablissement: "Lycée Technique",
      periode: "2020",
      lieu: "Montpellier",
      description: "Sciences et Technologies de l'Industrie et du Développement Durable",
      competences: [
        "Mathématiques appliquées",
        "Physique-chimie et mathématiques",
        "Systèmes d'information et numérique",
        "Innovation technologique",
        "Ingénierie et développement durable"
      ],
      modules: [
        "Mathématiques",
        "Physique-chimie et mathématiques",
        "Systèmes d'information et numérique (SIN)",
        "Innovation technologique",
        "Ingénierie et développement durable"
      ],
      projets: [
        "Projet technologique en équipe",
        "Étude de cas d'innovation",
        "Conception d'un système numérique",
        "Analyse du cycle de vie d'un produit"
      ],
      statut: "Diplômé"
    }
  ];

  const certifications = [
    {
      nom: "Certification PIX",
      organisme: "PIX",
      date: "2023",
      niveau: "Niveau 4",
      domaines: ["Numérique", "Sécurité", "Communication"]
    },
    {
      nom: "TOEIC",
      organisme: "ETS Global",
      date: "2023",
      niveau: "750/990",
      domaines: ["Anglais professionnel"]
    }
  ];

  return (
    <section id="formation" className="min-h-screen pt-16 scroll-mt-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Formation</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Mon parcours de formation, des bases scientifiques aux spécialisations informatiques.
          </p>
        </div>

        {/* Timeline des formations */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-blue-200 dark:bg-blue-800"></div>
          
          <div className="space-y-12">
            {formations.map((formation, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>
                
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} ml-12 md:ml-0`}>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <GraduationCap className="w-6 h-6 text-blue-500 dark:text-blue-400 mr-3" />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{formation.diplome}</h3>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{formation.periode}</span>
                          <MapPin className="w-4 h-4 ml-3 mr-1" />
                          <span>{formation.lieu}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{formation.description}</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 font-medium">{formation.etablissement}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Compétences acquises :</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {formation.competences.map((competence, compIndex) => (
                          <div key={compIndex} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{competence}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Modules étudiés :</h4>
                      <div className="flex flex-wrap gap-1">
                        {formation.modules.slice(0, 3).map((module, moduleIndex) => (
                          <span 
                            key={moduleIndex} 
                            className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded text-xs border border-green-200 dark:border-green-700"
                          >
                            {module}
                          </span>
                        ))}
                        {formation.modules.length > 3 && (
                          <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded text-xs border border-gray-200 dark:border-gray-600">
                            +{formation.modules.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        formation.statut === 'Diplômé' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700'
                          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
                      }`}>
                        {formation.statut}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <Award className="w-6 h-6 text-yellow-500 mr-3" />
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{cert.nom}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{cert.organisme} - {cert.date}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">{cert.niveau}</span>
                  <div className="flex flex-wrap gap-1">
                    {cert.domaines.map((domaine, domIndex) => (
                      <span key={domIndex} className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs border border-blue-200 dark:border-blue-700">
                        {domaine}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Objectifs futurs */}
        <div className="mt-16 bg-gradient-to-r from-green-500 to-blue-600 dark:from-green-600 dark:to-blue-700 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Target className="w-6 h-6 mr-3" />
            Objectifs de Formation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Court terme (2024-2025)</h4>
              <ul className="space-y-2 text-green-100 dark:text-green-200">
                <li>• Finaliser le BTS SIO SLAM avec mention</li>
                <li>• Réussir le stage de fin d'études</li>
                <li>• Approfondir React et Node.js</li>
                <li>• Obtenir une certification cloud (AWS/Azure)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Long terme (2025+)</h4>
              <ul className="space-y-2 text-green-100 dark:text-green-200">
                <li>• Poursuivre en licence professionnelle ou école d'ingénieur</li>
                <li>• Se spécialiser en architecture logicielle</li>
                <li>• Développer l'expertise en cybersécurité</li>
                <li>• Contribuer à des projets open source</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Formation;