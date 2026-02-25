"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";

export type PreviewCardViewportProps = PreviewCardPrimitive.Viewport.Props;

const PreviewCardViewport = ({ ...props }: PreviewCardViewportProps) => (
  <PreviewCardPrimitive.Viewport data-slot="preview-card-viewport" {...props} />
);

export { PreviewCardViewport };
