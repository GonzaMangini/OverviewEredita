import React, { useState, useEffect, useRef } from 'react';

interface CarruselImagenesProps {
  images: string[];
  className?: string;
}

const CarruselImagenes: React.FC<CarruselImagenesProps> = ({ images, className }) => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const goToSlide = (idx: number) => setCurrent(idx);

  // Autoplay con reinicio al interactuar
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(nextSlide, 6000);
    return () => clearTimeout(timeoutRef.current!);
  }, [current, images.length]);

  return (
    <div className={`relative w-full h-full overflow-hidden rounded-xl shadow ${className ? className : ''}`}>
      {images.map((img, idx) => (
        <img
          key={img}
          src={img}
          alt={`Imagen ${idx + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={{ pointerEvents: idx === current ? 'auto' : 'none' }}
        />
      ))}
      {/* Flechas */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-eredita-green rounded-full p-2 shadow-md z-20"
        onClick={() => { prevSlide(); }}
        aria-label="Anterior"
        tabIndex={0}
      >
        &#8592;
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-eredita-green rounded-full p-2 shadow-md z-20"
        onClick={() => { nextSlide(); }}
        aria-label="Siguiente"
        tabIndex={0}
      >
        &#8594;
      </button>
      {/* Puntos */}
      <div className="absolute bottom-2 left-0 w-full flex justify-center gap-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full border-2 border-eredita-green ${current === idx ? 'bg-eredita-green' : 'bg-white'}`}
            aria-label={`Ir a la imagen ${idx + 1}`}
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  );
};

export default CarruselImagenes;
