import type { Meta, StoryObj } from "@storybook/react";

import { Teapot } from "./index";

const meta = {
  title: "Components/Teapot",
  component: Teapot,
  // tags: ['autodocs'],
} satisfies Meta<typeof Teapot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
