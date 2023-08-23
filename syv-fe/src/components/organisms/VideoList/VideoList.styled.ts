import { ThemeMode } from "@/utils/themes";
import styled from "styled-components";

export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  background-color: ${({ theme }: { theme: ThemeMode }) =>
    theme.color.textButtonHover};
  color: ${({ theme }: { theme: ThemeMode }) => theme.color.text} !important;
`;
