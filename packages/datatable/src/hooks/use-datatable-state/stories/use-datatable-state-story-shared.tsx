import type { Meta, StoryObj } from "@storybook/react";

import { useCallback } from "react";

import { useDatatableState } from "../use-datatable-state";

export const baseMeta = {
  title: "Datatable/useDatatableState",
  tags: ["autodocs"],
} satisfies Meta;

type Story = StoryObj<typeof baseMeta>;

const Demo = () => {
  const state = useDatatableState();
  const handleNextPage = useCallback(() => {
    state.setPage(state.page + 1);
  }, [state]);

  return (
    <div className="space-y-2 rounded-lg border border-border bg-card p-4">
      <p className="text-sm">Current page: {state.page}</p>
      <button
        className="rounded-md border border-border px-3 py-1 text-sm"
        onClick={handleNextPage}
        type="button"
      >
        Next page
      </button>
    </div>
  );
};

export const Default: Story = {
  render: () => <Demo />,
};
