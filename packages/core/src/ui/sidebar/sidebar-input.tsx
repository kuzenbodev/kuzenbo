import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

import { Input } from "../input/input";
export type SidebarInputProps = ComponentProps<typeof Input>;

const SidebarInput = ({
  className,
  size = "sm",
  ...props
}: SidebarInputProps) => (
  <Input
    className={cn("w-full bg-background shadow-none", className)}
    data-sidebar="input"
    size={size}
    data-slot="sidebar-input"
    {...props}
  />
);

export { SidebarInput };
