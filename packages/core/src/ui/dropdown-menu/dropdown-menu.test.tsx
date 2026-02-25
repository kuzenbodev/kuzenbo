import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "bun:test";

import { Menu } from "../../index";
import { DropdownMenu } from "./dropdown-menu";

afterEach(cleanup);

const dropdownItemCallbackClassName = () => "dropdown-item-callback";
const dropdownLinkItemCallbackClassName = () => "dropdown-link-item-callback";
const dropdownSubTriggerCallbackClassName = () =>
  "dropdown-sub-trigger-callback";
const queryRequiredElement = (selector: string) => {
  const element = document.querySelector<HTMLElement>(selector);

  if (!element) {
    throw new Error(`Expected element to match selector: ${selector}`);
  }

  return element;
};

describe("DropdownMenu", () => {
  it("renders trigger", () => {
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>Item 1</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
    expect(screen.getByRole("button", { name: "Open" })).toBeDefined();
  });

  it("opens and shows content on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>Menu Item</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByText("Menu Item")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content>Content</DropdownMenu.Content>
      </DropdownMenu>
    );
    expect(document.querySelector("[data-slot=dropdown-menu]")).toBeDefined();
  });

  it("uses md as default root size and cascades to overlay descendants", () => {
    render(
      <DropdownMenu open>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.Label>Actions</DropdownMenu.Label>
            <DropdownMenu.Item>
              Settings
              <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item>Nested item</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Content>
      </DropdownMenu>
    );

    const popup = queryRequiredElement("[data-slot=dropdown-menu-content]");
    const item = queryRequiredElement("[data-slot=dropdown-menu-item]");
    const label = queryRequiredElement("[data-slot=dropdown-menu-label]");
    const shortcut = queryRequiredElement("[data-slot=dropdown-menu-shortcut]");
    const subTrigger = queryRequiredElement(
      "[data-slot=dropdown-menu-sub-trigger]"
    );

    expect(popup.dataset.size).toBe("md");
    expect(item.dataset.size).toBe("md");
    expect(label.dataset.size).toBe("md");
    expect(shortcut.dataset.size).toBe("md");
    expect(subTrigger.dataset.size).toBe("md");
  });

  it("prefers content size over root size for overlay descendants", () => {
    render(
      <DropdownMenu open size="xs">
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content size="xl">
          <DropdownMenu.Group>
            <DropdownMenu.Label>Actions</DropdownMenu.Label>
            <DropdownMenu.Item>Settings</DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu>
    );

    const popup = queryRequiredElement("[data-slot=dropdown-menu-content]");
    const item = queryRequiredElement("[data-slot=dropdown-menu-item]");
    const label = queryRequiredElement("[data-slot=dropdown-menu-label]");

    expect(popup.dataset.size).toBe("xl");
    expect(item.dataset.size).toBe("xl");
    expect(label.dataset.size).toBe("xl");
  });

  it("prefers explicit item size over content and root sizes", () => {
    render(
      <DropdownMenu open size="xs">
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content size="sm">
          <DropdownMenu.Item size="lg">Settings</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    );

    const popup = queryRequiredElement("[data-slot=dropdown-menu-content]");
    const item = queryRequiredElement("[data-slot=dropdown-menu-item]");

    expect(popup.dataset.size).toBe("sm");
    expect(item.dataset.size).toBe("lg");
  });

  it("keeps Menu alias behavior in sync with DropdownMenu sizing", () => {
    render(
      <Menu open size="xl">
        <Menu.Trigger>Open</Menu.Trigger>
        <Menu.Content>
          <Menu.Item>Profile</Menu.Item>
        </Menu.Content>
      </Menu>
    );

    const popup = queryRequiredElement("[data-slot=dropdown-menu-content]");
    const item = queryRequiredElement("[data-slot=dropdown-menu-item]");

    expect(popup.dataset.size).toBe("xl");
    expect(item.dataset.size).toBe("xl");
  });

  it("preserves class contracts for item, link item, and sub trigger", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item
            className={dropdownItemCallbackClassName}
            inset
            variant="danger"
          >
            Delete item
          </DropdownMenu.Item>
          <DropdownMenu.Item>Rename item</DropdownMenu.Item>
          <DropdownMenu.LinkItem
            className={dropdownLinkItemCallbackClassName}
            href="#"
            inset
            variant="danger"
          >
            Open docs
          </DropdownMenu.LinkItem>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger
              className={dropdownSubTriggerCallbackClassName}
              inset
            >
              More actions
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item>Nested item</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Content>
      </DropdownMenu>
    );

    await user.click(screen.getByRole("button", { name: "Open" }));

    const item = screen.getByRole("menuitem", { name: "Delete item" });
    expect(item.className.includes("group/dropdown-menu-item")).toBe(true);
    expect(item.className.includes("dropdown-item-callback")).toBe(true);
    expect(item.className.includes("text-danger-foreground")).toBe(true);
    expect(item.className.includes("focus:text-danger-foreground")).toBe(true);
    expect(
      item.className.includes("data-[variant=danger]:text-danger-foreground")
    ).toBe(false);
    expect(item.dataset.inset).toBe("true");
    expect(item.dataset.variant).toBe("danger");

    const defaultItem = screen.getByRole("menuitem", { name: "Rename item" });
    expect(
      defaultItem.className.includes("focus:**:text-accent-foreground")
    ).toBe(true);
    expect(defaultItem.className.includes("text-danger-foreground")).toBe(
      false
    );
    expect(defaultItem.dataset.variant).toBe("default");

    const linkItem = queryRequiredElement(
      "[data-slot=dropdown-menu-link-item]"
    );
    expect(linkItem.className.includes("group/dropdown-menu-link-item")).toBe(
      true
    );
    expect(linkItem.className.includes("dropdown-link-item-callback")).toBe(
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

    const subTrigger = screen.getByRole("menuitem", { name: "More actions" });
    expect(subTrigger.className.includes("dropdown-sub-trigger-callback")).toBe(
      true
    );
    expect(subTrigger.className.includes("data-open:bg-accent")).toBe(true);
    expect(subTrigger.dataset.inset).toBe("true");
  });

  it("supports manual portal/positioner/popup composition with link items", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Backdrop />
          <DropdownMenu.Positioner>
            <DropdownMenu.Popup>
              <DropdownMenu.Arrow />
              <DropdownMenu.LinkItem href="#">
                Documentation
              </DropdownMenu.LinkItem>
            </DropdownMenu.Popup>
          </DropdownMenu.Positioner>
        </DropdownMenu.Portal>
      </DropdownMenu>
    );

    await user.click(screen.getByRole("button", { name: "Open" }));

    expect(screen.getByText("Documentation")).toBeDefined();
    expect(
      document.querySelector("[data-slot=dropdown-menu-backdrop]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=dropdown-menu-positioner]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=dropdown-menu-popup]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=dropdown-menu-arrow]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=dropdown-menu-link-item]")
    ).toBeDefined();
  });
});
