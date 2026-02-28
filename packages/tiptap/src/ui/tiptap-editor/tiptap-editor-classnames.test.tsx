import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { TiptapEditor } from "./tiptap-editor";
import type { TiptapEditorClassNames } from "./tiptap-editor-context";

afterEach(cleanup);

describe("TiptapEditor className contract", () => {
  it("applies slot classNames with the renamed group key", () => {
    const { container } = render(
      <TiptapEditor.Root
        className="root-local"
        classNames={{
          control: "control-context",
          group: "group-context",
          root: "root-context",
          toolbar: "toolbar-context",
        }}
        editor={null}
        variant="subtle"
      >
        <TiptapEditor.Toolbar
          className="toolbar-local"
          data-testid="toolbar"
          sticky
        >
          <TiptapEditor.ControlsGroup
            className="group-local"
            data-testid="group"
          >
            <TiptapEditor.Control
              className="control-local"
              label="Custom control"
            />
          </TiptapEditor.ControlsGroup>
        </TiptapEditor.Toolbar>
      </TiptapEditor.Root>
    );

    const root = container.querySelector('[data-slot="kb-tiptap-root"]');
    expect(root).toBeInstanceOf(HTMLElement);
    expect((root as HTMLElement).className.includes("kb-tiptap-root")).toBe(
      true
    );
    expect(
      (root as HTMLElement).className.includes("group/kb-tiptap-root")
    ).toBe(true);
    expect((root as HTMLElement).className.includes("gap-2")).toBe(true);
    expect((root as HTMLElement).className.includes("p-2")).toBe(true);
    expect((root as HTMLElement).className.includes("root-context")).toBe(true);
    expect((root as HTMLElement).className.includes("root-local")).toBe(true);
    expect((root as HTMLElement).dataset.size).toBe("md");

    const toolbar = screen.getByTestId("toolbar");
    expect(toolbar.className.includes("kb-tiptap-toolbar")).toBe(true);
    expect(toolbar.className.includes("sticky")).toBe(true);
    expect(
      toolbar.className.includes("top-(--kb-tiptap-toolbar-offset)")
    ).toBe(true);
    expect(toolbar.className.includes("z-elevated")).toBe(true);
    expect(
      toolbar.className.includes("bg-transparent p-0 shadow-none outline-none")
    ).toBe(true);
    expect(toolbar.className.includes("toolbar-context")).toBe(true);
    expect(toolbar.className.includes("toolbar-local")).toBe(true);
    expect(toolbar.dataset.size).toBe("md");

    const group = screen.getByTestId("group");
    expect(group.className.includes("kb-tiptap-controls-group")).toBe(true);
    expect(
      group.className.includes("border-transparent bg-transparent p-0")
    ).toBe(true);
    expect(group.className.includes("group-context")).toBe(true);
    expect(group.className.includes("group-local")).toBe(true);
    expect(group.dataset.size).toBe("md");

    const control = screen.getByRole("button", { name: "Custom control" });
    expect(control.className.includes("kb-tiptap-control")).toBe(true);
    expect(control.className.includes("control-context")).toBe(true);
    expect(control.className.includes("control-local")).toBe(true);
    expect(control.dataset.size).toBe("md");
  });

  it("does not support the removed controlsGroup classNames key", () => {
    const compatibilityClassNames = {
      controlsGroup: "group-compat",
    } as unknown as TiptapEditorClassNames;

    render(
      <TiptapEditor.Root classNames={compatibilityClassNames} editor={null}>
        <TiptapEditor.Toolbar>
          <TiptapEditor.ControlsGroup data-testid="group" />
        </TiptapEditor.Toolbar>
      </TiptapEditor.Root>
    );

    const group = screen.getByTestId("group");
    expect(group.className.includes("group-compat")).toBe(false);
    expect(group.className.includes("kb-tiptap-controls-group")).toBe(true);
  });

  it("supports explicit root size and propagates it to toolbar surfaces", () => {
    const { container } = render(
      <TiptapEditor.Root editor={null} size="xl">
        <TiptapEditor.Toolbar data-testid="toolbar">
          <TiptapEditor.ControlsGroup data-testid="group">
            <TiptapEditor.Control label="XL control" />
          </TiptapEditor.ControlsGroup>
        </TiptapEditor.Toolbar>
      </TiptapEditor.Root>
    );

    const root = container.querySelector('[data-slot="kb-tiptap-root"]');
    const toolbar = screen.getByTestId("toolbar");
    const group = screen.getByTestId("group");
    const control = screen.getByRole("button", { name: "XL control" });

    expect((root as HTMLElement).dataset.size).toBe("xl");
    expect(toolbar.dataset.size).toBe("xl");
    expect(group.dataset.size).toBe("xl");
    expect(control.dataset.size).toBe("xl");
  });
});
