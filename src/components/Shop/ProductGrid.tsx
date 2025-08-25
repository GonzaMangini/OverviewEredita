import React, { useState, useEffect, useMemo } from 'react';
import { Product, productService } from '../../services/products';
import { authService } from '../../services/auth';
import { useCart } from '../../contexts/CartContext';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import LoginModal from '../Auth/LoginModal';
import RegisterModal from '../Auth/RegisterModal';

const ProductGrid = () => {
  const [products, setProducts] = useState([] as Product[]);
  const [categories, setCategories] = useState([] as string[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null as Product | null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  
  const { addToCart } = useCart();

  // Load categories once on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await productService.getCategories();
        setCategories(categoriesData.categories);
      } catch (err) {
        console.error('Error al cargar categorías', err);
      }
    };
    loadCategories();
  }, []);

  // Load products when category changes (or on first mount)
  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await productService.getProducts({ 
        category: selectedCategory || undefined,
        // no enviar search: filtramos en cliente
      });
      setProducts(productsData);
    } catch (err) {
      setError('Error al cargar productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter products client-side based on searchTerm
  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return products;
    return products.filter(p =>
      [p.name, p.description, (p as any).detailed_description]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(term))
    );
  }, [products, searchTerm]);

  const handleAddToCart = async (productId: number, quantity: number = 1) => {
    if (!authService.isAuthenticated()) {
      setShowLoginModal(true);
      return;
    }

    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product, quantity);
      // No alert needed - the cart counter will update automatically
    }
  };

  const handleViewDetails = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  const handleAuthSuccess = () => {
    // Refresh page or update UI state
    window.location.reload();
  };

  // Nota: no retornamos temprano en 'loading' para mantener el layout estable y mostrar overlay

  if (error) {
    return (
      <section className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={loadProducts}
            className="mt-4 bg-eredita-title-pink text-white px-4 py-2 rounded-lg hover:bg-eredita-text-light transition-colors"
          >
            Reintentar
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="tienda" className="max-w-7xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-brand text-eredita-title-pink mb-4">
          Nuestra Tienda
        </h2>
        <p className="text-lg text-eredita-text-main max-w-2xl mx-auto">
          Descubre nuestros productos únicos hechos con amor y dedicación
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-eredita-text-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-eredita-title-pink focus:border-transparent"
          />
          <svg className="absolute left-3 top-2.5 h-5 w-5 text-eredita-text-green/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === ''
                ? 'bg-eredita-title-pink text-white'
                : 'bg-eredita-text-green/10 text-eredita-text-green hover:bg-eredita-text-green/20'
            }`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-eredita-title-pink text-white'
                  : 'bg-eredita-text-green/10 text-eredita-text-green hover:bg-eredita-text-green/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid with layout-preserving loader */}
      <div className="relative min-h-[24rem]">
        <div className={`${loading ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-16 w-16 text-eredita-text-green/40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="text-lg font-medium text-eredita-text-main mb-2">No hay productos disponibles</h3>
              <p className="text-eredita-text-main/70">
                {searchTerm || selectedCategory 
                  ? 'Intenta cambiar los filtros de búsqueda' 
                  : 'Pronto tendremos productos disponibles'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <div key={product.id} className="grid-item animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="relative h-1 w-40 overflow-hidden rounded-full bg-eredita-text-green/20">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-eredita-title-pink to-transparent"></div>
              </div>
              <p className="text-eredita-text-main text-sm">Actualizando...</p>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleAuthSuccess}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSuccess={handleAuthSuccess}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </section>
  );
};

export default ProductGrid;
