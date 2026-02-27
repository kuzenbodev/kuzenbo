"use client";

import type { ComponentProps } from "react";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import {
  type NavigationListTone,
  useResolvedNavigationListSize,
  useResolvedNavigationListTone,
} from "./navigation-list-context";
import { useNavigationListItemContext } from "./navigation-list-item-context";

const navigationListActionVariants = tv({
  base: "absolute right-1 flex aspect-square cursor-clickable items-center justify-center rounded-md p-0 outline-hidden transition-transform group-data-[collapsible=true]/navigation-list-item:right-10 group-has-data-[slot=navigation-list-badge]/navigation-list-item:right-14 [&>svg]:shrink-0",
  variants: {
    size: {
      xs: "top-0.5 w-4 [&>svg:not([class*='size-'])]:size-3",
      sm: "top-1 w-5 [&>svg:not([class*='size-'])]:size-3.5",
      md: "top-1.5 w-5 [&>svg:not([class*='size-'])]:size-4",
      lg: "top-2 w-6 [&>svg:not([class*='size-'])]:size-4",
      xl: "top-2.5 w-7 [&>svg:not([class*='size-'])]:size-5",
    },
    tone: {
      surface:
        "text-muted-foreground ring-ring hover:bg-muted hover:text-foreground focus-visible:ring-2 peer-hover/navigation-list-link:text-foreground peer-data-active/navigation-list-link:text-foreground",
      sidebar:
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/navigation-list-link:text-sidebar-accent-foreground peer-data-active/navigation-list-link:text-sidebar-accent-foreground",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "surface",
  },
});

export type NavigationListActionProps = useRender.ComponentProps<"button"> &
  ComponentProps<"button"> & {
    showOnHover?: boolean;
    size?: UISize;
    tone?: NavigationListTone;
  } & VariantProps<typeof navigationListActionVariants>;

const NavigationListAction = ({
  className,
  render,
  showOnHover = false,
  size,
  tone,
  ...props
}: NavigationListActionProps) => {
  const itemContext = useNavigationListItemContext();
  const resolvedSize = useResolvedNavigationListSize(size, itemContext.size);
  const resolvedTone = useResolvedNavigationListTone(tone, itemContext.tone);

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          navigationListActionVariants({
            size: resolvedSize,
            tone: resolvedTone,
          }),
          itemContext.variant === "filled" &&
            resolvedTone === "surface" &&
            "peer-data-active/navigation-list-link:text-primary-foreground",
          itemContext.variant === "filled" &&
            resolvedTone === "sidebar" &&
            "peer-data-active/navigation-list-link:text-sidebar-primary-foreground",
          "peer-data-[size=xs]/navigation-list-link:top-0.5 peer-data-[size=sm]/navigation-list-link:top-1 peer-data-[size=md]/navigation-list-link:top-1.5 peer-data-[size=lg]/navigation-list-link:top-2 peer-data-[size=xl]/navigation-list-link:top-2.5",
          showOnHover &&
            "group-focus-within/navigation-list-item:opacity-100 group-hover/navigation-list-item:opacity-100 peer-data-active/navigation-list-link:opacity-100 md:opacity-0",
          className
        ),
        type: render ? undefined : "button",
      },
      props
    ),
    render,
    state: {
      size: resolvedSize,
      slot: "navigation-list-action",
      tone: resolvedTone,
    },
  });
};

export { NavigationListAction };
