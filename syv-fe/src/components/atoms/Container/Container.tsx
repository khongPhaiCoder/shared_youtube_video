import { BreakpointString, breakpoint } from "@/utils/responsive";
import { ContainerProps } from "./Container.types";
import styled from "styled-components";

const breakpointUtils = (bp: BreakpointString) =>
  breakpoint(bp)`
    ${(props: ContainerProps) => {
      let styles = "";

      if (props[`${bp}Margin`]) {
        styles += `margin: ${props[`${bp}Margin`] as string} !important;`;
      }

      if (props[`${bp}Padding`]) {
        styles += `padding: ${props[`${bp}Padding`] as string} !important;`;
      }

      if (props[`${bp}MaxWidth`]) {
        styles += `max-width: ${props[`${bp}MaxWidth`] as string} !important;`;
      }

      return styles;
    }}
  `;

const Container = styled.div.attrs((props) => ({
  className: props.className,
}))<ContainerProps>`
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "transparent"} !important;
  border: ${(props) => (props.border ? props.border : "none")} !important;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "0"} !important;
  display: ${(props) => (props.display ? props.display : "block")};
  grid-area: ${(props) => (props.gridArea ? props.gridArea : "initial")};
  ${(props) =>
    props.justifyContent &&
    `justify-content: ${props.justifyContent} !important;`}
  ${(props) =>
    props.alignItems && `align-items: ${props.alignItems} !important;`}
  ${(props) => props.height && `height: ${props.height} !important;`}
  ${(props) => props.gap && `gap: ${props.gap} !important;`}
  ${(props) => props.zIndex && `z-index: ${props.zIndex} !important;`}
  ${(props) =>
    props.flexDirection && `flex-direction: ${props.flexDirection} !important;`}

  margin: ${(props) =>
    props.xsMargin ? props.xsMargin : "0 0 0 0"} !important;
  padding: ${(props) =>
    props.xsPadding ? props.xsPadding : "0 0 0 0"} !important;

  max-width: ${(props) =>
    props.xsMaxWidth ? props.xsMaxWidth : "100%"} !important;
  ${(props) => props.width && `width: ${props.width} !important;`}

  ${["xs", "sm", "md", "lg"].map(
    // @ts-ignore
    (o: BreakpointString) => breakpointUtils(o)
  )}
  @media (max-width: 860px) {
    width: 100% !important;
  }
`;

export default Container;
