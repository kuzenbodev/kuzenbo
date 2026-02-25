import { expect, test } from "bun:test";

import {
  docsRouteEntries,
  docsRoutes,
  docsSectionEntries,
  getDocsRouteEntry,
} from "../lib/docs/docs-manifest";

test("docs manifest exposes canonical migrated routes", () => {
  expect(docsRoutes.length).toBe(152);
  expect(new Set(docsRoutes).size).toBe(docsRoutes.length);

  expect(docsRoutes).toContain("/docs");
  expect(docsRoutes).toContain("/docs/getting-started/installation");
  expect(docsRoutes).toContain("/docs/components/button");
  expect(docsRoutes).toContain("/docs/components/navigation-list");
  expect(docsRoutes).toContain("/docs/hooks/use-clipboard");
  expect(docsRoutes).toContain("/docs/hooks/use-mobile");

  expect(docsRoutes).not.toContain("/docs/components/inputs/button");
});

test("docs section groups include only canonical section pages", () => {
  expect(docsSectionEntries.length).toBe(6);
  expect(
    docsSectionEntries.some((section) => section.id === "components")
  ).toBe(true);

  expect(
    docsSectionEntries.every((section) =>
      section.pages.every((page) => page.href.startsWith(`/docs/${section.id}`))
    )
  ).toBe(true);

  expect(
    docsSectionEntries.some((section) =>
      section.pages.some((page) => page.href === "/docs")
    )
  ).toBe(false);
});

test("route lookups return migrated docs entries", () => {
  const button = getDocsRouteEntry("/docs/components/button");

  expect(button?.title).toBe("Button");
  expect(button?.description.length).toBeGreaterThan(10);

  const missing = getDocsRouteEntry("/docs/components/inputs/button");
  expect(missing).toBeUndefined();

  expect(docsRouteEntries[0]?.href).toBe("/docs");
});
