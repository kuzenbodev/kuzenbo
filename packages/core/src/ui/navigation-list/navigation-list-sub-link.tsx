import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import {
  useResolvedNavigationListSize,
  useResolvedNavigationListTone,
  useResolvedNavigationListVariant,
} from "./navigation-list-context";
import type {
  NavigationListTone,
  NavigationListVariant,
} from "./navigation-list-context";
import { useNavigationListItemContext } from "./navigation-list-item-context";

const navigationListSubLinkVariants = tv({
  base: "flex min-w-0 items-center gap-2 overflow-hidden rounded-md text-left outline-hidden transition-colors focus-visible:ring-2 [&>span:last-child]:truncate",
  compoundVariants: [
    {
      className:
        "hover:bg-muted/70 hover:text-foreground data-active:bg-muted/50",
      tone: "surface",
      variant: "subtle",
    },
    {
      className: "hover:bg-muted hover:text-foreground data-active:bg-muted",
      tone: "surface",
      variant: "light",
    },
    {
      className:
        "hover:bg-muted hover:text-foreground data-active:bg-primary data-active:text-primary-foreground",
      tone: "surface",
      variant: "filled",
    },
    {
      className:
        "hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent/60 data-active:text-sidebar-accent-foreground",
      tone: "sidebar",
      variant: "subtle",
    },
    {
      className:
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground",
      tone: "sidebar",
      variant: "light",
    },
    {
      className:
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-active:bg-sidebar-primary data-active:text-sidebar-primary-foreground",
      tone: "sidebar",
      variant: "filled",
    },
  ],
  defaultVariants: {
    active: false,
    size: "md",
    tone: "surface",
    variant: "light",
  },
  variants: {
    active: {
      false: "",
      true: "font-medium",
    },
    size: {
      lg: "h-9 px-2.5 text-sm [&_svg:not([class*='size-'])]:size-4",
      md: "h-8 px-2 text-sm [&_svg:not([class*='size-'])]:size-4",
      sm: "h-7 px-2 text-xs [&_svg:not([class*='size-'])]:size-3.5",
      xl: "h-10 px-3 text-base [&_svg:not([class*='size-'])]:size-5",
      xs: "h-6 px-1.5 text-xs [&_svg:not([class*='size-'])]:size-3",
    },
    tone: {
      sidebar: "ring-sidebar-ring",
      surface: "ring-ring",
    },
    variant: {
      filled: "",
      light: "",
      subtle: "",
    },
  },
});

export type NavigationListSubLinkProps = useRender.ComponentProps<"a"> &
  ComponentProps<"a"> & {
    active?: boolean;
    size?: UISize;
    tone?: NavigationListTone;
    variant?: NavigationListVariant;
  } & VariantProps<typeof navigationListSubLinkVariants>;

const NavigationListSubLink = ({
  className,
  render,
  active,
  size,
  tone,
  variant,
  ...props
}: NavigationListSubLinkProps) => {
  const itemContext = useNavigationListItemContext();
  const resolvedSize = useResolvedNavigationListSize(size, itemContext.size);
  const resolvedTone = useResolvedNavigationListTone(tone, itemContext.tone);
  const resolvedVariant = useResolvedNavigationListVariant(
    variant,
    itemContext.variant
  );
  const resolvedActive = active ?? props["aria-current"] === "page";
  const resolvedAriaCurrent =
    props["aria-current"] ?? (resolvedActive ? "page" : undefined);

  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        "aria-current": resolvedAriaCurrent,
        className: cn(
          navigationListSubLinkVariants({
            active: resolvedActive,
            size: resolvedSize,
            tone: resolvedTone,
            variant: resolvedVariant,
          }),
          className
        ),
      },
      props
    ),
    render,
    state: {
      active: resolvedActive,
      size: resolvedSize,
      slot: "navigation-list-sub-link",
      tone: resolvedTone,
      variant: resolvedVariant,
    },
  });
};

export { NavigationListSubLink };
