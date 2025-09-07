import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * Theme context to handle light/dark theme for "auto" preference.
 * Applies data-theme attribute to documentElement.
 */
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('auto'); // auto | light | dark

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const effective = theme === 'auto' ? (mql.matches ? 'dark' : 'light') : theme;
      document.documentElement.setAttribute('data-theme', effective === 'dark' ? 'dark' : 'light');
    };
    apply();
    if (theme === 'auto') {
      mql.addEventListener('change', apply);
      return () => mql.removeEventListener('change', apply);
    }
  }, [theme]);

  const value = { theme, setTheme };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// PUBLIC_INTERFACE
export function useTheme() {
  /** Provides current theme and setter. */
  return useContext(ThemeContext);
}
