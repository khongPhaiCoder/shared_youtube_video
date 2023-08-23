import { Meta, StoryObj } from "@storybook/react";
import TextFieldPassword from "./TextFieldPassword";
import textFieldMeta from "../TextField/TextField.stories";
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta = {
  title: "molecules/TextFieldPassword",
  component: TextFieldPassword,
  tags: ["autodocs"],
  argTypes: {
    ...textFieldMeta.argTypes,
  },
  args: {
    label: "Password",
    name: "password",
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const inputHtml: HTMLInputElement = await canvas.findByLabelText(`${args.label}`);
    const btnTogglePasswordVisibility = await canvas.getByRole('button');

    await step('Init password input', async () => {
      expect(inputHtml).toHaveAttribute('type', 'password');
      await userEvent.type(inputHtml, 'password@1234');
      expect(inputHtml.value).toBe('password@1234');
    });

    await step('Click show password ', async () => {
      await userEvent.click(btnTogglePasswordVisibility)
      expect(inputHtml).toHaveAttribute('type', 'text');
    });

    await step('Click hide password ', async () => {
      await userEvent.click(btnTogglePasswordVisibility)
      expect(inputHtml).toHaveAttribute('type', 'password');
    });
  }
} satisfies Meta<typeof TextFieldPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
