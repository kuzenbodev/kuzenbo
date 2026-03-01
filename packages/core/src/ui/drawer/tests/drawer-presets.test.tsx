import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useState } from "react";

import { Drawer } from "../drawer";

afterEach(cleanup);

describe("Drawer presets", () => {
  it("opens and closes BottomSheet with built-in trigger", async () => {
    const user = userEvent.setup();

    render(
      <Drawer.BottomSheet trigger="Open">
        <Drawer.Title>Bottom sheet preset</Drawer.Title>
        <Drawer.Close>Close</Drawer.Close>
      </Drawer.BottomSheet>
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.queryByRole("dialog")).not.toBeNull();
    expect(screen.queryByText("Bottom sheet preset")).not.toBeNull();

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("supports controlled BottomSheet mode without trigger", async () => {
    const user = userEvent.setup();

    const ControlledBottomSheet = () => {
      const [open, setOpen] = useState(true);

      return (
        <Drawer.BottomSheet onOpenChange={setOpen} open={open}>
          <Drawer.Title>Controlled preset</Drawer.Title>
          <Drawer.Close>Close controlled</Drawer.Close>
        </Drawer.BottomSheet>
      );
    };

    render(<ControlledBottomSheet />);
    expect(screen.queryByText("Controlled preset")).not.toBeNull();

    await user.click(screen.getByRole("button", { name: "Close controlled" }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull();
    });
  });

  it("renders handle in BottomSheet by default and supports opting out", () => {
    const { rerender } = render(
      <Drawer.BottomSheet defaultOpen>
        <Drawer.Title>Bottom sheet handle</Drawer.Title>
      </Drawer.BottomSheet>
    );

    expect(document.querySelector("[data-slot=drawer-handle]")).not.toBeNull();

    rerender(
      <Drawer.BottomSheet defaultOpen showHandle={false}>
        <Drawer.Title>Bottom sheet no handle</Drawer.Title>
      </Drawer.BottomSheet>
    );

    expect(document.querySelector("[data-slot=drawer-handle]")).toBeNull();
  });

  it("maps SidePanel side to popup swipe direction", () => {
    render(
      <Drawer.SidePanel defaultOpen side="left">
        <Drawer.Title>Side panel preset</Drawer.Title>
      </Drawer.SidePanel>
    );

    const popup = document.querySelector<HTMLElement>(
      "[data-slot=drawer-popup]"
    );
    expect(popup).not.toBeNull();
    const popupElement = popup as HTMLElement;
    expect(popupElement.dataset.swipeDirection).toBe("left");
    expect(document.querySelector("[data-slot=drawer-handle]")).toBeNull();
  });

  it("renders ActionSheet content and optional destructive action", () => {
    render(
      <Drawer.ActionSheet
        defaultOpen
        destructiveAction={<button type="button">Delete</button>}
      >
        <Drawer.Title className="sr-only">Actions</Drawer.Title>
        <p>Primary actions</p>
      </Drawer.ActionSheet>
    );

    expect(screen.queryByText("Primary actions")).not.toBeNull();
    expect(screen.queryByRole("button", { name: "Delete" })).not.toBeNull();
    expect(document.querySelector("[data-slot=drawer-handle]")).toBeNull();
  });

  it("toggles IndentShell active state while a preset drawer opens and closes", async () => {
    const user = userEvent.setup();

    render(
      <Drawer.IndentShell>
        <Drawer.BottomSheet trigger="Open indented drawer">
          <Drawer.Title>Indent shell preset</Drawer.Title>
          <Drawer.Close>Close indented drawer</Drawer.Close>
        </Drawer.BottomSheet>
      </Drawer.IndentShell>
    );

    const indent = document.querySelector<HTMLElement>(
      "[data-slot=drawer-indent]"
    );
    const indentBackground = document.querySelector<HTMLElement>(
      "[data-slot=drawer-indent-background]"
    );

    expect(indent).not.toBeNull();
    expect(indentBackground).not.toBeNull();
    const indentElement = indent as HTMLElement;
    const indentBackgroundElement = indentBackground as HTMLElement;
    expect(indentElement.dataset.active).toBeUndefined();
    expect(indentBackgroundElement.dataset.active).toBeUndefined();

    await user.click(
      screen.getByRole("button", { name: "Open indented drawer" })
    );
    await waitFor(() => {
      expect(indentElement.dataset.active).toBe("");
      expect(indentBackgroundElement.dataset.active).toBe("");
    });

    await user.click(
      screen.getByRole("button", { name: "Close indented drawer" })
    );
    await waitFor(() => {
      expect(indentElement.dataset.active).toBeUndefined();
      expect(indentBackgroundElement.dataset.active).toBeUndefined();
    });
  });

  it("preserves popup style contract markers when using presets", () => {
    render(
      <Drawer.BottomSheet
        defaultOpen
        popupProps={{ className: "popup-sentinel" }}
      >
        <Drawer.Title>Preset style contract</Drawer.Title>
      </Drawer.BottomSheet>
    );

    const popup = document.querySelector<HTMLElement>(
      "[data-slot=drawer-popup]"
    );
    expect(popup).not.toBeNull();
    const popupElement = popup as HTMLElement;
    const popupClass = popupElement.className;

    expect(popupClass.includes("popup-sentinel")).toBe(true);
    expect(popupClass.includes("--drawer-swipe-movement-y")).toBe(true);
    expect(popupClass.includes("data-nested-drawer-open")).toBe(true);
  });

  it("forwards trigger, portal, viewport, popup, and content props in BottomSheet preset", async () => {
    const user = userEvent.setup();
    const container = document.createElement("div");
    container.setAttribute("id", "drawer-preset-portal-target");
    document.body.append(container);

    render(
      <Drawer.BottomSheet
        contentProps={{ className: "content-sentinel" }}
        popupProps={{ className: "popup-sentinel" }}
        portalProps={{ container }}
        trigger="Open with props"
        triggerProps={{ className: "trigger-sentinel" }}
        viewportProps={{ className: "viewport-sentinel" }}
      >
        <Drawer.Title>Forwarded props</Drawer.Title>
      </Drawer.BottomSheet>
    );

    const trigger = document.querySelector<HTMLElement>(
      "[data-slot=drawer-trigger]"
    );
    expect(trigger).not.toBeNull();
    const triggerElement = trigger as HTMLElement;
    expect(triggerElement.className.includes("trigger-sentinel")).toBe(true);

    await user.click(screen.getByRole("button", { name: "Open with props" }));

    const viewport = document.querySelector<HTMLElement>(
      "[data-slot=drawer-viewport]"
    );
    const popup = document.querySelector<HTMLElement>(
      "[data-slot=drawer-popup]"
    );
    const content = document.querySelector<HTMLElement>(
      "[data-slot=drawer-content]"
    );
    expect(viewport).not.toBeNull();
    expect(popup).not.toBeNull();
    expect(content).not.toBeNull();
    const viewportElement = viewport as HTMLElement;
    const popupElement = popup as HTMLElement;
    const contentElement = content as HTMLElement;

    expect(viewportElement.className.includes("viewport-sentinel")).toBe(true);
    expect(popupElement.className.includes("popup-sentinel")).toBe(true);
    expect(contentElement.className.includes("content-sentinel")).toBe(true);
    expect(container.contains(popupElement)).toBe(true);
  });
});
