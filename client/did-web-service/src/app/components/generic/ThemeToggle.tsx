import { FC } from "react";
import { styled } from "@mui/material/styles";
import { Button, IconButton, Switch, alpha } from "@mui/material";
import { useAppThemeProvider } from "../../theming/AppThemeContext";

// const SwitchUI = styled(Switch)(({ theme }) => ({
//   width: 62,
//   height: 34,
//   padding: 7,
//   "& .MuiSwitch-switchBase": {
//     margin: 1,
//     padding: 0,
//     transform: "translateX(6px)",
//     "&.Mui-checked": {
//       color: "#fff",
//       transform: "translateX(22px)",
//       "& .MuiSwitch-thumb:before": {
//         backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
//           "#fff"
//         )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
//       },
//       "& + .MuiSwitch-track": {
//         opacity: 1,
//         backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
//       },
//     },
//   },
//   "& .MuiSwitch-thumb": {
//     backgroundColor: theme.palette.background.paper,
//     width: 32,
//     height: 32,
//     "&:before": {
//       content: "''",
//       position: "absolute",
//       width: "100%",
//       height: "100%",
//       left: 0,
//       top: 0,
//       backgroundRepeat: "no-repeat",
//       backgroundPosition: "center",
//       backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
//         "#001e3c"
//       )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
//     },
//   },
//   "& .MuiSwitch-track": {
//     opacity: 1,
//     backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
//     borderRadius: 20 / 2,
//   },
// }));

const ButtonStyle = styled(IconButton)(({ theme }) => ({
  "--icon-fill": alpha(theme.palette.text.primary, 0.85),
  "--ease-s1": "cubic-bezier(.25,0,.3,1)",
  "--ease-elastic-s1": "cubic-bezier(.5,1.25,.75,1.25)",
  "--ease-elastic-s2:": "cubic-bezier(.5,1.5,.75,1.25)",
  "--ease-out-s1": "cubic-bezier(0,0,0,1)",
  "&:hover": {
    "--icon-fill": alpha(theme.palette.text.primary, 1),
    filter: "none",
  },
  ".sun-and-moon": {
    ".moon, .sun, .sun-beams": {
      transformOrigin: "center center",
    },
    ".moon, .sun": {
      fill: "var(--icon-fill)",
    },
    ".sun-beams": {
      stroke: "var(--icon-fill)",
      strokeWidth: "2px",
      transition:
        "transform .5s var(--ease-elastic-s2), opacity .5s var(--ease-s1)",
    },
    ".sun": {
      transition: "transform .5s var(--ease-elastic-s1)",
    },
    ".moon > circle": {
      transition: "transform .25s var(--ease-out-s1)",
    },
  },
  "&.light": {
    "--bg-color": "18 18 18",
  },
  "&.dark .sun-and-moon": {
    ".sun": {
      transform: "scale(1.75)",
      transitionTimingFunction: "var(--ease-s1)",
      transitionDuration: "0.25s",
    },
    ".sun-beams": {
      opacity: 0,
      transitionDuration: ".15s",
      transform: "rotateZ(-25deg)",
    },
    ".moon > circle": {
      transform: "translateX(-7px)",
      transitionDuration: ".5s",
      transitionDelay: ".25s",
    },
  },
  "&.dark .sun-and-moon > .sun": {
    transform: "scale(1.75)",
    transitionTimingFunction: "var(--ease-s1)",
    transitionDuration: "0.25s",
  },

  "&.dark .sun-and-moon > .sun-beams": {
    opacity: 0,
    transitionDuration: ".15s",
    transform: "rotateZ(-25deg)",
  },

  "&.dark .sun-and-moon > .moon > circle": {
    transform: "translateX(-7px)",
    transitionDuration: ".5s",
    transitionDelay: ".25s",
  },

  "@supports (cx: 1)": {
    "&.dark .sun-and-moon .moon > circle": {
      cx: 17,
      transform: "translateX(0)",
    },
    ".sun-and-moon .moon > circle": {
      transition: "cx .25s var(--ease-out-s1)",
    },
  },
}));

const ThemeToggle: FC = () => {
  const { currentTheme, changeCurrentTheme } = useAppThemeProvider();
  return (
    <ButtonStyle
      id="theme-toggle"
      className={currentTheme !== "light" ? "light" : "dark"}
      title="Toggles light & dark"
      onClick={(): void =>
        changeCurrentTheme(currentTheme === "light" ? "dark" : "light")
      }
    >
      <svg
        className="sun-and-moon"
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <mask className="moon" id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx="24" cy="10" r="6" fill="black" />
        </mask>
        <circle
          className="sun"
          cx="12"
          cy="12"
          r="6"
          mask="url(#moon-mask)"
          fill="currentColor"
        />
        <g className="sun-beams" stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </ButtonStyle>
    // <SwitchUI
    //   value={currentTheme !== "light" ? "light" : "dark"}
    //   checked={currentTheme === "dark"}
    //   onChange={(): void =>
    //     changeCurrentTheme(currentTheme === "light" ? "dark" : "light")
    //   }
    // />
  );
};

export default ThemeToggle;
