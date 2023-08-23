import React, { InputHTMLAttributes } from "react";

export interface TextFieldProps {
  type?:
    | "text"
    | "number"
    | "password"
    | "email"
    | "date"
    | "time"
    | "color"
    | "file";
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  error?: boolean;
  helperText?: string;
  description?: string;
  adornmentFrontLabel?: JSX.Element;
  adornmentEndLabel?: JSX.Element;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  sizeTextField?: {
    width?: number;
    height?: number;
  };
  isDefaultShrink?: boolean;
  size?: "small" | "medium";
  htmlAttributes?: InputHTMLAttributes<object>; // set htmlAttributes see more on https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes
  maxLength?: number;
  rowsMax?: number;
}
