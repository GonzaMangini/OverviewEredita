import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/auth';
import { useCart } from '../contexts/CartContext';
import LoginModal from './Auth/LoginModal';
import RegisterModal from './Auth/RegisterModal';
import CartModal from './Cart/CartModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoMenuOpen, setIsLogoMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(authService.getCurrentUser());
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(authService.getCurrentUser());
    };

    // Listen for auth changes
    window.addEventListener('storage', handleAuthChange);
    return () => window.removeEventListener('storage', handleAuthChange);
  }, []);

  // Handle scroll to shrink header
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setIsMenuOpen(false);
  };

  const handleAuthSuccess = () => {
    setUser(authService.getCurrentUser());
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  const handleSmoothScroll = (sectionId: string) => {
    // Si no estamos en la página principal, navegar primero
    if (location.pathname !== '/') {
      navigate('/');
      // Esperar un poco más para que la página cargue completamente antes de hacer scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      // Si ya estamos en la página principal, hacer scroll directo
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-pink-pastel text-gray-700 shadow-md' : 'bg-transparent text-white shadow-none'}`}>
      <div className={`max-w-8xl mx-auto flex items-center justify-between transition-all duration-500 ease-out ${
        isScrolled ? 'px-10 py-1' : 'px-16 py-2'
      }`}>
        {/* Left side - Logo */}
        <div className="flex items-center">
          <button 
            onClick={() => setIsLogoMenuOpen(!isLogoMenuOpen)}
            className="relative z-50"
          >
            <img
              src="/Logo.png"
              alt="Logo Eredita"
              className={`rounded-full transition-all duration-500 hover:scale-110 shadow-md object-cover cursor-pointer ${
                isScrolled ? 'h-10 w-10' : 'h-14 w-14'
              }`}
            />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-eredita-text-main hover:text-eredita-title-pink transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Right side - User Actions */}
        <div className={`hidden md:flex items-center transition-all duration-500 ease-out ${
          isScrolled ? 'space-x-4' : 'space-x-6'
        }`}>
          {user ? (
            <>
              {/* User Menu */}
              <div className="flex items-center space-x-2">
                <span
                  className={`font-medium text-lg px-3 py-1 rounded-full transition-all duration-300 ${
                    isScrolled
                      ? 'text-eredita-text-main'
                      : 'bg-eredita-title-pink text-white animate-pulse-glow shadow-md'
                  }`}
                >
                  Hola, {user.first_name}
                </span>
                <button
                  onClick={handleLogout}
                  className={`rounded-full px-5 py-2 font-medium text-base transition-all duration-300 hover:scale-105 ${
                    isScrolled
                      ? 'bg-eredita-text-green text-white hover:bg-eredita-text-green/90'
                      : 'bg-eredita-title-pink text-white hover:bg-eredita-text-light animate-pulse-glow shadow-md'
                  }`}
                >
                  Cerrar Sesión
                </button>
              </div>
              
              {/* Cart Button */}
              <button
                onClick={() => setShowCartModal(true)}
                className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  isScrolled
                    ? 'text-eredita-text-main hover:text-eredita-title-pink'
                    : 'text-eredita-title-pink bg-white/10 backdrop-blur-sm hover:bg-white/20 animate-pulse-glow shadow-md'
                }`}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-eredita-title-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowLoginModal(true)}
                className={`rounded-full px-6 py-2 font-medium text-base transition-all duration-300 hover:scale-105 ${
                  isScrolled
                    ? 'bg-eredita-text-green text-white hover:bg-eredita-text-green/90'
                    : 'bg-eredita-title-pink text-white hover:bg-eredita-text-light animate-pulse-glow shadow-md'
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => setShowRegisterModal(true)}
                className={`rounded-full px-6 py-2 font-medium text-base transition-all duration-300 hover:scale-105 ${
                  isScrolled
                    ? 'bg-eredita-title-pink text-white hover:bg-eredita-text-light'
                    : 'bg-eredita-title-pink text-white hover:bg-eredita-text-light animate-pulse-glow shadow-md'
                }`}
              >
                Registrarse
              </button>
              {/* Cart Button for non-logged users */}
              <button
                onClick={() => setShowCartModal(true)}
                className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  isScrolled
                    ? 'text-eredita-text-main hover:text-eredita-title-pink'
                    : 'text-eredita-title-pink bg-white/10 backdrop-blur-sm hover:bg-white/20 animate-pulse-glow shadow-md'
                }`}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-pink-pastel border-t border-eredita-text-green/20">
          <div className="px-6 py-4 space-y-2">
            <button
              onClick={() => {
                navigate('/');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-eredita-text-main hover:text-eredita-title-pink transition-colors font-medium"
            >
              Inicio
            </button>
            <button
              onClick={() => {
                handleSmoothScroll('talleres');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-eredita-text-main hover:text-eredita-title-pink transition-colors font-medium"
            >
              Talleres
            </button>
            <button
              onClick={() => {
                handleSmoothScroll('tienda');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-eredita-text-main hover:text-eredita-title-pink transition-colors font-medium"
            >
              Tienda
            </button>
            <button
              onClick={() => {
                handleSmoothScroll('contacto');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-eredita-text-main hover:text-eredita-title-pink transition-colors font-medium"
            >
              Contacto
            </button>
            
            {user ? (
              <div className="pt-4 space-y-2 border-t border-eredita-text-green/20">
                <div className="py-2 text-eredita-text-main font-medium">
                  Hola, {user.first_name}
                </div>
                <button
                  onClick={() => {
                    setShowCartModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-eredita-text-green hover:text-eredita-title-pink transition-colors font-medium"
                >
                  Ver Carrito
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-800 transition-colors font-medium"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="pt-4 space-y-2 border-t border-eredita-text-green/20">
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-eredita-text-green hover:text-eredita-title-pink transition-colors font-medium"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => {
                    setShowRegisterModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-eredita-title-pink hover:text-eredita-text-light transition-colors font-medium"
                >
                  Registrarse
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
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

      <CartModal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
        onCheckout={() => {
          setShowCartModal(false);
          navigate('/checkout');
        }}
      />

      {/* Logo Menu Sidebar */}
      <>
        {/* Overlay */}
        <div 
          className={`fixed inset-0 bg-black/50 z-40 transition-all duration-500 ease-out ${
            isLogoMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={() => setIsLogoMenuOpen(false)}
        />
        
        {/* Sidebar Menu */}
        <div className={`fixed top-0 left-0 h-full w-80 bg-pink-pastel shadow-2xl z-50 transition-all duration-500 ease-out transform ${
          isLogoMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className={`p-6 transition-all duration-700 delay-200 ${
            isLogoMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
              {/* Header del menú */}
              <div className="flex items-center justify-between mb-8">
                <img
                  src="/Logo.png"
                  alt="Logo Eredita"
                  className="h-10 w-10 rounded-full shadow-md object-cover"
                />
                <button
                  onClick={() => setIsLogoMenuOpen(false)}
                  className="text-eredita-text-main hover:text-eredita-title-pink transition-colors p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Navigation Links */}
              <nav className="space-y-3">
                <button
                  onClick={() => {
                    navigate('/');
                    setIsLogoMenuOpen(false);
                    // Hacer scroll hacia arriba
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 100);
                  }}
                  className={`block w-full text-left py-3 px-4 text-eredita-text-main hover:text-eredita-title-pink hover:bg-white/20 rounded-lg transition-all duration-300 font-brand text-xl transform ${
                    isLogoMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: isLogoMenuOpen ? '300ms' : '0ms' }}
                >
                  Inicio
                </button>
                
                <button
                  onClick={() => {
                    navigate('/conoceme');
                    setIsLogoMenuOpen(false);
                  }}
                  className={`block w-full text-left py-3 px-4 text-eredita-text-main hover:text-eredita-title-pink hover:bg-white/20 rounded-lg transition-all duration-300 font-brand text-xl transform ${
                    isLogoMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: isLogoMenuOpen ? '400ms' : '0ms' }}
                >
                  Conoceme
                </button>
                
                <button
                  onClick={() => {
                    handleSmoothScroll('tienda');
                    setIsLogoMenuOpen(false);
                  }}
                  className={`block w-full text-left py-3 px-4 text-eredita-text-main hover:text-eredita-title-pink hover:bg-white/20 rounded-lg transition-all duration-300 font-brand text-xl transform ${
                    isLogoMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: isLogoMenuOpen ? '500ms' : '0ms' }}
                >
                  Tienda
                </button>
                
                <button
                  onClick={() => {
                    navigate('/contacto');
                    setIsLogoMenuOpen(false);
                  }}
                  className={`block w-full text-left py-3 px-4 text-eredita-text-main hover:text-eredita-title-pink hover:bg-white/20 rounded-lg transition-all duration-300 font-brand text-xl transform ${
                    isLogoMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: isLogoMenuOpen ? '600ms' : '0ms' }}
                >
                  Contacto
                </button>
              </nav>
            </div>
          </div>
        </>
      
    </header>
  );
};

export default Header;
