import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { useIsomorphicEffect } from "../use-isomorphic-effect";

export const baseMeta = {
  title: "Hooks/useIsomorphicEffect",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

type Story = StoryObj<typeof baseMeta>;

const UseIsomorphicEffectDemo = () => {
  const [count, setCount] = useState(0);
  const [effectRuns, setEffectRuns] = useState(0);
  const handleIncrement = useCallback(() => {
    setCount((value) => value + 1);
  }, []);

  useIsomorphicEffect(() => {
    setEffectRuns((value) => value + 1);
  }, [count]);

  return (
    <div className="border-border bg-card text-card-foreground max-w-md rounded-lg border p-6 shadow-sm">
      {/* hooks is standalone and cannot import core Typography primitives. */}
      <h2 className="text-base font-medium">useIsomorphicEffect Demo</h2>
      <p className="text-muted-foreground mt-2 text-sm">
        Increment to trigger effect reruns. In browser contexts this uses{" "}
        <code>useLayoutEffect</code>.
      </p>

      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
        <dt className="font-medium">Count</dt>
        <dd>{count}</dd>
        <dt className="font-medium">Effect runs</dt>
        <dd>{effectRuns}</dd>
      </dl>

      <button
        className="bg-secondary text-secondary-foreground mt-4 inline-flex h-9 items-center justify-center rounded-md px-3 text-sm"
        onClick={handleIncrement}
        type="button"
      >
        Increment
      </button>
    </div>
  );
};

export const Default: Story = {
  render: () => <UseIsomorphicEffectDemo />,
};
