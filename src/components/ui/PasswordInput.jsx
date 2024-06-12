import PropTypes from "prop-types";
import { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";

const PasswordInput = ({ InputProps = {}, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <TextField
      {...props}
      type={showPassword ? "text" : "password"}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon aria-label="user icon" fontSize="small" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          </InputAdornment>
        ),
        ...InputProps,
      }}
    />
  );
};

PasswordInput.propTypes = {
  InputProps: PropTypes.object,
};

export default PasswordInput;
