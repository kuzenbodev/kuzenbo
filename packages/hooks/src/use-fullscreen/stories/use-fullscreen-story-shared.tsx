import type { Meta, StoryObj } from "@storybook/react";

import { useCallback, useState } from "react";

import { useFullscreen } from "../use-fullscreen";

export const baseMeta = {
  title: "Hooks/useFullscreen",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

type Story = StoryObj<typeof baseMeta>;

const UseFullscreenDemo = () => {
  const { ref, toggle, fullscreen } = useFullscreen<HTMLDivElement>();
  const [error, setError] = useState<string | null>(null);

  const handleToggle = useCallback(async () => {
    try {
      await toggle();
      setError(null);
    } catch {
      setError("Fullscreen action was blocked by the browser.");
    }
  }, [toggle]);

  return (
    <div className="max-w-lg rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
      {/* hooks is standalone and cannot import core Typography primitives. */}
      <h2 className="text-base font-medium">useFullscreen Demo</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Click the button to toggle fullscreen for the demo panel.
      </p>

      <div
        className="mt-4 flex min-h-40 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground"
        ref={ref}
      >
        {fullscreen ? "Fullscreen active" : "Inline mode"}
      </div>

      <button
        className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm text-primary-foreground"
        onClick={handleToggle}
        type="button"
      >
        {fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      </button>

      {error ? (
        <p className="mt-3 text-sm text-danger-foreground" role="status">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export const Default: Story = {
  render: () => <UseFullscreenDemo />,
};
