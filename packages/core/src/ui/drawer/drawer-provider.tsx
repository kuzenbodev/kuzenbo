"use client";

import { DrawerPreview as DrawerPrimitive } from "@base-ui/react/drawer";

export type DrawerProviderProps = DrawerPrimitive.Provider.Props;

const DrawerProvider = ({ ...props }: DrawerProviderProps) => (
  <DrawerPrimitive.Provider {...props} />
);

export { DrawerProvider };
