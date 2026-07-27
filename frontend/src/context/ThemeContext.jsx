/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SUPPORTED_THEMES = ['dark', 'light', 'amoled', 'blue', 'high-contrast'];
const DEFAULT_THEME = 'dark';
const THEME_STORAGE_KEY = 'voyage_theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved && SUPPORTED_THEMES.includes(saved)) {
        return saved;
      }
      if (typeof window !== 'undefined' && window.matchMedia) {
        const wantsLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        return wantsLight ? 'light' : DEFAULT_THEME;
      }
    } catch (e) {
      console.error('Failed to access localStorage for theme preference:', e);
    }
    return DEFAULT_THEME;
  });

  const applyThemeToDOM = useCallback((newTheme) => {
    const root = document.documentElement;
    SUPPORTED_THEMES.forEach((t) => root.classList.remove(t));
    root.classList.add(newTheme);
    root.style.colorScheme = newTheme === 'light' ? 'light' : 'dark';
  }, []);

  useEffect(() => {
    applyThemeToDOM(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      console.error('Failed to save theme to localStorage:', e);
    }
  }, [theme, applyThemeToDOM]);

  // Handle system preference changes if user hasn't explicitly set a preference
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleSystemChange = (e) => {
      // Only switch automatically if no saved preference exists in storage
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (!saved) {
        const nextTheme = e.matches ? 'light' : 'dark';
        setThemeState(nextTheme);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
      return () => mediaQuery.removeEventListener('change', handleSystemChange);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, []);

  const setTheme = useCallback((newTheme) => {
    if (SUPPORTED_THEMES.includes(newTheme)) {
      setThemeState(newTheme);
    }
  }, []);

  const value = React.useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
      isDark: theme !== 'light',
      supportedThemes: SUPPORTED_THEMES,
    }),
    [theme, toggleTheme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
