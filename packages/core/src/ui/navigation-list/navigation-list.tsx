"use client";

import type { ComponentProps } from "react";
import { useMemo } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { BaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { useComponentSize } from "../shared/size/size-provider";
import type { UISize } from "../shared/size/size-system";
import { NavigationListAction } from "./navigation-list-action";
import { NavigationListBadge } from "./navigation-list-badge";
import { NavigationListContent } from "./navigation-list-content";
import {
  NavigationListContext,
  type NavigationListTone,
  type NavigationListVariant,
} from "./navigation-list-context";
import { NavigationListGroup } from "./navigation-list-group";
import { NavigationListGroupContent } from "./navigation-list-group-content";
import { NavigationListGroupLabel } from "./navigation-list-group-label";
import { NavigationListItem } from "./navigation-list-item";
import { NavigationListLink } from "./navigation-list-link";
import { NavigationListSeparator } from "./navigation-list-separator";
import { NavigationListSkeleton } from "./navigation-list-skeleton";
import { NavigationListSub } from "./navigation-list-sub";
import { NavigationListSubItem } from "./navigation-list-sub-item";
import { NavigationListSubLink } from "./navigation-list-sub-link";

const navigationListVariants = tv({
  base: "flex min-w-0 flex-col",
  variants: {
    size: {
      xs: "gap-1",
      sm: "gap-1",
      md: "gap-1.5",
      lg: "gap-2",
      xl: "gap-2.5",
    },
    tone: {
      surface: "",
      sidebar: "",
    },
    variant: {
      subtle: "",
      light: "",
      filled: "",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "surface",
    variant: "light",
  },
});

export interface NavigationListRootState {
  size: UISize;
  slot: "navigation-list";
  tone: NavigationListTone;
  variant: NavigationListVariant;
}

export type NavigationListProps = Omit<ComponentProps<"nav">, "className"> &
  Omit<
    VariantProps<typeof navigationListVariants>,
    "class" | "className" | "size"
  > & {
    className?: BaseUIClassName<NavigationListRootState>;
    size?: UISize;
    tone?: NavigationListTone;
    variant?: NavigationListVariant;
  };

const NavigationList = ({
  className,
  size: providedSize,
  tone = "surface",
  variant = "light",
  children,
  ...props
}: NavigationListProps) => {
  const size = useComponentSize(providedSize);
  const state: NavigationListRootState = {
    size,
    slot: "navigation-list",
    tone,
    variant,
  };

  const resolvedClassName =
    typeof className === "function" ? className(state) : className;
  const contextValue = useMemo(
    () => ({ size, tone, variant }),
    [size, tone, variant]
  );

  return (
    <NavigationListContext.Provider value={contextValue}>
      <nav
        className={cn(
          navigationListVariants({
            size,
            tone,
            variant,
          }),
          resolvedClassName
        )}
        data-size={size}
        data-slot="navigation-list"
        data-tone={tone}
        data-variant={variant}
        {...props}
      >
        {children}
      </nav>
    </NavigationListContext.Provider>
  );
};

NavigationList.Action = NavigationListAction;
NavigationList.Badge = NavigationListBadge;
NavigationList.Content = NavigationListContent;
NavigationList.Group = NavigationListGroup;
NavigationList.GroupContent = NavigationListGroupContent;
NavigationList.GroupLabel = NavigationListGroupLabel;
NavigationList.Item = NavigationListItem;
NavigationList.Link = NavigationListLink;
NavigationList.Separator = NavigationListSeparator;
NavigationList.Skeleton = NavigationListSkeleton;
NavigationList.Sub = NavigationListSub;
NavigationList.SubItem = NavigationListSubItem;
NavigationList.SubLink = NavigationListSubLink;

export {
  NavigationList,
  NavigationListAction,
  NavigationListBadge,
  NavigationListContent,
  NavigationListGroup,
  NavigationListGroupContent,
  NavigationListGroupLabel,
  NavigationListItem,
  NavigationListLink,
  NavigationListSeparator,
  NavigationListSkeleton,
  NavigationListSub,
  NavigationListSubItem,
  NavigationListSubLink,
};

export type { NavigationListActionProps } from "./navigation-list-action";
export type { NavigationListBadgeProps } from "./navigation-list-badge";
export type { NavigationListContentProps } from "./navigation-list-content";
export type {
  NavigationListContextValue,
  NavigationListTone,
  NavigationListVariant,
} from "./navigation-list-context";
export type { NavigationListGroupProps } from "./navigation-list-group";
export type { NavigationListGroupContentProps } from "./navigation-list-group-content";
export type { NavigationListGroupLabelProps } from "./navigation-list-group-label";
export type { NavigationListItemProps } from "./navigation-list-item";
export type { NavigationListLinkProps } from "./navigation-list-link";
export type { NavigationListSeparatorProps } from "./navigation-list-separator";
export type { NavigationListSkeletonProps } from "./navigation-list-skeleton";
export type { NavigationListSubProps } from "./navigation-list-sub";
export type { NavigationListSubItemProps } from "./navigation-list-sub-item";
export type { NavigationListSubLinkProps } from "./navigation-list-sub-link";
