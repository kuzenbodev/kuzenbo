import type { ComponentProps } from "react";
import { useMemo } from "react";
import { cn } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { useComponentSize } from "../shared/size/size-provider";
import { SidebarMenuContext } from "./sidebar-menu-context";
export type SidebarMenuProps = ComponentProps<"ul"> & {
  size?: InputSize;
};

const SidebarMenu = ({
  className,
  size: providedSize,
  ...props
}: SidebarMenuProps) => {
  const size = useComponentSize(providedSize);
  const contextValue = useMemo(() => ({ size }), [size]);

  return (
    <SidebarMenuContext.Provider value={contextValue}>
      <ul
        className={cn("flex w-full min-w-0 flex-col gap-1", className)}
        data-sidebar="menu"
        data-size={size}
        data-slot="sidebar-menu"
        {...props}
      />
    </SidebarMenuContext.Provider>
  );
};

export { SidebarMenu };
