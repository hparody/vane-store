import styled from "@emotion/styled";
import { AppBar, Avatar, Toolbar, Divider } from "@mui/material";

import Logo from "@/assets/vane-store.png";
import NavLink from "./NavLink";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useMemo } from "react";

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
      return user.username.charAt(0).toUpperCase();
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
          justifyContent: "space-between",
        }}
      >
        <LogoImg
          src={Logo}
          alt="Vane Store logo"
          onClick={() => navigate("/")}
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        {isAdmin && (
          <NavLink to="/admin/products" sx={{ marginRight: "auto" }}>
            Productos
          </NavLink>
        )}
        {isLoggedIn && <Avatar>{userInitial}</Avatar>}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
