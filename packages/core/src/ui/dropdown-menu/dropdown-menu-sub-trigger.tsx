import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { DropdownMenuContext } from "./dropdown-menu-context";
import { DropdownMenuOverlayContext } from "./dropdown-menu-overlay-context";

const dropdownMenuSubTriggerVariants = tv({
  slots: {
    icon: "ml-auto",
    root: "flex cursor-pointer items-center outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=danger]:focus:**:text-accent-foreground data-disabled:cursor-not-allowed data-open:bg-accent data-open:text-accent-foreground data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  },
  variants: {
    inset: {
      false: "",
      true: "",
    },
    size: {
      xs: {
        icon: "size-3",
        root: "gap-1 rounded-[min(var(--radius-md),8px)] px-1.5 py-1 text-xs [&_svg:not([class*='size-'])]:size-3",
      },
      sm: {
        icon: "size-3.5",
        root: "gap-1.5 rounded-[min(var(--radius-md),10px)] px-1.5 py-1 text-sm [&_svg:not([class*='size-'])]:size-3.5",
      },
      md: {
        icon: "size-4",
        root: "gap-1.5 rounded-md px-1.5 py-1 text-sm [&_svg:not([class*='size-'])]:size-4",
      },
      lg: {
        icon: "size-4",
        root: "gap-2 rounded-md px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4",
      },
      xl: {
        icon: "size-5",
        root: "gap-2.5 rounded-md px-2.5 py-2 text-base [&_svg:not([class*='size-'])]:size-5",
      },
    },
  },
  defaultVariants: {
    inset: false,
    size: "md",
  },
});

export type DropdownMenuSubTriggerProps = MenuPrimitive.SubmenuTrigger.Props &
  VariantProps<typeof dropdownMenuSubTriggerVariants>;

const DropdownMenuSubTrigger = ({
  className,
  inset,
  size,
  children,
  ...props
}: DropdownMenuSubTriggerProps) => {
  const { size: rootSize } = useContext(DropdownMenuContext);
  const { size: overlaySize } = useContext(DropdownMenuOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  const { icon, root } = dropdownMenuSubTriggerVariants({
    inset: Boolean(inset),
    size: resolvedSize,
  });

  return (
    <MenuPrimitive.SubmenuTrigger
      className={mergeBaseUIClassName<MenuPrimitive.SubmenuTrigger.State>(
        root(),
        className
      )}
      data-inset={inset}
      data-size={resolvedSize}
      data-slot="dropdown-menu-sub-trigger"
      {...props}
    >
      {children}
      <HugeiconsIcon
        className={icon()}
        icon={ArrowRight01Icon}
        strokeWidth={2}
      />
    </MenuPrimitive.SubmenuTrigger>
  );
};

export { DropdownMenuSubTrigger };
