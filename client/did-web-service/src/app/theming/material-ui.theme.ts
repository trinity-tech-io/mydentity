import { Theme, createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

export const generateTheme = (mode: PaletteMode): Theme => createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  typography: {
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'inherit'
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "dark" ? "rgba(32, 32, 32, 0.5)" : "rgba(224, 224, 224, 0.5)",
          backdropFilter: 'blur(7px) saturate(0.2)',
          '&.MuiBackdrop-invisible': {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(7px) saturate(0.2)'
          }
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: 'inherit'
        },
        fallback: {
          width: '100%',
          height: '100%',
        }
      }
    }
  },
  palette: {
    mode,
    primary: {
      500: 'rgb(99,102,241)'
    },
  }
});