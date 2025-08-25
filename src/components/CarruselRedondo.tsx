import React, { useState, useEffect, useRef } from 'react';

const conocemeImages = [
  '/Logo.png',
  '/Eredita1.png',
  '/Eredita2.png',

];

const CarruselRedondo: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % conocemeImages.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + conocemeImages.length) % conocemeImages.length);
  const goToSlide = (idx: number) => setCurrent(idx);

  // Autoplay cada 4 segundos
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(nextSlide, 4000);
    return () => clearTimeout(timeoutRef.current!);
  }, [current]);

  return (
    <div className="flex flex-col items-center">
      {/* Carrusel circular */}
      <div className=" relative w-80 h-80 md:w-96 md:h-96 mb-8">
        {conocemeImages.map((img, idx) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={img}
              alt={`Imagen ${idx + 1}`}
              className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white"
            />
            {/* Overlay sutil */}
            <div className="absolute inset-0 bg-black/10 rounded-full"></div>
          </div>
        ))}

        {/* Flechas de navegación 
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-eredita-green rounded-full p-2 shadow-lg z-20 transition-all duration-300 hover:scale-110"
          onClick={() => { prevSlide(); }}
          aria-label="Anterior"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-eredita-green rounded-full p-2 shadow-lg z-20 transition-all duration-300 hover:scale-110"
          onClick={() => { nextSlide(); }}
          aria-label="Siguiente"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>*/}
      </div>

      {/* Puntos indicadores */}
      <div className="flex gap-3 mb-4">
        {conocemeImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === idx 
                ? 'bg-eredita-green scale-125' 
                : 'bg-gray-300 hover:bg-eredita-green/50'
            }`}
            aria-label={`Ir a la imagen ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarruselRedondo;
