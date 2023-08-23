import { ThemeMode } from "@/utils/themes";
import NextLink from "next/link";
import styled from "styled-components";

const Link = styled(NextLink)`
  color: ${({ theme }: { theme: ThemeMode }) => theme.color.text};
  padding: 8px 12px;
  border-radius: ${({ theme }: { theme: ThemeMode }) =>
    theme.spacing.borderRadius.small};
`;

export default Link;
