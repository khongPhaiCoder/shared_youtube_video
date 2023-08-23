import { ThemeMode } from "@/utils/themes";
import styled from "styled-components";

export const LayoutWrapper = styled.div`
  height: 100%;
  flex-direction: column;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${({ theme }: { theme: ThemeMode }) => theme.color.background};
`;

export const PageWrap = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    overflow: auto;
`;