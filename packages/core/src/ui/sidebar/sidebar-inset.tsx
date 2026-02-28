import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type SidebarInsetProps = ComponentProps<"main">;

const SidebarInset = ({ className, ...props }: SidebarInsetProps) => (
  <main
    className={cn(
      "bg-background relative flex w-full min-w-0 flex-1 flex-col md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
      className
    )}
    data-slot="sidebar-inset"
    {...props}
  />
);

export { SidebarInset };
