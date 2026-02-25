import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

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
});
