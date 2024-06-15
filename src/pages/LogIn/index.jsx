import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Background from "../../components/ui/Background";
import LogInForm from "@/components/LogInForm";
import PaperContainer from "@/components/ui/PaperContainer";

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
        <PaperContainer variant="elevation" elevation={3} square={false}>
          <LogInForm onLogInSuccessful={() => navigate("/admin/products")} />
        </PaperContainer>
      </Box>
    </Background>
  );
};

export default LogIn;
