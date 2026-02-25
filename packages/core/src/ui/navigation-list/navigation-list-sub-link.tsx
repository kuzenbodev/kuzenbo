import type { ComponentProps } from "react";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";

import {
  type NavigationListTone,
  type NavigationListVariant,
  useResolvedNavigationListSize,
  useResolvedNavigationListTone,
  useResolvedNavigationListVariant,
} from "./navigation-list-context";
import { useNavigationListItemContext } from "./navigation-list-item-context";

const navigationListSubLinkVariants = tv({
  base: "flex min-w-0 items-center gap-2 overflow-hidden rounded-md text-left outline-hidden transition-colors focus-visible:ring-2 [&>span:last-child]:truncate",
  variants: {
    size: {
      xs: "h-6 px-1.5 text-xs [&_svg:not([class*='size-'])]:size-3",
      sm: "h-7 px-2 text-xs [&_svg:not([class*='size-'])]:size-3.5",
      md: "h-8 px-2 text-sm [&_svg:not([class*='size-'])]:size-4",
      lg: "h-9 px-2.5 text-sm [&_svg:not([class*='size-'])]:size-4",
      xl: "h-10 px-3 text-base [&_svg:not([class*='size-'])]:size-5",
    },
    tone: {
      surface: "ring-ring",
      sidebar: "ring-sidebar-ring",
    },
    variant: {
      subtle: "",
      light: "",
      filled: "",
    },
    active: {
      true: "font-medium",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "surface",
    variant: "light",
    active: false,
  },
  compoundVariants: [
    {
      tone: "surface",
      variant: "subtle",
      className:
        "hover:bg-muted/70 hover:text-foreground data-active:bg-muted/50",
    },
    {
      tone: "surface",
      variant: "light",
      className: "hover:bg-muted hover:text-foreground data-active:bg-muted",
    },
    {
      tone: "surface",
      variant: "filled",
      className:
        "hover:bg-muted hover:text-foreground data-active:bg-primary data-active:text-primary-foreground",
    },
    {
      tone: "sidebar",
      variant: "subtle",
      className:
        "hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent/60 data-active:text-sidebar-accent-foreground",
    },
    {
      tone: "sidebar",
      variant: "light",
      className:
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground",
    },
    {
      tone: "sidebar",
      variant: "filled",
      className:
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-active:bg-sidebar-primary data-active:text-sidebar-primary-foreground",
    },
  ],
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
