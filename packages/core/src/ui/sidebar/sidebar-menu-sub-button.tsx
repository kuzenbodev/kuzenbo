import type { ComponentProps } from "react";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { SidebarMenuContext } from "./sidebar-menu-context";
export type SidebarMenuSubButtonProps = useRender.ComponentProps<"a"> &
  ComponentProps<"a"> & {
    size?: InputSize;
    isActive?: boolean;
  } & VariantProps<typeof sidebarMenuSubButtonVariants>;

const sidebarMenuSubButtonVariants = tv({
  base: "flex min-w-0 -translate-x-px cursor-pointer items-center overflow-hidden rounded-md text-sidebar-foreground ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
  variants: {
    size: {
      xs: "h-6 gap-1.5 px-1.5 text-xs [&>svg:not([class*='size-'])]:size-3",
      sm: "h-7 gap-2 px-2 text-xs [&>svg:not([class*='size-'])]:size-3.5",
      md: "h-8 gap-2 px-2 text-sm [&>svg:not([class*='size-'])]:size-4",
      lg: "h-9 gap-2.5 px-2.5 text-sm [&>svg:not([class*='size-'])]:size-4",
      xl: "h-10 gap-2.5 px-3 text-base [&>svg:not([class*='size-'])]:size-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const SidebarMenuSubButton = ({
  render,
  size,
  isActive = false,
  className,
  ...props
}: SidebarMenuSubButtonProps) => {
  const { size: menuSize } = useContext(SidebarMenuContext);
  const resolvedSize: InputSize = size ?? menuSize ?? "md";

  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          sidebarMenuSubButtonVariants({ size: resolvedSize }),
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-menu-sub-button",
      sidebar: "menu-sub-button",
      size: resolvedSize,
      active: isActive,
    },
  });
};

export { SidebarMenuSubButton };
