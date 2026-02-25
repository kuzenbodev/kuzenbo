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
    <div className="space-y-2 rounded-lg border border-border bg-card p-4 text-sm text-card-foreground">
      <div>Active: {String(session.active)}</div>
      <div>Messages: {session.messages}</div>
      <button
        className="rounded-md border border-border px-3 py-1"
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
