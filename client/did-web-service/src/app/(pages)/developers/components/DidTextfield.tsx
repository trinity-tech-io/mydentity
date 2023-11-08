import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import {
  FormControl,
  InputAdornment,
  InputBaseComponentProps,
  InputProps,
  OutlinedInput,
} from "@mui/material";
import { CopyButton } from "@components/button";

const FormControlStyled = styled(FormControl)(({ theme }) => ({
  ".MuiInputBase-root": {
    paddingRight: 8,
  },
  ".MuiInputBase-root:hover:not(.Mui-disabled, .Mui-error)": {
    fieldset: {
      opacity: 0.4,
    },
  },
  ".MuiInputBase-root.Mui-focused": {
    fieldset: {
      opacity: 0.6,
      borderColor: "white",
    },
  },
}));

const DidTextfield: FC<{
  value: string;
  outerProps?: InputProps;
  inputProps?: InputBaseComponentProps;
  disableCopy?: boolean;
}> = (props) => {
  const {
    value,
    outerProps = {},
    inputProps = {},
    disableCopy = false,
  } = props;

  return (
    <FormControlStyled>
      <OutlinedInput
        {...outerProps}
        value={value}
        size="small"
        type="input"
        inputProps={{
          ...inputProps,
        }}
        endAdornment={
          !disableCopy && (
            <InputAdornment position="end">
              <CopyButton text={value} iconWidth={18} />
            </InputAdornment>
          )
        }
      />
    </FormControlStyled>
  );
};

export default DidTextfield;
