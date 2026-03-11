import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Simulated delay for auth operations
const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user from localStorage on mount (remember me functionality)
  useEffect(() => {
    const savedUser = localStorage.getItem('laceup_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('laceup_user');
      }
    }
  }, []);

  const login = async (email, password, rememberMe = false) => {
    setIsLoading(true);
    setError(null);

    try {
      await simulateDelay(1000); // Simulate API call

      // Simple validation
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      const userData = {
        email,
        name: email.split('@')[0],
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      };

      setUser(userData);

      if (rememberMe) {
        localStorage.setItem('laceup_user', JSON.stringify(userData));
      }

      setIsAuthModalOpen(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password, rememberMe = false) => {
    setIsLoading(true);
    setError(null);

    try {
      await simulateDelay(1500); // Simulate API call

      // Validation
      if (!name || !email || !password) {
        throw new Error('Please fill in all fields');
      }

      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      const userData = {
        email,
        name,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      };

      setUser(userData);

      if (rememberMe) {
        localStorage.setItem('laceup_user', JSON.stringify(userData));
      }

      setIsAuthModalOpen(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('laceup_user');
  };

  const clearError = () => setError(null);

  const openAuthModal = () => {
    setError(null);
    setIsAuthModalOpen(true);
  };
  const closeAuthModal = () => {
    setError(null);
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        isLoading,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

