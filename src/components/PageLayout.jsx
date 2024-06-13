import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

import NavBar from "./ui/NavBar";
import ContentWrapper from "./ContentWrapper";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
`;

const PageLayout = () => (
  <Container>
    <NavBar />
    <ContentWrapper>
      <Outlet />
    </ContentWrapper>
  </Container>
);

export default PageLayout;
