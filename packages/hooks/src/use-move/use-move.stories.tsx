import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { useMove } from "./use-move";

const meta = {
  title: "hooks/use-move",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const UsageStory = () => {
  const [visible, setVisible] = useState(true);
  const { active, ref } = useMove(console.log);
  const handleToggle = useCallback(() => {
    setVisible((value) => !value);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      {visible && (
        <div
          ref={ref}
          style={{ padding: 40, background: active ? "orange" : "cyan" }}
        >
          Click me
        </div>
      )}

      <button type="button" onClick={handleToggle}>
        Toggle visible
      </button>
    </div>
  );
};

export const Usage: Story = {
  render: UsageStory,
};
