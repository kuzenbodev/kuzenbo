import type { ComponentProps } from "react";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

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
  base: "peer/menu-button group/menu-button flex w-full cursor-pointer items-center gap-2 overflow-hidden rounded-md text-left ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground [&_svg]:shrink-0 [&>span:last-child]:truncate",
  variants: {
    variant: {
      default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      outline:
        "bg-background shadow-[0_0_0_1px_hsl(var(--kb-sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--kb-sidebar-accent))]",
    },
    size: {
      xs: "h-6 px-1.5 py-1 text-xs [&_svg:not([class*='size-'])]:size-3",
      sm: "h-7 px-2 py-1 text-xs [&_svg:not([class*='size-'])]:size-3.5",
      md: "h-8 px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4",
      lg: "h-10 px-2.5 py-2 text-sm [&_svg:not([class*='size-'])]:size-4",
      xl: "h-11 px-3 py-2 text-base [&_svg:not([class*='size-'])]:size-5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
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
      slot: "sidebar-menu-button",
      sidebar: "menu-button",
      size: resolvedSize,
      active: isActive,
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
