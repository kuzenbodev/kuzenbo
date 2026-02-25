import type { StoryObj } from "@storybook/react";

import { Label } from "../../label/label";
import { NumberField } from "../number-field";
import { baseMeta } from "./number-field-story-shared";

export default {
  ...baseMeta,
  title: "Components/NumberField/Sizes",
};

type Story = StoryObj<typeof baseMeta>;

const sizeOptions = ["xs", "sm", "md", "lg", "xl"] as const;

export const Sizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      {sizeOptions.map((size) => (
        <NumberField defaultValue={10} key={size} size={size}>
          <Label htmlFor={`number-field-${size}`}>Quantity ({size})</Label>
          <NumberField.Group>
            <NumberField.Decrement />
            <NumberField.Input id={`number-field-${size}`} />
            <NumberField.Increment />
          </NumberField.Group>
        </NumberField>
      ))}
    </div>
  ),
};
