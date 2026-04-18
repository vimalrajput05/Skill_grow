import React, { createContext, useContext, useState, useEffect } from 'react';
import { t } from '../data/translations';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  useEffect(() => {
    // Load from localStorage
    const savedLang = localStorage.getItem('skillgrow-lang') || 'en';
    const savedDark = localStorage.getItem('skillgrow-theme') === 'dark';
    const savedVoice = localStorage.getItem('skillgrow-voice') !== 'false';

    setLang(savedLang);
    setDarkMode(savedDark);
    setVoiceEnabled(savedVoice);

    // Apply dark mode
    if (savedDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('skillgrow-lang', lang);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('skillgrow-theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('skillgrow-voice', voiceEnabled.toString());
  }, [voiceEnabled]);

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'hi' : 'en');
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const toggleVoice = () => {
    setVoiceEnabled(prev => !prev);
  };

  const value = {
    lang,
    darkMode,
    voiceEnabled,
    toggleLang,
    toggleDarkMode,
    toggleVoice,
    t
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

