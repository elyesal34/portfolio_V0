import { User, Heart, Target, Lightbulb } from 'lucide-react';

const APropos = () => {
  const valeurs = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      titre: "Passion",
      description: "Passionné par le développement et l'innovation technologique depuis toujours."
    },
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      titre: "Précision",
      description: "Attention aux détails et recherche de solutions optimales et élégantes."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      titre: "Créativité",
      description: "Approche créative pour résoudre les défis techniques complexes."
    }
  ];

  return (
    <section id="a-propos" className="min-h-screen pt-16 scroll-mt-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">À Propos de Moi</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Découvrez mon parcours, mes motivations et ma vision du développement logiciel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <User className="w-6 h-6 text-blue-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Mon Profil</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Étudiant en 2ème année de BTS SIO option SLAM, je suis passionné par le développement 
                d'applications web et mobiles. Mon parcours m'a permis d'acquérir une solide base 
                technique et une approche méthodique des projets informatiques.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Mes Objectifs</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Devenir développeur full-stack expert</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Contribuer à des projets innovants</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Continuer ma formation en alternance</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Développer mes compétences en cybersécurité</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80&fm=webp"
                alt="Portrait professionnel"
                className="rounded-xl shadow-lg w-full h-auto"
                loading="lazy"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {valeurs.map((valeur, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    {valeur.icon}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{valeur.titre}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{valeur.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Ma Vision</h3>
          <p className="text-lg text-blue-100 dark:text-blue-200 leading-relaxed">
            Je crois que la technologie doit servir l'humain et améliorer notre quotidien. 
            Mon approche du développement privilégie la qualité, l'accessibilité et l'expérience utilisateur. 
            Chaque ligne de code que j'écris vise à créer des solutions durables et performantes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default APropos;