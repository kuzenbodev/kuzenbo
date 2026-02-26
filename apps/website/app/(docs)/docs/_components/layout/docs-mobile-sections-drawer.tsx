"use client";

import { Button } from "@kuzenbo/core/ui/button";
import { Drawer } from "@kuzenbo/core/ui/drawer";

import { DocsSectionLinks } from "./docs-section-links";

export const DocsMobileSectionsDrawer = () => (
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
              Sections
            </Drawer.Title>
            <Drawer.Description className="mt-2 mb-4 text-sm">
              Browse docs sections.
            </Drawer.Description>
            <DocsSectionLinks />
          </Drawer.Content>
        </Drawer.Popup>
      </Drawer.Viewport>
    </Drawer.Portal>
  </Drawer.Root>
);
