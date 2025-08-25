import React, { useState } from 'react';

const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/ereditaok/?hl=es-la',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
        <rect width="20" height="20" x="2" y="2" rx="6" strokeWidth="2"/>
        <circle cx="12" cy="12" r="5" strokeWidth="2"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
      </svg>
    ),
    color: 'hover:text-pink-500'
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/eredita.ok',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33V21.877C18.343 21.128 22 16.991 22 12" />
      </svg>
    ),
    color: 'hover:text-blue-600'
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/5492804604612',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12a11.93 11.93 0 0 0 3.48 8.52L0 24l3.48-3.48A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12a11.93 11.93 0 0 0-3.48-8.52zm-8.52 19.02c-1.81 0-3.54-.48-5.04-1.38l-.36-.21-2.07.54.55-2.01-.23-.37A9.96 9.96 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.12-7.07c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.24-1.37-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.27-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.54-.45-.47-.61-.48-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.36-.26.29-1 1-.97 2.43.03 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.11 4.93 4.24.69.29 1.23.46 1.65.59.69.22 1.32.19 1.82.11.56-.08 1.65-.67 1.89-1.32.23-.65.23-1.21.16-1.33-.07-.12-.26-.19-.54-.33z" />
      </svg>
    ),
    color: 'hover:text-green-500'
  },
  {
    name: 'Gmail',
    url: 'https://mail.google.com/mail/u/0/?view=cm&fs=1&to=eredita.ok@gmail.com',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.887.732-1.636 1.636-1.636h.98L12 10.845 21.384 3.82h.98A1.636 1.636 0 0 1 24 5.457z"/>
      </svg>
    ),
    color: 'hover:text-red-500'
  }
];

const ContactoPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitMessage('¡Mensaje enviado exitosamente! Te responderé pronto.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitMessage('Error al enviar el mensaje. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto py-20 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-brand text-eredita-title-pink mb-4">Contacto</h1>
          <p className="text-lg text-eredita-text-main max-w-2xl mx-auto">
            ¿Tenés alguna pregunta sobre los talleres? ¿Querés saber más sobre nuestros productos? 
            ¡Escribime! Me encanta conectar con la comunidad de Eredita.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulario de Contacto */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-brand text-eredita-title-pink mb-6">Enviame un mensaje</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-eredita-text-main mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eredita-title-pink focus:border-transparent transition-colors"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-eredita-text-main mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eredita-title-pink focus:border-transparent transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-eredita-text-main mb-2">
                  Asunto *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eredita-title-pink focus:border-transparent transition-colors"
                  placeholder="¿De qué querés hablar?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-eredita-text-main mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eredita-title-pink focus:border-transparent transition-colors resize-vertical"
                  placeholder="Contame todo lo que necesites..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-eredita-title-pink text-white py-3 px-6 rounded-lg font-medium hover:bg-eredita-title-pink/90 focus:ring-2 focus:ring-eredita-title-pink focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>

              {submitMessage && (
                <div className={`p-4 rounded-lg text-center ${
                  submitMessage.includes('exitosamente') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>

          {/* Redes Sociales y Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-brand text-eredita-title-pink mb-6">Seguime en mis redes</h2>
              <p className="text-eredita-text-main mb-6">
                Conectate conmigo en las redes sociales para ver mis últimos proyectos, 
                tips de tejido y novedades sobre los talleres.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-4 border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-md ${link.color} hover:border-current`}
                  >
                    {link.icon}
                    <span className="font-medium text-eredita-text-main">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-brand text-eredita-title-pink mb-4">Otras formas de contacto</h3>
              <div className="space-y-3 text-eredita-text-main">
                <p>
                  <strong>Email:</strong> eredita.ok@gmail.com
                </p>
                <p>
                  <strong>WhatsApp:</strong> +54 9 2804 604612
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  Respondo todos los mensajes dentro de las 24 horas. 
                  ¡No dudes en escribirme!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactoPage;
