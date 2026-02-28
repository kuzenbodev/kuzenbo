import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { SidebarMenuContext } from "./sidebar-menu-context";

const sidebarMenuSubVariants = tv({
  base: "border-sidebar-border flex min-w-0 translate-x-px flex-col border-l group-data-[collapsible=icon]:hidden",
  variants: {
    size: {
      xs: "mx-2.5 gap-0.5 px-1.5 py-0.5",
      sm: "mx-3 gap-1 px-2 py-0.5",
      md: "mx-3.5 gap-1 px-2.5 py-0.5",
      lg: "mx-4 gap-1 px-3 py-1",
      xl: "mx-4.5 gap-1.5 px-3.5 py-1",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SidebarMenuSubProps = ComponentProps<"ul"> &
  VariantProps<typeof sidebarMenuSubVariants> & {
    size?: InputSize;
  };

const SidebarMenuSub = ({ className, size, ...props }: SidebarMenuSubProps) => {
  const { size: menuSize } = useContext(SidebarMenuContext);
  const resolvedSize: InputSize = size ?? menuSize ?? "md";

  return (
    <ul
      className={cn(sidebarMenuSubVariants({ size: resolvedSize }), className)}
      data-sidebar="menu-sub"
      data-size={resolvedSize}
      data-slot="sidebar-menu-sub"
      {...props}
    />
  );
};

export { SidebarMenuSub };
