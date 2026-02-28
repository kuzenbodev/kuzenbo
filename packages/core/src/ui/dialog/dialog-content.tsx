"use client";

import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "../button/button";
import { DialogBackdrop } from "./dialog-backdrop";
import { DialogClose } from "./dialog-close";
import { DialogPopup } from "./dialog-popup";
import type { DialogPopupProps } from "./dialog-popup";
import { DialogPortal } from "./dialog-portal";
import { DialogViewport } from "./dialog-viewport";

export interface DialogContentProps extends DialogPopupProps {
  showCloseButton?: boolean;
}

const DialogContent = ({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogContentProps) => (
  <DialogPortal>
    <DialogBackdrop />
    <DialogViewport>
      <DialogPopup className={className} data-slot="dialog-content" {...props}>
        {children}
        {showCloseButton && (
          <DialogClose
            data-slot="dialog-close"
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
          </DialogClose>
        )}
      </DialogPopup>
    </DialogViewport>
  </DialogPortal>
);

export { DialogContent };
