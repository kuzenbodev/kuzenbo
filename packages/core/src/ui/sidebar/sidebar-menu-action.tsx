import type { ComponentProps } from "react";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { SidebarMenuContext } from "./sidebar-menu-context";

const sidebarMenuActionVariants = tv({
  base: "absolute right-1 flex aspect-square items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:shrink-0",
  variants: {
    size: {
      xs: "top-0.5 w-4 [&>svg:not([class*='size-'])]:size-3",
      sm: "top-1 w-5 [&>svg:not([class*='size-'])]:size-3.5",
      md: "top-1.5 w-5 [&>svg:not([class*='size-'])]:size-4",
      lg: "top-2 w-6 [&>svg:not([class*='size-'])]:size-4",
      xl: "top-2.5 w-7 [&>svg:not([class*='size-'])]:size-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SidebarMenuActionProps = useRender.ComponentProps<"button"> &
  ComponentProps<"button"> & {
    showOnHover?: boolean;
    size?: InputSize;
  } & VariantProps<typeof sidebarMenuActionVariants>;

const SidebarMenuAction = ({
  className,
  render,
  size,
  showOnHover = false,
  ...props
}: SidebarMenuActionProps) => {
  const { size: menuSize } = useContext(SidebarMenuContext);
  const resolvedSize: InputSize = size ?? menuSize ?? "md";

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          sidebarMenuActionVariants({ size: resolvedSize }),
          "peer-data-[size=xs]/menu-button:top-0.5 peer-data-[size=sm]/menu-button:top-1 peer-data-[size=md]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2 peer-data-[size=xl]/menu-button:top-2.5",
          showOnHover &&
            "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground data-open:opacity-100 md:opacity-0",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-menu-action",
      sidebar: "menu-action",
      size: resolvedSize,
    },
  });
};

export { SidebarMenuAction };
