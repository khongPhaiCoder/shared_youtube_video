import { Meta, StoryObj } from "@storybook/react";
import Container from "./Container";
import { colorsUtils } from "@/utils/colorsUtils";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from '@storybook/jest';

const PADDING = "20px";
const MARGIN = "20px";

const meta = {
  title: "atoms/Container",
  component: Container,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: null,
      description: {
        component: `The Container component in React offers a customizable and responsive container for organizing and styling content. 
        It allows for flexible layout design and is commonly used to structure UI elements consistently across different parts of a React application.
        With its configurable properties, the Container component enables optimal presentation of content on various screen sizes,
        making it a valuable tool for creating visually appealing and user-friendly interfaces.`,
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description:
        "This property is used to specify a CSS class name for the component.",
    },
    backgroundColor: {
      control: "text",
      description:
        "This property is used to define the background color of the component.",
    },
    border: {
      control: "text",
      description:
        "This property is used to define the border style of the component.",
    },
    borderRadius: {
      control: "text",
      description:
        "This property is used to define the border radius of the component, controlling the roundness of its corners.",
    },
    display: {
      control: "text",
      description:
        "This property is used to define the CSS display property for the component, controlling how it is rendered in the layout.",
    },
    gridArea: {
      control: "text",
      description:
        "This property is used in a CSS Grid layout to define the grid area that the component occupies.",
    },
    justifyContent: {
      control: "text",
      description:
        "This property is used to define the horizontal alignment of the component's content.",
    },
    alignItems: {
      control: "text",
      description:
        "This property is used to define the vertical alignment of the component's content.",
    },
    width: {
      control: "text",
      description:
        "This property is used to define the width of the component.",
    },
    height: {
      control: "text",
      description:
        "This property is used to define the height of the component.",
    },
    zIndex: {
      control: "number",
      description:
        "This argument, controls the stacking order of the component in relation to other elements.",
    },
    xsMargin: {
      control: "text",
      description:
        "This property is used to define the margin of the component for extra-small (xs) screen sizes.",
    },
    smMargin: {
      control: "text",
      description:
        "This property is used to define the margin of the component for small (sm) screen sizes.",
    },
    mdMargin: {
      control: "text",
      description:
        "This property is used to define the margin of the component for medium (md) screen sizes.",
    },
    lgMargin: {
      control: "text",
      description:
        "This property is used to define the margin of the component for large (lg) screen sizes.",
    },
    xlMargin: {
      control: "text",
      description:
        "This property is used to define the margin of the component for extra-large (xl) screen sizes.",
    },
    xsPadding: {
      control: "text",
      description:
        "This property is used to define the padding of the component for extra-small (xs) screen sizes.",
    },
    smPadding: {
      control: "text",
      description:
        "This property is used to define the padding of the component for small (sm) screen sizes.",
    },
    mdPadding: {
      control: "text",
      description:
        "This property is used to define the padding of the component for medium (md) screen sizes.",
    },
    lgPadding: {
      control: "text",
      description:
        "This property is used to define the padding of the component for large (lg) screen sizes.",
    },
    xlPadding: {
      control: "text",
      description:
        "This property is used to define the padding of the component for extra-large (xl) screen sizes.",
    },
    xsMaxWidth: {
      control: "text",
      description:
        "This property is used to define the maximum width of the component for extra-small (xs) screen sizes.",
    },
    smMaxWidth: {
      control: "text",
      description:
        "This property is used to define the maximum width of the component for small (sm) screen sizes.",
    },
    mdMaxWidth: {
      control: "text",
      description:
        "This property is used to define the maximum width of the component for medium (md) screen sizes.",
    },
    lgMaxWidth: {
      control: "text",
      description:
        "This property is used to define the maximum width of the component for large (lg) screen sizes.",
    },
    xlMaxWidth: {
      control: "text",
      description:
        "This property is used to define the maximum width of the component for extra-large (xl) screen sizes.",
    },
  },
  args: {
    width: "200px",
    height: "40px",
    backgroundColor: colorsUtils.grayLighter,
    border: "1px solid black",
  },
  play: async ({ canvasElement, args }) => {
    const container = canvasElement.querySelector("div");
    expect(container).toHaveStyle({
      width: args.width,
      height: args.height,
      backgroundColor: args.backgroundColor,
      border: args.border
    });
  }
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement, args }) => {
    const container = canvasElement.querySelector("div");
    expect(container).toHaveStyle({
      width: args.width,
      height: args.height
    });
  }
};

export const PaddingAllScreenSize: Story = {
  args: {
    xsPadding: PADDING,
    style: {
      boxShadow: `inset 0 0 0 ${PADDING} ${colorsUtils.grayLight}`,
    },
  },
  play: async ({ canvasElement, args }) => {
    const container = canvasElement.querySelector("div");
    expect(container).toHaveStyle({
      width: args.width,
      height: args.height,
      padding: PADDING,
      boxShadow: `inset 0 0 0 ${PADDING} ${colorsUtils.grayLight}`
    });
  }
};

export const MarginAllScreenSize: Story = {
  args: {
    xsMargin: MARGIN,
    style: {
      boxShadow: `0 0 0 ${MARGIN} ${colorsUtils.grayLight}`,
    },
  },
  play: async ({ canvasElement, args }) => {
    const container = canvasElement.querySelector("div");
    expect(container).toHaveStyle({
      width: args.width,
      height: args.height,
      margin: MARGIN,
      boxShadow: `0 0 0 ${MARGIN} ${colorsUtils.grayLight}`
    });
  }
};
