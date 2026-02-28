import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { useRadialMove } from "./use-radial-move";

const meta = {
  title: "hooks/use-radial-move",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const UsageStory = () => {
  const [value, setValue] = useState(0);
  const { ref } = useRadialMove(setValue);

  return (
    <div style={{ padding: 40 }}>
      <div
        ref={ref}
        style={{
          height: 200,
          width: 200,
          borderRadius: 200,
          background: "pink",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 20,
            height: 200,
            borderRadius: 20,
            background: "silver",
            top: 0,
            right: 0,
            bottom: 0,
            left: "calc(50% - 10px)",
            transform: `rotate(${value}deg)`,
          }}
        />
      </div>
    </div>
  );
};

export const Usage: Story = {
  render: UsageStory,
};
