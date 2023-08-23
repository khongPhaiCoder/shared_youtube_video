import { colorsUtils } from "@/utils/colorsUtils";
import { Button, CircularProgress } from "@mui/material";
import styled from "styled-components";

export const ButtonContainer = styled(Button)((props) => {
  if (props.variant === "text") {
    return `
      background-color:${colorsUtils.transparent};
      color: ${props.theme.color.text} !important;
      font-weight: bold;
      border-radius: 0px !important;
      &.Mui-disabled {
        opacity: 0.75;
        color: ${props.theme.color.text} !important;
      }
      &:hover {
        background-color: ${props.theme.color.textButtonHover} !important;
      }
    `;
  }

  if (props.variant === "outlined") {
    return `
      &.MuiButton-outlined {
        border: 2px solid ${props.theme.color.text};
        border-radius: 0px;
        color: ${props.theme.color.text};
        &:hover {
          border: 2px solid ${props.theme.color.text};
          background: ${colorsUtils.darkGrayLighter} !important;
          color: ${props.theme.color.text} !important;
        }
      }
      &.Mui-disabled {
        opacity: 0.75;
        color: ${props.theme.color.text} !important;
        border: 2px solid ${props.theme.color.text} !important;
      }
    `;
  }

  if (props.variant === "contained") {
    return `
      &.MuiButtonBase-root {
        border-radius: 0px;
        background-color: ${props.theme.color.text};
        box-shadow: none;
        color: ${props.theme.color.background} !important;
        &:hover {
          background: ${props.theme.color.containedButtonHover} !important;
          color: ${props.theme.color.background} !important;
          box-shadow: none;
        }
      }
      &.Mui-disabled {
        background-color: ${props.theme.color.containedButtonHover} !important;
      }
    `;
  }
});

export const ButtonContent = styled.div`
  text-transform: initial;
  white-space: nowrap;
`;

export const LoadingSpinner = styled(CircularProgress)<{
  buttonVariant: "outlined" | "text" | "contained";
}>((props) => {
  return `
    color: ${
      props.buttonVariant === "contained"
        ? props.theme.color.body
        : props.theme.color.text
    } !important;
  `;
});
