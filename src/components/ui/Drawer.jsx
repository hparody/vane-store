import PropTypes from "prop-types";
import {
  Box,
  IconButton,
  SwipeableDrawer,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Drawer = ({
  openDrawer,
  title = "",
  anchor,
  onOpen,
  onClose,
  children,
}) => {
  return (
    <SwipeableDrawer
      anchor={anchor}
      open={openDrawer}
      onOpen={onOpen}
      onClose={onClose}
    >
      <Box
        component="div"
        sx={{
          width: "25vw",
          minWidth: "360px",
          padding: "24px 32px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            {title}
          </Typography>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mt: "-4px", mb: "8px" }} />
        {children}
      </Box>
    </SwipeableDrawer>
  );
};

Drawer.propTypes = {
  openDrawer: PropTypes.bool.isRequired,
  title: PropTypes.string,
  anchor: PropTypes.string,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Drawer;
