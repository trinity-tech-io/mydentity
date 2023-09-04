/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = "light" | "dark";

const AppThemeContext = createContext<{
  currentTheme: Theme;
  changeCurrentTheme: (newTheme: Theme) => void;
}>({
  currentTheme: 'light',
  changeCurrentTheme: (newTheme: Theme) => { },
});

export default function AppThemeProvider(props: any) {
  const [theme, setTheme] = useState<Theme>('light');

  const changeCurrentTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    // NextJS: wait for page to be mounted to make sure localStorage is accessed from the client only
    const persistedTheme = localStorage.getItem('theme') as Theme;
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

  return <AppThemeContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>{props.children}</AppThemeContext.Provider>;
}

export const useAppThemeProvider = () => useContext(AppThemeContext);