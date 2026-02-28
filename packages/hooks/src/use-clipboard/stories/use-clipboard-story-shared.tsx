import type { Meta, StoryObj } from "@storybook/react";
import { type ChangeEvent, useCallback, useState } from "react";

import { useClipboard } from "../use-clipboard";

export const baseMeta = {
  title: "Hooks/useClipboard",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

type Story = StoryObj<typeof baseMeta>;

const UseClipboardDemo = () => {
  const [value, setValue] = useState("bun add @kuzenbo/hooks");
  const { status, errorCode, copy, reset, announcement, announcementProps } =
    useClipboard();

  const handleValueChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value);
    },
    []
  );

  const handleCopy = useCallback(async () => {
    await copy(value);
  }, [copy, value]);

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <div className="border-border bg-card text-card-foreground max-w-xl rounded-lg border p-6 shadow-sm">
      {/* hooks is standalone and cannot import core Typography primitives. */}
      <h2 className="text-base font-medium">useClipboard Demo</h2>
      <p className="text-muted-foreground mt-2 text-sm">
        Copy text to the system clipboard and inspect status + error state.
      </p>

      <label
        className="mt-4 block text-sm font-medium"
        htmlFor="clipboard-input"
      >
        Text to copy
      </label>
      <textarea
        className="border-border bg-background text-foreground mt-2 w-full rounded-md border px-3 py-2 text-sm"
        id="clipboard-input"
        onChange={handleValueChange}
        rows={4}
        value={value}
      />

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          className="bg-primary text-primary-foreground inline-flex h-9 items-center justify-center rounded-md px-3 text-sm"
          onClick={handleCopy}
          type="button"
        >
          Copy text
        </button>
        <button
          className="border-border bg-secondary text-secondary-foreground inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm"
          onClick={handleReset}
          type="button"
        >
          Reset state
        </button>
      </div>

      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
        <dt className="font-medium">Status</dt>
        <dd>{status}</dd>
        <dt className="font-medium">Error code</dt>
        <dd>{errorCode ?? "none"}</dd>
        <dt className="font-medium">Announcement</dt>
        <dd>{announcement || "none"}</dd>
      </dl>

      <p {...announcementProps} className="sr-only" />
    </div>
  );
};

export const Default: Story = {
  render: () => <UseClipboardDemo />,
};
