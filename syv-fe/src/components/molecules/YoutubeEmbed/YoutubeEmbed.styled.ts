import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;

  iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
