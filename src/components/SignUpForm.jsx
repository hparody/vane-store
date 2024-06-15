import PropTypes from "prop-types";
import { useState, useCallback, useEffect } from "react";
import {
  styled,
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  Alert as Message,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import Logo from "@/assets/vane-store.png";
import useAlert from "@/hooks/useAlert";
import useAuth from "@/hooks/useAuth";
import isValidEmail from "@/utils/isValidEmail";
import PasswordInput from "./ui/PasswordInput";

const defaultEmptyErrorObject = { error: false, message: "" };

const DEFAULT_VALUES = {
  name: "",
  email: "",
  address: "",
  password: "",
  confirmPassword: "",
};

const DEFAULT_ERRORS = {
  name: defaultEmptyErrorObject,
  email: defaultEmptyErrorObject,
  address: defaultEmptyErrorObject,
  password: defaultEmptyErrorObject,
  confirmPassword: defaultEmptyErrorObject,
};

const errorMessages = {
  name: "Ingresa un nombre",
  address: "Ingresa una dirección",
  email: "Ingresa una dirección de correo válida",
  password: "Ingresa una contraseña válida",
  confirmPassword: "Las contraseñas no coinciden",
};

const LogoImg = styled("img")`
  aspect-ratio: inherit;
  height: 32px;
  object-fit: contain;
  object-position: center;
`;

const List = styled("ul")`
  margin: 0px;
  margin-top: 8px;
`;

const passwordValidator = new RegExp(
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[W_])[a-zA-Z0-9W_]{8,20}$/
);

const SignUpForm = ({ onSignUpSuccessful }) => {
  const { triggerAlert } = useAlert();
  const { loading: signingUp } = useAuth();
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [errors, setErrors] = useState(DEFAULT_ERRORS);

  const isFieldValid = useCallback(
    (fieldName, fieldValue) => {
      let isValid = true;
      if (
        fieldValue === undefined ||
        fieldValue === null ||
        fieldValue === ""
      ) {
        isValid = false;
      }
      if (fieldName === "email") {
        isValid = isValidEmail(fieldValue);
      }

      if (fieldName === "password") {
        isValid = passwordValidator.test(fieldValue);
      }

      if (fieldName === "confirmPassword") {
        isValid = fieldValue === values.password;
      }

      return isValid;
    },
    [values.password]
  );

  const handleChange = useCallback(
    (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setValues((currentValues) => ({ ...currentValues, [name]: value }));
      const isValid = isFieldValid(name, value);
      setErrors({
        ...errors,
        [name]: {
          error: !isValid,
          message: !isValid ? errorMessages[name] : "",
        },
      });
    },
    [errors, isFieldValid]
  );

  const areAllFieldsValid = useCallback(() => {
    const fieldsHaveErrors = Object.values(errors).some((field) => field.error);
    let fieldsFilled = true;
    for (const fieldName in values) {
      const isValid = isFieldValid(fieldName, values[fieldName]);
      if (!isValid) {
        fieldsFilled = false;
        setErrors((errs) => ({
          ...errs,
          [fieldName]: {
            error: true,
            message: errorMessages[fieldName],
          },
        }));
      }
    }
    return !fieldsHaveErrors && fieldsFilled;
  }, [errors, isFieldValid, values]);

  const handleSubmit = () => {
    if (areAllFieldsValid()) {
      /** INSERT LOGIC FOR LOG IN */
    } else {
      triggerAlert({
        type: "error",
        message:
          "Por favor, completa todos los campos para poder finalizar tu registro.",
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
        gap: "16px",
      }}
      onSubmit={handleSubmit}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
        <LogoImg src={Logo} alt="Vane Store Logo" loading="lazy" />
        <Typography
          variant="h4"
          sx={{
            marginLeft: "10px",
            fontWeight: "bold",
            letterSpacing: "-0.05rem",
          }}
        >
          Crea un nuevo usuario
        </Typography>
      </Box>
      <TextField
        id="id_singup_name"
        label="Nombre"
        placeholder="Nombre"
        name="name"
        variant="outlined"
        type="text"
        value={values.name}
        onChange={handleChange}
        disabled={signingUp}
        required
        error={errors.name.error}
        helperText={errors.name.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon aria-label="person icon" fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="id_singup_email"
        label="Correo electrónico"
        placeholder="Correo electrónico"
        name="email"
        variant="outlined"
        type="email"
        value={values.email}
        onChange={handleChange}
        disabled={signingUp}
        required
        error={errors.email.error}
        helperText={errors.email.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon aria-label="mail icon" fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="id_singup_address"
        label="Dirección"
        placeholder="Dirección"
        name="address"
        variant="outlined"
        type="text"
        value={values.address}
        onChange={handleChange}
        disabled={signingUp}
        required
        error={errors.address.error}
        helperText={errors.address.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <HomeIcon aria-label="address icon" fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <PasswordInput
        id="id_singup_password"
        label="Contraseña"
        placeholder="Contraseña"
        name="password"
        variant="outlined"
        value={values.password}
        disabled={signingUp}
        required
        error={errors.password.error}
        helperText={errors.password.message}
        onChange={handleChange}
        inputProps={{
          maxLength: 20,
          minLength: 8,
          pattern: passwordValidator,
        }}
      />
      <PasswordInput
        id="id_singup_confirm_password"
        label="Confirmar Contraseña"
        placeholder="Confirmar Contraseña"
        name="confirmPassword"
        variant="outlined"
        value={values.confirmPassword}
        disabled={signingUp}
        required
        error={errors.confirmPassword.error}
        helperText={errors.confirmPassword.message}
        onChange={handleChange}
        inputProps={{
          maxLength: 20,
          minLength: 8,
          pattern: passwordValidator,
        }}
      />
      <Message variant="outlined" severity="info">
        La contraseña debe cumplir con las siguientes condiciones:
        <List>
          <li>Entre 8 y 20 caracteres.</li>
          <li>1 letra mayúscula.</li>
          <li>1 letra en mayúscula.</li>
          <li>1 número.</li>
          <li>1 caracter especial.</li>
        </List>
      </Message>
      <Button variant="contained" startIcon={<HowToRegIcon />}>
        Registrarme
      </Button>
    </Box>
  );
};

SignUpForm.propTypes = {
  onSignUpSuccessful: PropTypes.func,
};

export default SignUpForm;
