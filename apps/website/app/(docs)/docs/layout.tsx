import { Container } from "@kuzenbo/core/ui/container";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { DocsMobileSectionsDrawer } from "./_components/layout/docs-mobile-sections-drawer";
import { DocsMobileTocDrawer } from "./_components/layout/docs-mobile-toc-drawer";
import { DocsSectionNavBar } from "./_components/layout/docs-section-nav-bar";
import { DocsSidebarSection } from "./_components/layout/docs-sidebar-section";
import { DocsSidebarToc } from "./_components/layout/docs-sidebar-toc";

export const metadata: Metadata = {
  title: {
    default: "Docs",
    template: "%s | Docs",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <DocsSectionNavBar />
      <Container className="flex-1 border-x">
        <div className="mb-4 flex items-center gap-2 lg:hidden">
          <DocsMobileSectionsDrawer />
          <DocsMobileTocDrawer />
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_14rem] xl:gap-8">
          <DocsSidebarSection />
          <main className="min-w-0 py-4">{children}</main>
          <DocsSidebarToc />
        </div>
      </Container>
    </>
  );
}
