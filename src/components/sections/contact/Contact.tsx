import { Mail, Phone, MapPin, Linkedin, Github, Download, Send } from 'lucide-react';
import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isVerified) {
      setStatus('Veuillez vérifier que vous n\'êtes pas un robot.');
      return;
    }
    
    setStatus('Envoi en cours...');

    try {
      const response = await fetch('https://formspree.io/f/your-form-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message envoyé avec succès !');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus("Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch {
      setStatus("Une erreur s'est produite. Veuillez réessayer plus tard.");
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      label: "Email",
      value: "allanielyes34@gmail.com",
      link: "mailto:allanielyes34@gmail.com",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-700"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      label: "Téléphone",
      value: "06 52 80 97 98",
      link: "tel:+33652809798",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-700"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      label: "Localisation",
      value: "Montpellier, France",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-700"
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/elyes-allani-034607174/",
      color: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      url: "https://github.com/elyesal34",
      color: "bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600"
    }
  ];

  return (
    <section 
      id="contact" 
      className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900 scroll-mt-16 transition-colors duration-300"
      data-testid="contact-section"
    >
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Contactez-moi</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Une question, une proposition ou simplement envie d'échanger ? N'hésitez pas à m'envoyer un message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Formulaire de contact */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Envoyez-moi un message</h3>
            
            {status && (
              <div className={`mb-6 p-4 rounded-lg ${
                status.includes('succès') 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700' 
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'
              }`}>
                {status}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sujet <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                >
                  <option value="" disabled>Sélectionnez un sujet</option>
                  <option value="Opportunité professionnelle">Opportunité professionnelle</option>
                  <option value="Demande de collaboration">Demande de collaboration</option>
                  <option value="Question">Question</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  placeholder="Votre message..."
                ></textarea>
              </div>

              <div className="pt-2">
                <div className="mb-4 flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LcHfmkrAAAAAEmyM6dmIM9iQq0a18vRmp6DviN4"
                    onChange={() => setIsVerified(true)}
                    onExpired={() => setIsVerified(false)}
                    className="recaptcha"
                    theme="light"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white px-6 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all font-medium shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!isVerified}
                >
                  <Send className="w-5 h-5" />
                  <span>Envoyer le message</span>
                </button>
              </div>
            </form>
          </div>

          {/* Informations de contact */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Coordonnées</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Vous pouvez également me contacter directement par email ou téléphone. Je m'efforce de répondre dans les plus brefs délais.
              </p>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div 
                    key={index} 
                    className={`${method.bgColor} ${method.borderColor} border-2 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`${method.color} p-3 rounded-full bg-white dark:bg-gray-800 shadow-md`}>
                        {method.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                          {method.label}
                        </h4>
                        {method.link ? (
                          <a 
                            href={method.link} 
                            className={`${method.color} hover:underline font-medium text-lg`}
                          >
                            {method.value}
                          </a>
                        ) : (
                          <p className="text-gray-700 dark:text-gray-300 font-medium text-lg">{method.value}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="pt-4">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Réseaux sociaux</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section disponibilités */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-xl p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="md:flex items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Disponible pour de nouvelles opportunités</h3>
                <p className="text-blue-100 dark:text-blue-200">
                  Actuellement à la recherche d'un stage de fin d'études à partir de mai 2025
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/cv-elyes-allani.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all font-medium shadow-lg transform hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  <span>Télécharger mon CV</span>
                </a>
                <a
                  href="mailto:allanielyes34@gmail.com?subject=Opportunité de stage&body=Bonjour Elyes,%0D%0A%0D%0AJe vous contacte concernant une opportunité de stage..."
                  className="inline-flex items-center justify-center space-x-2 bg-blue-700 dark:bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 dark:hover:bg-blue-700 transition-all font-medium shadow-lg transform hover:scale-105"
                >
                  <Mail className="w-5 h-5" />
                  <span>Me contacter</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;