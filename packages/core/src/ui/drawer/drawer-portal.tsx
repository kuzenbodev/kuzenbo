"use client";

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer";

export type DrawerPortalProps = DrawerPrimitive.Portal.Props;

const DrawerPortal = ({ ...props }: DrawerPortalProps) => (
  <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
);

export { DrawerPortal };
