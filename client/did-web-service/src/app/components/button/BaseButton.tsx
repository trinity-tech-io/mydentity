import { styled } from "@mui/material/styles";
import { ButtonBase } from "@mui/material";

/**
 * Button styled component used for chip icon button in identity card
 */
const ButtonBaseStyled = styled(ButtonBase)(({ theme }) => ({
  borderRadius: "6.5px",
  overflow: "hidden",
  "&:after": {
    background: "#fff",
    content: "''",
    height: 155,
    left: -75,
    opacity: 0.2,
    position: "absolute",
    top: -50,
    width: 50,
    WebkitTransition: "all 550ms cubic-bezier(0.19, 1, 0.22, 1)",
    transition: "all 550ms cubic-bezier(0.19, 1, 0.22, 1)",
    WebkitTransform: "rotate(35deg)",
    MsTransform: "rotate(35deg)",
    transform: "rotate(35deg)",
    zIndex: -10,
  },
  "&:hover": {
    boxShadow: "0px 0px 7px #999999",
    "&:after": {
      left: "120%",
      WebkitTransition: "all 550ms cubic-bezier(0.19, 1, 0.22, 1)",
      transition: "all 550ms cubic-bezier(0.19, 1, 0.22, 1)",
    },
  },
}));
export default ButtonBaseStyled;
