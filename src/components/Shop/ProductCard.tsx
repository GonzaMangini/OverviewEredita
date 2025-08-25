import React, { useState } from 'react';
import { Product } from '../../services/products';
import ImageCarousel from './ImageCarousel';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number, quantity?: number) => Promise<void>;
  onViewDetails: (productId: number) => void;
}

const ProductCard = ({ product, onAddToCart, onViewDetails }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(price);
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await onAddToCart(product.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHeartClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl border border-eredita-text-green/20 overflow-hidden transition-all duration-300 transform hover:-translate-y-2 group relative animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Carousel */}
      <div className="relative h-56 overflow-hidden">
        <ImageCarousel
          images={product.images}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-400 group-hover:scale-110"
        />
        
        {/* Overlay gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-opacity duration-200 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
        
        {/* Category chips (support multiple) */}
        {(product.categories?.length || product.category) && (
          <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2 items-start">
            {(product.categories && product.categories.length > 0
              ? product.categories
              : [product.category]
            ).map((cat, idx) => (
              <span
                key={`${cat}-${idx}`}
                className="px-3 py-1 rounded-full text-[11px] font-semibold shadow-lg backdrop-blur-sm
                           bg-white/85 text-eredita-text-main border border-white/60
                           transition-all duration-200 group-hover:scale-105"
              >
                {cat}
              </span>
            ))}
          </div>
        )}


      </div>

      {/* Product Info */}
      <div className="p-5 relative">
        {/* Animated background accent */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-eredita-title-pink to-eredita-text-green transition-all duration-300 transform origin-left ${
          isHovered ? 'scale-x-100' : 'scale-x-0'
        }`} />
        
        <div className="space-y-3">
          <h3 className="text-lg font-brand text-eredita-title-pink font-bold line-clamp-2 group-hover:text-eredita-text-green transition-colors duration-200">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-eredita-text-main text-sm line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-200">
              {product.description}
            </p>
          )}

          {/* Price with animation */}
          <div className="flex items-center justify-between">
            <div className="relative">
              <span className="text-2xl font-bold text-eredita-text-green transition-all duration-200 group-hover:scale-105">
                {formatPrice(product.price)}
              </span>
              <div className={`absolute -bottom-1 left-0 h-0.5 bg-eredita-text-green transition-all duration-200 ${
                isHovered ? 'w-full' : 'w-0'
              }`} />
            </div>
            
            {/* Animated heart icon */}
            <div className={`transition-all duration-200 transform ${
              isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}>
              <button 
                type="button"
                onClick={handleHeartClick}
                className={`relative p-2 transition-colors duration-150 cursor-pointer ${
                  isLiked ? 'text-red-500' : 'text-eredita-title-pink hover:text-red-500'
                }`}
              >
                <svg className="w-5 h-5 pointer-events-none" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path className="pointer-events-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={() => onViewDetails(product.id)}
            className="flex-1 bg-gradient-to-r from-eredita-text-green/10 to-eredita-text-green/5 text-eredita-text-green border border-eredita-text-green/30 py-2.5 px-4 rounded-lg font-semibold hover:from-eredita-text-green hover:to-eredita-text-green/90 hover:text-white hover:border-eredita-text-green hover:shadow-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path className="pointer-events-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="pointer-events-none">Ver Detalles</span>
          </button>
          
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-eredita-title-pink to-eredita-text-light text-white py-2.5 px-4 rounded-lg font-semibold hover:from-eredita-text-light hover:to-eredita-title-pink hover:shadow-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent pointer-events-none"></div>
                <span className="pointer-events-none">Agregando...</span>
              </>
            ) : (
              <span className="pointer-events-none">Agregar</span>
            )}
          </button>
        </div>
      </div>

      {/* Shimmer effect - only on image area */}
      <div className={`absolute top-0 left-0 right-0 h-56 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-600 pointer-events-none ${
        isHovered ? 'translate-x-full' : '-translate-x-full'
      }`} style={{ width: '50%' }} />
    </div>
  );
};

export default ProductCard;
