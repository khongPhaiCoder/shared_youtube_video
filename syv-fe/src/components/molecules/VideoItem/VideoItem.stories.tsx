import { Meta, StoryObj } from "@storybook/react";
import VideoItem from "./VideoItem";
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

const meta = {
  title: "molecules/VideoItem",
  component: VideoItem,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    _id: "64985728a97c742b595ec250",
    embedId: "rokGy0huYEA",
    title:
      "Rap Việt Mùa 3 - Tập 5: Minh Lai phá đảo với hit của AMEE, HYDRA ẵm luôn 4 chọn | Rap Việt 2023",
    thumbnailUrl: "https://i.ytimg.com/vi/UzvbmzVDCQ4/mqdefault.jpg",
    sharedDate: "2023-06-25T10:27:19.433Z",
    user: {
      _id: "649554e7ef95a1a2043133b9",
      username: "user 2",
      email: "user2@email.com",
    },
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
  
    await step('Render image', async () => {
      const image: HTMLImageElement = canvas.getByRole('img');
      await expect(image.src).toBe(args.thumbnailUrl)
    });

    await step('Render title', async () => {
      await expect(canvas.getByTestId("title").textContent).toBe(args.title);
    });

    await step('Render user info', async () => {
      await expect(canvas.getByTestId("email").textContent).toContain(args.user.email);
      await expect(canvas.getByTestId("username").textContent).toContain(args.user.username);
    });

    await step('Render shared date', async () => {
      await expect(canvas.getByTestId("sharedDate").textContent).toContain("25/06/2023");
    });
  }
} satisfies Meta<typeof VideoItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
