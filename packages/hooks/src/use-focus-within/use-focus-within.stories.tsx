import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { useFocusWithin } from "./use-focus-within";

const meta = {
  title: "hooks/use-focus-within",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const UsageStory = () => {
  const [visible, setVisible] = useState(false);
  const { focused, ref } = useFocusWithin();
  const handleToggle = useCallback(() => {
    setVisible((value) => !value);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      {visible && (
        <div
          ref={ref}
          style={{ padding: 40, background: focused ? "orange" : "cyan" }}
        >
          <input />
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

const StaleClosureFixStory = () => {
  const [focusCount, setFocusCount] = useState(0);
  const [blurCount, setBlurCount] = useState(0);
  const handleBlur = useCallback(() => {
    console.log("blurred!");
    setBlurCount((current) => current + 1);
  }, []);
  const handleFocus = useCallback(() => {
    console.log("focused!");
    setFocusCount((current) => current + 1);
  }, []);

  const { focused, ref } = useFocusWithin({
    onBlur: handleBlur,
    onFocus: handleFocus,
  });

  return (
    <div style={{ padding: 40 }}>
      <p>focusCount = {focusCount}</p>
      <p>blurCount = {blurCount}</p>
      <p>focused = {focused ? "true" : "false"}</p>
      <form ref={ref} style={{ border: "2px solid gray", padding: 20 }}>
        <input type="text" placeholder="Click here (inside form)" />
      </form>
      <button type="button" style={{ marginTop: 20 }}>
        Click here (outside form)
      </button>
      <p style={{ color: "gray", marginTop: 20 }}>
        Move focus between the input and the button. Both counts should
        increment each time.
      </p>
    </div>
  );
};

export const StaleClosureFix: Story = {
  render: StaleClosureFixStory,
};
