import { ArrowDown, Code, Database, Smartphone, Download, Mail, ExternalLink } from 'lucide-react';

const Accueil = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProductions = () => {
    const element = document.querySelector('#productions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCV = () => {
    const element = document.querySelector('#cv');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="min-h-screen pt-16 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Éléments décoratifs de fond */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 border border-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-40 w-24 h-24 border border-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left break-words max-w-full">
            <div className="space-y-6">
              <div className="animate-fade-in">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-white drop-shadow-lg">Elyes Allani</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient">
                    BTS SIO SLAM
                  </span>
                </h1>
              </div>
              <div className="text-xl md:text-2xl lg:text-3xl font-semibold text-blue-200 animate-fade-in drop-shadow-md" style={{ animationDelay: '0.2s' }}>
                Développeur Full-Stack
              </div>
            </div>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl animate-fade-in drop-shadow-sm" style={{ animationDelay: '0.4s' }}>
              Étudiant passionné par le développement logiciel et la création d'applications innovantes. 
              Spécialisé dans les solutions web et mobiles modernes avec React, PHP et Node.js.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <button
                onClick={scrollToContact}
                className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 text-white"
                aria-label="Aller à la section contact"
              >
                <Mail size={20} aria-hidden="true" />
                <span>Me contacter</span>
              </button>
              <button
                onClick={scrollToProductions}
                className="group border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-white"
                aria-label="Voir mes projets et réalisations"
              >
                <ExternalLink size={20} aria-hidden="true" />
                <span>Voir mes projets</span>
              </button>
              <button
                onClick={scrollToCV}
                className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 px-8 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-white"
                aria-label="Télécharger mon CV"
              >
                <Download size={20} aria-hidden="true" />
                <span>Télécharger CV</span>
              </button>
            </div>

            {/* Statistiques rapides */}
            <div className="grid grid-cols-3 gap-6 pt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-blue-300 group-hover:scale-110 transition-transform drop-shadow-md">12+</div>
                <div className="text-gray-200 text-sm md:text-base">Projets</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-purple-300 group-hover:scale-110 transition-transform drop-shadow-md">2</div>
                <div className="text-gray-200 text-sm md:text-base">Stages</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-green-300 group-hover:scale-110 transition-transform drop-shadow-md">8+</div>
                <div className="text-gray-200 text-sm md:text-base">Technologies</div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 mt-12 lg:mt-0 relative animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80&fm=webp"
                alt="Espace de travail moderne avec ordinateur et code - Développeur BTS SIO SLAM"
                className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 w-full h-auto"
                loading="lazy"
                width="800"
                height="600"
                decoding="async"
              />
              
              {/* Icônes flottantes */}
              <div className="absolute -top-6 -left-6 bg-blue-500 p-4 rounded-full shadow-lg animate-bounce" role="presentation">
                <Code className="w-6 h-6 md:w-8 md:h-8 text-white" aria-hidden="true" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-purple-500 p-4 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '1s' }} role="presentation">
                <Database className="w-6 h-6 md:w-8 md:h-8 text-white" aria-hidden="true" />
              </div>
              <div className="absolute top-1/2 -right-8 bg-green-500 p-4 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '2s' }} role="presentation">
                <Smartphone className="w-6 h-6 md:w-8 md:h-8 text-white" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* Flèche de défilement */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToCV}
            className="text-white hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-white/10"
            aria-label="Défiler vers la section CV"
          >
            <ArrowDown className="w-8 h-8" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Vague décorative */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-gray-50" aria-hidden="true">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Accueil;