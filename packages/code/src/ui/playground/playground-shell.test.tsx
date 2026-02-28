import { afterEach, describe, expect, it } from "bun:test";

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import { definePlaygroundControls } from "../../playground/playground-control-model";
import { PlaygroundShell } from "./playground-shell";

afterEach(cleanup);

interface DemoPreviewProps {
  variant: string;
  disabled: boolean;
  children: string;
}

const DemoPreview = ({ variant, disabled, children }: DemoPreviewProps) => (
  <button
    className="border-border rounded-md border px-3 py-1"
    data-disabled={String(disabled)}
    data-variant={variant}
    disabled={disabled}
    type="button"
  >
    {children}
  </button>
);

const controls = definePlaygroundControls([
  {
    defaultValue: false,
    initialValue: false,
    prop: "disabled",
    type: "boolean",
  },
  {
    defaultValue: "filled",
    initialValue: "filled",
    options: ["filled", "outline"],
    prop: "variant",
    type: "select",
  },
  {
    defaultValue: "Action",
    initialValue: "Action",
    prop: "children",
    type: "string",
  },
] as const);

describe("PlaygroundShell", () => {
  it("injects state into preview and updates code output in minimal mode", async () => {
    render(
      <PlaygroundShell
        codeMode="minimal"
        controls={controls}
        preview={
          <DemoPreview disabled={false} variant="filled" children="Action" />
        }
        template="<Button{{props}}>{{children}}</Button>"
      />
    );

    const previewButton = screen.getByRole("button", { name: "Action" });
    expect(previewButton.dataset.variant).toBe("filled");

    fireEvent.change(screen.getByRole("textbox", { name: "Children" }), {
      target: { value: "Submit" },
    });

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Submit" })).toBeDefined();
    });
    expect(screen.getByText(/<Button[\s\S]*Submit/)).toBeDefined();
  });
});
