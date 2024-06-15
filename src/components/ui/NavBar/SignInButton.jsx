import { Fragment, useState } from "react";

import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import SignInDialogForm from "@/components/SignInDialogForm";

const SignInButton = () => {
  const [openSignInDialog, setOpenSignInDialog] = useState(false);

  const handleSignIn = () => {
    setOpenSignInDialog(true);
  };

  return (
    <Fragment>
      <Button
        variant="outlined"
        size="small"
        startIcon={<PersonIcon />}
        sx={{ padding: "5px 20px", marginRight: "10px" }}
        onClick={handleSignIn}
      >
        Iniciar Sesión
      </Button>
      <SignInDialogForm
        open={openSignInDialog}
        onClose={() => setOpenSignInDialog(false)}
      />
    </Fragment>
  );
};

export default SignInButton;
