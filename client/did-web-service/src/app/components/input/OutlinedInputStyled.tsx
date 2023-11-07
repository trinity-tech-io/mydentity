import { OutlinedInput } from "@mui/material";
import { styled } from "@mui/material/styles";

const OutlinedInputStyled = styled(OutlinedInput)(({ theme, className }) => ({
  borderRadius: className?.includes("rounded") ? 8 : 4,
  input: {
    color: theme.palette.text.primary,
  },
  fieldset: {
    opacity: 0.6,
    borderColor: theme.palette.text.primary,
  },
  "&.Mui-focused, &:hover:not(.Mui-disabled, .Mui-error)": {
    fieldset: {
      opacity: 0.8,
      borderColor: `${theme.palette.text.primary} !important`,
    },
  },
  ".Mui-disabled": {
    opacity: 0.5,
    input: {
      WebkitTextFillColor: theme.palette.text.primary,
      textFillColor: theme.palette.text.primary,
    },
    fieldset: {
      borderColor: theme.palette.text.primary,
    },
  },
}));
export default OutlinedInputStyled;
