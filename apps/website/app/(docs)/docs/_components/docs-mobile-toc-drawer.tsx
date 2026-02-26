import { Button } from "@kuzenbo/core/ui/button";
import { Drawer } from "@kuzenbo/core/ui/drawer";

import { DocsTocMock } from "./docs-toc-mock";

export const DocsMobileTocDrawer = () => (
  <Drawer.Root swipeDirection="down">
    <Drawer.Trigger
      aria-label="Open docs table of contents"
      render={
        <Button
          aria-label="Open docs table of contents"
          className="flex-1"
          size="sm"
          variant="outline"
        />
      }
    >
      Table of contents
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
              Table of contents
            </Drawer.Title>
            <Drawer.Description className="mt-2 mb-4 text-sm">
              Mock ToC placeholder for upcoming docs navigation work.
            </Drawer.Description>
            <DocsTocMock />
          </Drawer.Content>
        </Drawer.Popup>
      </Drawer.Viewport>
    </Drawer.Portal>
  </Drawer.Root>
);
