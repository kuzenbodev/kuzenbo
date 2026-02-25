import { Container, Tabs } from "@kuzenbo/core";
import Link from "next/link";
import { cn } from "tailwind-variants";

import type { DocsSectionEntry } from "@/lib/docs/docs-manifest";

import { docsSectionEntries } from "@/lib/docs/docs-manifest";

export interface DocsSectionNavBarProps {
  activeSection: DocsSectionEntry;
}

export const DocsSectionNavBar = ({
  activeSection,
}: DocsSectionNavBarProps) => (
  <div className="sticky top-14 z-40 border-b bg-background">
    <Container className="flex items-center gap-4 border-x">
      <nav
        aria-label="Documentation sections"
        className="-mx-1 flex-1 overflow-x-auto px-1"
      >
        <Tabs value={activeSection.id}>
          <Tabs.List className="w-full min-w-max" variant="line">
            {docsSectionEntries.map((section, index) => (
              <Tabs.Trigger
                className={cn(index === 0 && "px-0")}
                key={section.id}
                render={<Link href={section.href} />}
                value={section.id}
                nativeButton={false}
              >
                {section.title}
              </Tabs.Trigger>
            ))}
            <Tabs.Indicator />
          </Tabs.List>
        </Tabs>
      </nav>
    </Container>
  </div>
);
