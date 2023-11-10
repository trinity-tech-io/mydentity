"use client";
import { ReactNode } from "react";
import { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import { generateTheme } from "./material-ui.theme";
import { useAppThemeProvider } from "./AppThemeContext";

interface ThemeRegistry {
  defaultTheme: PaletteMode | null;
  children: ReactNode;
}
export default function ThemeRegistry(props: ThemeRegistry): JSX.Element {
  const { currentTheme } = useAppThemeProvider();
  const theme = generateTheme(props.defaultTheme || currentTheme);
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
