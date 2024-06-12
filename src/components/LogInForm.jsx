import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Paper, TextField, IconButton, Link } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import styled from "@emotion/styled";

import Logo from "@/assets/vane-store.png";
import PaperContainer from "./ui/PaperContainer";

const LogoImg = styled.img`
  aspect-ratio: inherit;
  height: 150px;
  object-fit: contain;
  object-position: center;
`;

const LogInForm = ({ onLogInSuccessful = () => {} }) => {
  const [values, setValues] = useState({ user: "", password: "" });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    onLogInSuccessful();
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
          value={values.user}
          required
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
        <Button type="submit" color="primary" variant="contained">
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
