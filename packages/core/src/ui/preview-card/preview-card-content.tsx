"use client";

import type { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";

import { PreviewCardArrow } from "./preview-card-arrow";
import { PreviewCardPopup } from "./preview-card-popup";
import { PreviewCardPortal } from "./preview-card-portal";
import { PreviewCardPositioner } from "./preview-card-positioner";
import { PreviewCardViewport } from "./preview-card-viewport";

export type PreviewCardContentProps = PreviewCardPrimitive.Popup.Props &
  Pick<
    PreviewCardPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    showArrow?: boolean;
  };

const PreviewCardContent = ({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 4,
  showArrow = true,
  children,
  ...props
}: PreviewCardContentProps) => (
  <PreviewCardPortal>
    <PreviewCardPositioner
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
    >
      <PreviewCardPopup
        className={className}
        data-slot="preview-card-content"
        {...props}
      >
        {showArrow ? <PreviewCardArrow /> : null}
        <PreviewCardViewport>{children}</PreviewCardViewport>
      </PreviewCardPopup>
    </PreviewCardPositioner>
  </PreviewCardPortal>
);

export { PreviewCardContent };
