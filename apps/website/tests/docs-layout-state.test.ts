import { expect, test } from "bun:test";

import { docsSectionEntries } from "../lib/docs/docs-manifest";
import {
  DEFAULT_DOCS_SECTION_ID,
  isDocsHrefActive,
  resolveDocsHrefFromSegments,
  resolveDocsSectionIdFromSegments,
} from "../lib/docs/layout-state";

test("docs root falls back to the default docs section", () => {
  const activeSection = resolveDocsSectionIdFromSegments(
    [],
    docsSectionEntries
  );

  expect(activeSection).toBe(DEFAULT_DOCS_SECTION_ID);
  expect(resolveDocsHrefFromSegments([])).toBe("/docs");
});

test("docs component route resolves the components section", () => {
  const segments = ["components", "button"];

  expect(resolveDocsSectionIdFromSegments(segments, docsSectionEntries)).toBe(
    "components"
  );
  expect(resolveDocsHrefFromSegments(segments)).toBe("/docs/components/button");
});

test("unknown sections fall back to the default docs section", () => {
  const activeSection = resolveDocsSectionIdFromSegments(
    ["unknown-section", "child"],
    docsSectionEntries
  );

  expect(activeSection).toBe(DEFAULT_DOCS_SECTION_ID);
});

test("active href matching handles section roots and nested pages", () => {
  expect(isDocsHrefActive("/docs/components/button", "/docs/components")).toBe(
    true
  );
  expect(isDocsHrefActive("/docs/components", "/docs/components/button")).toBe(
    false
  );
  expect(
    isDocsHrefActive("/docs/hooks/use-mobile", "/docs/hooks/use-mobile")
  ).toBe(true);
});
