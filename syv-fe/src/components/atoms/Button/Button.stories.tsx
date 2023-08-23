import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  title: "atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: null,
      description: {
        component: `The Button component in React is a versatile and customizable element that enhances user interaction. 
        It offers features such as customizable content, loading state for asynchronous operations, and visual variants.
        With the ability to display text or icons, the Button component adapts well to different use cases and integrates seamlessly into various design systems.`,
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description:
        "This property is used to define the content of the button, such as the text or elements to be displayed inside it.",
    },
    icon: {
      control: null,
      description:
        "This property is not controllable and is used to provide an icon for the button.",
    },
    iconSize: {
      control: {
        type: "number",
        min: 0,
      },
      description:
        "This property is used to control the size of the icon displayed in the button.",
    },
    disabled: {
      control: "boolean",
      description:
        "This property is used to disable the button if set to `true`, preventing user interaction.",
    },
    onClick: {
      type: "function",
      action: "clicked",
      description:
        "This property is a function that is triggered when the button is clicked, and it performs the specified action.",
    },
    type: {
      control: "radio",
      options: ["button", "submit"],
      defaultValue: "button",
      description:
        "This property is used to define the type of the button, either as a `regular button` or a `submit button`.",
    },
    styles: {
      control: null,
      description:
        "This property is not controllable and allows custom styles to be applied to the button.",
    },
    isLoading: {
      control: "boolean",
      description:
        "This property is used to indicate whether the button is in a loading state, typically used when performing asynchronous operations.",
    },
    name: {
      control: "text",
      description: "This property is used to specify a name for the button.",
    },
    variant: {
      control: "radio",
      options: ["text", "outlined", "contained"],
      description:
        "This property is used to define the visual style of the button, such as",
    },
    isLoadingWithText: {
      control: "boolean",
      description:
        "This property is used to indicate whether the button should display loading text while in the loading state.",
    },
    sizeLoading: {
      control: "text",
      description:
        "This property is used to specify the size of the loading indicator displayed in the button.",
    },
  },
  args: {
    styles: {
      minWidth: "80px",
      minHeight: "40px",
    },
    children: "Button",
    type: "button",
    variant: "outlined",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole('button');

    if (args.isLoading){
      expect(button).toBeDisabled();
    }
    else {
      await userEvent.click(button);
      await waitFor(() => expect(args.onClick).toBeCalled());
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OutlinedButton: Story = {};

export const TextButton: Story = {
  args: {
    variant: "text",
  },
};

export const ContainedButton: Story = {
  args: {
    variant: "contained",
  },
};

export const LoadingOutlinedButton: Story = {
  args: {
    isLoading: true,
  },
};

export const LoadingTextButton: Story = {
  ...LoadingOutlinedButton,
  args: {
    variant: "text",
    isLoading: true,
  },
};

export const LoadingContainedButton: Story = {
  ...LoadingOutlinedButton,
  args: {
    variant: "contained",
    isLoading: true,
  },
};

export const LoadingOutlinedButtonWithText: Story = {
  ...LoadingOutlinedButton,
  args: {
    isLoading: true,
    isLoadingWithText: true,
  },
};

export const LoadingTextButtonWithText: Story = {
  ...LoadingOutlinedButton,
  args: {
    variant: "text",
    isLoading: true,
    isLoadingWithText: true,
  },
};

export const LoadingContainedButtonWithText: Story = {
  ...LoadingOutlinedButton,
  args: {
    variant: "contained",
    isLoading: true,
    isLoadingWithText: true,
  },
};
