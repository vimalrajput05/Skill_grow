import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('skillgrow-lang') || 'en');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('skillgrow-lang', lang);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;

  const toggleLang = () => setLang(prev => prev === 'en' ? 'hi' : 'en');
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <AppContext.Provider value={{ lang, darkMode, toggleLang, toggleDarkMode, t }}>
      {children}
    </AppContext.Provider>
  );
};
