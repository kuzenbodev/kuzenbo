import type { Route } from "next";

import { NavigationList } from "@kuzenbo/core/ui/navigation-list";
import Link from "next/link";

import type { DocsSectionEntry } from "@/lib/docs/docs-manifest";

import { isDocsHrefActive } from "@/lib/docs/layout-state";

export interface DocsSidebarSectionProps {
  activeHref: Route;
  section: DocsSectionEntry;
}

export const DocsSidebarSection = ({
  activeHref,
  section,
}: DocsSidebarSectionProps) => (
  <aside className="hidden h-full border-r py-4 pr-4 lg:block">
    <div className="max-h-[calc(100svh-9rem)] overflow-y-auto pr-1">
      <NavigationList
        aria-label={`${section.title} section pages`}
        className="w-full"
        variant="light"
      >
        <NavigationList.Content className="border-0 bg-transparent p-0">
          <NavigationList.Group>
            <NavigationList.GroupLabel className="px-0">
              {section.title}
            </NavigationList.GroupLabel>
            <NavigationList.GroupContent>
              {section.pages.map((page) => (
                <NavigationList.Item key={page.href}>
                  <NavigationList.Link
                    active={isDocsHrefActive(activeHref, page.href)}
                    label={page.title}
                    noWrap
                    render={<Link href={page.href} />}
                  />
                </NavigationList.Item>
              ))}
            </NavigationList.GroupContent>
          </NavigationList.Group>
        </NavigationList.Content>
      </NavigationList>
    </div>
  </aside>
);
