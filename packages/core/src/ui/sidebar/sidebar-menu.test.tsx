import type { ReactNode } from "react";

import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import {
  Sidebar,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "./sidebar";

afterEach(cleanup);

const queryRequiredElement = (selector: string) => {
  const element = document.querySelector<HTMLElement>(selector);

  if (!element) {
    throw new Error(`Expected element to match selector: ${selector}`);
  }

  return element;
};

const renderSidebarMenu = (menu: ReactNode) => {
  render(
    <SidebarProvider>
      <Sidebar collapsible="none">{menu}</Sidebar>
    </SidebarProvider>
  );
};

describe("SidebarMenu", () => {
  it("uses md as default root size and cascades to descendants", () => {
    renderSidebarMenu(
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>Dashboard</SidebarMenuButton>
          <SidebarMenuAction aria-label="Open actions">+</SidebarMenuAction>
          <SidebarMenuBadge>3</SidebarMenuBadge>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuSkeleton showIcon />
        </SidebarMenuItem>
        <SidebarMenuSub>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton href="#">Nested</SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </SidebarMenu>
    );

    const menu = queryRequiredElement("[data-slot=sidebar-menu]");
    const button = queryRequiredElement("[data-slot=sidebar-menu-button]");
    const action = queryRequiredElement("[data-slot=sidebar-menu-action]");
    const badge = queryRequiredElement("[data-slot=sidebar-menu-badge]");
    const skeleton = queryRequiredElement("[data-slot=sidebar-menu-skeleton]");
    const sub = queryRequiredElement("[data-slot=sidebar-menu-sub]");
    const subButton = queryRequiredElement(
      "[data-slot=sidebar-menu-sub-button]"
    );

    expect(menu.dataset.size).toBe("md");
    expect(button.dataset.size).toBe("md");
    expect(action.dataset.size).toBe("md");
    expect(badge.dataset.size).toBe("md");
    expect(skeleton.dataset.size).toBe("md");
    expect(sub.dataset.size).toBe("md");
    expect(subButton.dataset.size).toBe("md");
  });

  it("cascades explicit root size to descendants", () => {
    renderSidebarMenu(
      <SidebarMenu size="xl">
        <SidebarMenuItem>
          <SidebarMenuButton>Dashboard</SidebarMenuButton>
          <SidebarMenuAction aria-label="Open actions">+</SidebarMenuAction>
          <SidebarMenuBadge>3</SidebarMenuBadge>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuSkeleton showIcon />
        </SidebarMenuItem>
        <SidebarMenuSub>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton href="#">Nested</SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </SidebarMenu>
    );

    const menu = queryRequiredElement("[data-slot=sidebar-menu]");
    const button = queryRequiredElement("[data-slot=sidebar-menu-button]");
    const action = queryRequiredElement("[data-slot=sidebar-menu-action]");
    const badge = queryRequiredElement("[data-slot=sidebar-menu-badge]");
    const skeleton = queryRequiredElement("[data-slot=sidebar-menu-skeleton]");
    const sub = queryRequiredElement("[data-slot=sidebar-menu-sub]");
    const subButton = queryRequiredElement(
      "[data-slot=sidebar-menu-sub-button]"
    );

    expect(menu.dataset.size).toBe("xl");
    expect(button.dataset.size).toBe("xl");
    expect(action.dataset.size).toBe("xl");
    expect(badge.dataset.size).toBe("xl");
    expect(skeleton.dataset.size).toBe("xl");
    expect(sub.dataset.size).toBe("xl");
    expect(subButton.dataset.size).toBe("xl");
  });

  it("prefers explicit child size over root size", () => {
    renderSidebarMenu(
      <SidebarMenu size="xl">
        <SidebarMenuItem>
          <SidebarMenuButton size="xs">Dashboard</SidebarMenuButton>
          <SidebarMenuAction aria-label="Open actions" size="sm">
            +
          </SidebarMenuAction>
          <SidebarMenuBadge size="md">3</SidebarMenuBadge>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuSkeleton size="lg" showIcon />
        </SidebarMenuItem>
        <SidebarMenuSub size="sm">
          <SidebarMenuSubItem>
            <SidebarMenuSubButton href="#" size="xs">
              Nested
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </SidebarMenu>
    );

    const menu = queryRequiredElement("[data-slot=sidebar-menu]");
    const button = queryRequiredElement("[data-slot=sidebar-menu-button]");
    const action = queryRequiredElement("[data-slot=sidebar-menu-action]");
    const badge = queryRequiredElement("[data-slot=sidebar-menu-badge]");
    const skeleton = queryRequiredElement("[data-slot=sidebar-menu-skeleton]");
    const sub = queryRequiredElement("[data-slot=sidebar-menu-sub]");
    const subButton = queryRequiredElement(
      "[data-slot=sidebar-menu-sub-button]"
    );

    expect(menu.dataset.size).toBe("xl");
    expect(button.dataset.size).toBe("xs");
    expect(action.dataset.size).toBe("sm");
    expect(badge.dataset.size).toBe("md");
    expect(skeleton.dataset.size).toBe("lg");
    expect(sub.dataset.size).toBe("sm");
    expect(subButton.dataset.size).toBe("xs");
  });

  it("keeps fixed icon-collapsed button box behavior", () => {
    renderSidebarMenu(
      <SidebarMenu size="xl">
        <SidebarMenuItem>
          <SidebarMenuButton>Dashboard</SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );

    const button = queryRequiredElement("[data-slot=sidebar-menu-button]");
    expect(
      button.className.includes("group-data-[collapsible=icon]:size-8!")
    ).toBe(true);
  });
});
