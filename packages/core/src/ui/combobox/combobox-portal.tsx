"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";

export type ComboboxPortalProps = ComboboxPrimitive.Portal.Props;

const ComboboxPortal = (props: ComboboxPortalProps) => (
  <ComboboxPrimitive.Portal data-slot="combobox-portal" {...props} />
);

export { ComboboxPortal };
