import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip/tooltip";
import { SidebarMenuContext } from "./sidebar-menu-context";
import { useSidebar } from "./use-sidebar";
export type SidebarMenuButtonProps = useRender.ComponentProps<"button"> &
  ComponentProps<"button"> & {
    isActive?: boolean;
    tooltip?: string | ComponentProps<typeof TooltipContent>;
    size?: InputSize;
  } & VariantProps<typeof sidebarMenuButtonVariants>;

const sidebarMenuButtonVariants = tv({
  base: "peer/menu-button group/menu-button cursor-clickable ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground flex w-full items-center gap-2 overflow-hidden rounded-md text-left outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:font-medium [&_svg]:shrink-0 [&>span:last-child]:truncate",
  defaultVariants: {
    size: "md",
    variant: "default",
  },
  variants: {
    size: {
      lg: "h-10 px-2.5 py-2 text-sm [&_svg:not([class*='size-'])]:size-4",
      md: "h-8 px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4",
      sm: "h-7 px-2 py-1 text-xs [&_svg:not([class*='size-'])]:size-3.5",
      xl: "h-11 px-3 py-2 text-base [&_svg:not([class*='size-'])]:size-5",
      xs: "h-6 px-1.5 py-1 text-xs [&_svg:not([class*='size-'])]:size-3",
    },
    variant: {
      default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      outline:
        "bg-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shadow-[0_0_0_1px_hsl(var(--kb-sidebar-border))] hover:shadow-[0_0_0_1px_hsl(var(--kb-sidebar-accent))]",
    },
  },
});

const SidebarMenuButton = ({
  render,
  isActive = false,
  variant = "default",
  size,
  tooltip,
  className,
  ...props
}: SidebarMenuButtonProps) => {
  const { size: menuSize } = useContext(SidebarMenuContext);
  const resolvedSize: InputSize = size ?? menuSize ?? "md";
  const { isMobile, state } = useSidebar();
  const comp = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          sidebarMenuButtonVariants({ size: resolvedSize, variant }),
          className
        ),
      },
      props
    ),
    render: tooltip ? TooltipTrigger : render,
    state: {
      active: isActive,
      sidebar: "menu-button",
      size: resolvedSize,
      slot: "sidebar-menu-button",
    },
  });

  if (!tooltip) {
    return comp;
  }

  if (typeof tooltip === "string") {
    // oxlint-disable-next-line no-param-reassign
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      {comp}
      <TooltipContent
        align="center"
        hidden={state !== "collapsed" || isMobile}
        side="right"
        {...tooltip}
      />
    </Tooltip>
  );
};

export { SidebarMenuButton, sidebarMenuButtonVariants };
