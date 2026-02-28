import { afterEach, describe, expect, it } from "bun:test";

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import { definePlaygroundControls } from "../../playground/playground-control-model";
import {
  definePlaygroundPresets,
  type PlaygroundPreset,
} from "../../playground/playground-preset-model";
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
    type: "boolean",
    prop: "disabled",
    initialValue: false,
    defaultValue: false,
  },
  {
    type: "select",
    prop: "variant",
    options: ["filled", "outline"],
    initialValue: "filled",
    defaultValue: "filled",
  },
  {
    type: "string",
    prop: "children",
    initialValue: "Action",
    defaultValue: "Action",
  },
] as const);

const presets = definePlaygroundPresets([
  {
    id: "outlineLocked",
    label: "Outline locked",
    values: {
      variant: "outline",
    },
    locks: ["variant"],
  },
] as const satisfies readonly PlaygroundPreset<
  {
    disabled: boolean;
    variant: string;
    children: string;
  },
  "outlineLocked"
>[]);

describe("PlaygroundShell", () => {
  it("injects state into preview and updates code output in minimal mode", async () => {
    render(
      <PlaygroundShell
        codeMode="minimal"
        controls={controls}
        presets={presets}
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

  it("applies preset locking to controls", () => {
    render(
      <PlaygroundShell
        codeMode="minimal"
        controls={controls}
        presets={presets}
        preview={
          <DemoPreview disabled={false} variant="filled" children="Action" />
        }
        template="<Button{{props}}>{{children}}</Button>"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Outline locked/i }));

    const variantSelect = screen.getByRole("combobox", { name: "Variant" });
    expect(variantSelect).toHaveProperty("disabled", true);
    expect(
      screen.getByText('<Button variant="outline">Action</Button>')
    ).toBeDefined();
  });
});
