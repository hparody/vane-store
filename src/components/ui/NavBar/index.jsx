import { useState, useMemo, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Toolbar,
  Divider,
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  styled,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";

import Logo from "@/assets/vane-store.png";
import useAuth from "@/hooks/useAuth";

import NavLink from "./NavLink";
import ShoppingCart from "./ShoppingCart";

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
  const { user, isAdmin, isLoggedIn, logout } = useAuth();
  const [anchorMenuElement, setAnchorMenuElement] = useState();
  const openAvatarMenu = useMemo(
    () => Boolean(anchorMenuElement),
    [anchorMenuElement]
  );
  const onClickAvatarMenu = (event) => {
    setAnchorMenuElement(event.currentTarget);
  };

  const onCloseAvatarMenu = () => {
    setAnchorMenuElement(null);
  };

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
          loading="lazy"
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
              sx={{ padding: "5px 20px", marginRight: "10px" }}
            >
              Iniciar Sesión
            </Button>
          )}
          {!location.pathname.includes("admin") && (
            <ShoppingCart sx={{ marginRight: "10px" }} />
          )}
          {isLoggedIn && (
            <Fragment>
              <Avatar
                id="id_avatar"
                onClick={onClickAvatarMenu}
                sx={{ cursor: "pointer" }}
              >
                {userInitial}
              </Avatar>
              <Menu
                id="id_avatar_menu"
                anchorEl={anchorMenuElement}
                open={openAvatarMenu}
                onClose={onCloseAvatarMenu}
                MenuListProps={{
                  "aria-labelledby": "id_avatar",
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <Avatar id="id_profile" sx={{ width: 24, height: 24 }}>
                      <Typography variant="body2">{userInitial}</Typography>
                    </Avatar>
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => logout()}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Cerrar Sesión
                </MenuItem>
              </Menu>
            </Fragment>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
