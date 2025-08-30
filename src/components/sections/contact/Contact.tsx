
const Contact = () => {
  const contactMethods = [
    {
      icon: '📧',
      label: "Email",
      value: "allanielyes34@gmail.com",
      link: "mailto:allanielyes34@gmail.com",
      color: "text-blue-600"
    },
    {
      icon: '💼',
      label: "LinkedIn",
      value: "Elyes Allani",
      link: "https://www.linkedin.com/in/elyes-allani-034607174/",
      color: "text-blue-700"
    },
    {
      icon: '📍',
      label: "Localisation",
      value: "Montpellier, France",
      color: "text-gray-700"
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
            Le formulaire de contact est actuellement en maintenance. Vous pouvez me contacter directement par email ou via LinkedIn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contactMethods.map((method, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`text-3xl mb-4 ${method.color}`}>
                {method.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {method.label}
              </h3>
              {method.link ? (
                <a 
                  href={method.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {method.value}
                </a>
              ) : (
                <p className="text-gray-600">{method.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
