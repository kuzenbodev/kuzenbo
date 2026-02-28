import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { ContextMenuContext } from "./context-menu-context";
import { ContextMenuOverlayContext } from "./context-menu-overlay-context";

const contextMenuSubTriggerVariants = tv({
  slots: {
    icon: "ml-auto",
    root: "cursor-clickable focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground flex items-center outline-hidden select-none data-disabled:cursor-not-allowed data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  },
  variants: {
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
    size: "md",
  },
});

export type ContextMenuSubTriggerProps =
  ContextMenuPrimitive.SubmenuTrigger.Props & {
    inset?: boolean;
  } & VariantProps<typeof contextMenuSubTriggerVariants>;

const ContextMenuSubTrigger = ({
  className,
  inset,
  children,
  size,
  ...props
}: ContextMenuSubTriggerProps) => {
  const { size: rootSize } = useContext(ContextMenuContext);
  const { size: overlaySize } = useContext(ContextMenuOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";
  const { icon, root } = contextMenuSubTriggerVariants({ size: resolvedSize });

  return (
    <ContextMenuPrimitive.SubmenuTrigger
      className={cn(root(), className)}
      data-inset={inset}
      data-size={resolvedSize}
      data-slot="context-menu-sub-trigger"
      {...props}
    >
      {children}
      <HugeiconsIcon
        className={icon()}
        icon={ArrowRight01Icon}
        strokeWidth={2}
      />
    </ContextMenuPrimitive.SubmenuTrigger>
  );
};

export { ContextMenuSubTrigger };
