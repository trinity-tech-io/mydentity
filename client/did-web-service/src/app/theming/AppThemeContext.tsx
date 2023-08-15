import { createContext, useContext, useEffect, useState } from 'react';

const AppThemeContext = createContext({
  currentTheme: 'light',
  changeCurrentTheme: (newTheme: string) => { },
});

export default function AppThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const changeCurrentTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    // NextJS: wait for page to be mounted to make sure localStorage is accessed from the client only
    const persistedTheme = localStorage.getItem('theme');
    setTheme(persistedTheme || 'light');
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('[&_*]:!transition-none');
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    }

    const transitionTimeout = setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none');
    }, 1);

    return () => clearTimeout(transitionTimeout);
  }, [theme]);

  return <AppThemeContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>{children}</AppThemeContext.Provider>;
}

export const useAppThemeProvider = () => useContext(AppThemeContext);