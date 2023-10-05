import React, { FC } from "react";
import {
  IconButton,
  Input,
  InputAdornment,
  InputBaseComponentProps,
  InputProps,
  styled,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import clsx from "clsx";

const InputStyled = styled(Input)(({ theme }) => ({
  input: {
    color: "white",
    marginTop: 20,
  },
}));

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  color: "white",
}));

const PasswordInput: FC<{
  outerProps?: InputProps;
  inputProps?: InputBaseComponentProps;
}> = (props) => {
  const { outerProps = {}, inputProps = {} } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword: React.MouseEventHandler = () =>
    setShowPassword((show) => !show);
  const handleMouseDownPassword: React.MouseEventHandler = (event) => {
    event.preventDefault();
  };

  return (
    <InputStyled
      {...outerProps}
      type={showPassword ? "input" : "password"}
      className={clsx("password-input", !showPassword && "redacted")}
      inputProps={{
        maxLength: 100,
        ...inputProps,
      }}
      startAdornment={<InputAdornment position="start" className="absolute" />}
      endAdornment={
        <InputAdornment position="end">
          <IconButtonStyled
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButtonStyled>
        </InputAdornment>
      }
    />
  );
};

export default PasswordInput