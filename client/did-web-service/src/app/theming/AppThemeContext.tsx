/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = "light" | "dark";

const AppThemeContext = createContext<{
  currentTheme: Theme;
  changeCurrentTheme: (newTheme: Theme) => void;
}>({
  currentTheme: 'dark',
  changeCurrentTheme: (newTheme: Theme) => { },
});

export default function AppThemeProvider(props: any) {
  const [theme, setTheme] = useState<Theme>('dark');

  const changeCurrentTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    // NextJS: wait for page to be mounted to make sure localStorage is accessed from the client only
    // const persistedTheme = localStorage.getItem('theme') as Theme;
    const persistedTheme = "dark"; // TMP WHILE LIGHT MODE IS NOT AVAILABLE
    setTheme(persistedTheme || 'dark');
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