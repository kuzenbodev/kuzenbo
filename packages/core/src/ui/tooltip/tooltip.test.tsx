import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { Tooltip } from "./tooltip";

afterEach(cleanup);

const TOOLTIP_CONTENT_CLASS_NAME = () => "tooltip-content-from-fn";

describe("Tooltip", () => {
  it("renders trigger", () => {
    render(
      <Tooltip>
        <Tooltip.Trigger>Hover me</Tooltip.Trigger>
        <Tooltip.Content>Tooltip text</Tooltip.Content>
      </Tooltip>
    );
    expect(screen.getByText("Hover me")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <Tooltip>
        <Tooltip.Trigger>Trigger</Tooltip.Trigger>
        <Tooltip.Content>Content</Tooltip.Content>
      </Tooltip>
    );
    expect(document.querySelector("[data-slot=tooltip]")).toBeDefined();
  });

  it("merges content className callback output with base classes", () => {
    render(
      <Tooltip defaultOpen>
        <Tooltip.Trigger>Trigger</Tooltip.Trigger>
        <Tooltip.Content className={TOOLTIP_CONTENT_CLASS_NAME}>
          Content
        </Tooltip.Content>
      </Tooltip>
    );

    const content = document.querySelector<HTMLElement>(
      "[data-slot=tooltip-content]"
    );
    expect(content?.className.includes("tooltip-content-from-fn")).toBe(true);
    expect(content?.className.includes("rounded-md")).toBe(true);
  });

  it("supports explicit Portal/Positioner/Popup/Arrow/Viewport composition", () => {
    render(
      <Tooltip defaultOpen>
        <Tooltip.Trigger>Trigger</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={8}>
            <Tooltip.Popup>
              <Tooltip.Arrow />
              <Tooltip.Viewport>Composed Tooltip</Tooltip.Viewport>
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    );

    expect(document.querySelector("[data-slot=tooltip-portal]")).toBeDefined();
    expect(
      document.querySelector("[data-slot=tooltip-positioner]")
    ).toBeDefined();
    expect(document.querySelector("[data-slot=tooltip-popup]")).toBeDefined();
    expect(document.querySelector("[data-slot=tooltip-arrow]")).toBeDefined();
    expect(
      document.querySelector("[data-slot=tooltip-viewport]")
    ).toBeDefined();
    expect(screen.getByText("Composed Tooltip")).toBeDefined();
  });

  it("applies positioner CSS variable sizing classes for placement math", () => {
    render(
      <Tooltip defaultOpen>
        <Tooltip.Trigger>Trigger</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner side="top" sideOffset={8}>
            <Tooltip.Popup>
              <Tooltip.Arrow />
              <Tooltip.Viewport>Composed Tooltip</Tooltip.Viewport>
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    );

    const positioner = document.querySelector(
      "[data-slot=tooltip-positioner]"
    ) as HTMLElement;
    expect(positioner.className.includes("h-[var(--positioner-height)]")).toBe(
      true
    );
    expect(positioner.className.includes("w-[var(--positioner-width)]")).toBe(
      true
    );
    expect(
      positioner.className.includes("max-w-[var(--available-width)]")
    ).toBe(true);
  });

  it("inherits root size in Tooltip.Content by default", () => {
    render(
      <Tooltip defaultOpen size="xs">
        <Tooltip.Trigger>Trigger</Tooltip.Trigger>
        <Tooltip.Content>Sized tooltip</Tooltip.Content>
      </Tooltip>
    );

    const content = document.querySelector(
      "[data-slot=tooltip-content]"
    ) as HTMLElement;
    expect(content.dataset.size).toBe("xs");
    expect(content.className.includes("max-w-40")).toBe(true);
  });

  it("lets content size override root size", () => {
    render(
      <Tooltip defaultOpen size="sm">
        <Tooltip.Trigger>Trigger</Tooltip.Trigger>
        <Tooltip.Content size="xl">Sized tooltip</Tooltip.Content>
      </Tooltip>
    );

    const content = document.querySelector(
      "[data-slot=tooltip-content]"
    ) as HTMLElement;
    expect(content.dataset.size).toBe("xl");
    expect(content.className.includes("max-w-md")).toBe(true);
  });

  it("inherits root size in composed Popup when size is omitted", () => {
    render(
      <Tooltip defaultOpen size="lg">
        <Tooltip.Trigger>Trigger</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner>
            <Tooltip.Popup>
              <Tooltip.Viewport>Composed tooltip</Tooltip.Viewport>
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    );

    const popup = document.querySelector(
      "[data-slot=tooltip-popup]"
    ) as HTMLElement;
    expect(popup.dataset.size).toBe("lg");
    expect(popup.className.includes("max-w-sm")).toBe(true);
  });
});
