import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiMinus, FiPlus } from 'react-icons/fi';

export default function CartOverlay({ isOpen, onClose, updateCartCount }) {
  if (!isOpen) return null;

  const [cartItems, setCartItems] = React.useState([
    {
      id: 1,
      name: "The Organic Cotton Long-Sleeve Turtleneck",
      price: 29.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100&q=80",
      color: "White",
    },
    {
      id: 2,
      name: "The ReWool® Oversized Shirt Jacket",
      price: 49.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100&q=80",
      color: "Orange",
    },
  ]);

  useEffect(() => {
    const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    updateCartCount(totalCartItems);
  }, [cartItems, updateCartCount]);

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 flex max-w-full">
        <div className="w-screen max-w-md">
          <div className="flex h-full flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-6">
              <h2 className="text-lg font-medium text-gray-900">Your Cart ({cartItems.length})</h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={onClose}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">${item.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="p-1"
                          >
                            <FiMinus className="h-4 w-4" />
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1"
                          >
                            <FiPlus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="font-medium text-gray-500 hover:text-gray-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">Your cart is empty.</p>  
              )}
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className={`flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

