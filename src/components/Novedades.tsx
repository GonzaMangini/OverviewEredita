import React, { useState, useEffect, useRef } from 'react';

const novedadesImages = [
  '/Novedades/TallerMargott.png',
  '/Novedades/VivoGratis.png',

];

const Novedades: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % novedadesImages.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + novedadesImages.length) % novedadesImages.length);
  const goToSlide = (idx: number) => setCurrent(idx);

  // Autoplay cada 4 segundos
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(nextSlide, 4000);
    return () => clearTimeout(timeoutRef.current!);
  }, [current]);

  return (
    <section id="novedades" className="w-full py-24 mt-16 bg-gradient-to-b">
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <h2 className="text-2xl md:text-4xl font-brand text-eredita-pink text-center mb-2">Novedades</h2>
        <p className="text-xl md:text-2xl font-brand text-center text-gray-600 mb-8">Descubre nuestros últimos talleres y creaciones</p>
      </div>
      
      {/* Carrusel full-width */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        {novedadesImages.map((img, idx) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={img}
              alt={`Novedad ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay para mejor legibilidad */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        ))}

        {/* Flechas de navegación */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-eredita-green rounded-full p-3 shadow-lg z-20 transition-all duration-300 hover:scale-110"
          onClick={() => { prevSlide(); }}
          aria-label="Anterior"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-eredita-green rounded-full p-3 shadow-lg z-20 transition-all duration-300 hover:scale-110"
          onClick={() => { nextSlide(); }}
          aria-label="Siguiente"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Puntos indicadores */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {novedadesImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === idx 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Ir a la imagen ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Novedades;
