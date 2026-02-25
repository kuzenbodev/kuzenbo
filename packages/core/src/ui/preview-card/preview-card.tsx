"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";

import { PreviewCardArrow } from "./preview-card-arrow";
import { PreviewCardBackdrop } from "./preview-card-backdrop";
import { PreviewCardContent } from "./preview-card-content";
import { PreviewCardPopup } from "./preview-card-popup";
import { PreviewCardPortal } from "./preview-card-portal";
import { PreviewCardPositioner } from "./preview-card-positioner";
import { PreviewCardTrigger } from "./preview-card-trigger";
import { PreviewCardViewport } from "./preview-card-viewport";
export type PreviewCardProps = PreviewCardPrimitive.Root.Props;

const PreviewCard = ({ ...props }: PreviewCardProps) => (
  <PreviewCardPrimitive.Root data-slot="preview-card" {...props} />
);

PreviewCard.Arrow = PreviewCardArrow;
PreviewCard.Backdrop = PreviewCardBackdrop;
PreviewCard.Content = PreviewCardContent;
PreviewCard.Popup = PreviewCardPopup;
PreviewCard.Portal = PreviewCardPortal;
PreviewCard.Positioner = PreviewCardPositioner;
PreviewCard.Trigger = PreviewCardTrigger;
PreviewCard.Viewport = PreviewCardViewport;
PreviewCard.createHandle = PreviewCardPrimitive.createHandle;

const createPreviewCardHandle = PreviewCardPrimitive.createHandle;

export type { PreviewCardArrowProps } from "./preview-card-arrow";
export type { PreviewCardBackdropProps } from "./preview-card-backdrop";
export type { PreviewCardContentProps } from "./preview-card-content";
export type { PreviewCardPopupProps } from "./preview-card-popup";
export type { PreviewCardPortalProps } from "./preview-card-portal";
export type { PreviewCardPositionerProps } from "./preview-card-positioner";
export type { PreviewCardTriggerProps } from "./preview-card-trigger";
export type { PreviewCardViewportProps } from "./preview-card-viewport";

export {
  PreviewCard,
  PreviewCardArrow,
  PreviewCardBackdrop,
  PreviewCardContent,
  PreviewCardPopup,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTrigger,
  PreviewCardViewport,
  createPreviewCardHandle,
};
