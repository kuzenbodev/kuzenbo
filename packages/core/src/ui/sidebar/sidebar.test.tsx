import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Sidebar, SidebarContent, SidebarProvider } from "./sidebar";

afterEach(cleanup);

describe("Sidebar", () => {
  it("renders within provider", () => {
    render(
      <SidebarProvider>
        <Sidebar collapsible="none">
          <SidebarContent>Nav content</SidebarContent>
        </Sidebar>
      </SidebarProvider>
    );
    expect(screen.getByText("Nav content")).toBeDefined();
  });

  it("has data-slot when collapsible none", () => {
    render(
      <SidebarProvider>
        <Sidebar collapsible="none">
          <SidebarContent>x</SidebarContent>
        </Sidebar>
      </SidebarProvider>
    );
    expect(document.querySelector("[data-slot=sidebar]")).toBeDefined();
  });

  it("keeps rail keyboard-accessible and updates expanded state semantics", async () => {
    const user = userEvent.setup();

    render(
      <SidebarProvider defaultOpen>
        <Sidebar collapsible="icon">
          <Sidebar.Rail />
          <SidebarContent>Nav content</SidebarContent>
        </Sidebar>
      </SidebarProvider>
    );

    const collapseRail = screen.getByRole("button", {
      name: "Collapse Sidebar",
    });
    expect(collapseRail.tabIndex).toBe(0);
    expect(collapseRail.getAttribute("aria-expanded")).toBe("true");

    await user.click(collapseRail);

    const expandRail = screen.getByRole("button", {
      name: "Expand Sidebar",
    });
    expect(expandRail.getAttribute("aria-expanded")).toBe("false");
  });
});
