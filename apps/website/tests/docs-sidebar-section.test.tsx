import type { Route } from "next";

import { render, screen } from "@testing-library/react";
import { expect, test } from "bun:test";

import type { DocsSectionEntry } from "@/lib/docs/docs-manifest";

import { DocsSidebarSection } from "@/app/(docs)/docs/_components/docs-sidebar-section";

const section: DocsSectionEntry = {
  description: "Components docs section",
  href: "/docs/components",
  id: "components",
  title: "Components",
  pages: [
    {
      description: "Navigation List docs",
      href: "/docs/components/navigation-list",
      order: 1,
      section: "components",
      title: "Navigation List",
    },
    {
      description: "Sidebar docs",
      href: "/docs/components/sidebar",
      order: 2,
      section: "components",
      title: "Sidebar",
    },
  ],
};

test("docs sidebar section uses labeled navigation and link composition", () => {
  render(
    <DocsSidebarSection
      activeHref="/docs/components/navigation-list"
      section={section}
    />
  );

  expect(
    screen.getByRole("navigation", { name: "Components section pages" })
  ).toBeDefined();

  const activeLink = screen.getByRole("link", { name: "Navigation List" });
  const inactiveLink = screen.getByRole("link", { name: "Sidebar" });

  expect(activeLink.getAttribute("href")).toBe(
    "/docs/components/navigation-list"
  );
  expect(inactiveLink.getAttribute("href")).toBe("/docs/components/sidebar");
  expect(activeLink.getAttribute("aria-current")).toBe("page");
});
