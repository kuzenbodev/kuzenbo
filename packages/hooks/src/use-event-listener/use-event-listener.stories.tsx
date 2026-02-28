import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { useEventListener } from "./use-event-listener";

const meta = {
  title: "hooks/use-event-listener",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const UsageStory = () => {
  const [visible, setVisible] = useState(false);
  const listener = useCallback(() => console.log("mouse down"), []);
  const ref = useEventListener("mousedown", listener);
  const handleToggle = useCallback(() => {
    setVisible((value) => !value);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      {visible && (
        <div ref={ref} style={{ padding: 40, background: "orange" }}>
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
