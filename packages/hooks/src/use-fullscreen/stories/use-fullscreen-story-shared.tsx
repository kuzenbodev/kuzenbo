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
    <div className="border-border bg-card text-card-foreground max-w-lg rounded-lg border p-6 shadow-sm">
      {/* hooks is standalone and cannot import core Typography primitives. */}
      <h2 className="text-base font-medium">useFullscreen Demo</h2>
      <p className="text-muted-foreground mt-2 text-sm">
        Click the button to toggle fullscreen for the demo panel.
      </p>

      <div
        className="border-border bg-muted text-muted-foreground mt-4 flex min-h-40 items-center justify-center rounded-md border"
        ref={ref}
      >
        {fullscreen ? "Fullscreen active" : "Inline mode"}
      </div>

      <button
        className="bg-primary text-primary-foreground mt-4 inline-flex h-9 items-center justify-center rounded-md px-3 text-sm"
        onClick={handleToggle}
        type="button"
      >
        {fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      </button>

      {error ? (
        <p className="text-danger-foreground mt-3 text-sm" role="status">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export const Default: Story = {
  render: () => <UseFullscreenDemo />,
};
