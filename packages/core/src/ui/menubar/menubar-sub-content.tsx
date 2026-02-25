import type { ComponentProps } from "react";

import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { DropdownMenuSubContent } from "../dropdown-menu/dropdown-menu";
import { MenubarContext } from "./menubar-context";
import { MenubarOverlayContext } from "./menubar-overlay-context";

const menubarSubContentVariants = tv({
  base: "shadow-lg",
  variants: {
    size: {
      xs: "min-w-28 rounded-[min(var(--radius-lg),10px)]",
      sm: "min-w-32 rounded-[min(var(--radius-lg),12px)]",
      md: "min-w-32 rounded-lg",
      lg: "min-w-36 rounded-lg",
      xl: "min-w-40 rounded-xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type MenubarSubContentProps = ComponentProps<
  typeof DropdownMenuSubContent
> &
  VariantProps<typeof menubarSubContentVariants> & {
    size?: InputSize;
  };

const MenubarSubContent = ({
  className,
  size,
  ...props
}: MenubarSubContentProps) => {
  const { size: rootSize } = useContext(MenubarContext);
  const { size: overlaySize } = useContext(MenubarOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <DropdownMenuSubContent
      className={cn(
        menubarSubContentVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="menubar-sub-content"
      size={resolvedSize}
      {...props}
    />
  );
};

export { MenubarSubContent };
