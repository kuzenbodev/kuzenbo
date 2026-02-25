import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

export type NavigationListSubItemProps = ComponentProps<"li">;

const NavigationListSubItem = ({
  className,
  ...props
}: NavigationListSubItemProps) => (
  <li
    className={cn(
      "group/navigation-list-sub-item relative list-none",
      className
    )}
    data-slot="navigation-list-sub-item"
    {...props}
  />
);

export { NavigationListSubItem };
