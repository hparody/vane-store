import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Background from "../../components/ui/Background";
import LogInForm from "@/components/LogInForm";

const LogIn = () => {
  const navigate = useNavigate();

  return (
    <Background>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <LogInForm onLogInSuccessful={() => navigate("/admin/products")} />
      </Box>
    </Background>
  );
};

export default LogIn;
