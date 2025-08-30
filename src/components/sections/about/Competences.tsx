import { useState, useCallback, useMemo } from 'react';
import { Code, Database, Globe, Wrench, Users, BookOpen, Shield, Smartphone } from 'lucide-react';
import ProgressBar from '../../ui/ProgressBar';

const Competences = () => {
  const competencesTechniques = useMemo(() => ([
    {
      categorie: "Langages de programmation",
      icon: <Code className="w-6 h-6" />,
      competences: [
        { nom: "Java", niveau: 85, description: "POO, Spring Framework, Maven" },
        { nom: "PHP", niveau: 80, description: "Laravel, Symfony, API REST" },
        { nom: "JavaScript/TypeScript", niveau: 90, description: "ES6+, Node.js, React" },
        { nom: "Python", niveau: 70, description: "Django, Flask, Data Science" },
        { nom: "C#", niveau: 75, description: ".NET Framework, ASP.NET" },
        { nom: "SQL", niveau: 85, description: "MySQL, PostgreSQL, optimisation" }
      ]
    },
    {
      categorie: "Développement Web",
      icon: <Globe className="w-6 h-6" />,
      competences: [
        { nom: "React", niveau: 90, description: "Hooks, Context, Redux" },
        { nom: "Vue.js", niveau: 75, description: "Composition API, Vuex" },
        { nom: "HTML/CSS", niveau: 95, description: "Semantic HTML, Flexbox, Grid" },
        { nom: "Tailwind CSS", niveau: 85, description: "Responsive design, composants" },
        { nom: "Node.js", niveau: 80, description: "Express, API REST, WebSockets" },
        { nom: "Laravel", niveau: 75, description: "Eloquent ORM, Blade, Artisan" }
      ]
    },
    {
      categorie: "Bases de données",
      icon: <Database className="w-6 h-6" />,
      competences: [
        { nom: "MySQL", niveau: 85, description: "Conception, optimisation, procédures" },
        { nom: "PostgreSQL", niveau: 75, description: "Requêtes avancées, JSON" },
        { nom: "MongoDB", niveau: 70, description: "NoSQL, agrégation, indexation" },
        { nom: "Redis", niveau: 65, description: "Cache, sessions, pub/sub" }
      ]
    },
    {
      categorie: "Développement Mobile",
      icon: <Smartphone className="w-6 h-6" />,
      competences: [
        { nom: "React Native", niveau: 75, description: "Navigation, API natives" },
        { nom: "Flutter", niveau: 60, description: "Dart, widgets, state management" },
        { nom: "Android Studio", niveau: 70, description: "Java/Kotlin, SDK Android" }
      ]
    }
  ]), []);

  const competencesTransversales = useMemo(() => ([
    {
      nom: "Gestion de projet",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      description: "Méthodologies Agile/Scrum, planification, suivi d'équipe",
      niveau: 80
    },
    {
      nom: "Sécurité informatique",
      icon: <Shield className="w-6 h-6 text-red-500" />,
      description: "OWASP, authentification, chiffrement, audit sécurité",
      niveau: 75
    },
    {
      nom: "DevOps",
      icon: <Wrench className="w-6 h-6 text-green-500" />,
      description: "Git, Docker, CI/CD, déploiement automatisé",
      niveau: 70
    },
    {
      nom: "Veille technologique",
      icon: <BookOpen className="w-6 h-6 text-purple-500" />,
      description: "Recherche, analyse, synthèse des innovations",
      niveau: 85
    }
  ]), []);

  const getNiveauColor = useCallback((niveau: number): string => {
    if (niveau >= 80) return "bg-green-500";
    if (niveau >= 60) return "bg-yellow-500";
    return "bg-red-500";
  }, []);

  const getNiveauText = useCallback((niveau: number): string => {
    if (niveau >= 80) return "Avancé";
    if (niveau >= 60) return "Intermédiaire";
    return "Débutant";
  }, []);

  const [visibleTechCounts, setVisibleTechCounts] = useState<number[]>(() =>
    competencesTechniques.map(cat => Math.min(4, cat.competences.length))
  );
  
  const [visibleTransCount, setVisibleTransCount] = useState<number>(2);

  const showMoreTech = useCallback((catIdx: number) => {
    setVisibleTechCounts(prevCounts =>
      prevCounts.map((count, idx) =>
        idx === catIdx
          ? Math.min(count + 4, competencesTechniques[catIdx].competences.length)
          : count
      )
    );
  }, [competencesTechniques]);

  const showMoreTrans = useCallback(() => {
    setVisibleTransCount(prevCount => 
      Math.min(prevCount + 2, competencesTransversales.length)
    );
  }, [competencesTransversales.length]);

  return (
    <section id="competences" className="min-h-screen pt-16 scroll-mt-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Compétences</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Panorama des compétences techniques et transversales acquises 
            durant la formation BTS SIO et développées à travers les projets 
            et stages en entreprise.
          </p>
        </div>

        {/* Compétences techniques */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Compétences Techniques</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {competencesTechniques.map((categorie, catIdx) => (
              <div key={categorie.categorie} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="text-blue-500 mr-3">{categorie.icon}</div>
                  <h4 className="text-xl font-bold text-gray-900">{categorie.categorie}</h4>
                </div>
                <div className="space-y-4">
                  {categorie.competences
                    .slice(0, visibleTechCounts[catIdx])
                    .map((comp) => (
                      <div key={comp.nom}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-800">{comp.nom}</span>
                          <span 
                            className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getNiveauColor(comp.niveau)}`}
                          >
                            {getNiveauText(comp.niveau)}
                          </span>
                        </div>
                        <ProgressBar 
                          level={comp.niveau}
                          levelColor={getNiveauColor(comp.niveau)}
                          label={comp.nom}
                          className="mb-1"
                        />
                        <p className="text-sm text-gray-600">{comp.description}</p>
                      </div>
                  ))}
                  {visibleTechCounts[catIdx] < categorie.competences.length && (
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={() => showMoreTech(catIdx)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Voir plus
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compétences transversales */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Compétences Transversales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {competencesTransversales.slice(0, visibleTransCount).map((comp) => (
              <div key={comp.nom} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  {comp.icon}
                  <h4 className="text-lg font-bold text-gray-900 ml-3">{comp.nom}</h4>
                </div>
                <p className="text-gray-600 mb-4">{comp.description}</p>
                <ProgressBar 
                  level={comp.niveau}
                  levelColor={getNiveauColor(comp.niveau)}
                  label={comp.nom}
                  className="h-2.5"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">Niveau</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getNiveauColor(comp.niveau)}`}>
                    {getNiveauText(comp.niveau)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {visibleTransCount < competencesTransversales.length && (
            <div className="flex justify-center mt-4">
              <button
                onClick={showMoreTrans}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Voir plus
              </button>
            </div>
          )}
        </div>

        {/* Référentiel BTS SIO */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6">Référentiel BTS SIO - Option SLAM</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Compétences du référentiel</h4>
              <ul className="space-y-2 text-blue-100">
                <li>• Concevoir et développer une solution applicative</li>
                <li>• Assurer la maintenance corrective ou évolutive</li>
                <li>• Gérer les données de l'information</li>
                <li>• Concevoir l'architecture d'un système</li>
                <li>• Mettre à disposition des utilisateurs un service informatique</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Processus métier couverts</h4>
              <ul className="space-y-2 text-blue-100">
                <li>• P1 : Support et mise à disposition de services informatiques</li>
                <li>• P2 : Conception et développement d'applications</li>
                <li>• P3 : Maintenance des applications</li>
                <li>• P4 : Gestion du patrimoine informatique</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Competences;