import { afterEach, describe, expect, it, mock } from "bun:test";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { CodeBlockToolbar } from "./code-block-toolbar";

afterEach(cleanup);

describe("CodeBlockToolbar", () => {
  it("renders default language/title content", () => {
    render(<CodeBlockToolbar language="ts" title="Example.ts" />);

    expect(screen.getByText("ts")).toBeDefined();
    expect(screen.getByText("Example.ts")).toBeDefined();
  });

  it("passes copy integration context to slot render functions", () => {
    const onCopy = mock(async () => {
      await Promise.resolve();
    });

    render(
      <CodeBlockToolbar
        copyValue="const enabled = true;"
        language="ts"
        onCopy={onCopy}
        end={({ copy, copyValue }) => (
          <button
            onClick={async () => {
              await copy();
            }}
            type="button"
          >
            {copyValue}
          </button>
        )}
      />
    );

    fireEvent.click(screen.getByRole("button"));

    expect(onCopy).toHaveBeenCalledWith("const enabled = true;");
  });
});
