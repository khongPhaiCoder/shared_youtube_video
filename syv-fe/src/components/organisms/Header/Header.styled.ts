import { ThemeMode } from "@/utils/themes";
import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  background-color: ${({ theme }: { theme: ThemeMode }) =>
    theme.color.textButtonHover};
  padding: 12px 0;
`;

export const Logo = styled.div`
  font-weight: ${({ theme }: { theme: ThemeMode }) =>
    theme.typography.weight.bold};
  font-size: ${({ theme }: { theme: ThemeMode }) => theme.typography.size.m2}px;
  text-transform: uppercase;
  color: ${({ theme }: { theme: ThemeMode }) => theme.color.text};
  height: 100%;
  display: flex;
  align-items: center;
`;

export const RouteContainer = styled.div`
    display: flex;
    margin-left: auto;
    gap: ${({ theme }: { theme: ThemeMode }) => theme.spacing.padding.medium};
    @media screen and (max-width: 860px) {
        position: absolute;
        top: 63px;
        right: 15px;
        flex-direction: column;
        background-color: ${({ theme }: { theme: ThemeMode }) =>
            theme.color.popupMenuBackground};
        min-width: 180px;
        padding: 24px 24px;
        z-index: 10;
    }
`;

export const MenuButton = styled.div`
  @media screen and (min-width: 861px) {
    display: none;
  }
`;

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    @media screen and (max-width: 860px) {
        padding: 0 20px;
    }
`;
