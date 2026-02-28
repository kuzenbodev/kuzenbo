import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { useClickOutside } from "./use-click-outside";

const meta = {
  title: "hooks/use-click-outside",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const UsageStory = () => {
  const [visible, setVisible] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() =>
    console.log("clicked outside")
  );
  const handleToggle = useCallback(() => {
    setVisible((value) => !value);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      {visible && (
        <div ref={ref} style={{ padding: 40, background: "orange" }}>
          Click outside
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
