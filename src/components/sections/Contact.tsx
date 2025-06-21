import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');

    try {
      // Template pour l'email à l'administrateur (vous)
      const adminTemplateParams = {
        from_name: formData.nom,
        from_email: formData.email,
        subject: formData.sujet,
        message: formData.message,
        to_email: 'allanielyes34@gmail.com'
      };

      // Template pour l'email de confirmation à l'utilisateur
      const userTemplateParams = {
        to_name: formData.nom,
        to_email: formData.email,
        subject: formData.sujet,
        message: formData.message,
        admin_email: 'allanielyes34@gmail.com'
      };

      // Envoi de l'email à l'administrateur
      await emailjs.send(
        'service_ec775jm', // Service ID
        'template_4vr2upi', // Template ID pour l'admin
        adminTemplateParams,
        'C8UPNrlfpOfee-ItS' // Public Key
      );

      // Envoi de l'email de confirmation à l'utilisateur
      await emailjs.send(
        'service_ec775jm', // Même service ID
        'template_user_copy', // Template ID pour la copie utilisateur (à créer)
        userTemplateParams,
        'C8UPNrlfpOfee-ItS' // Public Key
      );

      setStatus('success');
      setStatusMessage('Message envoyé avec succès ! Vous avez reçu une copie de votre message par email. Je vous répondrai dans les plus brefs délais.');
      setFormData({ nom: '', email: '', sujet: '', message: '' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setStatus('error');
      setStatusMessage('Erreur lors de l\'envoi du message. Veuillez réessayer ou me contacter directement.');
    } finally {
      setIsLoading(false);
    }
  };

  const coordonnees = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "allanielyes34@gmail.com",
      link: "mailto:allanielyes34@gmail.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Téléphone",
      value: "06 XX XX XX XX",
      link: "tel:+33XXXXXXXXX"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Localisation",
      value: "France",
      link: "#"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/elyes-allani-034607174/",
      link: "https://www.linkedin.com/in/elyes-allani-034607174/"
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      value: "github.com/votre-username",
      link: "https://github.com/votre-username"
    }
  ];

  const sujets = [
    "Opportunité de stage",
    "Opportunité d'emploi",
    "Collaboration sur un projet",
    "Demande d'information",
    "Autre"
  ];

  return (
    <section id="contact" className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            N'hésitez pas à me contacter pour discuter d'opportunités professionnelles, 
            de collaborations ou pour toute question concernant mon parcours et mes compétences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Mes coordonnées</h3>
            
            <div className="space-y-6 mb-8">
              {coordonnees.map((coord, index) => (
                <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="text-blue-500 mr-4">{coord.icon}</div>
                  <div>
                    <div className="font-medium text-gray-800">{coord.label}</div>
                    <a 
                      href={coord.link}
                      className="text-gray-600 hover:text-blue-500 transition-colors"
                      target={coord.link.startsWith('http') ? '_blank' : '_self'}
                      rel={coord.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    >
                      {coord.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Disponibilité</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Stage de fin d'études</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    Disponible
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Emploi (après diplôme)</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    Septembre 2024
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Projets freelance</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                    Sur demande
                  </span>
                </div>
              </div>
            </div>

            {/* Instructions de configuration mises à jour */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="text-lg font-bold text-blue-900 mb-3">Configuration EmailJS requise</h4>
              <p className="text-blue-800 text-sm mb-3">
                Pour que le formulaire fonctionne avec la copie utilisateur, vous devez :
              </p>
              <ol className="list-decimal list-inside text-blue-800 text-sm space-y-1">
                <li>Créer un compte sur <a href="https://emailjs.com" target="_blank" rel="noopener noreferrer" className="underline">emailjs.com</a></li>
                <li>Créer un service email (Gmail, Outlook, etc.)</li>
                <li>Créer deux templates :</li>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li><strong>template_4vr2upi</strong> : pour recevoir les messages</li>
                  <li><strong>template_user_copy</strong> : pour la copie utilisateur</li>
                </ul>
                <li>Remplacer les IDs dans le code</li>
              </ol>
              <div className="mt-3 p-3 bg-blue-100 rounded-lg">
                <p className="text-blue-900 text-sm font-medium">Template de copie utilisateur suggéré :</p>
                <p className="text-blue-800 text-xs mt-1">
                  "Bonjour {{to_name}}, merci pour votre message concernant '{{subject}}'. 
                  Voici une copie de votre message : {{message}}. 
                  Je vous répondrai rapidement à cette adresse email."
                </p>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Envoyez-moi un message</h3>
            
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
              {/* Message de statut */}
              {status !== 'idle' && (
                <div className={`mb-6 p-4 rounded-lg flex items-center ${
                  status === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {status === 'success' ? (
                    <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  )}
                  <span className="text-sm">{statusMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Votre nom complet"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="votre.email@example.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="sujet" className="block text-sm font-medium text-gray-700 mb-2">
                  Sujet *
                </label>
                <select
                  id="sujet"
                  name="sujet"
                  value={formData.sujet}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Sélectionnez un sujet</option>
                  {sujets.map((sujet, index) => (
                    <option key={index} value={sujet}>{sujet}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Décrivez votre demande, vos besoins ou toute information que vous souhaitez partager..."
                />
              </div>

              {/* Nouvelle section d'information sur la copie */}
              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center text-blue-800 text-sm">
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Vous recevrez une copie de votre message par email pour vos archives.</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Prêt à collaborer ?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Je suis toujours intéressé par de nouveaux défis et opportunités. 
              Que ce soit pour un stage, un emploi ou un projet collaboratif, 
              n'hésitez pas à me contacter !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:allanielyes34@gmail.com"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Envoyer un email
              </a>
              <a
                href="https://linkedin.com/in/votre-profil"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
              >
                Voir mon LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;