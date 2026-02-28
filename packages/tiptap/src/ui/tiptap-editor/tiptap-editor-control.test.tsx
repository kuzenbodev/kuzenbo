import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";

import { TIPTAP_CONTROL_REQUIREMENTS } from "../../editor/capabilities";
import type { TiptapEditorPreset } from "../../editor/create-tiptap-extensions-preset";
import { useKuzenboEditor } from "../../editor/use-kuzenbo-editor";
import { TiptapEditor } from "./tiptap-editor";
import { createTiptapControl } from "./tiptap-editor-control";

afterEach(cleanup);

const EditorHarness = ({
  children,
  preset = "minimal",
}: {
  children: ReactNode;
  preset?: TiptapEditorPreset;
}) => {
  const editor = useKuzenboEditor({
    content: "<p>hello</p>",
    preset,
  });

  if (!editor) {
    return null;
  }

  return (
    <TiptapEditor.Root editor={editor}>
      <TiptapEditor.Toolbar>
        <TiptapEditor.ControlsGroup>{children}</TiptapEditor.ControlsGroup>
      </TiptapEditor.Toolbar>
      <TiptapEditor.Content />
    </TiptapEditor.Root>
  );
};

describe("TiptapEditor controls", () => {
  const SlashGuardControl = createTiptapControl({
    command: () => 0,
    id: "slash-guard",
    label: "Slash guard",
    requirement: TIPTAP_CONTROL_REQUIREMENTS.slash,
  });

  let consoleWarnMock: ReturnType<typeof mock>;
  let originalWarn: typeof console.warn;

  beforeEach(() => {
    consoleWarnMock = mock(() => 0);
    originalWarn = console.warn;
    console.warn = consoleWarnMock;
  });

  afterEach(() => {
    console.warn = originalWarn;
  });

  it("disables controls when extension requirements are missing", async () => {
    render(
      <EditorHarness preset="minimal">
        <SlashGuardControl />
      </EditorHarness>
    );

    const button = await screen.findByRole("button", { name: "Slash guard" });
    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(button.dataset.disabled).not.toBeNull();

    await waitFor(() => {
      expect(consoleWarnMock).toHaveBeenCalledTimes(1);
    });
  });

  it("keeps enabled controls interactive when requirements exist", async () => {
    render(
      <EditorHarness preset="minimal">
        <TiptapEditor.Bold />
      </EditorHarness>
    );

    const button = await screen.findByRole("button", { name: "Bold" });
    expect(button.getAttribute("aria-disabled")).not.toBe("true");

    await waitFor(() => {
      expect(consoleWarnMock).toHaveBeenCalledTimes(0);
    });
  });
});
