"use client";

import type { ReactNode } from "react";

import { Container } from "@kuzenbo/core/ui/container";
import { useSelectedLayoutSegments } from "next/navigation";

import { docsSectionEntries } from "@/lib/docs/docs-manifest";
import {
  resolveDocsHrefFromSegments,
  resolveDocsSectionIdFromSegments,
} from "@/lib/docs/layout-state";

import { DocsMobileSectionsDrawer } from "./docs-mobile-sections-drawer";
import { DocsMobileTocDrawer } from "./docs-mobile-toc-drawer";
import { DocsSectionNavBar } from "./docs-section-nav-bar";
import { DocsSidebarSection } from "./docs-sidebar-section";
import { DocsSidebarToc } from "./docs-sidebar-toc";

interface DocsLayoutChromeProps {
  children: ReactNode;
}

export const DocsLayoutChrome = ({ children }: DocsLayoutChromeProps) => {
  const segments = useSelectedLayoutSegments();
  const activeHref = resolveDocsHrefFromSegments(segments);
  const activeSectionId = resolveDocsSectionIdFromSegments(
    segments,
    docsSectionEntries
  );
  const fallbackSection =
    docsSectionEntries.find((section) => section.id === "getting-started") ??
    docsSectionEntries[0];

  if (!fallbackSection) {
    return <Container className="flex-1 py-6 lg:py-8">{children}</Container>;
  }

  const activeSection =
    docsSectionEntries.find((section) => section.id === activeSectionId) ??
    fallbackSection;

  return (
    <>
      <DocsSectionNavBar activeSection={activeSection} />
      <Container className="flex-1 border-x">
        <div className="mb-4 flex items-center gap-2 lg:hidden">
          <DocsMobileSectionsDrawer
            activeHref={activeHref}
            section={activeSection}
          />
          <DocsMobileTocDrawer />
        </div>
        <div className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_14rem] xl:gap-8">
          <DocsSidebarSection activeHref={activeHref} section={activeSection} />
          <main className="min-w-0 py-4">{children}</main>
          <DocsSidebarToc />
        </div>
      </Container>
    </>
  );
};
