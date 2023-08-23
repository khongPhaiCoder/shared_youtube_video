import React, { useCallback, useState } from "react";
import { TextFieldPasswordProps } from "./TextFieldPassword.types";
import { TextField } from "../TextField";
import { IconButton, TextFieldProps as MuiTextFieldProps } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const TextFieldPassword: React.FC<
  MuiTextFieldProps & TextFieldPasswordProps
> = (props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((show) => !show);
  }, []);

  const handleMouseDownPassword = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    []
  );

  return (
    <TextField
      {...props}
      type={showPassword ? "text" : "password"}
      adornmentEndLabel={
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      }
    />
  );
};

export default TextFieldPassword;
