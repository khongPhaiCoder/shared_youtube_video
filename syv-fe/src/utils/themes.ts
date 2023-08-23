import { createGlobalStyle } from "styled-components";
import { colorsUtils } from "./colorsUtils";

export interface ThemeMode {
  color: {
    body: string;
    text: string;
    background: string;
    textButtonHover: string;
    containedButtonHover: string;
    alert: string;
    popupMenuBackground: string;
  };
  spacing: {
    padding: {
      small: string;
      medium: string;
      large: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
    };
  };
  typography: {
    type: {
      primary: string;
      code: string;
    };
    weight: {
      regular: string;
      bold: string;
      extrabold: string;
      black: string;
    };
    size: {
      s1: number;
      s2: number;
      s3: number;
      m1: number;
      m2: number;
      m3: number;
      l1: number;
      l2: number;
      l3: number;
    };
  };
}

export const lightTheme: ThemeMode = {
  color: {
    body: colorsUtils.white,
    text: colorsUtils.darkGray,
    background: colorsUtils.white,
    textButtonHover: colorsUtils.darkGrayLighter,
    containedButtonHover: colorsUtils.deepBlack,
    alert: colorsUtils.alertRed,
    popupMenuBackground: colorsUtils.popUpMenuLight,
  },
  spacing: {
    padding: {
      small: "4px",
      medium: "8px",
      large: "12px",
    },
    borderRadius: {
      small: "4px",
      medium: "8px",
      large: "12px",
    },
  },
  typography: {
    type: {
      primary: '"Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
      code: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
    },
    weight: {
      regular: "400",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
    size: {
      s1: 12,
      s2: 14,
      s3: 16,
      m1: 20,
      m2: 24,
      m3: 28,
      l1: 32,
      l2: 40,
      l3: 48,
    },
  },
};

export const darkTheme: ThemeMode = {
  ...lightTheme,
  color: {
    body: colorsUtils.black,
    text: colorsUtils.lightGray,
    background: colorsUtils.black,
    textButtonHover: colorsUtils.whiteTranslucent,
    containedButtonHover: colorsUtils.softWhite,
    alert: colorsUtils.alertRed,
    popupMenuBackground: colorsUtils.popUpMenuDark,
  },
};

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }: { theme: ThemeMode }) => theme.color.body};
    color: ${({ theme }: { theme: ThemeMode }) => theme.color.text};
    font-family: Arial, Helvetica, sans-serif;
    transition: all 0.5s linear;
  }
`;
