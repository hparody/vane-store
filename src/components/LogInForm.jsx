import { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField, Link } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import styled from "@emotion/styled";

import Logo from "@/assets/vane-store.png";
import PaperContainer from "./ui/PaperContainer";
import isValidEmail from "@/utils/isValidEmail";
import useAlert from "@/hooks/useAlert";
import PasswordInput from "./ui/PasswordInput";
import OTPInput from "./ui/OTPInput.jsx";

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

  const [values, setValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({
    username: { error: false, message: "" },
    password: { error: false, message: "" },
  });
  const [logginIn, setLogginIn] = useState(false);
  const [showOtpValidation, setShowOtpValidation] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  /** Validate OTP Value */
  useEffect(() => {
    if (otpValue.length === OTP_CODE_LENGTH) {
      console.log("validating otp code", otpValue);
      /** INSERT LOGIC FOR OTP CODE VALIDATION */
      if (otpValue === "111111") {
        setShowOtpValidation(false);
        setLogginIn(false);
        triggerAlert({
          message: "Inicio de sesión exitoso.",
          type: "success",
        });
        onLogInSuccessful();
      } else {
        triggerAlert({
          message: "El código de verificación es incorrecto",
          type: "error",
        });
      }
    }
  }, [otpValue, onLogInSuccessful, triggerAlert]);

  const areFieldsValid = useCallback(() => {
    return (
      Object.values(values).every((fieldValue) => fieldValue !== "") &&
      !Object.values(errors).some((field) => field.error)
    );
  }, [errors, values]);

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
      setLogginIn(true);
      /** INSERT LOGIC FOR LOG IN */
      setShowOtpValidation(true);
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
          <OTPInput
            separator={<span>-</span>}
            value={otpValue}
            onChange={setOtpValue}
            length={OTP_CODE_LENGTH}
            label="Digita el código enviado a tu correo para confirmar tu inicio de sesión."
          />
        )}
      </Box>
    </PaperContainer>
  );
};

LogInForm.propTypes = {
  onLogInSuccessful: PropTypes.func,
  allowSignUp: PropTypes.bool,
};

export default LogInForm;
