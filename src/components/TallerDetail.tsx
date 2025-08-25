import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CarruselImagenes from './CarruselImagenes';
import { productService, type Product } from '../services/products';

const TallerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const numericId = Number(id);
        if (Number.isNaN(numericId)) throw new Error('ID inválido');
        const p = await productService.getProduct(numericId);
        setProduct(p);
      } catch (e: any) {
        setError(e?.message || 'Error al cargar el taller');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // Volver atrás con tecla ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate(-1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [navigate]);

  if (loading) {
    return (
      <section className="max-w-3xl mx-auto py-16 px-4">
        <div className="animate-pulse text-center text-eredita-text-main">Cargando taller...</div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="max-w-3xl mx-auto py-16 px-4 text-center">
        <p className="mb-6">{error || 'Taller no encontrado.'}</p>
        <button onClick={() => navigate(-1)} className="text-eredita-green hover:underline">← Volver</button>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto py-16 px-4">
      <button onClick={() => navigate(-1)} className="mb-6 text-eredita-green hover:underline">← Volver</button>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative w-full md:w-1/2 min-h-[340px] md:min-h-[400px] flex items-center justify-center">
          {/* No manejamos icono en Product por ahora */}
          {product.images && product.images.length > 1 ? (
            <div className="w-full h-full mb-8 flex items-center justify-center z-10">
              <CarruselImagenes images={product.images} className="w-full h-full object-cover rounded-xl shadow" />
            </div>
          ) : (
            <img
              src={product.images ? product.images[0] : ''}
              alt={product.name}
              className="w-full h-full block rounded-xl shadow object-cover mb-8 z-10"
            />
          )}
        </div>
        <div>
          <h2 className="text-3xl font-brand text-eredita-pink mb-2">{product.name}</h2>
          {(product.categories && product.categories.length > 0) || product.category ? (
            <div className="flex flex-wrap gap-2 mb-3">
              {Array.isArray(product.categories) && product.categories.length > 0 ? (
                product.categories.map(cat => (
                  <span key={cat} className="inline-block px-3 py-1 text-xs rounded-full bg-eredita-green/10 text-eredita-green">
                    {cat}
                  </span>
                ))
              ) : (
                <span className="inline-block px-3 py-1 text-xs rounded-full bg-eredita-green/10 text-eredita-green">
                  {product.category}
                </span>
              )}
            </div>
          ) : null}
          <p className="text-gray-700 mb-4">{product.description || 'No disponible.'}</p>
          <h3 className="font-bold text-lg mb-2">Lo que incluye</h3>
          <ul className="mb-4 list-disc pl-5 text-gray-700">
            {product.workshop_includes && product.workshop_includes.length > 0 ? (
              product.workshop_includes.map((item, idx) => <li key={idx}>{item}</li>)
            ) : (
              <li>No disponible.</li>
            )}
          </ul>
          <h3 className="font-bold text-lg mb-2">Materiales necesarios</h3>
          <ul className="mb-6 list-disc pl-5 text-gray-700">
            {product.materials && product.materials.length > 0 ? (
              product.materials.map((item, idx) => <li key={idx}>{item}</li>)
            ) : (
              <li>No disponible.</li>
            )}
          </ul>
          <span className="inline-block px-6 py-2 bg-gray-300 text-gray-500 rounded-full font-semibold shadow text-center cursor-not-allowed">
            Compra no disponible
          </span>
        </div>
      </div>
    </section>
  );
};

export default TallerDetail;
