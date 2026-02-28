"use client";

import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "../button/button";
import { SheetBackdrop } from "./sheet-backdrop";
import { SheetClose } from "./sheet-close";
import {
  SheetPopup,
  type SheetPopupProps,
  type SheetSide,
} from "./sheet-popup";
import { SheetPortal } from "./sheet-portal";
import { SheetViewport } from "./sheet-viewport";
export type SheetContentProps = SheetPopupProps & {
  side?: SheetSide;
  showCloseButton?: boolean;
};

const SheetContent = ({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetContentProps) => (
  <SheetPortal>
    <SheetBackdrop />
    <SheetViewport>
      <SheetPopup
        className={className}
        data-slot="sheet-content"
        side={side}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetClose
            data-slot="sheet-close"
            render={
              <Button
                className="cursor-clickable absolute top-4 right-4"
                size="icon-sm"
                variant="ghost"
              />
            }
          >
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
            <span className="sr-only">Close</span>
          </SheetClose>
        )}
      </SheetPopup>
    </SheetViewport>
  </SheetPortal>
);

export { SheetContent };
