import { OutlinedInput } from "@mui/material";
import { styled } from "@mui/material/styles";

const OutlinedInputStyled = styled(OutlinedInput)(({ theme, className }) => ({
  borderRadius: className.includes("rounded") ? 8 : 8,
  input: {
    color: "white",
  },
  fieldset: {
    opacity: 0.6,
    borderColor: "white",
  },
  "&.Mui-focused, &:hover:not(.Mui-disabled, .Mui-error)": {
    fieldset: {
      opacity: 0.8,
      borderColor: "white !important",
    },
  },
  ".Mui-disabled": {
    opacity: 0.5,
    input: {
      WebkitTextFillColor: "white",
      textFillColor: "white",
    },
    fieldset: {
      borderColor: "white",
    },
  },
}));
export default OutlinedInputStyled;
