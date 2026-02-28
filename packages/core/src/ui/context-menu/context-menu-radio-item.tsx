import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { ContextMenuContext } from "./context-menu-context";
import { ContextMenuOverlayContext } from "./context-menu-overlay-context";

const contextMenuRadioItemVariants = tv({
  defaultVariants: {
    size: "md",
  },
  slots: {
    indicator:
      "pointer-events-none absolute flex items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
    root: "cursor-clickable focus:bg-accent focus:text-accent-foreground relative flex items-center rounded-md outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  },
  variants: {
    size: {
      lg: {
        indicator: "right-2.5 size-4 [&_svg:not([class*='size-'])]:size-4",
        root: "gap-2 py-1.5 pr-9 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4",
      },
      md: {
        indicator: "right-2 size-4 [&_svg:not([class*='size-'])]:size-4",
        root: "gap-1.5 py-1 pr-8 pl-1.5 text-sm [&_svg:not([class*='size-'])]:size-4",
      },
      sm: {
        indicator: "right-2 size-3.5 [&_svg:not([class*='size-'])]:size-3.5",
        root: "gap-1.5 rounded-[min(var(--radius-md),10px)] py-1 pr-7 pl-2 text-sm [&_svg:not([class*='size-'])]:size-3.5",
      },
      xl: {
        indicator: "right-3 size-5 [&_svg:not([class*='size-'])]:size-5",
        root: "gap-2.5 py-2 pr-10 pl-2.5 text-base [&_svg:not([class*='size-'])]:size-5",
      },
      xs: {
        indicator: "right-1.5 size-3 [&_svg:not([class*='size-'])]:size-3",
        root: "gap-1 rounded-[min(var(--radius-md),8px)] py-1 pr-6 pl-1.5 text-xs [&_svg:not([class*='size-'])]:size-3",
      },
    },
  },
});

type ContextMenuRadioItemVariantProps = VariantProps<
  typeof contextMenuRadioItemVariants
>;

export type ContextMenuRadioItemProps = ContextMenuPrimitive.RadioItem.Props &
  ContextMenuRadioItemVariantProps;

const ContextMenuRadioItem = ({
  className,
  children,
  size,
  ...props
}: ContextMenuRadioItemProps) => {
  const { size: rootSize } = useContext(ContextMenuContext);
  const { size: overlaySize } = useContext(ContextMenuOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";
  const { indicator, root } = contextMenuRadioItemVariants({
    size: resolvedSize,
  });

  return (
    <ContextMenuPrimitive.RadioItem
      className={cn(root(), className)}
      data-size={resolvedSize}
      data-slot="context-menu-radio-item"
      {...props}
    >
      <span className={indicator()}>
        <ContextMenuPrimitive.RadioItemIndicator>
          <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
};

export { ContextMenuRadioItem };
