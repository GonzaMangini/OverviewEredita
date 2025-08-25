import React, { useEffect, useState } from 'react';
import { authService } from '../../services/auth';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cerrar con tecla ESC cuando el modal está abierto
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      await authService.register(registerData);
      onSuccess();
      onClose();
      setFormData({ email: '', password: '', confirmPassword: '', first_name: '', last_name: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-eredita-neutral rounded-xl p-8 max-w-md w-full mx-4 relative max-h-[90vh] overflow-y-auto text-eredita-text-main">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-eredita-text-main hover:text-eredita-title-pink transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-brand text-eredita-title-pink mb-2">Crear Cuenta</h2>
          <p className="text-eredita-text-main">Únete a la comunidad Eredita</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-eredita-text-main mb-1">
                Nombre
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-eredita-text-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-eredita-title-pink focus:border-transparent text-eredita-text-main bg-white placeholder-gray-400 caret-eredita-title-pink"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-eredita-text-main mb-1">
                Apellido
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-eredita-text-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-eredita-title-pink focus:border-transparent text-eredita-text-main bg-white placeholder-gray-400 caret-eredita-title-pink"
                placeholder="Tu apellido"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-eredita-text-main mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-eredita-text-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-eredita-title-pink focus:border-transparent text-eredita-text-main bg-white placeholder-gray-400 caret-eredita-title-pink"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-eredita-text-main mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-3 py-2 border border-eredita-text-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-eredita-title-pink focus:border-transparent text-eredita-text-main bg-white placeholder-gray-400 caret-eredita-title-pink"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-eredita-text-main mb-1">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-eredita-text-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-eredita-title-pink focus:border-transparent text-eredita-text-main bg-white placeholder-gray-400 caret-eredita-title-pink"
              placeholder="Repite tu contraseña"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-eredita-title-pink text-white py-2 px-4 rounded-lg font-semibold hover:bg-eredita-text-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        {/* Switch to login */}
        <div className="text-center mt-6">
          <p className="text-eredita-text-main">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-eredita-text-green hover:text-eredita-title-pink font-semibold transition-colors"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
