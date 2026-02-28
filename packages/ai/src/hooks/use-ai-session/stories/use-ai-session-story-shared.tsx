import type { Meta, StoryObj } from "@storybook/react";
import { useCallback } from "react";

import { useAiSession } from "../use-ai-session";

export const baseMeta = {
  title: "AI/useAiSession",
  tags: ["autodocs"],
} satisfies Meta;

type Story = StoryObj<typeof baseMeta>;

const Demo = () => {
  const session = useAiSession();
  const handleStart = useCallback(() => {
    session.start();
  }, [session]);

  return (
    <div className="border-border bg-card text-card-foreground space-y-2 rounded-lg border p-4 text-sm">
      <div>Active: {String(session.active)}</div>
      <div>Messages: {session.messages}</div>
      <button
        className="border-border rounded-md border px-3 py-1"
        onClick={handleStart}
        type="button"
      >
        Start
      </button>
    </div>
  );
};

export const Default: Story = {
  render: () => <Demo />,
};
