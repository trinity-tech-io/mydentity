'use client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { generateTheme } from './material-ui.theme';
import { useAppThemeProvider } from './AppThemeContext';

export default function ThemeRegistry(props: any): JSX.Element {
  const { currentTheme } = useAppThemeProvider();
  const theme = generateTheme(currentTheme)
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}