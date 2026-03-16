import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Toast } from './Toast';
import { useWishlist } from '../context/WishlistContext';

let toastId = 0;

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  const { toggleWishlist } = useWishlist(); // Placeholder for wishlist trigger if needed

  const addToast = (message, type = 'success') => {
    const id = `toast-${toastId++}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    // Auto remove after 3s
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Global toast API - expose via context or window for triggers
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addToast = addToast;
    }
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[70] flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast 
            key={toast.id} 
            id={toast.id}
            {...toast}
            onRemove={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

