import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { useInterval } from "./use-interval";

const meta = {
  title: "hooks/use-interval",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const UsageStory = () => {
  const [counter, setCounter] = useState(0);
  const [timeout, setTimeout] = useState(200);
  const handleIncrementCounter = useCallback(() => {
    setCounter((current) => current + 1);
  }, []);
  const handleSetRandomCounter = useCallback(() => {
    setCounter(Math.random());
  }, []);
  const handleToggleTimeout = useCallback(() => {
    setTimeout((value) => (value === 200 ? 1000 : 200));
  }, []);
  const interval = useInterval(handleIncrementCounter, timeout);
  const handleStartInterval = useCallback(() => {
    interval.start();
  }, [interval]);
  const handleStopInterval = useCallback(() => {
    interval.stop();
  }, [interval]);
  const handleToggleInterval = useCallback(() => {
    interval.toggle();
  }, [interval]);

  return (
    <div>
      <button
        type="button"
        style={{ padding: 40 }}
        onClick={handleSetRandomCounter}
      >
        Set counter
      </button>
      <button
        type="button"
        style={{ padding: 40 }}
        onClick={handleToggleTimeout}
      >
        Set timeout
      </button>
      <button
        type="button"
        style={{ padding: 40 }}
        onClick={handleStartInterval}
      >
        Start
      </button>
      <button
        type="button"
        style={{ padding: 40 }}
        onClick={handleStopInterval}
      >
        Stop
      </button>
      <button
        type="button"
        style={{ padding: 40 }}
        onClick={handleToggleInterval}
      >
        Counter: {counter}
      </button>
    </div>
  );
};

export const Usage: Story = {
  render: UsageStory,
};

const AutoInvokeStory = () => {
  const [counter, setCounter] = useState(0);
  const [timeout, setTimeout] = useState(200);
  const handleIncrementCounter = useCallback(() => {
    setCounter((current) => current + 1);
  }, []);
  const handleSetRandomCounter = useCallback(() => {
    setCounter(Math.random());
  }, []);
  const handleToggleTimeout = useCallback(() => {
    setTimeout((value) => (value === 200 ? 1000 : 200));
  }, []);
  const interval = useInterval(handleIncrementCounter, timeout, {
    autoInvoke: true,
  });
  const handleToggleInterval = useCallback(() => {
    interval.toggle();
  }, [interval]);

  return (
    <div>
      <button
        type="button"
        style={{ padding: 40 }}
        onClick={handleSetRandomCounter}
      >
        Set counter
      </button>
      <button
        type="button"
        style={{ padding: 40 }}
        onClick={handleToggleTimeout}
      >
        Set timeout
      </button>
      <button
        type="button"
        style={{ padding: 40 }}
        onClick={handleToggleInterval}
      >
        Counter: {counter}
      </button>
    </div>
  );
};

export const AutoInvoke: Story = {
  render: AutoInvokeStory,
};
