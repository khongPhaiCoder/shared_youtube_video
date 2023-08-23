import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-styling",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve!.alias = {
      ...config.resolve!.alias,
      "@/utils": path.resolve(__dirname, "../src/utils"),
      "@/constants": path.resolve(__dirname, "../src/constants"),
      "@/assets": path.resolve(__dirname, "../src/assets"),
      "@/components": path.resolve(__dirname, "../src/components"),
      "@/contexts": path.resolve(__dirname, "../src/contexts"),
    };

    return config;
  },
};
export default config;
