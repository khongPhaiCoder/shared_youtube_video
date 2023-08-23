import { Meta, StoryObj } from "@storybook/react";
import HeaderItem from "./HeaderItem";
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

const meta = {
  title: "molecules/HeaderItem",
  component: HeaderItem,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    link: "/",
    title: "Title",
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const headerItem: HTMLButtonElement = await canvas.findByRole('button');

    await step('Header title', async () => {
      expect(headerItem.textContent).toBe(args.title)
    });
  }
} satisfies Meta<typeof HeaderItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
