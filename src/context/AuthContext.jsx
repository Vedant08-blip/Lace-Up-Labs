/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext();

const USERS_KEY = 'auth_users';
const USER_KEY = 'auth_user';

const loadUsers = () => {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const createAvatar = (name) => {
  const initial = (name || 'U').trim().charAt(0).toUpperCase() || 'U';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <rect width="64" height="64" fill="#1f1f1f" />
    <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="32" fill="#f5f5f5">${initial}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(USER_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }
  }, []);

  const clearError = () => setError('');

  const openAuthModal = () => {
    clearError();
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    clearError();
    setIsAuthModalOpen(false);
  };

  const login = async (email, password, remember) => {
    setIsLoading(true);
    clearError();

    try {
      if (!email || !password) {
        setError('Please enter your email and password.');
        return { success: false };
      }

      const users = loadUsers();
      const match = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!match) {
        setError('Invalid email or password.');
        return { success: false };
      }

      const { password: _pw, ...safeUser } = match;
      setUser(safeUser);

      if (remember) {
        localStorage.setItem(USER_KEY, JSON.stringify(safeUser));
      } else {
        localStorage.removeItem(USER_KEY);
      }

      setIsAuthModalOpen(false);
      return { success: true, user: safeUser };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password, remember) => {
    setIsLoading(true);
    clearError();

    try {
      if (!name || !email || !password) {
        setError('Please fill in all fields.');
        return { success: false };
      }

      const users = loadUsers();
      const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());

      if (exists) {
        setError('An account with this email already exists.');
        return { success: false };
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        avatar: createAvatar(name),
      };

      const updated = [...users, newUser];
      saveUsers(updated);

      const { password: _pw, ...safeUser } = newUser;
      setUser(safeUser);

      if (remember) {
        localStorage.setItem(USER_KEY, JSON.stringify(safeUser));
      } else {
        localStorage.removeItem(USER_KEY);
      }

      setIsAuthModalOpen(false);
      return { success: true, user: safeUser };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthModalOpen,
      isLoading,
      error,
      openAuthModal,
      closeAuthModal,
      login,
      signup,
      logout,
      clearError,
    }),
    [user, isAuthModalOpen, isLoading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
