'use client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { theme } from './material-ui.theme';

export default function ThemeRegistry(props: any) {
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