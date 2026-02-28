import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { Separator } from "../separator/separator";
import { useResolvedNavigationListTone } from "./navigation-list-context";
import type { NavigationListTone } from "./navigation-list-context";

export type NavigationListSeparatorProps = ComponentProps<typeof Separator> & {
  tone?: NavigationListTone;
};

const NavigationListSeparator = ({
  className,
  tone,
  ...props
}: NavigationListSeparatorProps) => {
  const resolvedTone = useResolvedNavigationListTone(tone);

  return (
    <Separator
      className={cn(
        resolvedTone === "sidebar" ? "bg-sidebar-border" : "bg-border",
        className
      )}
      data-slot="navigation-list-separator"
      data-tone={resolvedTone}
      {...props}
    />
  );
};

export { NavigationListSeparator };
