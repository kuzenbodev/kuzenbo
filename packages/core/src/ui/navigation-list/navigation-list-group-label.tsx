import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { ComponentProps } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import {
  type NavigationListTone,
  useResolvedNavigationListSize,
  useResolvedNavigationListTone,
} from "./navigation-list-context";

const navigationListGroupLabelVariants = tv({
  base: "flex items-center rounded-md px-2 font-medium tracking-wide uppercase",
  variants: {
    size: {
      xs: "h-6 text-[10px]",
      sm: "h-7 text-[10px]",
      md: "h-8 text-[11px]",
      lg: "h-9 text-xs",
      xl: "h-10 text-xs",
    },
    tone: {
      surface: "text-muted-foreground",
      sidebar: "text-sidebar-foreground/70",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "surface",
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
      slot: "navigation-list-group-label",
      size: resolvedSize,
      tone: resolvedTone,
    },
  });
};

export { NavigationListGroupLabel };
