import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import {
  IconButton,
  Input,
  InputAdornment,
  InputBaseComponentProps,
  InputProps,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import clsx from "clsx";

const InputStyled = styled(Input)(({ theme }) => ({
  input: {
    marginTop: { xs: 16, sm: 20 },
    [theme.breakpoints.down("sm")]: {
      marginTop: 16,
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: 20,
    },
  },
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
          <IconButton
            size="small"
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? (
              <VisibilityOff sx={{ fontSize: { xs: 20, sm: 24 } }} />
            ) : (
              <Visibility sx={{ fontSize: { xs: 20, sm: 24 } }} />
            )}
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default PasswordInput;
