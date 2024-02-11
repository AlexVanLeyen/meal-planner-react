import type { Meta, StoryObj } from "@storybook/react";

import { PlanTable } from "./index";

const meta = {
  title: "Components/PlanTable",
  component: PlanTable,
} satisfies Meta<typeof PlanTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
