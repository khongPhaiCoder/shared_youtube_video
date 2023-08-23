export interface ContainerProps {
  className?: string;

  // css properties
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  display?: "block" | "inline" | "inline-block" | "none" | "flex" | "grid";
  gridArea?:
    | "grid-row-start"
    | "grid-column-start"
    | "grid-row-end"
    | "grid-column-end"
    | string;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  width?: string;
  height?: string;
  zIndex?: number;
  gap?: string;

  // margin on different screen size
  // you can reference the breakpoint from utils/responsive.tsx
  xsMargin?: string;
  smMargin?: string;
  mdMargin?: string;
  lgMargin?: string;
  xlMargin?: string;

  // padding on different screen size
  xsPadding?: string;
  smPadding?: string;
  mdPadding?: string;
  lgPadding?: string;
  xlPadding?: string;

  // max width on different screen size
  xsMaxWidth?: string;
  smMaxWidth?: string;
  mdMaxWidth?: string;
  lgMaxWidth?: string;
  xlMaxWidth?: string;
}
