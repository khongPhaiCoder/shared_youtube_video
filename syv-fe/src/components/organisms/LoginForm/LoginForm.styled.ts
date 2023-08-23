import { ThemeMode } from "@/utils/themes";
import styled from "styled-components";

export const Title = styled.div`
  font-weight: ${({ theme }: { theme: ThemeMode }) =>
    theme.typography.weight.bold};
  font-size: ${({ theme }: { theme: ThemeMode }) => theme.typography.size.m2}px;
  text-transform: uppercase;
  color: ${({ theme }: { theme: ThemeMode }) => theme.color.text};
`;

export const AuthFormContainer = styled.div`
    width: 100%;
    max-width: 560px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 8px;
    margin: 0 auto;
    padding: 0 24px;
`;
