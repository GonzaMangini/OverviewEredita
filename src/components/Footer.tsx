import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img src="/Logo.png" alt="Eredita Logo" className="h-10 mr-3" />
          <span>&copy; 2025 Eredita. Todos los derechos reservados.</span>
        </div>
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook size={24} className="text-2xl hover:text-blue-500 transition-colors" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter size={24} className="text-2xl hover:text-blue-400 transition-colors" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram size={24} className="text-2xl hover:text-pink-500 transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
