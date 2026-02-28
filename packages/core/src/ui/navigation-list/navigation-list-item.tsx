"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import type { ComponentProps } from "react";
import { useCallback, useMemo, useState } from "react";
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
import { NavigationListItemContext } from "./navigation-list-item-context";
import type { NavigationListItemContextValue } from "./navigation-list-item-context";

const navigationListItemVariants = tv({
  base: "group/navigation-list-item relative list-none",
  defaultVariants: {
    size: "md",
    tone: "surface",
    variant: "light",
  },
  variants: {
    size: {
      lg: "",
      md: "",
      sm: "",
      xl: "",
      xs: "",
    },
    tone: {
      sidebar: "",
      surface: "",
    },
    variant: {
      filled: "",
      light: "",
      subtle: "",
    },
  },
});

export type NavigationListItemProps = ComponentProps<"li"> &
  VariantProps<typeof navigationListItemVariants> & {
    collapsible?: boolean;
    opened?: boolean;
    defaultOpened?: boolean;
    onOpenedChange?: (opened: boolean) => void;
    disabled?: boolean;
    size?: UISize;
    tone?: NavigationListTone;
    variant?: NavigationListVariant;
  };

const NavigationListItem = ({
  className,
  collapsible = false,
  opened,
  defaultOpened = false,
  onOpenedChange,
  disabled = false,
  size,
  tone,
  variant,
  children,
  ...props
}: NavigationListItemProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpened);
  const isControlled = opened !== undefined;
  const currentOpen = isControlled ? (opened ?? false) : internalOpen;
  const resolvedOpen = collapsible ? currentOpen : false;

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!collapsible) {
        return;
      }

      if (!isControlled) {
        setInternalOpen(nextOpen);
      }

      onOpenedChange?.(nextOpen);
    },
    [collapsible, isControlled, onOpenedChange]
  );

  const resolvedSize = useResolvedNavigationListSize(size);
  const resolvedTone = useResolvedNavigationListTone(tone);
  const resolvedVariant = useResolvedNavigationListVariant(variant);

  const contextValue = useMemo<NavigationListItemContextValue>(
    () => ({
      collapsible,
      disabled,
      open: resolvedOpen,
      size: resolvedSize,
      tone: resolvedTone,
      variant: resolvedVariant,
    }),
    [
      collapsible,
      disabled,
      resolvedOpen,
      resolvedSize,
      resolvedTone,
      resolvedVariant,
    ]
  );

  const itemProps = {
    className: cn(
      navigationListItemVariants({
        size: resolvedSize,
        tone: resolvedTone,
        variant: resolvedVariant,
      }),
      className
    ),
    "data-collapsible": collapsible ? "true" : "false",
    "data-disabled": disabled ? "true" : undefined,
    "data-open": resolvedOpen ? "true" : "false",
    "data-size": resolvedSize,
    "data-slot": "navigation-list-item",
    "data-tone": resolvedTone,
    "data-variant": resolvedVariant,
    ...props,
  };

  return (
    <NavigationListItemContext.Provider value={contextValue}>
      <li {...itemProps}>
        {collapsible ? (
          <CollapsiblePrimitive.Root
            disabled={disabled}
            onOpenChange={handleOpenChange}
            open={resolvedOpen}
          >
            {children}
          </CollapsiblePrimitive.Root>
        ) : (
          children
        )}
      </li>
    </NavigationListItemContext.Provider>
  );
};

export { NavigationListItem };
