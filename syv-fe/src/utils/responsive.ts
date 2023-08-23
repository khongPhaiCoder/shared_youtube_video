import useMediaQuery from "@mui/material/useMediaQuery";
import { createBreakpoint } from "styled-components-breakpoint";

export const breakpointList = {
  xs: 0,
  sm: 576,
  md: 769,
  lg: 990,
  lgx: 1024,
  xl: 1272,
  xxl: 1288,
};

export const breakpoint = createBreakpoint(breakpointList);

export type BreakpointString = "xs" | "sm" | "md" | "lg";

type UseResponsiveProps = {
  breakpoint?: BreakpointString;
  offset?: number;
};

export const useResponsive = ({
  breakpoint = "md",
  offset = 0,
}: UseResponsiveProps): boolean => {
  const isDesktop = useMediaQuery(
    `(min-width:${breakpointList[breakpoint] + offset}px)`
  );
  return isDesktop;
};
