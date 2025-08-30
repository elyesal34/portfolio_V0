import { Mail, Phone, MapPin, Linkedin, Github, Download } from 'lucide-react';

const Contact = () => {
  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      label: "Email",
      value: "allanielyes34@gmail.com",
      link: "mailto:allanielyes34@gmail.com",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      label: "Téléphone",
      value: "06 52 80 97 98",
      link: "tel:+33652809798",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      label: "Localisation",
      value: "Montpellier, France",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/elyes-allani-034607174/",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      url: "https://github.com/elyesal34",
      color: "bg-gray-800 hover:bg-gray-900"
    }
  ];

  return (
    <section 
      id="contact" 
      className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 to-blue-50 scroll-mt-16"
      data-testid="contact-section"
    >
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            N'hésitez pas à me contacter pour discuter d'opportunités de stage, 
            de projets collaboratifs ou simplement pour échanger sur le développement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Informations de contact */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations de contact</h3>
            
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div 
                  key={index} 
                  className={`${method.bgColor} ${method.borderColor} border-2 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`${method.color} p-3 rounded-full bg-white shadow-md`}>
                      {method.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">
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
                        <p className="text-gray-700 font-medium text-lg">{method.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Réseaux sociaux */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Suivez-moi</h4>
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

          {/* Carte de présentation */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <img 
                src="/Photo_face.webp" 
                alt="Elyes Allani" 
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80&fm=webp";
                }}
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Elyes Allani</h3>
              <p className="text-lg text-gray-600 mb-4">Étudiant BTS SIO SLAM</p>
              <p className="text-gray-700 leading-relaxed">
                Passionné par le développement logiciel, je recherche activement un stage 
                de fin d'études pour mettre en pratique mes compétences et contribuer à des projets innovants.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Recherche actuellement :</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Stage de fin d'études (8 semaines)</li>
                  <li>• Opportunités en développement web/mobile</li>
                  <li>• Projets collaboratifs</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Disponibilités :</h4>
                <p className="text-gray-600">
                  Disponible pour un stage à partir de mai 2025
                </p>
              </div>
            </div>

            {/* Bouton de téléchargement du CV */}
            <div className="mt-8 text-center">
              <a
                href="/cv-elyes-allani.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg transform hover:scale-105"
              >
                <Download className="w-5 h-5" />
                <span>Télécharger mon CV</span>
              </a>
            </div>

            {/* Carte de contact vCard */}
            <div className="mt-6 text-center">
              <a
                href="/elyes-allani.vcf"
                download
                className="inline-flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Ajouter aux contacts</span>
              </a>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Travaillons ensemble !</h3>
          <p className="text-lg mb-6 text-blue-100">
            Je suis toujours ouvert aux nouvelles opportunités et aux projets passionnants.
          </p>
          <a
            href="mailto:allanielyes34@gmail.com?subject=Opportunité de collaboration&body=Bonjour Elyes,%0D%0A%0D%0AJe souhaiterais discuter d'une opportunité..."
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium shadow-lg"
          >
            <Mail className="w-5 h-5" />
            <span>Envoyer un message</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;