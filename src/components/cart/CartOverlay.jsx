import { memo, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import CartItem from './CartItem';
import { useCart } from '../../context/CartContext';

const CartOverlay = memo(({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const overlayRef = useRef(null);

  const handleRemoveItem = useCallback((id, size, color) => {
    removeFromCart(id, size, color);
  }, [removeFromCart]);

  const handleUpdateQuantity = useCallback((id, size, color, quantity) => {
    updateQuantity(id, size, color, quantity);
  }, [updateQuantity]);

  const subtotal = getCartTotal();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <div 
      className={`fixed inset-0 z-[100] ${isOpen ? 'visible' : 'invisible'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Cart panel */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-0 z-[101]">
        <div 
          ref={overlayRef}
          className={`w-screen max-w-md transform transition-transform duration-300 ease-out bg-white shadow-xl ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <h2 id="cart-title" className="text-2xl font-normal">Shopping Cart</h2>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 transition-colors"
              onClick={onClose}
              aria-label="Close cart"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          {/* Cart content */}
          <div className="flex flex-col h-[calc(100vh-80px)] bg-white">
            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {cartItems.map((item) => (
                    <CartItem
                      key={`${item.id}-${item.size}-${item.color}`}
                      item={item}
                      onRemove={handleRemoveItem}
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 mt-auto bg-white">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-base">Subtotal</span>
                  <span className="text-base">${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="block w-full py-3 px-4 rounded bg-black text-white text-center hover:bg-gray-900 transition-colors"
                >
                  Checkout
                </Link>
                <button
                  type="button"
                  className="block w-full text-center text-gray-900 hover:text-gray-600 transition-colors"
                  onClick={onClose}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

CartOverlay.displayName = 'CartOverlay';

export default CartOverlay;