import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './components/Landing';
import Novedades from './components/Novedades';
import TallerDetail from './components/TallerDetail';
import ProductGrid from './components/Shop/ProductGrid';
import Footer from './components/Footer';
import ConocemePage from './pages/Conoceme';
import ContactoPage from './pages/Contacto';
import CheckoutPage from './pages/Checkout';
import { CartProvider } from './contexts/CartContext';

const Home = () => {
  return (
    <>
      <Landing />
      <Novedades />
      <ProductGrid />
    </>
  );
};



function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="bg-white min-h-screen">
          <Header />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/conoceme" element={<ConocemePage />} />
              <Route path="/contacto" element={<ContactoPage />} />
              <Route path="/taller/:id" element={<TallerDetail />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
