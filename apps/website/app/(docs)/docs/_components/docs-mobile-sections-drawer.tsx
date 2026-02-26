import type { Route } from "next";

import { Button } from "@kuzenbo/core/ui/button";
import { Drawer } from "@kuzenbo/core/ui/drawer";

import type { DocsSectionEntry } from "@/lib/docs/docs-manifest";

import { DocsSectionLinks } from "./docs-section-links";

export interface DocsMobileSectionsDrawerProps {
  activeHref: Route;
  section: DocsSectionEntry;
}

export const DocsMobileSectionsDrawer = ({
  activeHref,
  section,
}: DocsMobileSectionsDrawerProps) => (
  <Drawer.Root swipeDirection="down">
    <Drawer.Trigger
      aria-label="Open docs section navigation"
      render={
        <Button
          aria-label="Open docs section navigation"
          className="flex-1"
          size="sm"
          variant="outline"
        />
      }
    >
      Sections
    </Drawer.Trigger>
    <Drawer.Portal>
      <Drawer.Backdrop />
      <Drawer.Viewport>
        <Drawer.Popup>
          <Drawer.Content className="mx-0 w-full max-w-none">
            <div className="mb-3 flex items-center justify-center">
              <Drawer.Handle className="mb-0" />
            </div>
            <Drawer.Title className="text-base leading-none">
              {section.title}
            </Drawer.Title>
            <Drawer.Description className="mt-2 mb-4 text-sm">
              Jump to any page in this section.
            </Drawer.Description>
            <DocsSectionLinks activeHref={activeHref} section={section} />
          </Drawer.Content>
        </Drawer.Popup>
      </Drawer.Viewport>
    </Drawer.Portal>
  </Drawer.Root>
);
