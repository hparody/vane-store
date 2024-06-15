import { useState, useMemo, Fragment } from "react";

import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";

import useAuth from "@/hooks/useAuth";
import useAlert from "@/hooks/useAlert";

const AvatarMenu = () => {
  const { triggerAlert } = useAlert();
  const [anchorMenuElement, setAnchorMenuElement] = useState();
  const { user, isLoggedIn, logout } = useAuth();

  const userInitial = useMemo(() => {
    if (isLoggedIn) {
      return user.name.charAt(0).toUpperCase();
    }
  }, [user, isLoggedIn]);

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

  const handleLogout = () => {
    logout();
    triggerAlert({ type: "success", message: "Cerraste sesión exitosamente." });
  };

  return (
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
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default AvatarMenu;
