import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, User, MessageSquare, CheckCircle, AlertCircle, Calendar, Clock, Award } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";

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
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  type AdminTemplateParams = {
    from_name: string;
    from_email: string;
    subject: string;
    message: string;
    to_email: string;
  };

  type UserTemplateParams = {
    to_name: string;
    to_email: string;
    subject: string;
    message: string;
    admin_email: string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');

    if (!recaptchaToken) {
      setStatus('error');
      setStatusMessage('Veuillez valider le reCAPTCHA.');
      setIsLoading(false);
      return;
    }

    try {
      const adminTemplateParams: AdminTemplateParams = {
        from_name: formData.nom,
        from_email: formData.email,
        subject: formData.sujet,
        message: formData.message,
        to_email: 'allanielyes34@gmail.com'
      };

      const userTemplateParams: UserTemplateParams = {
        to_name: formData.nom,
        to_email: formData.email,
        subject: formData.sujet,
        message: formData.message,
        admin_email: 'allanielyes34@gmail.com'
      };

      await emailjs.send(
        'service_ec775jm',
        'template_4vr2upi',
        adminTemplateParams,
        'C8UPNrlfpOfee-ItS'
      );

      await emailjs.send(
        'service_ec775jm',
        'template_user_copy',
        userTemplateParams,
        'C8UPNrlfpOfee-ItS'
      );

      setStatus('success');
      setStatusMessage('Message envoyé avec succès ! Vous avez reçu une copie de votre message par email. Je vous répondrai dans les plus brefs délais.');
      setFormData({ nom: '', email: '', sujet: '', message: '' });
      setRecaptchaToken(null);
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
      icon: <Mail className="w-5 h-5" aria-hidden="true" />,
      label: "Email",
      value: "allanielyes34@gmail.com",
      link: "mailto:allanielyes34@gmail.com",
      color: "text-blue-500"
    },
    {
      icon: <Phone className="w-5 h-5" aria-hidden="true" />,
      label: "Téléphone",
      value: "06 52 80 97 98",
      link: "tel:+33652809798",
      color: "text-green-500"
    },
    {
      icon: <MapPin className="w-5 h-5" aria-hidden="true" />,
      label: "Localisation",
      value: "Montpellier, France",
      link: "https://www.google.com/maps/place/Montpellier",
      color: "text-red-500"
    },
    {
      icon: <Linkedin className="w-5 h-5" aria-hidden="true" />,
      label: "LinkedIn",
      value: "linkedin.com/in/elyes-allani-034607174/",
      link: "https://www.linkedin.com/in/elyes-allani-034607174/",
      color: "text-blue-600"
    },
    {
      icon: <Github className="w-5 h-5" aria-hidden="true" />,
      label: "GitHub",
      value: "github.com/elyes-allani",
      link: "https://github.com/elyes-allani",
      color: "text-gray-700"
    }
  ];

  const sujets = [
    "Opportunité de stage",
    "Opportunité d'emploi",
    "Collaboration sur un projet",
    "Demande d'information",
    "Autre"
  ];

  const disponibilites = [
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Stage de fin d'études",
      status: "Disponible",
      color: "bg-green-100 text-green-800",
      description: "Recherche active pour un stage de 8 semaines"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Emploi (après diplôme)",
      status: "Septembre 2025",
      color: "bg-blue-100 text-blue-800",
      description: "Disponible pour un CDI/CDD après obtention du diplôme"
    },
    {
      icon: <Award className="w-5 h-5" />,
      label: "Projets freelance",
      status: "Sur demande",
      color: "bg-yellow-100 text-yellow-800",
      description: "Missions courtes selon disponibilités"
    }
  ];

  return (
    <section id="contact" className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            N'hésitez pas à me contacter pour discuter d'opportunités professionnelles, 
            de collaborations ou pour toute question concernant mon parcours et mes compétences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Mes coordonnées</h3>
            
            <div className="space-y-4">
              {coordonnees.map((coord, index) => (
                <a
                  key={index}
                  href={coord.link}
                  target={coord.link.startsWith('http') ? '_blank' : undefined}
                  rel={coord.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`${coord.color} mr-4 group-hover:scale-110 transition-transform`}>
                    {coord.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                      {coord.label}
                    </div>
                    <div className="text-gray-600 text-sm">{coord.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Disponibilité */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span>Disponibilité</span>
              </h4>
              <div className="space-y-4">
                {disponibilites.map((dispo, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="text-gray-600">{dispo.icon}</div>
                        <span className="font-medium text-gray-800">{dispo.label}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${dispo.color}`}>
                        {dispo.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{dispo.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Temps de réponse */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center text-blue-800 mb-2">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-semibold">Temps de réponse</span>
              </div>
              <p className="text-blue-700 text-sm">
                Je réponds généralement sous 24h en semaine et 48h le week-end.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-moi un message</h3>
            
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6" noValidate>
              {status !== 'idle' && (
                <div className={`mb-6 p-4 rounded-lg flex items-start ${
                  status === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`} role="alert">
                  {status === 'success' ? (
                    <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  ) : (
                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  )}
                  <span className="text-sm">{statusMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" aria-hidden="true" />
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
                    <Mail className="w-4 h-4 inline mr-1" aria-hidden="true" />
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
                  <MessageSquare className="w-4 h-4 inline mr-1" aria-hidden="true" />
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

              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center text-blue-800 text-sm">
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />
                  <span>Vous recevrez une copie de votre message par email pour vos archives.</span>
                </div>
              </div>

              <div className="mb-6">
                <ReCAPTCHA
                  sitekey="6LcHfmkrAAAAAEmyM6dmIM9iQq0a18vRmp6DviN4"
                  onChange={token => setRecaptchaToken(token)}
                  aria-label="Vérification reCAPTCHA"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !recaptchaToken}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center disabled:bg-blue-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" aria-hidden="true"></div>
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Envoyer le message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* CTA Final */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Prêt à collaborer ?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto text-lg">
              Je suis toujours intéressé par de nouveaux défis et opportunités. 
              Que ce soit pour un stage, un emploi ou un projet collaboratif, 
              n'hésitez pas à me contacter !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:allanielyes34@gmail.com"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white inline-flex items-center justify-center space-x-2"
                aria-label="Envoyer un email à Allani Elyes"
              >
                <Mail className="w-5 h-5" />
                <span>Envoyer un email</span>
              </a>
              <a
                href="https://www.linkedin.com/in/elyes-allani-034607174/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white inline-flex items-center justify-center space-x-2"
                aria-label="Voir le profil LinkedIn d'Allani Elyes (ouvre dans un nouvel onglet)"
              >
                <Linkedin className="w-5 h-5" />
                <span>Voir mon LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;