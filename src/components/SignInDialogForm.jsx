import PropTypes from "prop-types";
import {
  Box,
  IconButton,
  Typography,
  Dialog,
  Divider,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";

const SignInDialogForm = ({ open, onClose }) => {
  return (
    <Dialog
      id="id_sign_in_dialog"
      open={open}
      onClose={onClose}
      aria-labelledby="id_sign_in_dialog_title"
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "1000px",
        },
      }}
    >
      <DialogTitle
        id="id_sign_in_dialog_title"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          component="div"
          sx={{ cursor: "default", color: "#fff" }}
        >
          Iniciar Sesión
        </Typography>
        <IconButton
          aria-label="close"
          size="medium"
          onClick={onClose}
          sx={{ position: "absolute", top: 0, right: 0, margin: "20px" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: "32px" }}>
        <Box
          id="id_signin_container"
          component="div"
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <Box component="div" flex={1}>
            <LogInForm />
          </Box>
          <Divider
            variant="fullWidth"
            orientation="vertical"
            flexItem
            sx={{ margin: "0px 32px" }}
          />
          <Box component="div" flex={1}>
            <SignUpForm />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

SignInDialogForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default SignInDialogForm;
