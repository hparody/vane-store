import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { AppBar, Avatar, Toolbar, Divider, Box, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import Logo from "@/assets/vane-store.png";
import useAuth from "@/hooks/useAuth";

import NavLink from "./NavLink";

const LogoImg = styled.img`
  aspect-ratio: inherit;
  object-fit: contain;
  width: 40px;
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
  padding: 0px 20px;
`;

const NavBar = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoggedIn } = useAuth();

  const userInitial = useMemo(() => {
    if (isLoggedIn) {
      return user.name.charAt(0).toUpperCase();
    }
  }, [user, isLoggedIn]);

  return (
    <AppBar
      component="nav"
      position="static"
      sx={{
        background: "rgba(255,255,255,0.65)",
        maxHeight: "64px",
        width: "100%",
        boxSizing: "content-box",
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.05),0px 4px 5px 0px rgba(0,0,0,0.05),0px 1px 10px 0px rgba(0,0,0,0.05)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <LogoImg
          src={Logo}
          alt="Vane Store logo"
          onClick={() => navigate("/")}
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        {isAdmin && <NavLink to="/admin/products">Productos</NavLink>}
        <Box sx={{ marginLeft: "auto", display: "flex", flexDirection: "row" }}>
          {!isAdmin && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<PersonIcon />}
              sx={{ padding: "5px 20px" }}
            >
              Iniciar Sesión
            </Button>
          )}
          {isLoggedIn && <Avatar>{userInitial}</Avatar>}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
