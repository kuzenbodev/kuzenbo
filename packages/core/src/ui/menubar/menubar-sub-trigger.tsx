import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { DropdownMenuSubTrigger } from "../dropdown-menu/dropdown-menu";
import type { InputSize } from "../input/input";
import { MenubarContext } from "./menubar-context";
import { MenubarOverlayContext } from "./menubar-overlay-context";

const menubarSubTriggerVariants = tv({
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "text-sm",
      md: "text-sm",
      sm: "text-sm",
      xl: "text-base",
      xs: "text-xs",
    },
  },
});

export type MenubarSubTriggerProps = ComponentProps<
  typeof DropdownMenuSubTrigger
> & {
  inset?: boolean;
} & VariantProps<typeof menubarSubTriggerVariants> & {
    size?: InputSize;
  };

const MenubarSubTrigger = ({
  className,
  inset,
  size,
  ...props
}: MenubarSubTriggerProps) => {
  const { size: rootSize } = useContext(MenubarContext);
  const { size: overlaySize } = useContext(MenubarOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <DropdownMenuSubTrigger
      className={cn(
        "cursor-clickable",
        menubarSubTriggerVariants({ size: resolvedSize }),
        className
      )}
      data-inset={inset}
      data-size={resolvedSize}
      data-slot="menubar-sub-trigger"
      size={resolvedSize}
      {...props}
    />
  );
};

export { MenubarSubTrigger };
