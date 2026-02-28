"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { useContext } from "react";
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { toggleVariants } from "../toggle/toggle";
import {
  ToggleGroupContext,
  type ToggleGroupSize,
  type ToggleGroupVariant,
} from "./toggle-group-context";

const toggleGroupItemVariants = tv({
  base: "focus:z-raised focus-visible:z-raised shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-md group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-md group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-md group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-md group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
  extend: toggleVariants,
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

type ToggleGroupItemVariantProps = Omit<
  VariantProps<typeof toggleGroupItemVariants>,
  "size" | "variant"
> & {
  size?: ToggleGroupSize;
  variant?: ToggleGroupVariant;
};

export type ToggleGroupItemProps = TogglePrimitive.Props &
  ToggleGroupItemVariantProps;

const ToggleGroupItem = ({
  className,
  children,
  variant,
  size,
  ...props
}: ToggleGroupItemProps) => {
  const {
    size: contextSize,
    spacing,
    variant: contextVariant,
  } = useContext(ToggleGroupContext);
  const resolvedSize = size ?? contextSize ?? "md";
  const resolvedVariant = variant ?? contextVariant ?? "default";

  return (
    <TogglePrimitive
      className={mergeBaseUIClassName<TogglePrimitive.State>(
        toggleGroupItemVariants({
          variant: resolvedVariant,
          size: resolvedSize,
        }),
        className
      )}
      data-size={resolvedSize}
      data-slot="toggle-group-item"
      data-spacing={spacing}
      data-variant={resolvedVariant}
      {...props}
    >
      {children}
    </TogglePrimitive>
  );
};

export { ToggleGroupItem };
