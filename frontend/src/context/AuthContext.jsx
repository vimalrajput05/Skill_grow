import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const savedToken = localStorage.getItem('skillgrow_token');
      if (savedToken) {
        const { data } = await authAPI.getMe();
        if (data.success) {
          setUser(data.user);
          setToken(savedToken);
        } else {
          localStorage.removeItem('skillgrow_token');
          localStorage.removeItem('skillgrow_user');
        }
      }
    } catch {
      localStorage.removeItem('skillgrow_token');
      localStorage.removeItem('skillgrow_user');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUser(); }, [fetchUser]);

  const login = async (mobile, password) => {
    const { data } = await authAPI.login({ mobile, password });
    if (data.success) {
      localStorage.setItem('skillgrow_token', data.token);
      localStorage.setItem('skillgrow_user', JSON.stringify(data.user));
      setUser(data.user);
      setToken(data.token);
      return data.user;
    }
    throw new Error(data.message || 'Login failed');
  };

  const register = async (userData) => {
    const { data } = await authAPI.register(userData);
    if (data.success) {
      localStorage.setItem('skillgrow_token', data.token);
      localStorage.setItem('skillgrow_user', JSON.stringify(data.user));
      setUser(data.user);
      setToken(data.token);
      return data.user;
    }
    throw new Error(data.message || 'Registration failed');
  };

  const logout = () => {
    localStorage.removeItem('skillgrow_token');
    localStorage.removeItem('skillgrow_user');
    setUser(null);
    setToken(null);
    window.location.href = '/login';
  };

  const updateLanguage = async (language) => {
    try {
      const { data } = await authAPI.updateLanguage(language);
      if (data.success && user) {
        const updated = { ...user, language: data.user.language };
        setUser(updated);
        localStorage.setItem('skillgrow_user', JSON.stringify(updated));
      }
    } catch {}
  };

  const updateProfile = async (profileData) => {
    const { data } = await authAPI.updateProfile(profileData);
    if (data.success && user) {
      const updated = { ...user, ...data.user };
      setUser(updated);
      localStorage.setItem('skillgrow_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateLanguage, updateProfile, isAuthenticated: !!user && !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
