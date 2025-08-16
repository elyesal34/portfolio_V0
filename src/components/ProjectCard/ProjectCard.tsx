import { Code, Github, ExternalLink } from 'lucide-react';
import { useState } from 'react';

import ImageWithSuspense from '../ui/ImageWithSuspense';

interface ProjectCardProps {
  image: string;
  titre: string;
  description: string;
  technologies: string[];
  duree: string;
  contexte: string;
  statut: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  date?: string;
  icon?: React.ReactNode;
}

const ProjectCard = ({
  image,
  titre,
  description,
  technologies = [],
  duree,
  contexte,
  statut,
  github = '#',
  demo = '#',
  featured = false,
  date = new Date().getFullYear().toString(),
  icon = <Code className="w-6 h-6" />
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatutColor = () => {
    switch (statut) {
      case 'Terminé': return 'bg-green-100 text-green-800 border-green-200';
      case 'En cours': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Planifié': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <article 
      className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 focus-within:ring-4 focus-within:ring-blue-300 active:scale-95 ${
        featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
      }`}
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image du projet */}
      <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
        <ImageWithSuspense
          src={image}
          alt={`Aperçu du projet ${titre}`}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          width={800}
          height={450}
          fallbackSrc="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80&fm=webp"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        {featured && (
          <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
            <span>⭐</span>
            <span>Projet phare</span>
          </div>
        )}
        <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-white text-sm">
          <span className="bg-black/50 px-2 py-1 rounded">{date}</span>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className="text-blue-500 mt-0.5">{icon}</div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {titre}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <span className="capitalize">{contexte.toLowerCase()}</span>
              </div>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium border ${getStatutColor()}`}>
            {statut}
          </span>
        </div>

        <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
          {description}
        </p>

        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-700 mb-2">
            <span className="font-medium mr-2">Technologies :</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 4).map((tech, index) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs sm:text-sm">
                +{technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-2">
            <span>⏱️ {duree}</span>
          </div>
        </div>

        <div className="flex space-x-3">
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors space-x-2 text-sm sm:text-base"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Voir le projet</span>
          </a>
          {github && github !== '#' && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors space-x-2 text-sm sm:text-base"
              aria-label={`Voir le code source de ${titre} sur GitHub`}
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">Code</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
