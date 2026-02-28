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
  orientation: "horizontal",
  size: "md",
  spacing: 0,
  variant: "default",
});

export { ToggleGroupContext };
