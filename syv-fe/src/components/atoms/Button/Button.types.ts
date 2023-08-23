import React, { CSSProperties, ReactNode } from "react";

export interface ButtonProps {
  children?: ReactNode;
  icon?: React.FC<React.SVGProps<SVGSVGElement>> | string;
  iconSize?: number;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
  styles?: CSSProperties;
  isLoading?: boolean;
  name?: string;
  variant?: "text" | "outlined" | "contained";
  isLoadingWithText?: boolean;
  sizeLoading?: number | string;
}
