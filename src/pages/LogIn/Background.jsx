import styled from "@emotion/styled";

import BackgroundImage from "@/assets/background.jpg";

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-image: url(${BackgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(10px) brightness(0.95);
    min-height: 100vh;
    min-width: 100vw;
    overflow: hidden;
    align-items: center;
    justify-content: center;
  }

  * {
    z-index: 100;
  }
`;

export default Background;
