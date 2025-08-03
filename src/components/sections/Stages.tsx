import { Calendar, MapPin, Building, Users, Target, Award } from 'lucide-react';

const Stages = () => {
  const stages = [
    {
      entreprise: "Cyriaque Mazères",
      poste: "Développeur Full Stack Junior",
      duree: "5 semaines",
      periode: "Mai - Juin 2024",
      lieu: "Pau, France",
      description: "Stage de première année concernant le développement web d'une application d'affichage des temps d'attente des établissements de soins",
      missions: [
        "Réalisation d'une application web avec React",
        "Développement d'une interface utilisateur et d'une fonctionnalité de recherche des établissements de soins",
      ],
      competences: ["React", "HTML/CSS", "JavaScript", "Git"],
      resultats: [
        "Application web fonctionnelle",
        "Potentiel réduction des temps d'attente des établissements de soins",
        "Amélioration de la qualité de vie des patients"
      ]
    },
    {
      entreprise: "Coach Internet",
      poste: "Développeur Web Junior",
      duree: "6 semaines",
      periode: "Janvier - Février 2025",
      lieu: "Pau, France",
      description: "Stage de deuxième année concernant l'utilisation de l'API Google Maps pour récupérer les informations des entreprises",
      missions: [
        "Développement d'un programme en Python pour récupérer les informations des entreprises",
        "Conception et implémentation d'une API REST pour récupérer les informations des entreprises",
        "Tests unitaires et intégration continue",
        "Utilisation d'Apify pour configurer les filtres"  
      ],
      competences: ["Python", "API Google Maps", "Apify", "Git", "REST API", "Scraping", "Sequelize"],
      resultats: [
        "Programme fonctionnel",
        "Production d'un fichier CSV avec les informations des entreprises"
      ]
    }
  ];

  return (
    <section id="stages" className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Stages en Entreprise</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Les stages constituent une partie essentielle de la formation BTS SIO, 
            permettant de mettre en pratique les compétences acquises et de découvrir 
            le monde professionnel.
          </p>
        </div>

        <div className="space-y-12">
          {stages.map((stage, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{stage.poste}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-100">
                      <div className="flex items-center space-x-2">
                        <Building className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                        <span className="font-medium">{stage.entreprise}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                        <span className="font-medium">{stage.periode}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                        <span className="font-medium">{stage.lieu}</span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:ml-6">
                    <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-white">
                      <span className="text-gray-900 font-bold text-lg">{stage.duree}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{stage.description}</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div>
                    <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                      <Target className="w-5 h-5 mr-2 text-blue-500" />
                      Missions principales
                    </h4>
                    <ul className="space-y-3">
                      {stage.missions.map((mission, missionIndex) => (
                        <li key={missionIndex} className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-600 leading-relaxed">{mission}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                      <Users className="w-5 h-5 mr-2 text-green-500" />
                      Compétences utilisées
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {stage.competences.map((competence, compIndex) => (
                        <span key={compIndex} className="bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium border border-green-200">
                          {competence}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                      <Award className="w-5 h-5 mr-2 text-purple-500" />
                      Résultats obtenus
                    </h4>
                    <ul className="space-y-3">
                      {stage.resultats.map((resultat, resultIndex) => (
                        <li key={resultIndex} className="flex items-start">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-600 leading-relaxed">{resultat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Bilan des stages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Apports professionnels</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Découverte du monde de l'entreprise</li>
                <li>• Application concrète des compétences techniques</li>
                <li>• Développement de l'autonomie</li>
                <li>• Amélioration des compétences relationnelles</li>
                <li>• Compréhension des enjeux métier</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Compétences développées</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Gestion de projet en environnement professionnel</li>
                <li>• Communication avec les clients et utilisateurs</li>
                <li>• Respect des délais et contraintes</li>
                <li>• Travail en équipe pluridisciplinaire</li>
                <li>• Veille technologique et adaptation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stages;