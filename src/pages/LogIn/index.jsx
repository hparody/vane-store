import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import Background from "./Background";
import LogInForm from "@/components/LogInForm";

const LogoImg = styled.img`
  aspect-ratio: inherit;
  height: 150px;
  object-fit: contain;
  object-position: center;
`;

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
