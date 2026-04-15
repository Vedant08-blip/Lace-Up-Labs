import { createContext, useContext, useState } from 'react';

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [orders, setOrders] = useState([
    {
      id: 'LU-1713289321',
      date: 'April 16, 2026',
      total: 8999,
      status: 'delivered',
      items: [
        { name: 'Air Jordan 1 Retro High', brand: 'Nike', size: '10', price: 8999, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150' },
      ],
      timeline: [
        { status: 'placed', date: 'Apr 16, 10:30 AM', location: 'Order Confirmed' },
        { status: 'processing', date: 'Apr 16, 2:15 PM', location: 'Order Processing' },
        { status: 'shipped', date: 'Apr 17, 9:00 AM', location: 'Shipped from Mumbai' },
        { status: 'intransit', date: 'Apr 18, 3:45 PM', location: 'In Transit to Surat' },
        { status: 'delivered', date: 'Apr 19, 5:20 PM', location: 'Delivered' },
      ],
      tracking: 'FX9876543210',
      shippingAddress: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+91 9876543210',
        address: '123 Main Street',
        city: 'Surat',
        state: 'Gujarat',
        zipCode: '395001',
      },
    },
  ]);

  const addOrder = (orderData) => {
    const newOrder = {
      id: `LU-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      total: orderData.total,
      status: 'placed',
      items: orderData.items,
      timeline: [
        { status: 'placed', date: new Date().toLocaleString(), location: 'Order Confirmed' },
      ],
      tracking: `FX${Math.random().toString().substring(2, 14)}`,
      shippingAddress: orderData.shippingAddress,
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <CheckoutContext.Provider value={{ orders, addOrder }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within CheckoutProvider');
  }
  return context;
}
