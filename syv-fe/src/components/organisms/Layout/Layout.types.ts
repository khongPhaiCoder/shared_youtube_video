import { ReactNode } from "react";

type CSSObject = {
  [key: string]: string | number | CSSObject;
};

export interface LayoutProps {
  seoTitle?: string;
  children?: ReactNode;
  styles?: CSSObject;
}
