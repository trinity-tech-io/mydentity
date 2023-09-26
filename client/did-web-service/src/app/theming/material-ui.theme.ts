import { Theme, createTheme } from "@mui/material";

export const generateTheme = (mode: string): Theme => createTheme({
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
    }
  },
  palette: {
    mode: 'dark',
    primary: {
      500: 'rgb(99,102,241)'
    }
  }
});