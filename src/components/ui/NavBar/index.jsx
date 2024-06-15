import { useLocation, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Divider, Box, styled } from "@mui/material";

import Logo from "@/assets/vane-store.png";
import useAuth from "@/hooks/useAuth";

import NavLink from "./NavLink";
import ShoppingCart from "./ShoppingCart";
import AvatarMenu from "./AvatarMenu";
import SignInButton from "./SignInButton";

const LogoImg = styled("img")`
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
  const location = useLocation();
  const { isAdmin, isLoggedIn } = useAuth();

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
          loading="lazy"
          onClick={() => navigate("/")}
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        {isAdmin && <NavLink to="/admin/products">Productos</NavLink>}
        <Box sx={{ marginLeft: "auto", display: "flex", flexDirection: "row" }}>
          {!isAdmin && <SignInButton />}
          {!location.pathname.includes("admin") && (
            <ShoppingCart sx={{ marginRight: "10px" }} />
          )}
          {isLoggedIn && <AvatarMenu />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
