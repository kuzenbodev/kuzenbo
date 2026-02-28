import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import {
  useResolvedNavigationListSize,
  useResolvedNavigationListTone,
} from "./navigation-list-context";
import type { NavigationListTone } from "./navigation-list-context";

const navigationListGroupLabelVariants = tv({
  base: "flex items-center rounded-md px-2 font-medium tracking-wide uppercase",
  defaultVariants: {
    size: "md",
    tone: "surface",
  },
  variants: {
    size: {
      lg: "h-9 text-xs",
      md: "h-8 text-[11px]",
      sm: "h-7 text-[10px]",
      xl: "h-10 text-xs",
      xs: "h-6 text-[10px]",
    },
    tone: {
      sidebar: "text-sidebar-foreground/70",
      surface: "text-muted-foreground",
    },
  },
});

export type NavigationListGroupLabelProps = useRender.ComponentProps<"div"> &
  ComponentProps<"div"> &
  Omit<VariantProps<typeof navigationListGroupLabelVariants>, "size"> & {
    size?: UISize;
    tone?: NavigationListTone;
  };

const NavigationListGroupLabel = ({
  className,
  render,
  size,
  tone,
  ...props
}: NavigationListGroupLabelProps) => {
  const resolvedSize = useResolvedNavigationListSize(size);
  const resolvedTone = useResolvedNavigationListTone(tone);

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          navigationListGroupLabelVariants({
            size: resolvedSize,
            tone: resolvedTone,
          }),
          className
        ),
      },
      props
    ),
    render,
    state: {
      size: resolvedSize,
      slot: "navigation-list-group-label",
      tone: resolvedTone,
    },
  });
};

export { NavigationListGroupLabel };
