import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { ResizablePanel, ResizablePanelGroup } from "./resizable";

afterEach(cleanup);

describe("ResizablePanelGroup", () => {
  it("renders panels", () => {
    render(
      <ResizablePanelGroup>
        <ResizablePanel defaultSize={50}>Panel 1</ResizablePanel>
        <ResizablePanelGroup.Handle />
        <ResizablePanel defaultSize={50}>Panel 2</ResizablePanel>
      </ResizablePanelGroup>
    );
    expect(screen.getByText("Panel 1")).toBeDefined();
    expect(screen.getByText("Panel 2")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <ResizablePanelGroup>
        <ResizablePanel>Content</ResizablePanel>
      </ResizablePanelGroup>
    );
    expect(
      document.querySelector("[data-slot=resizable-panel-group]")
    ).toBeDefined();
  });
});
