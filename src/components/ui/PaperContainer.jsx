import styled from "@emotion/styled";
import { Paper } from "@mui/material";

const PaperContainer = styled(Paper)`
  max-height: 70%;
  padding: 32px 24px;
  min-width: 380px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  box-sizing: content-box;
  overflow-y: auto;
`;

export default PaperContainer;
