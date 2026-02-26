import type { Route } from "next";

import { Button } from "@kuzenbo/core/ui/button";
import Link from "next/link";

import type { DocsSectionEntry } from "@/lib/docs/docs-manifest";

import { isDocsHrefActive } from "@/lib/docs/layout-state";

export interface DocsSectionLinksProps {
  activeHref: Route;
  section: DocsSectionEntry;
}

export const DocsSectionLinks = ({
  activeHref,
  section,
}: DocsSectionLinksProps) => (
  <nav aria-label={`${section.title} section pages`}>
    <ul className="m-0 grid list-none gap-1 p-0">
      {section.pages.map((page) => (
        <li key={page.href}>
          <Button
            className="w-full justify-start"
            nativeButton={false}
            render={<Link href={page.href} />}
            size="sm"
            variant={
              isDocsHrefActive(activeHref, page.href) ? "outline" : "ghost"
            }
          >
            {page.title}
          </Button>
        </li>
      ))}
    </ul>
  </nav>
);
