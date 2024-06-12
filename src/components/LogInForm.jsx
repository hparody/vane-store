import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField, IconButton, Link } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import styled from "@emotion/styled";

import Logo from "@/assets/vane-store.png";
import PaperContainer from "./ui/PaperContainer";
import isValidEmail from "@/utils/isValidEmail";
import useAlert from "@/hooks/useAlert";

const LogoImg = styled.img`
  aspect-ratio: inherit;
  height: 150px;
  object-fit: contain;
  object-position: center;
`;

const errorMessages = {
  username: "Por favor, ingresa un email válido.",
  password: "Ingresa tu contraseña",
};

const LogInForm = ({ onLogInSuccessful = () => {} }) => {
  const { triggerAlert } = useAlert();
  const [values, setValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({
    username: { error: false, message: "" },
    password: { error: false, message: "" },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const areFieldsValid = useCallback(() => {
    return !Object.values(errors).some((field) => field.error);
  }, [errors]);

  const validateField = useCallback(
    (fieldName, fieldValue) => {
      let hasError = false;
      if (fieldValue === undefined || fieldValue === "") {
        hasError = true;
      }
      if (fieldName === "username") {
        hasError = !isValidEmail(fieldValue);
      }
      setErrors({
        ...errors,
        [fieldName]: {
          error: hasError,
          message: hasError ? errorMessages[fieldName] : "",
        },
      });
    },
    [errors]
  );

  const handleChange = useCallback(
    (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
      validateField(event.target.name, event.target.value);
    },
    [values, validateField]
  );

  const handleSubmit = () => {
    if (areFieldsValid()) {
      onLogInSuccessful();
    } else {
      triggerAlert({
        type: "error",
        message:
          "Por favor, completa todos los campos para poder iniciar sesión.",
      });
    }
  };

  return (
    <PaperContainer variant="elevation" elevation={3} square={false}>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          gap: "16px",
        }}
        onSubmit={handleSubmit}
      >
        <LogoImg src={Logo} alt="Vane Store Logo" />
        <TextField
          id="id_login_username"
          label="Usuario"
          placeholder="Usuario"
          name="username"
          variant="outlined"
          type="email"
          value={values.username}
          onChange={handleChange}
          required
          error={errors.username.error}
          helperText={errors.username.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon aria-label="user icon" fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="id_login_password"
          label="Contraseña"
          placeholder="Contraseña"
          name="password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          value={values.password}
          required
          error={errors.password.error}
          helperText={errors.password.message}
          onChange={handleChange}
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
          }}
        />
        <Link href="#" fontSize="small" sx={{ margin: "-5px 0px" }}>
          Olvidé mi contraseña
        </Link>
        <Button
          type="button"
          color="primary"
          variant="contained"
          onClick={handleSubmit}
        >
          Iniciar Sesión
        </Button>
        <Button type="button" variant="outlined" sx={{ marginTop: "-5px" }}>
          Registrarme
        </Button>
      </Box>
    </PaperContainer>
  );
};

LogInForm.propTypes = {
  onLogInSuccessful: PropTypes.func,
};

export default LogInForm;
