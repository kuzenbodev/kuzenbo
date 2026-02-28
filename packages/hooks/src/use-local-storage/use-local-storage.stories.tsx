import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useEffect, useState } from "react";

import { readLocalStorageValue, useLocalStorage } from "./use-local-storage";

const meta = {
  title: "hooks/use-local-storage",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;
const key = "mantine-use-local-storage-1";

const UsageStory = () => {
  const [id, set] = useLocalStorage({
    getInitialValueInEffect: false,
    key,
  });
  const [storedValue, setStoredValue] = useState<unknown>(null);
  const setTestValue = useCallback(() => {
    set("test-value");
  }, [set]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setStoredValue(readLocalStorageValue({ key }));
    }, 20);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <p>Hook value: {String(id)}</p>
      <p>Local storage value: {String(storedValue)}</p>
      <button type="button" onClick={setTestValue}>
        set
      </button>
    </div>
  );
};

export const Usage: Story = {
  render: UsageStory,
};
