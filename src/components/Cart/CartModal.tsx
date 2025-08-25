import React from 'react';
import { useCart } from '../../contexts/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, onCheckout }) => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(price);
  };



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-eredita-neutral rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-eredita-text-green/20">
          <h2 className="text-2xl font-brand text-eredita-title-pink">
            Mi Carrito ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})
          </h2>
          <button
            onClick={onClose}
            className="text-eredita-text-main hover:text-eredita-title-pink transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto max-h-96">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-16 w-16 text-eredita-text-green/40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15" />
              </svg>
              <h3 className="text-lg font-medium text-eredita-text-main mb-2">Tu carrito está vacío</h3>
              <p className="text-eredita-text-main/70">Agrega algunos productos para comenzar</p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-white rounded-lg p-4 border border-eredita-text-green/20">
                  {/* Product Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {item.product.images && item.product.images.length > 0 ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-eredita-text-green/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-eredita-text-main truncate">{item.product.name}</h4>
                    <p className="text-sm text-eredita-text-green font-medium">{formatPrice(item.product.price)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-eredita-text-green/30 flex items-center justify-center text-eredita-text-green hover:bg-eredita-text-green hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold text-eredita-text-main">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-eredita-text-green/30 flex items-center justify-center text-eredita-text-green hover:bg-eredita-text-green hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <p className="font-semibold text-eredita-text-green">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-eredita-text-green/20 p-6 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between text-xl font-bold">
              <span className="text-eredita-text-main">Total:</span>
              <span className="text-eredita-text-green">{formatPrice(totalPrice)}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="flex-1 bg-red-100 text-red-700 py-3 px-4 rounded-lg font-semibold hover:bg-red-200 transition-colors"
              >
                Vaciar Carrito
              </button>
              <button
                onClick={onCheckout}
                className="flex-1 bg-eredita-title-pink text-white py-3 px-4 rounded-lg font-semibold hover:bg-eredita-text-light transition-colors"
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
