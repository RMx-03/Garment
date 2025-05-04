import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

//   // Load cart items from localStorage 
//   useEffect(() => {
//     const storedCart = localStorage.getItem("cart");
//     if (storedCart) {
//         setCartItems(JSON.parse(storedCart));
//     }
//   }, []);

  // Save cart items to localStorage
  useEffect(() => {
    console.log("Cart updated:", cartItems);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product, quantity = 1, selectedSize, selectedColor) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => 
          item.id === product.id && 
          item.size === selectedSize && 
          item.color === selectedColor
      );

      if (existingItem) {
        return prevItems.map(item =>
          item === existingItem
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, {
        ...product,
        quantity,
        size: selectedSize,
        color: selectedColor
      }];
    });
  }, []);

  const removeFromCart = useCallback((productId, size, color) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item.id === productId && item.size === size && item.color === color)
      )
    );
  }, []);

  const updateQuantity = useCallback((productId, size, color, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId, size, color);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.size === size && item.color === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  const getCartCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const value = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  }), [
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  ]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};