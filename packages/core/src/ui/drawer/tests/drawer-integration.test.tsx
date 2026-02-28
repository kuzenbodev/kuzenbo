import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Drawer } from "../drawer";

afterEach(cleanup);

describe("Drawer integration and style contracts", () => {
  it("toggles Provider indent state when drawer opens and closes", async () => {
    const user = userEvent.setup();

    render(
      <Drawer.Provider>
        <Drawer.IndentBackground />
        <Drawer.Indent>
          <Drawer.Root>
            <Drawer.Trigger>Open</Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Backdrop />
              <Drawer.Viewport>
                <Drawer.Popup>
                  <Drawer.Content>
                    <Drawer.Title>Indent</Drawer.Title>
                    <Drawer.Close>Close</Drawer.Close>
                  </Drawer.Content>
                </Drawer.Popup>
              </Drawer.Viewport>
            </Drawer.Portal>
          </Drawer.Root>
        </Drawer.Indent>
      </Drawer.Provider>
    );

    const indent = document.querySelector("[data-slot=drawer-indent]");
    const indentBackground = document.querySelector(
      "[data-slot=drawer-indent-background]"
    );
    expect(indent).not.toBeNull();
    expect(indentBackground).not.toBeNull();
    const indentElement = indent as HTMLElement;
    const indentBackgroundElement = indentBackground as HTMLElement;
    expect(indentElement.dataset.active).toBeUndefined();

    await user.click(screen.getByRole("button", { name: "Open" }));
    await waitFor(() => {
      expect(indentElement.dataset.active).toBe("");
      expect(indentBackgroundElement.dataset.active).toBe("");
    });

    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => {
      expect(indentElement.dataset.active).toBeUndefined();
      expect(indentBackgroundElement.dataset.active).toBeUndefined();
    });
  });

  it("reflects swipeDirection on Popup data attributes", () => {
    render(
      <Drawer.Root defaultOpen swipeDirection="right">
        <Drawer.Portal>
          <Drawer.Viewport>
            <Drawer.Popup>
              <Drawer.Content>Body</Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    );

    const popup = document.querySelector("[data-slot=drawer-popup]");
    expect(popup).not.toBeNull();
    expect((popup as HTMLElement).dataset.swipeDirection).toBe("right");
  });

  it("keeps drawer open on outside click when non-modal and pointer dismissal is disabled", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <button type="button">Outside</button>
        <Drawer.Root disablePointerDismissal modal={false}>
          <Drawer.Trigger>Open Non Modal</Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Viewport>
              <Drawer.Popup>
                <Drawer.Content>
                  <Drawer.Title>Non Modal</Drawer.Title>
                </Drawer.Content>
              </Drawer.Popup>
            </Drawer.Viewport>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    );

    await user.click(screen.getByRole("button", { name: "Open Non Modal" }));
    expect(screen.queryByText("Non Modal")).not.toBeNull();

    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByText("Non Modal")).not.toBeNull();
  });

  it("closes on outside click when non-modal and pointer dismissal is enabled", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <button type="button">Outside</button>
        <Drawer.Root modal={false}>
          <Drawer.Trigger>Open Non Modal</Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Viewport>
              <Drawer.Popup>
                <Drawer.Content>
                  <Drawer.Title>Dismissible Non Modal</Drawer.Title>
                </Drawer.Content>
              </Drawer.Popup>
            </Drawer.Viewport>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    );

    await user.click(screen.getByRole("button", { name: "Open Non Modal" }));
    expect(screen.queryByText("Dismissible Non Modal")).not.toBeNull();

    await user.click(screen.getByRole("button", { name: "Outside" }));
    await waitFor(() => {
      expect(screen.queryByText("Dismissible Non Modal")).toBeNull();
    });
  });

  it("renders portal content in a provided container", async () => {
    const user = userEvent.setup();
    const container = document.createElement("div");
    container.setAttribute("id", "drawer-portal-target");
    document.body.append(container);

    render(
      <Drawer.Root>
        <Drawer.Trigger>Open</Drawer.Trigger>
        <Drawer.Portal container={container}>
          <Drawer.Backdrop />
          <Drawer.Viewport>
            <Drawer.Popup>
              <Drawer.Content>
                <Drawer.Title>Container</Drawer.Title>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    const popup = document.querySelector("[data-slot=drawer-popup]");
    expect(popup).not.toBeNull();
    expect(container.contains(popup)).toBe(true);
  });

  it("includes docs-style CSS variable and state selectors in wrapper classes", () => {
    render(
      <Drawer.Root defaultOpen>
        <Drawer.Portal>
          <Drawer.Backdrop />
          <Drawer.Viewport>
            <Drawer.Popup>
              <Drawer.Content>Body</Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    );

    const popup = document.querySelector("[data-slot=drawer-popup]");
    const backdrop = document.querySelector("[data-slot=drawer-backdrop]");
    expect(popup).not.toBeNull();
    expect(backdrop).not.toBeNull();
    const popupClass = (popup as HTMLElement).className;
    const backdropClass = (backdrop as HTMLElement).className;

    expect(popupClass.includes("--drawer-swipe-movement-x")).toBe(true);
    expect(popupClass.includes("--drawer-swipe-movement-y")).toBe(true);
    expect(popupClass.includes("--drawer-snap-point-offset")).toBe(true);
    expect(popupClass.includes("--drawer-height")).toBe(true);
    expect(popupClass.includes("--drawer-frontmost-height")).toBe(true);
    expect(popupClass.includes("--nested-drawers")).toBe(true);
    expect(popupClass.includes("--stack-scale:clamp(")).toBe(true);
    expect(popupClass.includes("[transition:transform_450ms")).toBe(true);
    expect(
      popupClass.includes(
        "data-[swipe-direction=down]:data-[nested-drawer-open]:transform-[translateY(calc(var(--drawer-swipe-movement-y)"
      )
    ).toBe(true);
    expect(
      popupClass.includes(
        "data-[swipe-direction=down]:data-[nested-drawer-open]:!h-[calc(var(--stack-height)+var(--bleed))]"
      )
    ).toBe(true);
    expect(
      popupClass.includes(
        "data-[swipe-direction=up]:data-[nested-drawer-open]:!h-[calc(var(--stack-height)+var(--bleed))]"
      )
    ).toBe(true);
    expect(popupClass).toContain("nested-drawer-open");
    expect(popupClass).toContain("nested-drawer-swiping");
    expect(popupClass).toContain("expanded");

    expect(backdropClass.includes("--drawer-swipe-progress")).toBe(true);
    expect(backdropClass.includes("--drawer-swipe-strength")).toBe(true);
    expect(backdropClass).toContain("dark:bg-background");
    expect(backdropClass).toContain("swiping");
    expect(backdropClass).toContain("starting-style");
    expect(backdropClass).toContain("ending-style");
  });
});
