import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "bun:test";

import {
  NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuBackdrop,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "./navigation-menu";

afterEach(cleanup);

const NAVIGATION_INDICATOR_CLASS_NAME = () => "navigation-indicator-from-fn";

describe("NavigationMenu", () => {
  it("renders menu items", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Product</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#">Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    expect(screen.getByText("Product")).toBeDefined();
  });

  it("opens content on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#">Nav Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    await user.click(screen.getByText("Item"));
    expect(screen.getByText("Nav Link")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    expect(document.querySelector("[data-slot=navigation-menu]")).toBeDefined();
  });

  it("uses md as default root size and cascades to trigger, popup, and link surfaces", async () => {
    const user = userEvent.setup();

    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#">Overview</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    await user.click(screen.getByText("Products"));

    const root = document.querySelector<HTMLElement>(
      "[data-slot=navigation-menu]"
    );
    const trigger = document.querySelector<HTMLElement>(
      "[data-slot=navigation-menu-trigger]"
    );
    const popup = document.querySelector<HTMLElement>(
      "[data-slot=navigation-menu-popup]"
    );
    const content = document.querySelector<HTMLElement>(
      "[data-slot=navigation-menu-content]"
    );
    const link = document.querySelector<HTMLElement>(
      "[data-slot=navigation-menu-link]"
    );

    expect(root?.dataset.size).toBe("md");
    expect(trigger?.dataset.size).toBe("md");
    expect(popup?.dataset.size).toBe("md");
    expect(content?.dataset.size).toBe("md");
    expect(link?.dataset.size).toBe("md");
  });

  it("prefers content size over root size for content descendants", async () => {
    const user = userEvent.setup();

    render(
      <NavigationMenu size="xs">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent size="xl">
              <NavigationMenuLink href="#">Overview</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    await user.click(screen.getByText("Products"));

    const root = document.querySelector<HTMLElement>(
      "[data-slot=navigation-menu]"
    );
    const trigger = document.querySelector<HTMLElement>(
      "[data-slot=navigation-menu-trigger]"
    );
    const popup = document.querySelector<HTMLElement>(
      "[data-slot=navigation-menu-popup]"
    );
    const content = document.querySelector<HTMLElement>(
      "[data-slot=navigation-menu-content]"
    );
    const link = document.querySelector<HTMLElement>(
      "[data-slot=navigation-menu-link]"
    );

    expect(root?.dataset.size).toBe("xs");
    expect(trigger?.dataset.size).toBe("xs");
    expect(popup?.dataset.size).toBe("xs");
    expect(content?.dataset.size).toBe("xl");
    expect(link?.dataset.size).toBe("xl");
  });

  it("prefers explicit link size over content and root sizes", async () => {
    const user = userEvent.setup();

    render(
      <NavigationMenu size="xs">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent size="sm">
              <NavigationMenuLink href="#" size="lg">
                Overview
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    await user.click(screen.getByText("Products"));

    const content = document.querySelector<HTMLElement>(
      "[data-slot=navigation-menu-content]"
    );
    const link = document.querySelector<HTMLElement>(
      "[data-slot=navigation-menu-link]"
    );

    expect(content?.dataset.size).toBe("sm");
    expect(link?.dataset.size).toBe("lg");
  });

  it("merges indicator className callback output with base classes", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Item
              <NavigationMenuIndicator
                className={NAVIGATION_INDICATOR_CLASS_NAME}
              />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#">Nav Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    const indicator = document.querySelector<HTMLElement>(
      "[data-slot=navigation-menu-indicator]"
    );

    expect(indicator?.className.includes("navigation-indicator-from-fn")).toBe(
      true
    );
    expect(indicator?.className.includes("top-full")).toBe(true);
  });

  it("renders default portal/positioner/popup/viewport pipeline", async () => {
    const user = userEvent.setup();
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Default pipeline</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#">Item</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    await user.click(screen.getByText("Default pipeline"));

    expect(
      document.querySelector("[data-slot=navigation-menu-portal]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=navigation-menu-positioner]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=navigation-menu-popup]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=navigation-menu-viewport]")
    ).toBeDefined();
  });

  it("supports custom arrow and backdrop composition", async () => {
    const user = userEvent.setup();
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Custom parts</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="#">Custom Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuPortal>
          <NavigationMenuBackdrop />
          <NavigationMenuPositioner>
            <NavigationMenuPopup>
              <NavigationMenuArrow />
              <NavigationMenuViewport />
            </NavigationMenuPopup>
          </NavigationMenuPositioner>
        </NavigationMenuPortal>
      </NavigationMenu>
    );

    await user.click(screen.getByText("Custom parts"));

    expect(
      document.querySelector("[data-slot=navigation-menu-backdrop]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=navigation-menu-arrow]")
    ).toBeDefined();
  });
});
