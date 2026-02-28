"use client";

import { createContext } from "react";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import type { toggleVariants } from "../toggle/toggle";

export type ToggleGroupVariant = NonNullable<
  VariantProps<typeof toggleVariants>["variant"]
>;
export type ToggleGroupSize = UISize;

export interface ToggleGroupContextValue {
  orientation: "horizontal" | "vertical";
  size: ToggleGroupSize;
  spacing: number;
  variant: ToggleGroupVariant;
}

const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  size: "md",
  variant: "default",
  spacing: 0,
  orientation: "horizontal",
});

export { ToggleGroupContext };
