import { styled } from "@mui/material/styles";
import { FormControl } from "@mui/material";

/**
 * Component to be used as password input form control in register and bind-password page
 */
const AccountForm = styled(FormControl)(({ theme }) => ({
  ".MuiInput-root": {
    marginTop: 0,
    "&:before, &:after": {
      opacity: 0.18,
      borderColor: "white",
    },
  },
  ".MuiInputBase-root.MuiInput-root:hover:not(.Mui-disabled, .Mui-error)": {
    "&:before, &:after": {
      opacity: 0.18,
      borderColor: "white",
    },
  },
  ".MuiInput-root.Mui-focused": {
    "&:before, &:after": {
      opacity: 0.3,
    },
  },
  ".MuiInputLabel-root, .MuiInputLabel-root.Mui-focused:not(.Mui-error)": {
    color: "white",
    fontSize: "10px",
    transform: "unset",
    WebkitTransform: "unset",
  },
  "#holder-name": {
    fontWeight: 600,
    fontSize: "15pt",
    textAlign: "center",
    caretColor: "white",
    color: "rgb(255 255 255 / 65%)",
  },
  ".password-input.redacted": {
    fontFamily: "Redacted Script",
  },
  ".MuiFormHelperText-root": {
    marginLeft: 0,
    display: "none",
  },
  ".MuiFormHelperText-root.Mui-error": {
    display: "block",
  },
}));
export default AccountForm;
