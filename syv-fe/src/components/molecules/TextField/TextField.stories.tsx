import { Meta, StoryObj } from "@storybook/react";
import TextField from "./TextField";
import { TextFieldProps } from "./TextField.types";
import { TextFieldProps as MuiTextFieldProps } from "@mui/material";
import React from "react";
import { AccountBox, AccountCircle } from "@mui/icons-material";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { INPUT_SIZE } from "./testing.constant";

const meta = {
  title: "molecules/TextField",
  component: TextField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: null,
      description: {
        component: `The TextField component is a versatile and feature-rich input field component designed for React applications. 
        It leverages the Material-UI library to provide a wide range of customization options and enhanced functionality.
        With props like onChange, label positioning, size variations, input adornments, event handling, and support for multiline input,
        the TextField component offers developers a powerful tool for capturing and manipulating text-based data.
        Its seamless integration with React and Material-UI makes it an excellent choice for building intuitive and visually appealing user interfaces.
        Whether it's a simple form input or a complex text area, the TextField component empowers developers to create dynamic and
        interactive experiences for their users.`,
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: [
        "text",
        "number",
        "password",
        "email",
        "date",
        "time",
        "color",
        "file",
      ],
      description:
        "Specifies the type of the input field. <br/>`text` `number` `password` `email` `date` `time` `color` `file`",
    },
    label: {
      control: "text",
      description:
        "Represents the label for the input field. It uses a `text` control to customize the label text.<br/>`string`",
    },
    placeholder: {
      control: "text",
      description:
        "Determines the placeholder text displayed inside the input field. It uses a `text` control for customization.<br/>`string`",
    },
    disabled: {
      control: "boolean",
      description:
        "Controls whether the input field is disabled or not. It uses a `boolean` control to toggle the disabled state.<br/>`boolean`",
    },
    value: {
      control: "text",
      description:
        "Represents the current value or default value of the input field. It uses a `text` control to update the value.<br/>`string`",
    },
    error: {
      control: "boolean",
      description:
        "Specifies whether the input field has an error or not. It uses a `boolean` control to indicate the error state.<br/>`boolean`",
    },
    helperText: {
      control: "text",
      description:
        "Provides additional helper text for the input field. It uses a `text` control for customization.<br/>`string`",
    },
    description: {
      control: "text",
      description:
        "Describes the input field with additional text. It uses a `text` control to add a description.",
    },
    adornmentFrontLabel: {
      control: "text",
      description:
        "Represents the label or icon displayed at the start of the input field.",
    },
    adornmentEndLabel: {
      control: "text",
      description:
        "Represents the label or icon displayed at the end of the input field.",
    },
    onChange: {
      control: (value: string) => {
        console.log("onChange: ", value);
      },
      description:
        "A callback function that is triggered when the value of the input field changes.<br/>`(e: React.ChangeEvent<HTMLInputElement>) => void`",
    },
    name: {
      control: "text",
      description:
        "Specifies the name of the input field. It uses a `text` control for customization.<br/>`string`",
    },
    onBlur: {
      control: (
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        console.log("onBlur: ", event.target.value);
      },
      description:
        "A callback function triggered when the input field loses focus.<br/>`(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void`",
    },
    sizeTextField: {
      control: {
        type: "object",
        properties: {
          width: {
            control: "number",
          },
          height: {
            control: "number",
          },
        },
      },
      description:
        "An object that allows customization of the width and height of the input field. It provides `number` controls for width and height.",
    },
    isDefaultShrink: {
      control: "boolean",
      description:
        "Determines whether the label of the input field should shrink by default. It uses a `boolean` control to toggle the shrink behavior.",
    },
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
      description:
        "Specifies the size of the input field. It provides a radio control with options for `small`, `medium`, and `large` sizes.",
    },
    htmlAttributes: {
      control: "object",
      description:
        "Additional HTML attributes to be applied to the input field. It uses an `object` control for customization.",
    },
    maxLength: {
      control: "number",
      description:
        "Specifies the maximum length of the input field. It uses a `number` control for customization.",
    },
    rowsMax: {
      control: "number",
      description:
        "Determines the maximum number of rows for a multiline input field. It uses a `number` control for customization.",
    },
  },
  args: {
    label: "TextField",
    name: "textField",
    helperText: "Something went wrong!",
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const inputHtml: HTMLInputElement = await canvas.findByLabelText(
      `${args.label}`
    );
    expect(inputHtml.name).toBe(args.name);

    // await step('Typing to input', async () => {
    //   await userEvent.type(inputHtml, '123');
    //   expect(inputHtml.value).toBe('123');

    //   const label = canvasElement.querySelector('label')
    //   console.log(label?.style.top)
    //   expect(label?.style.top).toBe("-16px")
    // });

    if (args.type == "number") {
      await step("TextField type number", async () => {
        expect(inputHtml).toHaveAttribute("type", "number");

        await userEvent.type(inputHtml, "abc");
        expect(inputHtml.value).toBe("");

        await userEvent.type(inputHtml, "123");
        expect(inputHtml.value).toBe("123");
      });
    }

    if (args.placeholder) {
      await step("TextField with placeholder", async () => {
        expect(inputHtml.placeholder).toBe(args.placeholder);
      });
    }

    if (args.value) {
      await step("TextField with default value", async () => {
        expect(inputHtml.value).toBe(args.value);
      });
    }

    if (args.error) {
      await step("TextField with error and helpText", async () => {
        const helpText = await canvas.findByText(`${args.helperText}`);
        expect(helpText).toBeVisible();
        expect(helpText).toHaveStyle({
          color: "#b30909",
        });
      });
    }

    if (args.description) {
      await step("TextField with description", async () => {
        expect(await canvas.findByText(`${args.description}`)).toBeVisible();
      });
    }

    if (args.adornmentFrontLabel) {
      await step("TextField with Adornment Front", async () => {
        // Expect icon to be visible
        const accountCircleIcon = await canvas.findByTestId(
          "AccountCircleIcon"
        );
        expect(accountCircleIcon).toBeVisible();

        // Expect icon in front
        const parentElement = inputHtml.parentElement;
        const accountCircleIconWraper = accountCircleIcon.parentElement;
        expect(parentElement?.firstChild).toBe(accountCircleIconWraper);
      });
    }

    if (args.adornmentEndLabel) {
      await step("TextField with Adornment End", async () => {
        // Expect icon to be visible
        const accountBoxIcon = await canvas.findByTestId("AccountBoxIcon");
        expect(accountBoxIcon).toBeVisible();

        // Expect icon in end
        const parentElement = inputHtml.parentElement;
        expect(parentElement?.firstChild).toBe(inputHtml);
      });
    }

    if (args.size) {
      await step("TextField with size", async () => {
        expect(inputHtml.style.height).toBe(INPUT_SIZE[args?.size || "custom"]);
      });
    }
  },
} satisfies Meta<React.FC<MuiTextFieldProps & TextFieldProps>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultTextField: Story = {
  args: {},
};

