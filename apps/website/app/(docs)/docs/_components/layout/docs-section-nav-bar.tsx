"use client";

import { Container } from "@kuzenbo/core/ui/container";
import { Tabs } from "@kuzenbo/core/ui/tabs";
import Link from "next/link";
import { cn } from "tailwind-variants";

import { docsSectionEntries } from "@/lib/docs/docs-manifest";

export const DocsSectionNavBar = () => (
  <div className="sticky top-14 z-sticky border-b bg-background">
    <Container className="flex items-center gap-4 border-x">
      <nav
        aria-label="Documentation sections"
        className="-mx-1 flex-1 overflow-x-auto px-1"
      >
        <Tabs value="overview">
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
