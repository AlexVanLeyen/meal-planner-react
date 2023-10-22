import type { Meta, StoryObj } from '@storybook/react';

import { MealSlot } from './index';

const meta = {
    title: 'Components/PlanTable/MealSlot',
    component: MealSlot,
} satisfies Meta<typeof MealSlot>;

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        date: new Date(),
        name: "",
        type: "",
        notes: []
    }
};
