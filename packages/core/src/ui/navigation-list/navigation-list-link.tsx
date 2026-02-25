"use client";

import type { ComponentProps, MouseEvent, ReactNode } from "react";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useCallback, useEffect } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { BaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { UISize } from "../shared/size/size-system";

import {
  type NavigationListTone,
  type NavigationListVariant,
  useResolvedNavigationListSize,
  useResolvedNavigationListTone,
  useResolvedNavigationListVariant,
} from "./navigation-list-context";
import { useNavigationListItemContext } from "./navigation-list-item-context";

const navigationListLinkVariants = tv({
  base: "peer/navigation-list-link flex w-full cursor-pointer gap-2 overflow-hidden rounded-md text-left ring-offset-background outline-hidden transition-colors group-has-data-[slot=navigation-list-action]/navigation-list-item:pr-20 group-has-data-[slot=navigation-list-badge]/navigation-list-item:pr-20 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
  variants: {
    size: {
      xs: "min-h-6 px-1.5 text-xs [&_svg:not([class*='size-'])]:size-3",
      sm: "min-h-7 px-2 text-xs [&_svg:not([class*='size-'])]:size-3.5",
      md: "min-h-8 px-2 text-sm [&_svg:not([class*='size-'])]:size-4",
      lg: "min-h-9 px-2.5 text-sm [&_svg:not([class*='size-'])]:size-4",
      xl: "min-h-10 px-3 text-base [&_svg:not([class*='size-'])]:size-5",
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
    noWrap: {
      true: "",
      false: "",
    },
    hasDescription: {
      true: "items-start py-1.5",
      false: "items-center",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "surface",
    variant: "light",
    noWrap: false,
    hasDescription: false,
  },
  compoundVariants: [
    {
      tone: "surface",
      variant: "subtle",
      className:
        "hover:bg-muted/70 hover:text-foreground data-active:bg-muted/50 data-active:text-foreground data-active:font-medium",
    },
    {
      tone: "surface",
      variant: "light",
      className:
        "hover:bg-muted hover:text-foreground data-active:bg-muted data-active:text-foreground data-active:font-medium",
    },
    {
      tone: "surface",
      variant: "filled",
      className:
        "hover:bg-muted hover:text-foreground data-active:bg-primary data-active:text-primary-foreground data-active:font-medium",
    },
    {
      tone: "sidebar",
      variant: "subtle",
      className:
        "hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent/60 data-active:text-sidebar-accent-foreground data-active:font-medium",
    },
    {
      tone: "sidebar",
      variant: "light",
      className:
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground data-active:font-medium",
    },
    {
      tone: "sidebar",
      variant: "filled",
      className:
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-active:bg-sidebar-primary data-active:text-sidebar-primary-foreground data-active:font-medium",
    },
  ],
});

const navigationListLinkBodyVariants = tv({
  base: "min-w-0 flex-1",
  variants: {
    noWrap: {
      true: "truncate",
      false: "",
    },
  },
  defaultVariants: {
    noWrap: false,
  },
});

const navigationListLinkLabelVariants = tv({
  base: "block",
  variants: {
    noWrap: {
      true: "truncate",
      false: "",
    },
  },
  defaultVariants: {
    noWrap: false,
  },
});

const navigationListLinkDescriptionVariants = tv({
  base: "mt-0.5 block text-xs",
  variants: {
    noWrap: {
      true: "truncate",
      false: "",
    },
    tone: {
      surface: "text-muted-foreground",
      sidebar: "text-sidebar-foreground/70",
    },
  },
  defaultVariants: {
    noWrap: false,
    tone: "surface",
  },
});

const navigationListDefaultChevron = (
  <HugeiconsIcon aria-hidden="true" icon={ArrowRight01Icon} strokeWidth={2} />
);

export interface NavigationListLinkState {
  active: boolean;
  collapsible: boolean;
  disabled: boolean;
  open: boolean;
  size: UISize;
  slot: "navigation-list-link";
  tone: NavigationListTone;
  variant: NavigationListVariant;
}

export type NavigationListLinkProps = Omit<
  useRender.ComponentProps<"button">,
  "className"
> &
  Omit<ComponentProps<"button">, "className"> &
  Omit<
    VariantProps<typeof navigationListLinkVariants>,
    | "class"
    | "className"
    | "hasDescription"
    | "noWrap"
    | "size"
    | "tone"
    | "variant"
  > & {
    href?: string;
    active?: boolean;
    label?: ReactNode;
    description?: ReactNode;
    leftSection?: ReactNode;
    rightSection?: ReactNode | null;
    noWrap?: boolean;
    disableRightSectionRotation?: boolean;
    size?: UISize;
    tone?: NavigationListTone;
    variant?: NavigationListVariant;
    className?: BaseUIClassName<NavigationListLinkState>;
  };

const NavigationListLink = ({
  className,
  render,
  href,
  active,
  label,
  description,
  leftSection,
  rightSection,
  noWrap = false,
  disableRightSectionRotation = false,
  size,
  tone,
  variant,
  disabled,
  onClick,
  onKeyDown,
  children,
  ...props
}: NavigationListLinkProps) => {
  const itemContext = useNavigationListItemContext();

  const resolvedSize = useResolvedNavigationListSize(size, itemContext.size);
  const resolvedTone = useResolvedNavigationListTone(tone, itemContext.tone);
  const resolvedVariant = useResolvedNavigationListVariant(
    variant,
    itemContext.variant
  );

  const hasToggleBehavior = itemContext.collapsible;
  const isLinkLike =
    !hasToggleBehavior && (href !== undefined || render !== undefined);
  const resolvedActive = Boolean(active || props["aria-current"] === "page");
  const resolvedAriaCurrent =
    props["aria-current"] ??
    (resolvedActive && isLinkLike ? "page" : undefined);
  const resolvedDisabled = disabled ?? itemContext.disabled;

  useEffect(() => {
    if (process.env.NODE_ENV === "production" || !hasToggleBehavior) {
      return;
    }

    if (href !== undefined) {
      console.warn(
        "[NavigationList.Link] `href` is ignored when used inside `NavigationList.Item collapsible`. Parent rows are disclosure buttons."
      );
    }

    if (render !== undefined) {
      console.warn(
        "[NavigationList.Link] `render` is ignored when used inside `NavigationList.Item collapsible`. Parent rows are disclosure buttons."
      );
    }
  }, [hasToggleBehavior, href, render]);

  const usesDefaultChevron = rightSection === undefined && hasToggleBehavior;
  const renderedRightSection = usesDefaultChevron
    ? navigationListDefaultChevron
    : rightSection;
  const hasRenderedRightSection = renderedRightSection !== null;

  const handleClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      onClick?.(event as never);

      if (event.defaultPrevented) {
        return;
      }

      if (resolvedDisabled) {
        event.preventDefault();
      }
    },
    [onClick, resolvedDisabled]
  );

  const composedContent =
    children ??
    (label || description || leftSection || hasRenderedRightSection ? (
      <>
        {leftSection ? (
          <span
            className="shrink-0"
            data-slot="navigation-list-link-left-section"
          >
            {leftSection}
          </span>
        ) : null}

        <span className={navigationListLinkBodyVariants({ noWrap })}>
          {label ? (
            <span
              className={navigationListLinkLabelVariants({ noWrap })}
              data-slot="navigation-list-link-label"
            >
              {label}
            </span>
          ) : null}
          {description ? (
            <span
              className={navigationListLinkDescriptionVariants({
                noWrap,
                tone: resolvedTone,
              })}
              data-slot="navigation-list-link-description"
            >
              {description}
            </span>
          ) : null}
        </span>

        {hasRenderedRightSection ? (
          <span
            aria-hidden={usesDefaultChevron ? "true" : undefined}
            className={cn(
              "ml-auto flex shrink-0 items-center justify-center",
              hasToggleBehavior &&
                !disableRightSectionRotation &&
                "data-[open=true]:rotate-90"
            )}
            data-open={itemContext.open ? "true" : "false"}
            data-slot="navigation-list-link-right-section"
          >
            {renderedRightSection}
          </span>
        ) : null}
      </>
    ) : null);

  const state: NavigationListLinkState = {
    active: resolvedActive,
    collapsible: hasToggleBehavior,
    disabled: resolvedDisabled,
    open: itemContext.open,
    size: resolvedSize,
    slot: "navigation-list-link",
    tone: resolvedTone,
    variant: resolvedVariant,
  };
  const resolvedClassName =
    typeof className === "function" ? className(state) : className;

  const mergedClassName = cn(
    navigationListLinkVariants({
      hasDescription: Boolean(description),
      noWrap,
      size: resolvedSize,
      tone: resolvedTone,
      variant: resolvedVariant,
    }),
    resolvedClassName
  );

  const resolvedRender =
    render ??
    (href
      ? (renderProps: ComponentProps<"a">) => {
          const { children: renderChildren, ...anchorProps } = renderProps;

          return (
            <a {...anchorProps} href={href}>
              {renderChildren}
            </a>
          );
        }
      : undefined);

  const renderedLinkElement = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: mergedClassName,
        "aria-current": resolvedAriaCurrent,
        "aria-disabled": resolvedDisabled ? "true" : undefined,
        disabled: isLinkLike ? undefined : resolvedDisabled,
        onClick: handleClick,
        onKeyDown,
        type: isLinkLike ? undefined : "button",
        children: composedContent,
      },
      props
    ),
    render: resolvedRender,
    state,
  });

  if (hasToggleBehavior) {
    return (
      <CollapsiblePrimitive.Trigger
        aria-disabled={resolvedDisabled ? "true" : undefined}
        className={mergedClassName}
        data-active={resolvedActive ? "true" : undefined}
        data-size={resolvedSize}
        data-slot="navigation-list-link"
        data-tone={resolvedTone}
        data-variant={resolvedVariant}
        disabled={resolvedDisabled}
        onClick={onClick}
        onKeyDown={onKeyDown}
        type="button"
      >
        {composedContent}
      </CollapsiblePrimitive.Trigger>
    );
  }

  return renderedLinkElement;
};

export { NavigationListLink };
