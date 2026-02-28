"use client";

import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import type { CSSProperties } from "react";
import { useMemo } from "react";
import { cn } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { useComponentSize } from "../shared/size/size-provider";
import {
  ToggleGroupContext,
  type ToggleGroupSize,
  type ToggleGroupVariant,
} from "./toggle-group-context";
import { ToggleGroupItem } from "./toggle-group-item";
export type ToggleGroupProps = ToggleGroupPrimitive.Props & {
  orientation?: "horizontal" | "vertical";
  size?: ToggleGroupSize;
  spacing?: number;
  variant?: ToggleGroupVariant;
};

const ToggleGroup = ({
  className,
  variant = "default",
  size: providedSize,
  spacing = 0,
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupProps) => {
  const size = useComponentSize(providedSize);
  const contextValue = useMemo(
    () => ({ variant, size, spacing, orientation }),
    [variant, size, spacing, orientation]
  );

  return (
    <ToggleGroupPrimitive
      className={mergeBaseUIClassName<ToggleGroupPrimitive.State>(
        cn(
          "group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-md data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[spacing=0]:data-[variant=outline]:shadow-xs"
        ),
        className
      )}
      data-orientation={orientation}
      data-size={size}
      data-slot="toggle-group"
      data-spacing={spacing}
      data-variant={variant}
      style={{ "--gap": spacing } as CSSProperties}
      {...props}
    >
      <ToggleGroupContext.Provider value={contextValue}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
};

ToggleGroup.Item = ToggleGroupItem;

export { ToggleGroup, ToggleGroupContext, ToggleGroupItem };

export type { ToggleGroupItemProps } from "./toggle-group-item";
export type {
  ToggleGroupSize,
  ToggleGroupVariant,
} from "./toggle-group-context";
