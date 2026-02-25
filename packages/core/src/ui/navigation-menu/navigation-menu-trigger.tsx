import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { NavigationMenuContext } from "./navigation-menu-context";

const navigationMenuTriggerStyle = tv({
  slots: {
    icon: "relative top-[1px] ml-1 transition duration-300 group-data-open/navigation-menu-trigger:rotate-180 group-data-popup-open/navigation-menu-trigger:rotate-180",
    root: "group/navigation-menu-trigger inline-flex w-max cursor-pointer items-center justify-center bg-background font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-open:bg-muted/50 data-open:hover:bg-muted data-open:focus:bg-muted data-popup-open:bg-muted/50 data-popup-open:hover:bg-muted",
  },
  variants: {
    size: {
      xs: {
        icon: "size-3",
        root: "h-6 rounded-[min(var(--radius-md),8px)] px-2 py-0.5 text-xs",
      },
      sm: {
        icon: "size-3.5",
        root: "h-8 rounded-[min(var(--radius-md),10px)] px-2.5 py-1 text-sm",
      },
      md: {
        icon: "size-3",
        root: "h-9 rounded-lg px-2.5 py-1.5 text-sm",
      },
      lg: {
        icon: "size-4",
        root: "h-10 rounded-lg px-3 py-1.5 text-sm",
      },
      xl: {
        icon: "size-5",
        root: "h-11 rounded-lg px-4 py-1.5 text-base",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type NavigationMenuTriggerProps = NavigationMenuPrimitive.Trigger.Props &
  VariantProps<typeof navigationMenuTriggerStyle> & {
    size?: InputSize;
  };

const NavigationMenuTrigger = ({
  className,
  children,
  size,
  ...props
}: NavigationMenuTriggerProps) => {
  const { size: rootSize } = useContext(NavigationMenuContext);
  const resolvedSize: InputSize = size ?? rootSize ?? "md";
  const { icon, root } = navigationMenuTriggerStyle({ size: resolvedSize });

  return (
    <NavigationMenuPrimitive.Trigger
      className={cn(root(), "group", className)}
      data-size={resolvedSize}
      data-slot="navigation-menu-trigger"
      {...props}
    >
      {children}{" "}
      <HugeiconsIcon
        aria-hidden="true"
        className={icon()}
        icon={ArrowDown01Icon}
        strokeWidth={2}
      />
    </NavigationMenuPrimitive.Trigger>
  );
};

export { NavigationMenuTrigger, navigationMenuTriggerStyle };
