import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { ContextMenuContent } from "./context-menu-content";
import { ContextMenuContext } from "./context-menu-context";
import { ContextMenuOverlayContext } from "./context-menu-overlay-context";

const contextMenuSubContentVariants = tv({
  base: "w-auto shadow-lg",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "min-w-[104px] rounded-md",
      md: "min-w-[96px] rounded-md",
      sm: "min-w-[90px] rounded-[min(var(--radius-md),10px)]",
      xl: "min-w-[112px] rounded-md",
      xs: "min-w-[84px] rounded-[min(var(--radius-md),8px)]",
    },
  },
});

export type ContextMenuSubContentProps = ComponentProps<
  typeof ContextMenuContent
> &
  VariantProps<typeof contextMenuSubContentVariants>;

const ContextMenuSubContent = ({
  className,
  size,
  ...props
}: ContextMenuSubContentProps) => {
  const { size: rootSize } = useContext(ContextMenuContext);
  const { size: overlaySize } = useContext(ContextMenuOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <ContextMenuContent
      className={cn(
        contextMenuSubContentVariants({ size: resolvedSize }),
        className
      )}
      data-slot="context-menu-sub-content"
      side="right"
      size={resolvedSize}
      {...props}
    />
  );
};

export { ContextMenuSubContent };
