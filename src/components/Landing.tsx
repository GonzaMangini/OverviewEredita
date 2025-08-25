import React from 'react';

const Landing = () => (
  <section className="relative w-full overflow-hidden -mt-16">
    {/* Título sobre la imagen */}
    <div className="absolute top-0 left-0 right-0 z-10 pt-20 pb-8 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-center font-brand px-4 animate-title-entrance" style={{
        color: '#f8bbd9',
        textShadow: '0 0 20px rgba(248, 187, 217, 0.5), 0 0 40px rgba(248, 187, 217, 0.3), 0 4px 8px rgba(0, 0, 0, 0.8), 0 8px 16px rgba(0, 0, 0, 0.6)'
      }}>
        Bienvenidos a Eredità
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl text-white text-center mt-4 px-4 drop-shadow-lg font-medium animate-subtitle-entrance">
        Talleres que inspiran manos y conectan ideas
      </p>
    </div>
    
    {/* Imagen de fondo que ocupa todo el ancho */}
    <div className="relative w-full h-screen animate-slide-up-fade">
      <img 
        src="/FondoInicio.png" 
        alt="Eredita - Talleres de tejido y manualidades" 
        className="w-full h-full object-cover"
      />
      {/* Overlay para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black/30"></div>
    </div>
    
    {/* Contenido adicional debajo de la imagen */}
    <div className="w-full py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-lg md:text-xl text-eredita-text-main leading-relaxed">
          En <span className="font-bold text-eredita-title-pink">Eredita OK</span> creemos en el hacer como una forma de expresión, encuentro y memoria.
        </p>
        <p className="text-lg md:text-xl text-eredita-text-main leading-relaxed mt-4">
          <span className="relative inline-block">
            <span className="relative z-10 font-semibold text-eredita-text-green">Te invitamos a sumarte, sin importar tu experiencia previa: lo importante es el deseo de crear.</span>
            <svg viewBox="0 0 340 24" className="absolute left-0 bottom-0 w-full h-6 z-0" style={{pointerEvents: 'none'}} aria-hidden="true">
              <path d="M5 20 Q120 10 335 20" fill="none" stroke="#b9cdb7" strokeWidth="7" strokeLinecap="round" opacity="0.3"/>
            </svg>
          </span>
        </p>
      </div>
    </div>
  </section>
);

export default Landing;
