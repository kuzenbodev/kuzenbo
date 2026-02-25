"use client";

import type { ComponentProps } from "react";

import { Select as SelectPrimitive } from "@base-ui/react/select";

export type SelectPortalProps = ComponentProps<typeof SelectPrimitive.Portal>;

const SelectPortal = (props: SelectPortalProps) => (
  <SelectPrimitive.Portal data-slot="select-portal" {...props} />
);

export { SelectPortal };
