import React from 'react';
import { X } from '../../icons/lucide';

interface ProjectModalProps {
  project: {
    titre: string;
    description: string;
    technologies: string[];
    duree: string;
    contexte: string;
    statut: string;
    github?: string;
    demo?: string;
    image?: string;
    icon?: React.ReactNode;
  };
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
        
        <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
          {/* En-tête de la modal */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{project.titre}</h2>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 focus:outline-none"
                aria-label="Fermer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Corps de la modal */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {project.image && (
              <div className="mb-6 rounded-lg overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.titre}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                <p className="mt-1 text-gray-600">{project.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Contexte</h3>
                  <p className="mt-1 text-gray-600">{project.contexte}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Durée</h3>
                  <p className="mt-1 text-gray-600">{project.duree}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Statut</h3>
                  <p className="mt-1 text-gray-600">{project.statut}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pied de la modal */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Voir sur GitHub
              </a>
            )}
            
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Voir la démo
              </a>
            )}
            
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
