import {
  FormControl,
  TextField,
  InputLabel as MuiInputLabel,
  InputAdornment as MuiInputAdornment,
  FormHelperText as MuiFormHelperText,
} from "@mui/material";
import { ThemeMode } from "@/utils/themes";
import styled from "styled-components";

export const DefaultFormControl = styled(FormControl)<{
  $widthParent?: number;
}>`
  width: ${({ $widthParent }) =>
    $widthParent ? $widthParent + "px" : "100%"} !important;

  .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root {
    top: 0;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
  &:focus-visible {
    outline: ${({ theme }: { theme: ThemeMode }) => theme.color.text} auto 1px !important;
  }
`;

export const DefaultTextInput = styled(TextField)`
  label {
    color: ${({ theme }: { theme: ThemeMode }) => theme.color.text};
    font-weight: 300;
    padding-right: 28px;
    z-index: 99;

    &.MuiInputLabel-shrink,
    &.Mui-disabled,
    &.Mui-disabled.MuiInputLabel-shrink,
    &.Mui-focused {
      color: ${({ theme }: { theme: ThemeMode }) =>
        theme.color.text} !important;
    }

    &.Mui-error,
    &.Mui-error.Mui-focused {
      color: ${({ theme }: { theme: ThemeMode }) =>
        theme.color.alert} !important;
    }

    &:focus-visible {
      outline: none;
    }
  }

  & .MuiOutlinedInput-root {
    border-color: ${({ theme }: { theme: ThemeMode }) =>
      theme.color.text} !important;
    z-index: 9;
    &::placeholder {
      font-weight: 300;
    }
    fieldset {
      border-color: ${({ theme }: { theme: ThemeMode }) => theme.color.text};
      z-index: 12;

      &:hover {
        border-color: ${({ theme }: { theme: ThemeMode }) => theme.color.text};
      }
    }
    &.Mui-disabled {
      opacity: 0.5;
      &.Mui-error {
        color: ${({ theme }: { theme: ThemeMode }) => theme.color.alert};
      }
    }
    &.Mui-focused {
      fieldset {
        border-width: 1px;
        border-color: transparent;
        caret-color: ${({ theme }: { theme: ThemeMode }) => theme.color.text};
      }
      input {
        caret-color: ${({ theme }: { theme: ThemeMode }) => theme.color.text};
      }
    }
  }

  fieldset.MuiOutlinedInput-notchedOutline {
    border-color: ${(props) =>
      props.error
        ? props.theme.color.alert
        : props.theme.color.text} !important;
    border-width: 1px !important;
  }

  & .MuiInputBase-input {
    color: ${({ theme }: { theme: ThemeMode }) => theme.color.text} !important;
    z-index: 10;
  }

  p.MuiFormHelperText-root {
    color: ${({ theme }: { theme: ThemeMode }) => theme.color.alert};

    &.Mui-error {
      text-align: right;
      margin-right: 0px;
    }
  }

  div:focus-visible,
  &:focus-visible {
    outline: ${({ theme }: { theme: ThemeMode }) => theme.color.text} auto 1px !important;
  }

  textarea {
    padding: 0 !important;
    color: ${({ theme }: { theme: ThemeMode }) => theme.color.text} !important;
  }

  & .MuiInput-underline:hover:not(.Mui-disabled):before,
  & .MuiFilledInput-underline:hover:not(.Mui-disabled):before {
    border-bottom-color: ${({ theme }: { theme: ThemeMode }) =>
      theme.color.text} !important;
    border-width: 1px !important;
  }

  & .MuiInput-underline:after,
  & .MuiInput-underline:before,
  & .MuiFilledInput-underline:before,
  & .MuiFilledInput-underline:after {
    border-bottom-color: ${({ theme }: { theme: ThemeMode }) =>
      theme.color.text} !important;
    border-width: 1px !important;
  }

  & .MuiFilledInput-root {
    border-radius: 0 !important;
  }

  & .MuiFilledInput-root.Mui-focused {
    background-color: ${({ theme }: { theme: ThemeMode }) =>
      theme.color.textButtonHover};
    border-radius: 0 !important;
  }
`;

export const InputLabel = styled(MuiInputLabel)`
  padding: 0 6px !important;
  background-color: ${({ theme }: { theme: ThemeMode }) =>
    theme.color.background};
  color: ${({ theme }: { theme: ThemeMode }) => theme.color.text} !important;

  z-index: 99 !important;
`;

export const InputAdornment = styled(MuiInputAdornment)`
  svg {
    fill: ${({ theme }: { theme: ThemeMode }) => theme.color.text};
  }
`;

export const FormHelperText = styled(MuiFormHelperText)`
  color: ${({ theme }: { theme: ThemeMode }) => theme.color.text} !important;
`;
