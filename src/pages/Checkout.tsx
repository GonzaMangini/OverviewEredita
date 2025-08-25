import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const { items, totalPrice } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: 'AR',
    payment_method: 'tarjeta',
  });

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { authService } = await import('../services/auth');
      const apiFetch = (await import('../services/api')).default;
      const { createCheckoutPreference } = await import('../services/payments');

      // Requerir autenticación
      if (!authService.isAuthenticated()) {
        alert('Necesitás iniciar sesión para finalizar la compra.');
        navigate('/');
        return;
      }

      // Sincronizar carrito local -> backend
      // Limpiar carrito backend (idempotente)
      await apiFetch('/cart/clear', { method: 'DELETE' }).catch(() => {});
      // Agregar items actuales
      for (const it of items) {
        await apiFetch('/cart/add', {
          method: 'POST',
          body: JSON.stringify({ product_id: it.product.id, quantity: it.quantity }),
        });
      }

      // Crear orden en backend
      const order = await apiFetch('/orders/', {
        method: 'POST',
        body: JSON.stringify({
          shipping_info: {
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            phone: form.phone,
            address: form.address,
            city: form.city,
            state: form.state,
            zip_code: form.zip_code,
            country: form.country,
          },
          payment_method: form.payment_method,
          notes: '',
        }),
      });

      // Crear preferencia de pago y redirigir a MP
      const pref = await createCheckoutPreference(order.id);
      window.location.href = pref.init_point;
    } catch (err: any) {
      console.error(err);
      alert(err?.message || 'No se pudo iniciar el proceso de pago.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-brand text-eredita-title-pink mb-6">Checkout</h1>
        <div className="bg-white rounded-xl border border-eredita-text-green/20 p-8 text-eredita-text-main">
          Tu carrito está vacío. Agregá productos para continuar.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-brand text-eredita-title-pink mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Resumen */}
        <aside className="md:col-span-1">
          <div className="bg-white rounded-xl border border-eredita-text-green/20 p-6">
            <h2 className="text-xl font-semibold text-eredita-text-main mb-4">Resumen</h2>
            <ul className="space-y-3 mb-4">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between text-eredita-text-main">
                  <span className="truncate pr-4">{item.product.name} × {item.quantity}</span>
                  <span className="text-eredita-text-green font-medium">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between text-lg font-bold">
              <span className="text-eredita-text-main">Total</span>
              <span className="text-eredita-text-green">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </aside>

        {/* Formulario */}
        <section className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-eredita-text-green/20 p-6 space-y-5">
            <h2 className="text-xl font-semibold text-eredita-text-main">Datos del comprador</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-eredita-text-main mb-1" htmlFor="first_name">Nombre</label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  value={form.first_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-eredita-text-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-eredita-title-pink focus:border-transparent text-eredita-text-main bg-white placeholder-gray-400 caret-eredita-title-pink"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm text-eredita-text-main mb-1" htmlFor="last_name">Apellido</label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  value={form.last_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-eredita-text-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-eredita-title-pink focus:border-transparent text-eredita-text-main bg-white placeholder-gray-400 caret-eredita-title-pink"
                  placeholder="Tu apellido"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-eredita-text-main mb-1" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-eredita-text-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-eredita-title-pink focus:border-transparent text-eredita-text-main bg-white placeholder-gray-400 caret-eredita-title-pink"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm text-eredita-text-main mb-1" htmlFor="phone">Teléfono</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-eredita-text-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-eredita-title-pink focus:border-transparent text-eredita-text-main bg-white placeholder-gray-400 caret-eredita-title-pink"
                  placeholder="Ej: 11 1234-5678"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-eredita-text-main mb-1" htmlFor="address">Dirección</label>
              <input
                id="address"
                name="address"
                type="text"
                required
                value={form.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-eredita-text-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-eredita-title-pink focus:border-transparent text-eredita-text-main bg-white placeholder-gray-400 caret-eredita-title-pink"
                placeholder="Calle 123, Ciudad"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-eredita-text-main mb-1" htmlFor="city">Ciudad</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-eredita-text-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-eredita-title-pink focus:border-transparent text-eredita-text-main bg-white placeholder-gray-400 caret-eredita-title-pink"
                  placeholder="Ciudad"
                />
              </div>
              <div>
                <label className="block text-sm text-eredita-text-main mb-1" htmlFor="state">Provincia</label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-eredita-text-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-eredita-title-pink focus:border-transparent text-eredita-text-main bg-white placeholder-gray-400 caret-eredita-title-pink"
                  placeholder="Provincia"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-eredita-text-main mb-1" htmlFor="zip_code">Código Postal</label>
                <input
                  id="zip_code"
                  name="zip_code"
                  type="text"
                  value={form.zip_code}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-eredita-text-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-eredita-title-pink focus:border-transparent text-eredita-text-main bg-white placeholder-gray-400 caret-eredita-title-pink"
                  placeholder="Ej: 1405"
                />
              </div>
              <div>
                <label className="block text-sm text-eredita-text-main mb-1" htmlFor="country">País</label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-eredita-text-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-eredita-title-pink focus:border-transparent text-eredita-text-main bg-white placeholder-gray-400 caret-eredita-title-pink"
                  placeholder="AR"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-eredita-text-main mb-1" htmlFor="payment_method">Método de pago</label>
              <select
                id="payment_method"
                name="payment_method"
                value={form.payment_method}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-eredita-text-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-eredita-title-pink focus:border-transparent text-eredita-text-main bg-white"
              >
                <option value="tarjeta">Tarjeta</option>
                <option value="transferencia">Transferencia</option>
                <option value="efectivo">Efectivo (acuerdo)</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-eredita-title-pink text-white py-3 px-6 rounded-lg font-semibold hover:bg-eredita-text-light transition-colors"
              >
                Confirmar compra
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default CheckoutPage;
