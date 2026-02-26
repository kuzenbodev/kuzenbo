import type { Route } from "next";

import type { DocsSectionEntry } from "@/lib/docs/docs-manifest";

export const DEFAULT_DOCS_SECTION_ID: DocsSectionEntry["id"] =
  "getting-started";

export const resolveDocsSectionIdFromSegments = (
  segments: readonly string[],
  sections: readonly DocsSectionEntry[]
): DocsSectionEntry["id"] => {
  const [firstSegment] = segments;
  if (!firstSegment) {
    return DEFAULT_DOCS_SECTION_ID;
  }

  const matchedSection = sections.find(
    (section) => section.id === firstSegment
  );
  return matchedSection?.id ?? DEFAULT_DOCS_SECTION_ID;
};

export const resolveDocsHrefFromSegments = (
  segments: readonly string[]
): Route => {
  if (segments.length === 0) {
    return "/docs";
  }

  return `/docs/${segments.join("/")}` as Route;
};

export const isDocsHrefActive = (
  currentHref: string,
  candidateHref: string
): boolean =>
  currentHref === candidateHref || currentHref.startsWith(`${candidateHref}/`);