export const FilledTextField: Story = {
  args: {
    variant: "filled",
  },
};

export const StandardTextField: Story = {
  args: {
    variant: "standard",
  },
};

export const NumberTextField: Story = {
  args: {
    type: "number",
    label: "Number",
  },
};

export const TextFieldWithPlaceholder: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
  },
};

export const TextFieldWithValue: Story = {
  args: {
    value: "value",
  },
};

export const TextFieldWithError: Story = {
  args: {
    error: true,
  },
};

export const TextFieldWidthDescription: Story = {
  args: {
    description: "This is a description",
  },
};

export const TextFieldErrorWidthDescription: Story = {
  args: {
    description: "This is a description",
    error: true,
  },
};

export const TextFieldWidthAdornmentFront: Story = {
  args: {
    adornmentFrontLabel: <AccountCircle />,
  },
};

export const TextFieldWidthAdornmentEnd: Story = {
  args: {
    adornmentEndLabel: <AccountBox />,
  },
};

export const SmallTextField: Story = {
  args: {
    size: "small",
  },
};

export const MediumTextField: Story = {
  args: {
    size: "medium",
  },
};

export const DefaultShrinkTextField: Story = {
  args: {
    isDefaultShrink: true,
  },
};

export const TextFieldMultiRows: Story = {
  args: {
    rowsMax: 5,
  },
};
