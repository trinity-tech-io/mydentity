import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputBaseComponentProps,
  InputProps,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import clsx from "clsx";
import { CopyButton } from "@components/button";

const InputStyled = styled(OutlinedInput)(({ theme }) => ({
  input: {
    color: theme.palette.text.primary,
  },
}));

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  color: "white",
}));

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
      borderColor: theme.palette.text.primary,
    },
  },
  // ".key-input.redacted": {
  //   fontFamily: "Redacted Script",
  // },
}));

const KeyTextfield: FC<{
  value: string;
  outerProps?: InputProps;
  inputProps?: InputBaseComponentProps;
}> = (props) => {
  const { value, outerProps = {}, inputProps = {} } = props;
  // const [showKey, setShowKey] = React.useState(false);
  // const handleClickShowKey: React.MouseEventHandler = () =>
  //   setShowKey((show) => !show);
  // const handleMouseDownButton: React.MouseEventHandler = (event) => {
  //   event.preventDefault();
  // };

  return (
    <FormControlStyled>
      <InputStyled
        {...outerProps}
        value={value}
        size="small"
        type="input"
        className={clsx("key-input")}
        inputProps={{
          ...inputProps,
        }}
        endAdornment={
          <InputAdornment position="end">
            <div className="flex gap-1">
              <CopyButton text={value} iconWidth={18} />
              {/* <IconButtonStyled
                size="small"
                aria-label="toggle key visibility"
                onClick={handleClickShowKey}
                onMouseDown={handleMouseDownButton}
              >
                {showKey ? <VisibilityOff sx={{fontSize: 18}} /> : <Visibility sx={{fontSize: 18}} />}
              </IconButtonStyled> */}
            </div>
          </InputAdornment>
        }
      />
    </FormControlStyled>
  );
};

export default KeyTextfield;
