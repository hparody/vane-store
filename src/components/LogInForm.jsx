import { useCallback, useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField, Link, Divider } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import styled from "@emotion/styled";

import Logo from "@/assets/vane-store.png";
import isValidEmail from "@/utils/isValidEmail";
import useAlert from "@/hooks/useAlert";
import PasswordInput from "./ui/PasswordInput";
import OTPInput from "./ui/OTPInput.jsx";
import useAuth from "@/hooks/useAuth";

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

const OTP_CODE_LENGTH = 6;

const LogInForm = ({ onLogInSuccessful = () => {}, allowSignUp = false }) => {
  const { triggerAlert } = useAlert();
  const { login } = useAuth();

  const [values, setValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({
    username: { error: false, message: "" },
    password: { error: false, message: "" },
  });
  const [logginIn, setLogginIn] = useState(false);
  const [showOtpValidation, setShowOtpValidation] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  const logInUser = useCallback(() => {
    setShowOtpValidation(false);
    setLogginIn(false);
    triggerAlert({
      message: "Inicio de sesión exitoso.",
      type: "success",
    });
    if (onLogInSuccessful) onLogInSuccessful();
  }, [onLogInSuccessful, triggerAlert]);

  /** Validate OTP Value */
  useEffect(() => {
    if (otpValue.length === OTP_CODE_LENGTH) {
      /** INSERT LOGIC FOR OTP CODE VALIDATION */
      if (otpValue === "111111") {
        logInUser();
      } else {
        triggerAlert({
          message: "El código de verificación es incorrecto",
          type: "error",
        });
      }
    }
  }, [otpValue, onLogInSuccessful, triggerAlert, login, logInUser]);

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

  const areFieldsValid = useCallback(() => {
    validateField("username", values.username);
    validateField("password", values.password);
    return (
      Object.values(values).every((fieldValue) => fieldValue !== "") &&
      !Object.values(errors).some((field) => field.error)
    );
  }, [errors, validateField, values]);

  const handleChange = useCallback(
    (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
      validateField(event.target.name, event.target.value);
    },
    [values, validateField]
  );

  const handleSubmit = async () => {
    if (areFieldsValid()) {
      setLogginIn(true);
      /** INSERT LOGIC FOR LOG IN */
      const { error } = await login({
        username: values.username,
        password: values.password,
      });
      if (error) {
        setLogginIn(false);
        setShowOtpValidation(false);
        triggerAlert({
          message: "Error: usuario o contraseña inválida.",
          type: "error",
        });
      } else {
        setShowOtpValidation(true);
      }
    } else {
      triggerAlert({
        type: "error",
        message:
          "Por favor, completa todos los campos para poder iniciar sesión.",
      });
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        gap: "20px",
      }}
      onSubmit={handleSubmit}
    >
      <LogoImg src={Logo} alt="Vane Store Logo" loading="lazy" />
      <TextField
        id="id_login_username"
        label="Usuario"
        placeholder="Usuario"
        name="username"
        variant="outlined"
        type="email"
        value={values.username}
        onChange={handleChange}
        disabled={logginIn}
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
      <PasswordInput
        id="id_login_password"
        label="Contraseña"
        placeholder="Contraseña"
        name="password"
        variant="outlined"
        value={values.password}
        disabled={logginIn}
        required
        error={errors.password.error}
        helperText={errors.password.message}
        onChange={handleChange}
      />
      <Link href="#" fontSize="small" sx={{ margin: "-5px 0px" }}>
        Olvidé mi contraseña
      </Link>
      <Button
        type="button"
        color="primary"
        variant="contained"
        onClick={handleSubmit}
        disabled={logginIn}
      >
        Iniciar Sesión
      </Button>
      {allowSignUp && (
        <Button
          type="button"
          variant="outlined"
          disabled={logginIn}
          sx={{ marginTop: "-5px" }}
        >
          Registrarme
        </Button>
      )}
      {showOtpValidation && (
        <Fragment>
          <Divider sx={{ margin: "10px 0px" }} />
          <OTPInput
            name="otp-input"
            separator={<span>-</span>}
            value={otpValue}
            onChange={setOtpValue}
            length={OTP_CODE_LENGTH}
            label="Digita el código enviado a tu correo para confirmar tu inicio de sesión."
          />
        </Fragment>
      )}
    </Box>
  );
};

LogInForm.propTypes = {
  onLogInSuccessful: PropTypes.func,
  allowSignUp: PropTypes.bool,
};

export default LogInForm;
