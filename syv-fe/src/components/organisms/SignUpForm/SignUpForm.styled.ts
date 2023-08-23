import { ThemeMode } from "@/utils/themes";
import styled from "styled-components";

export const Title = styled.div`
  font-weight: ${({ theme }: { theme: ThemeMode }) =>
    theme.typography.weight.bold};
  font-size: ${({ theme }: { theme: ThemeMode }) => theme.typography.size.m2}px;
  text-transform: uppercase;
  color: ${({ theme }: { theme: ThemeMode }) => theme.color.text};
`;
