import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "bun:test";

import { Menubar } from "./menubar";

afterEach(cleanup);

const menubarItemCallbackClassName = () => "menubar-item-callback";
const menubarLinkItemCallbackClassName = () => "menubar-link-item-callback";
const queryRequiredElement = (selector: string) => {
  const element = document.querySelector<HTMLElement>(selector);

  if (!element) {
    throw new Error(`Expected element to match selector: ${selector}`);
  }

  return element;
};

describe("Menubar", () => {
  it("renders menu triggers", () => {
    render(
      <Menubar>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>New</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar>
    );
    expect(screen.getByRole("menuitem", { name: "File" })).toBeDefined();
  });

  it("opens menu on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Menubar>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item>New</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar>
    );
    await user.click(screen.getByRole("menuitem", { name: "File" }));
    expect(screen.getByText("New")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <Menubar>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>Content</Menubar.Content>
        </Menubar.Menu>
      </Menubar>
    );
    expect(document.querySelector("[data-slot=menubar]")).toBeDefined();
  });

  it("uses md as default root size and cascades to trigger and overlay descendants", async () => {
    const user = userEvent.setup();

    render(
      <Menubar>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Group>
              <Menubar.Label>Actions</Menubar.Label>
              <Menubar.Item>
                Settings
                <Menubar.Shortcut>⌘S</Menubar.Shortcut>
              </Menubar.Item>
            </Menubar.Group>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar>
    );

    await user.click(screen.getByRole("menuitem", { name: "File" }));

    const root = queryRequiredElement("[data-slot=menubar]");
    const trigger = queryRequiredElement("[data-slot=menubar-trigger]");
    const popup = queryRequiredElement("[data-slot=menubar-content]");
    const label = queryRequiredElement("[data-slot=menubar-label]");
    const item = queryRequiredElement("[data-slot=menubar-item]");
    const shortcut = queryRequiredElement("[data-slot=menubar-shortcut]");

    expect(root.dataset.size).toBe("md");
    expect(trigger.dataset.size).toBe("md");
    expect(popup.dataset.size).toBe("md");
    expect(label.dataset.size).toBe("md");
    expect(item.dataset.size).toBe("md");
    expect(shortcut.dataset.size).toBe("md");
  });

  it("prefers content size over root size for overlay descendants", async () => {
    const user = userEvent.setup();

    render(
      <Menubar size="xs">
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content size="xl">
            <Menubar.Group>
              <Menubar.Label>Actions</Menubar.Label>
              <Menubar.Item>Settings</Menubar.Item>
            </Menubar.Group>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar>
    );

    await user.click(screen.getByRole("menuitem", { name: "File" }));

    const root = queryRequiredElement("[data-slot=menubar]");
    const trigger = queryRequiredElement("[data-slot=menubar-trigger]");
    const popup = queryRequiredElement("[data-slot=menubar-content]");
    const item = queryRequiredElement("[data-slot=menubar-item]");
    const label = queryRequiredElement("[data-slot=menubar-label]");

    expect(root.dataset.size).toBe("xs");
    expect(trigger.dataset.size).toBe("xs");
    expect(popup.dataset.size).toBe("xl");
    expect(item.dataset.size).toBe("xl");
    expect(label.dataset.size).toBe("xl");
  });

  it("prefers explicit item size over content and root sizes", async () => {
    const user = userEvent.setup();

    render(
      <Menubar size="xs">
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content size="sm">
            <Menubar.Item size="lg">Settings</Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar>
    );

    await user.click(screen.getByRole("menuitem", { name: "File" }));

    const popup = queryRequiredElement("[data-slot=menubar-content]");
    const item = queryRequiredElement("[data-slot=menubar-item]");

    expect(popup.dataset.size).toBe("sm");
    expect(item.dataset.size).toBe("lg");
  });

  it("preserves class contracts for item and link item", async () => {
    const user = userEvent.setup();

    render(
      <Menubar>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item
              className={menubarItemCallbackClassName}
              inset
              variant="danger"
            >
              Delete tab
            </Menubar.Item>
            <Menubar.Item>Rename tab</Menubar.Item>
            <Menubar.LinkItem
              className={menubarLinkItemCallbackClassName}
              href="#"
              inset
              variant="danger"
            >
              Open docs
            </Menubar.LinkItem>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar>
    );

    await user.click(screen.getByRole("menuitem", { name: "File" }));

    const item = screen.getByRole("menuitem", { name: "Delete tab" });
    expect(item.className.includes("group/dropdown-menu-item")).toBe(true);
    expect(item.className.includes("group/menubar-item")).toBe(true);
    expect(item.className.includes("menubar-item-callback")).toBe(true);
    expect(item.className.includes("text-danger")).toBe(true);
    expect(item.className.includes("*:[svg]:!text-danger")).toBe(true);
    expect(
      item.className.includes("data-[variant=danger]:*:[svg]:!text-danger")
    ).toBe(false);
    expect(item.dataset.inset).toBe("true");
    expect(item.dataset.variant).toBe("danger");

    const defaultItem = screen.getByRole("menuitem", { name: "Rename tab" });
    expect(
      defaultItem.className.includes("focus:**:text-accent-foreground")
    ).toBe(true);
    expect(defaultItem.className.includes("text-danger")).toBe(false);
    expect(defaultItem.dataset.variant).toBe("default");

    const linkItem = queryRequiredElement("[data-slot=menubar-link-item]");
    expect(linkItem.className.includes("group/dropdown-menu-link-item")).toBe(
      true
    );
    expect(linkItem.className.includes("group/menubar-link-item")).toBe(true);
    expect(linkItem.className.includes("menubar-link-item-callback")).toBe(
      true
    );
    expect(linkItem.className.includes("text-danger-foreground")).toBe(true);
    expect(linkItem.className.includes("*:[svg]:!text-danger-foreground")).toBe(
      true
    );
    expect(
      linkItem.className.includes(
        "data-[variant=danger]:*:[svg]:!text-danger-foreground"
      )
    ).toBe(false);
    expect(linkItem.dataset.inset).toBe("true");
    expect(linkItem.dataset.variant).toBe("danger");
  });

  it("supports manual portal/positioner/popup composition with link items", async () => {
    const user = userEvent.setup();
    render(
      <Menubar>
        <Menubar.Menu>
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Backdrop />
            <Menubar.Positioner>
              <Menubar.Popup>
                <Menubar.Arrow />
                <Menubar.LinkItem href="#">Settings</Menubar.LinkItem>
              </Menubar.Popup>
            </Menubar.Positioner>
          </Menubar.Portal>
        </Menubar.Menu>
      </Menubar>
    );

    await user.click(screen.getByRole("menuitem", { name: "File" }));

    expect(screen.getByText("Settings")).toBeDefined();
    expect(
      document.querySelector("[data-slot=menubar-backdrop]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=menubar-positioner]")
    ).toBeDefined();
    expect(document.querySelector("[data-slot=menubar-popup]")).toBeDefined();
    expect(document.querySelector("[data-slot=menubar-arrow]")).toBeDefined();
    expect(
      document.querySelector("[data-slot=menubar-link-item]")
    ).toBeDefined();
  });
});
