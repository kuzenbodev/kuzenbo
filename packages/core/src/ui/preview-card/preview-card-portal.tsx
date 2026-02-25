"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";

export type PreviewCardPortalProps = PreviewCardPrimitive.Portal.Props;

const PreviewCardPortal = ({ ...props }: PreviewCardPortalProps) => (
  <PreviewCardPrimitive.Portal data-slot="preview-card-portal" {...props} />
);

export { PreviewCardPortal };
