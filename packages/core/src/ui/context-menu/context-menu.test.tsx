import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { ContextMenu } from "./context-menu";

afterEach(cleanup);

const contextMenuItemCallbackClassName = () => "context-menu-item-callback";
const contextMenuLinkItemCallbackClassName = () =>
  "context-menu-link-item-callback";
const queryRequiredElement = (selector: string) => {
  const element = document.querySelector<HTMLElement>(selector);

  if (!element) {
    throw new Error(`Expected element to match selector: ${selector}`);
  }

  return element;
};

describe("ContextMenu", () => {
  it("renders trigger area", () => {
    render(
      <ContextMenu>
        <ContextMenu.Trigger>Right-click here</ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>Copy</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>
    );
    expect(screen.getByText("Right-click here")).toBeDefined();
  });

  it("opens on context menu", () => {
    render(
      <ContextMenu>
        <ContextMenu.Trigger>Right-click</ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>Copy</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>
    );
    fireEvent.contextMenu(screen.getByText("Right-click"));
    expect(screen.getByText("Copy")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <ContextMenu>
        <ContextMenu.Trigger>Area</ContextMenu.Trigger>
        <ContextMenu.Content>Content</ContextMenu.Content>
      </ContextMenu>
    );
    expect(document.querySelector("[data-slot=context-menu]")).toBeDefined();
  });

  it("uses md as default root size and cascades to overlay descendants", () => {
    render(
      <ContextMenu>
        <ContextMenu.Trigger>Area</ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Group>
            <ContextMenu.Label>Actions</ContextMenu.Label>
            <ContextMenu.Item>
              Copy
              <ContextMenu.Shortcut>⌘C</ContextMenu.Shortcut>
            </ContextMenu.Item>
          </ContextMenu.Group>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>More</ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.Item>Nested item</ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>
        </ContextMenu.Content>
      </ContextMenu>
    );

    fireEvent.contextMenu(screen.getByText("Area"));

    const popup = queryRequiredElement("[data-slot=context-menu-content]");
    const item = queryRequiredElement("[data-slot=context-menu-item]");
    const label = queryRequiredElement("[data-slot=context-menu-label]");
    const shortcut = queryRequiredElement("[data-slot=context-menu-shortcut]");
    const subTrigger = queryRequiredElement(
      "[data-slot=context-menu-sub-trigger]"
    );

    expect(popup.dataset.size).toBe("md");
    expect(item.dataset.size).toBe("md");
    expect(label.dataset.size).toBe("md");
    expect(shortcut.dataset.size).toBe("md");
    expect(subTrigger.dataset.size).toBe("md");
  });

  it("prefers content size over root size for overlay descendants", () => {
    render(
      <ContextMenu size="xs">
        <ContextMenu.Trigger>Area</ContextMenu.Trigger>
        <ContextMenu.Content size="xl">
          <ContextMenu.Group>
            <ContextMenu.Label>Actions</ContextMenu.Label>
            <ContextMenu.Item>Copy</ContextMenu.Item>
          </ContextMenu.Group>
        </ContextMenu.Content>
      </ContextMenu>
    );

    fireEvent.contextMenu(screen.getByText("Area"));

    const popup = queryRequiredElement("[data-slot=context-menu-content]");
    const item = queryRequiredElement("[data-slot=context-menu-item]");
    const label = queryRequiredElement("[data-slot=context-menu-label]");

    expect(popup.dataset.size).toBe("xl");
    expect(item.dataset.size).toBe("xl");
    expect(label.dataset.size).toBe("xl");
  });

  it("prefers explicit item size over content and root sizes", () => {
    render(
      <ContextMenu size="xs">
        <ContextMenu.Trigger>Area</ContextMenu.Trigger>
        <ContextMenu.Content size="sm">
          <ContextMenu.Item size="lg">Copy</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>
    );

    fireEvent.contextMenu(screen.getByText("Area"));

    const popup = queryRequiredElement("[data-slot=context-menu-content]");
    const item = queryRequiredElement("[data-slot=context-menu-item]");

    expect(popup.dataset.size).toBe("sm");
    expect(item.dataset.size).toBe("lg");
  });

  it("preserves class contracts for item and link item", () => {
    render(
      <ContextMenu>
        <ContextMenu.Trigger>Right-click area</ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item
            className={contextMenuItemCallbackClassName}
            inset
            variant="danger"
          >
            Delete row
          </ContextMenu.Item>
          <ContextMenu.Item>Copy row</ContextMenu.Item>
          <ContextMenu.LinkItem
            className={contextMenuLinkItemCallbackClassName}
            href="#"
            inset
            variant="danger"
          >
            Open docs
          </ContextMenu.LinkItem>
        </ContextMenu.Content>
      </ContextMenu>
    );

    fireEvent.contextMenu(screen.getByText("Right-click area"));

    const item = screen.getByRole("menuitem", { name: "Delete row" });
    expect(item.className.includes("group/context-menu-item")).toBe(true);
    expect(item.className.includes("context-menu-item-callback")).toBe(true);
    expect(item.className.includes("text-danger-foreground")).toBe(true);
    expect(item.className.includes("focus:text-danger-foreground")).toBe(true);
    expect(
      item.className.includes(
        "data-[variant=danger]:focus:text-danger-foreground"
      )
    ).toBe(false);
    expect(item.dataset.inset).toBe("true");
    expect(item.dataset.variant).toBe("danger");

    const defaultItem = screen.getByRole("menuitem", { name: "Copy row" });
    expect(
      defaultItem.className.includes("focus:*:[svg]:text-accent-foreground")
    ).toBe(true);
    expect(defaultItem.className.includes("text-danger-foreground")).toBe(
      false
    );
    expect(defaultItem.dataset.variant).toBe("default");

    const linkItem = queryRequiredElement("[data-slot=context-menu-link-item]");
    expect(linkItem.className.includes("group/context-menu-link-item")).toBe(
      true
    );
    expect(linkItem.className.includes("context-menu-link-item-callback")).toBe(
      true
    );
    expect(linkItem.className.includes("focus:text-danger-foreground")).toBe(
      true
    );
    expect(
      linkItem.className.includes(
        "data-[variant=danger]:focus:text-danger-foreground"
      )
    ).toBe(false);
    expect(linkItem.dataset.inset).toBe("true");
    expect(linkItem.dataset.variant).toBe("danger");
  });

  it("supports manual portal/positioner/popup composition with link items", () => {
    render(
      <ContextMenu>
        <ContextMenu.Trigger>Right-click custom</ContextMenu.Trigger>
        <ContextMenu.Portal>
          <ContextMenu.Backdrop />
          <ContextMenu.Positioner>
            <ContextMenu.Popup>
              <ContextMenu.Arrow />
              <ContextMenu.LinkItem href="#">Open docs</ContextMenu.LinkItem>
            </ContextMenu.Popup>
          </ContextMenu.Positioner>
        </ContextMenu.Portal>
      </ContextMenu>
    );

    fireEvent.contextMenu(screen.getByText("Right-click custom"));

    expect(screen.getByText("Open docs")).toBeDefined();
    expect(
      document.querySelector("[data-slot=context-menu-backdrop]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=context-menu-positioner]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=context-menu-popup]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=context-menu-arrow]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=context-menu-link-item]")
    ).toBeDefined();
  });
});
