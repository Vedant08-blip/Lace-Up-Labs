import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (sneaker, size = null, quantity = 1) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item.id === sneaker.id && item.size === size
      );
      if (existingItem) {
        return prev.map((item) =>
          item.id === sneaker.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...sneaker, size, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (sneakerId, size) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === sneakerId && item.size === size))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

