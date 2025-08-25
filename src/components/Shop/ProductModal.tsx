import React, { useEffect, useState } from 'react';
import { Product } from '../../services/products';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (productId: number, quantity?: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Cerrar con tecla ESC cuando el modal está abierto
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(price);
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, 1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-eredita-neutral rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 text-eredita-text-main hover:text-eredita-title-pink transition-colors shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-24 h-24 text-eredita-text-green/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? 'border-eredita-title-pink'
                        : 'border-transparent hover:border-eredita-text-green/30'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Category */}
            {product.category && (
              <span className="inline-block bg-eredita-text-green/10 text-eredita-text-green px-3 py-1 rounded-full text-sm font-medium">
                {product.category}
              </span>
            )}

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-brand text-eredita-title-pink">
              {product.name}
            </h1>

            {/* Price */}
            <div className="text-3xl font-bold text-eredita-text-green">
              {formatPrice(product.price)}
            </div>

            {/* Description */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-eredita-text-main mb-2">Descripción</h3>
                <p className="text-eredita-text-main leading-relaxed">{product.description}</p>
              </div>

              {/* Detailed Description */}
              {product.detailed_description && (
                <div>
                  <h3 className="text-lg font-semibold text-eredita-text-main mb-2">Contenido</h3>
                  <p className="text-eredita-text-main leading-relaxed">{product.detailed_description}</p>
                </div>
              )}

              {/* Materials */}
              {product.materials && product.materials.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-eredita-text-main mb-2">Materiales Necesarios</h3>
                  <ul className="space-y-2">
                    {product.materials.map((material, index) => (
                      <li key={index} className="flex items-start gap-2 text-eredita-text-main">
                        <span className="text-eredita-text-green mt-1">•</span>
                        <span>{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Workshop Includes */}
              {product.workshop_includes && product.workshop_includes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-eredita-text-main mb-2">Qué Incluye el Taller</h3>
                  <ul className="space-y-2">
                    {product.workshop_includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-eredita-text-main">
                        <span className="text-eredita-text-green mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-eredita-text-green text-white py-3 px-6 rounded-lg font-semibold hover:bg-eredita-text-green/90 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15" />
              </svg>
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
