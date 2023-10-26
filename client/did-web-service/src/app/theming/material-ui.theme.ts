import { Theme, createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import palette from "./palette";

function pxToRem(value: number): string {
  return `${value / 16}rem`;
}

function responsiveFontSizes({ sm, md, lg }: { sm: number, md: number, lg: number }): {[key: string]: object} {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm)
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md)
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg)
    }
  };
}

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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'inherit'
        },
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
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundImage: 'unset',
        }
      }
    },
  },
  typography: {
    h1: {
      fontWeight: 700,
      lineHeight: 80 / 64,
      fontSize: pxToRem(40),
      ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 })
    },
    h2: {
      fontWeight: 700,
      lineHeight: 64 / 48,
      fontSize: pxToRem(32),
      ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 })
    },
    h3: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: pxToRem(24),
      ...responsiveFontSizes({ sm: 26, md: 30, lg: 36 })
    },
    h4: {
      fontWeight: 600,
      lineHeight: 1.4,
      fontSize: pxToRem(20),
      ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 })
    },
    h5: {
      fontWeight: 600,
      lineHeight: 1.4,
      fontSize: pxToRem(18),
      ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 })
    },
    h6: {
      fontWeight: 600,
      lineHeight: 24 / 18,
      fontSize: pxToRem(16),
      ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 })
    },
    subtitle1: {
      fontWeight: 600,
      lineHeight: 1.4,
      fontSize: pxToRem(16)
    },
    subtitle2: {
      fontWeight: 600,
      lineHeight: 18 / 14,
      fontSize: pxToRem(14)
    },
    body1: {
      fontSize: pxToRem(15),
      ...responsiveFontSizes({ sm: 16, md: 16, lg: 16 })
    },
    body2: {
      fontSize: pxToRem(14)
    },
    caption: {
      fontSize: pxToRem(12)
    },
  },
  palette: {
    mode,
    ... palette[mode]
  },
});