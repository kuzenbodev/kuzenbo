import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { SidebarInput } from "./sidebar-input";

afterEach(cleanup);

describe("SidebarInput", () => {
  it("uses sm as the default size token", () => {
    render(<SidebarInput placeholder="Search sidebar" />);
    const input = screen.getByPlaceholderText("Search sidebar");
    expect(input.dataset.size).toBe("sm");
  });

  it("supports explicit size overrides", () => {
    render(<SidebarInput placeholder="Search sidebar" size="xl" />);
    const input = screen.getByPlaceholderText("Search sidebar");
    expect(input.dataset.size).toBe("xl");
  });

  it("maps lg override to a taller control height than md", () => {
    render(
      <>
        <SidebarInput placeholder="Sidebar md" size="md" />
        <SidebarInput placeholder="Sidebar lg" size="lg" />
      </>
    );

    const mdInput = screen.getByPlaceholderText("Sidebar md");
    const lgInput = screen.getByPlaceholderText("Sidebar lg");

    expect(mdInput.className.includes("h-9")).toBe(true);
    expect(lgInput.className.includes("h-10")).toBe(true);
  });
});
