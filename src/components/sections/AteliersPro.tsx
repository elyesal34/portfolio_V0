import React from 'react';
import { Code2, Database, Globe, Smartphone, Shield, Users } from 'lucide-react';

const AteliersPro = () => {
  const ateliers = [
    {
      title: "Développement d'applications web",
      icon: <Globe className="w-8 h-8 text-blue-500" />,
      description: "Création d'applications web modernes avec React, PHP et bases de données",
      technologies: ["React", "PHP", "MySQL", "JavaScript"],
      projets: [
        "Application de gestion de bibliothèque",
        "Site e-commerce avec panier",
        "Plateforme de réservation en ligne"
      ]
    },
    {
      title: "Programmation orientée objet",
      icon: <Code2 className="w-8 h-8 text-green-500" />,
      description: "Maîtrise des concepts POO avec Java et C#",
      technologies: ["Java", "C#", "UML", "Design Patterns"],
      projets: [
        "Système de gestion d'inventaire",
        "Jeu de stratégie en Java",
        "Application desktop avec interface graphique"
      ]
    },
    {
      title: "Base de données",
      icon: <Database className="w-8 h-8 text-purple-500" />,
      description: "Conception et administration de bases de données relationnelles",
      technologies: ["MySQL", "PostgreSQL", "SQL Server", "MongoDB"],
      projets: [
        "Modélisation d'une base de données complexe",
        "Optimisation de requêtes SQL",
        "Migration de données"
      ]
    },
    {
      title: "Développement mobile",
      icon: <Smartphone className="w-8 h-8 text-orange-500" />,
      description: "Création d'applications mobiles natives et hybrides",
      technologies: ["React Native", "Flutter", "Android Studio"],
      projets: [
        "Application de suivi de fitness",
        "App de géolocalisation",
        "Jeu mobile interactif"
      ]
    },
    {
      title: "Cybersécurité",
      icon: <Shield className="w-8 h-8 text-red-500" />,
      description: "Sécurisation des applications et protection des données",
      technologies: ["HTTPS", "JWT", "Cryptographie", "OWASP"],
      projets: [
        "Audit de sécurité d'application web",
        "Implémentation d'authentification sécurisée",
        "Tests de pénétration"
      ]
    },
    {
      title: "Travail collaboratif",
      icon: <Users className="w-8 h-8 text-indigo-500" />,
      description: "Gestion de projets en équipe avec méthodologies agiles",
      technologies: ["Git", "GitHub", "Scrum", "Jira"],
      projets: [
        "Projet en équipe de 5 personnes",
        "Gestion de versions avec Git",
        "Méthodologie Scrum appliquée"
      ]
    }
  ];

  return (
    <section id="ateliers" className="min-h-screen pt-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ateliers Professionnels</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Les ateliers professionnels constituent le cœur de la formation BTS SIO. 
            Ils permettent de développer des compétences techniques et méthodologiques 
            à travers des projets concrets et variés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ateliers.map((atelier, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {atelier.icon}
                <h3 className="text-xl font-bold ml-3">{atelier.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-4">{atelier.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Technologies utilisées :</h4>
                <div className="flex flex-wrap gap-2">
                  {atelier.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Projets réalisés :</h4>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  {atelier.projets.map((projet, projetIndex) => (
                    <li key={projetIndex}>{projet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Compétences développées</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Compétences techniques :</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Développement d'applications web et mobiles</li>
                <li>Conception et administration de bases de données</li>
                <li>Programmation orientée objet</li>
                <li>Sécurisation des applications</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Compétences transversales :</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Gestion de projet</li>
                <li>Travail en équipe</li>
                <li>Documentation technique</li>
                <li>Présentation de solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AteliersPro;