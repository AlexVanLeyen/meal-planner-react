import React from "react";
import type { Meta, StoryObj, StoryFn } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { MealSlot } from "./index";

const meta = {
  title: "Components/PlanTable/MealSlot",
  component: MealSlot,
} satisfies Meta<typeof MealSlot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ((args) => {
    const [, updateArgs] = useArgs();
    const { date, type, name, note } = args;
    const onChangeHandler = (value: MealSlot) => {
      updateArgs(value);
    };
    return (
      <MealSlot
        date={date}
        type={type}
        name={name}
        note={note}
        onChange={onChangeHandler}
      />
    );
  }) satisfies StoryFn,
  args: {
    date: new Date().toISOString(),
    name: "",
    type: "",
    note: { message: "" },
  },
};
