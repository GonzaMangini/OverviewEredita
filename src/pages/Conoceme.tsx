import React from 'react';
import CarruselRedondo from '../components/CarruselRedondo';

const Conoceme = () => {
  return (
    <div className="bg-eredita-neutral min-h-screen pt-20">
      <section id="conoceme" className="max-w-6xl mx-auto py-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-brand text-eredita-title-pink mb-4">Conoceme</h2>
        </div>
        <div className="flex justify-center">
          <CarruselRedondo />
        </div>
        <div className="text-center mt-12 max-w-3xl mx-auto">
          <div className="text-eredita-text-main leading-relaxed space-y-4 text-lg">
            <p className="font-medium text-eredita-title-pink">Tejer es mi refugio, mi alegría y mi forma de estar en el mundo.</p>
            <p>Soy <span className="font-bold text-eredita-text-green">Eredita</span>, y desde que descubrí el crochet, encontré en cada punto una forma de decir <em>"estoy acá, y esto lo hice con amor"</em>.</p>
            <p>Tejo porque me llena el alma, pero también porque disfruto profundamente compartir este arte con quienes sienten lo mismo.</p>
            <p className="italic">Creo que hay algo mágico en reunirnos a tejer, en la charla que se entrelaza con las lanas, en las historias que se tejen entre nudos y colores.</p>
            <p className="font-semibold text-eredita-title-pink">Eredita no es solo una marca, es una comunidad.</p>
            <p className="text-xl font-bold text-eredita-text-green">Y si estás leyendo esto, ya sos parte.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Conoceme;
