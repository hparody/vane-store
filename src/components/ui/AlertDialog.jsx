import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const AlertDialog = ({
  id,
  title,
  content,
  open,
  onClose,
  onConfirm,
  cancelText = "Cancelar",
  confirmText = "Continuar",
}) => {
  return (
    <Dialog
      id={id}
      open={open}
      onClose={onClose}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
    >
      <DialogTitle id={`${id}-title`}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id={`${id}-description`}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" startIcon={<CloseIcon />}>
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          autoFocus
          variant="contained"
          color="error"
          startIcon={<CheckBoxIcon />}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AlertDialog.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
};

export default AlertDialog;
